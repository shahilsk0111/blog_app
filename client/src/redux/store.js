import { configureStore } from '@reduxjs/toolkit'

import userReducer from './user/userSlice'

export const store = configureStore({
     // Add your reducers here. For example, { posts: postsReducer }
    
    reducer: {
        user: userReducer
    },
})