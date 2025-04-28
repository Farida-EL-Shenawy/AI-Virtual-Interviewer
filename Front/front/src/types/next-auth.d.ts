import 'next-auth';
import { Role } from './auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name?: string;
    image?: string;
    role: Role;
  }

  interface Session {
    user: User & {
      id: string;
      role: Role;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: Role;
  }
}