import { addMinutes, isBefore } from 'date-fns';
import extension from 'extensionizer';
import { useEffect } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

import { decrypt, encrypt } from '../utils/crypto';

const passwordState = atom<string | undefined>({
  key: 'password',
  default: undefined,
});

export function usePassword(): string | undefined {
  return useRecoilValue(passwordState);
}

export function useSetPassword(): any {
  const setPassword = useSetRecoilState(passwordState);
  return (password: string) => {
    setPassword(password);
    storePassword(password);
  };
}

type StoredPassword = {
  timestamp: number | null;
  encrypted: string | null;
};

export function storePassword(password?: string): void {
  const timestamp = Date.now();
  const store: StoredPassword = {
    timestamp: password ? timestamp : null,
    encrypted: password ? encrypt(password, String(timestamp)) : null,
  };
  console.log('setting password ... : ', password, store);
  extension.storage.local.set(store);
}

export function useInitPasswordState(): void {
  const setPassword = useSetRecoilState(passwordState);

  useEffect(() => {
    extension.storage.local.get(['encrypted', 'timestamp', 'autoLockTime', 'lastActiveTime'], (stored: any) => {
      const { encrypted, timestamp } = stored as StoredPassword;
      const { autoLockTime = 15, lastActiveTime } = stored;

      const shouldAutoLock = !isBefore(new Date(), addMinutes(new Date(lastActiveTime ?? timestamp), autoLockTime));
      if (shouldAutoLock) {
        console.log('should lock, clearing set password');
        setPassword(undefined);
        storePassword(undefined);
      } else {
        if (encrypted && timestamp) {
          console.log('should not lock, decrypting password');
          const decrypted = decrypt(encrypted, String(timestamp));
          setPassword(decrypted);
        }
      }
    });
  }, [setPassword]);
}
