import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true,
                state.user = action.payload
        },
        logout(state, action) {
            state.isLoggedIn = false,
                state.user = null
        },
        updateUser(state, action) {
            state.user = action.payload;
        }
    }
})

export const { login, logout,updateUser } = authSlice.actions

export default authSlice.reducer