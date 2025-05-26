import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HeroesListPage from '../pages/HeroesListPage';
import CyHerosProvider from './CyHeroesProvider';
import HeroEditPage from '../pages/HeroEditPage';
import HeroNewPage from '../pages/HeroNewPage';
export function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { refetchOnWindowFocus: false },
        },
    });
    return (_jsx(CyHerosProvider, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsx(Layout, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "heroes" }) }), _jsx(Route, { path: "/heroes", element: _jsx(HeroesListPage, {}) }), _jsx(Route, { path: "/heroes/:id/edit", element: _jsx(HeroEditPage, {}) }), _jsx(Route, { path: "/heroes/new", element: _jsx(HeroNewPage, {}) })] }) }) }) }));
}
export default App;
