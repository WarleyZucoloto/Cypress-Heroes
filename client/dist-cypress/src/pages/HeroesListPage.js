import { jsx as _jsx } from "react/jsx-runtime";
import { useNavigate } from 'react-router';
import { AlertModal } from '../components/AlertModal';
import HeroCard from '../components/HeroCard';
import { ConfirmHireModal } from '../components/ConfirmHireModal';
import { useAuth } from '../hooks/auth.hook';
import { useHeroes } from '../hooks/heroes.hook';
import { useModal } from '../hooks/modal.hook';
import { ConfirmDeleteHeroModal } from '../components/ConfirmDeleteHeroModal';
const HeroesListPage = () => {
    const { getHeroes, updatePartialHero, deleteHero } = useHeroes();
    const { data: heroes } = getHeroes();
    const { user } = useAuth();
    const { setModal } = useModal();
    const nav = useNavigate();
    const handleLikeHero = (hero) => {
        if (!user) {
            setModal(_jsx(AlertModal, { onDismiss: () => setModal(undefined), children: "You must log in to like." }));
            return;
        }
        const heroUpdate = {
            id: hero.id,
            fans: hero.fans + 1,
        };
        updatePartialHero(heroUpdate);
    };
    const handleHireHero = (hero) => {
        if (!user) {
            setModal(_jsx(AlertModal, { onDismiss: () => setModal(undefined), children: "You must log in to hire this hero." }));
            return;
        }
        setModal(_jsx(ConfirmHireModal, { hero: hero, onHire: () => {
                const heroUpdate = {
                    id: hero.id,
                    saves: hero.saves + 1,
                };
                updatePartialHero(heroUpdate);
                setModal(undefined);
            }, onDismiss: () => setModal(undefined) }));
    };
    const handleEditHero = (hero) => {
        nav(`/heroes/${hero.id}/edit`);
    };
    const handleDeleteHero = (hero) => {
        setModal(_jsx(ConfirmDeleteHeroModal, { hero: hero, onDelete: () => {
                deleteHero(hero);
                setModal(undefined);
            }, onDismiss: () => setModal(undefined) }));
    };
    return (_jsx("ul", { className: "flex flex-wrap gap-8 justify-between", children: heroes?.map((hero) => (_jsx(HeroCard, { user: user, hero: hero, onLikeHero: () => handleLikeHero(hero), onHireHero: () => handleHireHero(hero), onEditHero: () => handleEditHero(hero), onDeleteHero: () => handleDeleteHero(hero) }, hero.id))) }));
};
export default HeroesListPage;
