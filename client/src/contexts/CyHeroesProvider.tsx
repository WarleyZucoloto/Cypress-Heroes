import React, { useState } from 'react';
import Modal from '../components/Modal';
import { User } from '../models';
import { CyHeroesContext } from './CyHeroesContext';

interface CyHeroesProviderProps extends React.PropsWithChildren {}

const CyHerosProvider: React.FC<CyHeroesProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<React.ReactNode>();
  const [user, setUser] = useState<User>();

  return (
    <CyHeroesContext.Provider value={{ modal, setModal, user, setUser }}>
      {children}
      <Modal
        component={modal}
        open={!!modal}
        onClose={() => setModal(undefined)}
      />
    </CyHeroesContext.Provider>
  );
};

export default CyHerosProvider;