'use client';

import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isAuthenticated, user } = useAuth({
    required: true,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null; // The useAuth hook will handle the redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}