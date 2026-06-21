import { randomUUID } from 'crypto';
import { Request } from 'express';

export function traceMiddleware(req: Request, _: Response, next: () => void) {
  const traceId = req.headers['x-trace-id'] || randomUUID();

  req.headers['x-trace-id'] = traceId;

  next();
}
