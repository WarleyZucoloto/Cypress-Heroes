import { useContext } from 'react';
import { CyHeroesContext } from '../../cypress/contexts/CyHeroesProvider';

export function useModal() {
  const context = useContext(CyHeroesContext);

  return {
    modal: context.modal,
    setModal: context.setModal,
  };
}
