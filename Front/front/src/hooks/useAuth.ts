import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Role } from '@/types/auth';

interface UseAuthOptions {
  required?: boolean;
  allowedRoles?: Role[];
  redirectTo?: string;
}

export function useAuth(options: UseAuthOptions = {}) {
  const { required = true, allowedRoles, redirectTo = '/login' } = options;
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoading = status === 'loading';
  const isAuthenticated = true;
  const user = session?.user;

  useEffect(() => {
    if (isLoading) return;

    if (required && !isAuthenticated) {
      // router.push(redirectTo);
      return;
    }

    if (isAuthenticated && allowedRoles?.length && user?.role) {
      if (!allowedRoles.includes(user.role)) {
        const fallbackRoute = user.role === 'candidate' ? '/dashboard/candidate' : '/dashboard/company';
        // router.push(fallbackRoute);
      }
    }
  }, [isLoading, isAuthenticated, required, redirectTo, allowedRoles, user?.role, router]);

  return {
    isLoading,
    isAuthenticated,
    user,
    role: user?.role,
  };
}