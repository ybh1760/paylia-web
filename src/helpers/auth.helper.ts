import { IncomingMessage } from 'http';

export const getTokenFromReq = (req: IncomingMessage): string => {
  return req.headers.authorization?.replace('Bearer ', '');
};
