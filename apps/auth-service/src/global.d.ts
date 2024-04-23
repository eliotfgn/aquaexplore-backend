import { Environment } from './config/env.config';

declare global {
  namespace NodeJS {
    type ProcessEnv = Environment;
  }
}
