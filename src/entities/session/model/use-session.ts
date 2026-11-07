import { use } from 'react';

import { SessionContext } from './session-provider';

export function useSession() {
  const session = use(SessionContext);

  if (!session) {
    throw new Error('useSession must be used within a SessionProvider');
  }

  return session;
}
