import { configureStore } from '@reduxjs/toolkit';
import { cloItemsReducer } from './clo-items.slice';

export const store = configureStore({
    reducer: {
        cloItems: cloItemsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;