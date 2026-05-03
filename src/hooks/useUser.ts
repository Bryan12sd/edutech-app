import { useState, useEffect } from 'react';
import { storage ,ID_OBJECT} from '../db/storage';

export function useUser() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const raw = storage.getString(ID_OBJECT.user);
    console.log(raw);
    if (raw) {
      setUser(JSON.parse(raw));
    }
  }, []);

  return user;
}