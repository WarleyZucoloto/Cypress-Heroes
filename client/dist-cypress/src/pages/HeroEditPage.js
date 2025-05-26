import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useParams } from 'react-router';
import { Avatar } from '../components/Avatar';
import { ConfirmDeleteHeroModal } from '../components/ConfirmDeleteHeroModal';
import { useHeroes } from '../hooks/heroes.hook';
import { useModal } from '../hooks/modal.hook';
import { usePowers } from '../hooks/powers.hook';
import HeroForm from '../components/HeroForm';
const HeroEditPage = () => {
    const { getHero, deleteHero, updateHero } = useHeroes();
    const { getPowers } = usePowers();
    const { id } = useParams();
    const { data: hero } = getHero(Number(id));
    const { data: powers } = getPowers();
    const { setModal } = useModal();
    const nav = useNavigate();
    const handleDeleteHero = (hero) => {
        setModal(_jsx(ConfirmDeleteHeroModal, { hero: hero, onDelete: () => {
                deleteHero(hero);
                setModal(undefined);
            }, onDismiss: () => setModal(undefined) }));
    };
    const handleUpdateHero = (hero, avatar) => {
        updateHero
            .mutateAsync({ hero, avatar })
            .then(() => {
            nav('/');
        })
            .catch(() => {
            setModal(_jsx("div", { children: "Something went wrong" }));
        });
    };
    if (!hero || !powers) {
        return _jsx("div", { children: "Loading..." });
    }
    return (_jsxs("div", { className: "flex flex-col w-full rounded-lg border shadow-md bg-gray-50 mt-8 relative", children: [_jsxs("div", { className: "mx-auto", children: [_jsx(Avatar, { hero: hero, className: "flex justify-center -mt-8" }), _jsx("h3", { "data-cy": "name", className: "text-4xl font-semibold leading-normal text-slate-700 mb-2", children: hero.name })] }), _jsxs("div", { className: "flex absolute top-4 left-4 justify-center gap-4", children: [_jsxs("div", { className: "mr-4 text-center", children: [_jsx("span", { "data-cy": "fans", className: "text-xl font-bold block uppercase tracking-wide text-slate-600", children: hero.fans }), _jsx("span", { className: "text-sm text-slate-400", children: "Fans" })] }), _jsxs("div", { className: "mr-4 text-center", children: [_jsx("span", { "data-cy": "saves", className: "text-xl font-bold block uppercase tracking-wide text-slate-600", children: hero.saves }), _jsx("span", { className: "text-sm text-slate-400", children: "Saves" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("span", { "data-cy": "price", className: "text-xl font-bold block uppercase tracking-wide text-slate-600", children: ["$", hero.price] }), _jsx("span", { className: "text-sm text-slate-400", children: "Price" })] })] }), _jsx("div", { className: "flex flex-wrap justify-center absolute top-4 right-4", children: _jsx("div", { className: "w-full", children: _jsx("button", { className: "bg-red-600 active:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150", type: "button", onClick: () => handleDeleteHero(hero), children: "Delete Hero" }) }) }), _jsx("div", { className: "px-8 py-4", children: _jsx(HeroForm, { hero: hero, powers: powers, onSave: handleUpdateHero }) })] }));
};
export default HeroEditPage;
