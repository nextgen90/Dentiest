import express from 'express';
import cors from 'cors';
import { VercelRequest, VercelResponse } from '@vercel/node';

import indexRoute from './api/index';
import appointmentsRoute from './api/appointments';
import chatRoute from './api/chat';

const app = express();
app.use(cors());
app.use(express.json());

// Helper function to map Express Req/Res to Vercel Req/Res
const adaptVercelRoute = (handler: any) => {
  return (req: express.Request, res: express.Response) => {
    // Basic mock of Vercel properties if needed, but standard Express req/res
    // are usually close enough for basic cases like ours
    return handler(req as unknown as VercelRequest, res as unknown as VercelResponse);
  };
};

app.all('/api', adaptVercelRoute(indexRoute));
app.all('/api/appointments', adaptVercelRoute(appointmentsRoute));
app.all('/api/chat', adaptVercelRoute(chatRoute));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Local API server running on http://localhost:${PORT}`);
});
