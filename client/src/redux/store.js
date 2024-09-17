import { configureStore , combineReducers } from '@reduxjs/toolkit'
import {persistReducer } from 'redux-persist'
import userReducer from './user/userSlice'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'

const rootReducer = combineReducers({
    user: userReducer,
    
})

const persistConfig = {
    key: 'root',
    storage,
    version:1
}

const persistedReducer = persistReducer( persistConfig , rootReducer)

export const store = configureStore({
     // Add your reducers here. For example, { posts: postsReducer }
    
    reducer: persistedReducer,
    middleware : (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false})
})

export const persistor = persistStore(store)