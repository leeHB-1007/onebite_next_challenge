import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Initialize MSW worker with API handlers
const worker = setupWorker(...handlers)
export  default worker;