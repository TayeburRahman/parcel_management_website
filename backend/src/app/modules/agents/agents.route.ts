import express from 'express';
import { AgentController } from './agents.controller';

const router = express.Router();

router.get(
  '/locations',
  AgentController.getAllAgentLocations
);

export const AgentRoutes = router;
