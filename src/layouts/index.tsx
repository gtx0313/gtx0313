import { ReactNode } from 'react';
import { useAuthStore } from '../models_store/auth_store';
import LayoutMain from './_layout_main/LayoutMain';

export type ILayoutProps = {
  children: ReactNode;
  variant?: 'landing' | 'logoOnly' | 'landing';
};

export default function Layout({ children, variant = 'landing' }: ILayoutProps) {
  const { isAuthenticated, isInitialized } = useAuthStore((state) => state);

  if (!isInitialized) return <div></div>;

  if (variant === 'landing') return <LayoutMain>{children}</LayoutMain>;
  return <LayoutMain>{children}</LayoutMain>;
}
