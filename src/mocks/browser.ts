import { setupWorker } from 'msw/browser'
import { apiHandlers } from './api';

export const worker = setupWorker(...apiHandlers);