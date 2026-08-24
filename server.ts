import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Resolve __dirname safely across both ESM (dev tsx) and CJS (production esbuild bundle)
const getDirname = () => {
  try {
    if (typeof import.meta?.url === 'string') {
      return path.dirname(fileURLToPath(import.meta.url));
    }
  } catch {
    // fallback for environments without import.meta
  }
  return typeof __dirname !== 'undefined' ? __dirname : process.cwd();
};

const appDirname = getDirname();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Increase payload limit for high-res image uploads
  app.use(express.json({ limit: '60mb' }));
  app.use(express.urlencoded({ extended: true, limit: '60mb' }));

  // Health check endpoint for Cloud Run container probes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Allowed upload extensions (prevents stored XSS / arbitrary file writes)
  const ALLOWED_UPLOAD_EXTENSIONS = ['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.pdf'];

  // API endpoint to list all project folders in public/uploads
  app.get('/api/uploads/folders', (req, res) => {
    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        return res.json({ folders: [] });
      }

      const entries = fs.readdirSync(uploadsDir, { withFileTypes: true });
      const folders = entries
        .filter(entry => entry.isDirectory())
        .map(dir => {
          const folderPath = path.join(uploadsDir, dir.name);
          const files = fs.readdirSync(folderPath).filter(f => !f.startsWith('.'));
          return {
            name: dir.name,
            fileCount: files.length,
            files: files.map(file => ({
              name: file,
              url: `/uploads/${encodeURIComponent(dir.name)}/${encodeURIComponent(file)}`
            }))
          };
        });

      res.json({ folders });
    } catch (err: any) {
      console.error('Error scanning uploads directory:', err);
      res.status(500).json({ error: 'Failed to scan uploads directory', message: err.message });
    }
  });

  // API endpoint to handle asset uploads
  app.post('/api/upload', (req, res) => {
    try {
      const { folderName, fileName, fileData, category } = req.body;

      if (!fileName || !fileData) {
        return res.status(400).json({ error: 'fileName and fileData are required' });
      }

      const dotIndex = fileName.lastIndexOf('.');
      const ext = dotIndex >= 0 ? fileName.slice(dotIndex).toLowerCase() : '';
      if (!ALLOWED_UPLOAD_EXTENSIONS.includes(ext)) {
        return res.status(400).json({ error: `File type not allowed. Permitted: ${ALLOWED_UPLOAD_EXTENSIONS.join(', ')}` });
      }

      const targetFolder = folderName || 'Custom Uploads';
      const cleanFolderName = targetFolder.replace(/[/\\?%*:|"<>]/g, '-');
      const cleanFileName = fileName.replace(/[/\\?%*:|"<>]/g, '-');

      const targetDir = path.join(process.cwd(), 'public', 'uploads', cleanFolderName);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const targetFilePath = path.join(targetDir, cleanFileName);

      // Extract base64 data
      const base64Data = fileData.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, '');
      fs.writeFileSync(targetFilePath, Buffer.from(base64Data, 'base64'));

      const publicUrl = `/uploads/${encodeURIComponent(cleanFolderName)}/${encodeURIComponent(cleanFileName)}`;

      res.json({
        success: true,
        url: publicUrl,
        folderName: cleanFolderName,
        fileName: cleanFileName,
        category: category || 'general'
      });
    } catch (err: any) {
      console.error('Upload error:', err);
      res.status(500).json({ error: 'Upload failed', message: err.message });
    }
  });

  // Serve static files from public directory
  const publicDir = path.join(process.cwd(), 'public');
  if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));
  }

  // Vite development middleware vs. static build in production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    const distIndexPath = path.join(distPath, 'index.html');
    // Unknown API routes must return JSON 404, never the SPA shell
    app.use('/api', (req, res) => {
      res.status(404).json({ error: 'API route not found' });
    });
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      if (fs.existsSync(distIndexPath)) {
        res.sendFile(distIndexPath);
      } else {
        res.status(404).send('Build not found. Please run npm run build first.');
      }
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });

  // Handle termination signals gracefully (crucial for Cloud Run)
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, closing server...');
    server.close(() => {
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received, closing server...');
    server.close(() => {
      process.exit(0);
    });
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
