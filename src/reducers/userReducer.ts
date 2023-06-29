import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import sessionService from '@/services/sessions'
import type { RootState } from '@/services/store'

import { User } from '@/types'

export interface UserState {
    user: User | null
}

const initialState: UserState = {
    user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null> ) => {
            state.user = action.payload
        },
    }
})

export const { setUser } = userSlice.actions

export const login = (email: string, password: string) => {
    return async (dispatch: any) => {
        try {
            const data = await sessionService.sessionLogin(email, password)
            console.log(data)
            window.localStorage.setItem('loggedUser', JSON.stringify(data[1]))
            dispatch(setUser(data[0].data))
        } catch(error) {
            dispatch(setUser(null))
        }
    }
}

export const logout = () => {
    return async (dispatch: any) => {
        const sessionToken = window.localStorage.getItem('loggedUser') || ''
        await sessionService.sessionLogout(sessionToken)
        window.localStorage.removeItem('loggedUser')
        dispatch(setUser(null))
    }
}

export const signup = (username: string,email: string,password: string,password_confirmation: string) => {
    return async (dispatch: any) => {
        try {
            const data = await sessionService.sessionSignup(username, email, password, password_confirmation)
            window.localStorage.setItem('loggedUser', JSON.stringify(data[1]))
            dispatch(setUser(data[0]))
        } catch(error) {
            dispatch(setUser(null))
        }
    }
}

export const selectCount = (state: RootState) => state.user.user


export default userSlice.reducer