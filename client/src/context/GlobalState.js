import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
import { Transaction } from '../components/Transaction';

const initialState = {
    transactions: [],
    error: null,
    loading: true
}

// Create context
export const GlobalContext = createContext(initialState);

//Provider
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    async function getTransactions() {
        try {
            const res = await axios.get('/api/v1/transactions');
            console.log(res)
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
    }

    //Actions
    async function deleteTransactions(id) {
        try {
            await axios.delete(`/api/v1/transactions/${id}`);

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function addTransactions(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        try {
            const res = await axios.post('/api/v1/transactions', transaction, config);

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
    }
    
    return (<GlobalContext.Provider value={{
        transactions:state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransactions,
        addTransactions
    }}>
        {children}
    </GlobalContext.Provider>);
}
