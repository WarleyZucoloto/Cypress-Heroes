import { jsx as _jsx } from "react/jsx-runtime";
import { useNavigate } from 'react-router';
import HeroForm from '../components/HeroForm';
import { useHeroes } from '../hooks/heroes.hook';
import { usePowers } from '../hooks/powers.hook';
const HeroNewPage = () => {
    const { getPowers } = usePowers();
    const { data: powers } = getPowers();
    const { createHero } = useHeroes();
    const nav = useNavigate();
    if (!powers) {
        return _jsx("div", { children: "Loading..." });
    }
    const handleCreateHero = (hero, avatar) => {
        createHero.mutateAsync({ hero, avatar }).then(() => {
            nav('/');
        });
    };
    return (_jsx("div", { className: "flex flex-col w-full rounded-lg border shadow-md bg-gray-50 mt-8 relative", children: _jsx("div", { className: "px-8 py-4", children: _jsx(HeroForm, { powers: powers, onSave: handleCreateHero }) }) }));
};
export default HeroNewPage;
