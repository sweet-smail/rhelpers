import { localStorage } from '../helpers/storage';
export const useLocalStorage = () => {
  return [localStorage.setItem, localStorage.getItem] as const;
};
