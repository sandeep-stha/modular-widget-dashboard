import DisableDevtool from 'disable-devtool';
import { useEffect } from 'react';

export function useDisableDevTools() {
  useEffect(() => {
    const handleLoad = () => {
      if (!import.meta.env.DEV) DisableDevtool();
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);
}
