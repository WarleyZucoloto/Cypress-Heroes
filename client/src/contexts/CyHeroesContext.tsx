import React from 'react';
import { User } from '../models';

interface ModalContext {
  modal?: React.ReactNode;
  setModal: (modal: React.ReactNode) => void;
  user?: User;
  setUser: (user?: User) => void;
}

export const CyHeroesContext = React.createContext<ModalContext>({} as any);