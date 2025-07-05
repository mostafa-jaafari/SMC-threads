// components/Providers.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import { MenuProvider } from '@/context/MenuContext';

export function ProviderSession({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <MenuProvider>
        {children}
      </MenuProvider>
    </SessionProvider>
  );
}