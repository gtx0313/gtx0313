import router, { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useAuthStore } from '../models_store/auth_store';
import ResetPasswordPage from '../pages/reset-password';
import SignInPage from '../pages/signin';
import SignUpPage from '../pages/signup';

type Props = {
  children: ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { pathname, push } = useRouter();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  const { isAuthenticated, isInitialized } = useAuthStore((state) => state);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null);
      push(requestedLocation);
    }
  }, [pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <div />;
  }

  if (!isAuthenticated && pathname.includes('/reset-password')) {
    if (pathname !== requestedLocation) setRequestedLocation(pathname);
    return <ResetPasswordPage />;
  }

  if (!isAuthenticated && pathname.includes('/signin')) {
    if (pathname !== requestedLocation) setRequestedLocation(pathname);
    return <SignInPage />;
  }
  if (!isAuthenticated && pathname.includes('/signup')) {
    if (pathname !== requestedLocation) setRequestedLocation(pathname);
    return <SignUpPage />;
  }

  if (!isAuthenticated) router.push('/landing');

  return <>{children}</>;
}
