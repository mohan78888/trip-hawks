import { Request, Response, NextFunction } from 'express';
import { ClerkExpressRequireAuth, StrictAuthProp } from '@clerk/clerk-sdk-node';

export interface AuthRequest extends Request {
  auth?: StrictAuthProp['auth'];
}

// Clerk's middleware will automatically verify the token securely. 
// If verification fails, it will return a 401 Unauthorized status.
export const authMiddleware = ClerkExpressRequireAuth();
