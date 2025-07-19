import Cookies from 'js-cookie';

const cookieUtil = {
  getItem: (name: string): string | null => {
    return Cookies.get(name) || null;
  },
  setItem: (name: string, value: string) => {
    Cookies.set(name, value, { expires: 365, path: '/' });
  },
  removeItem: (name: string) => {
    Cookies.remove(name, { path: '/' });
  },
};

export { cookieUtil };
