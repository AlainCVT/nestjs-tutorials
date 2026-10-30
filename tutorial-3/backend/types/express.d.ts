import { User as AppUser } from '@prisma/client';

/* eslint-disable @typescript-eslint/no-empty-object-type */
declare global {
  namespace Express {
    interface User extends AppUser {}
  }
}
