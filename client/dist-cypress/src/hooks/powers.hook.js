/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../utils/constants';
const baseUrl = API_URL;
export function usePowers() {
    const getPowers = () => useQuery({
        queryKey: ['powers'],
        queryFn: async () => {
            const response = await fetch(`${baseUrl}/powers`);
            const data = await response.json();
            return data;
        },
    });
    return {
        getPowers,
    };
}
