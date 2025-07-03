import type { Dispatch, SetStateAction } from 'react';

export type TSelecter = {
  start?: string;
  end?: string;
  setStart: Dispatch<SetStateAction<string>>;
  setEnd: Dispatch<SetStateAction<string>>;
  setActiveSelecter: Dispatch<SetStateAction<string>>;
  activeSelecter: string;
};
