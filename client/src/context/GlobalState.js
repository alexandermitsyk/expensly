import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

const initialState = {
    transactions: []
}

// Create context

export const GlobalContext = createContext(initialState);

//Provider
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //Actions
    function deleteTransactions(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        });
    }

    function addTransactions(id) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: id
        });
    }
    
    return (<GlobalContext.Provider value={{
        transactions:state.transactions,
        deleteTransactions,
        addTransactions
    }}>
        {children}
    </GlobalContext.Provider>);
}
