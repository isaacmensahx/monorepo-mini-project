import app from './app';
import { config } from './config';

const { port, env } = config.app;

app.listen(port, () => {
  console.log(`🚀 API server running on http://localhost:${port} [${env}]`);
  console.log(`📋 Health check: http://localhost:${port}/health`);
  console.log(`🃏 Cards API: http://localhost:${port}/api/v1/cards`);
});
