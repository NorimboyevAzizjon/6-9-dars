
import { useReducer, useEffect } from 'react';
import { products } from '../data/products';

const initialState = {
    data: [],
    isLoading: false,
    error: null
};

function reducer(state, action) {
    const { type, payload } = action;
    switch (type) {
        case 'DATA':
            return { ...state, data: payload };
        case 'LOADING':
            return { ...state, isLoading: payload };
        case 'ERROR':
            return { ...state, error: payload };
        default:
            return state;
    }
}


export const useFetch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: 'LOADING', payload: true });
        try {
            dispatch({ type: 'DATA', payload: products });
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message || "Xatolik yuz berdi" });
        } finally {
            dispatch({ type: 'LOADING', payload: false });
        }
    }, []);

    return state;
};