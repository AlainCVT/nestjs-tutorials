import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface User extends JwtPayload {
      id: string;
      name: string;
    }
    interface Request {
      user?: User | undefined;
    }
  }
}
