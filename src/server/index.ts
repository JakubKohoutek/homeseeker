import express, { Request, Response } from 'express';
import { Server } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';

const PORT = process.env.PORT || 4321;

const createServer = (): Server => {
  // Create server
  const app = express();

  // Add services
  app.get('/', (req: Request, res: Response) => {
    console.log(req.body);
    res.send({ status: 'OK' });
  });

  // Setup proxy
  const apiProxy = createProxyMiddleware('/api', {
    target: 'https://www.sreality.cz/api/cs/v2',
    secure: false,
    // changeOrigin: true,
    onProxyRes: function (proxyRes) {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      // proxyRes.headers['Access-Control-Allow-Methods'] =
      //   'GET,PUT,POST,DELETE,PATCH,OPTIONS';
      console.log(proxyRes.statusCode);
    },
    logLevel: 'debug',
    pathRewrite: {
      '^/api/': '/' // remove base path
    }
  });
  app.use(apiProxy);

  // Listen on selected port
  return app.listen(PORT, (): void => {
    console.info(`Server is listening on port ${PORT}!`);
  });
};

createServer();
