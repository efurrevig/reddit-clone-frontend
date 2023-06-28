import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import sessionService from '@/services/sessions'

import { User } from '@/types'

export interface UserState {
    user: User | null,
    token: string
}

const initialState: UserState = {
    user: null,
    token: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null> ) => {
            state.user = action.payload
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        }
    }
})

export const { setUser, setToken } = userSlice.actions

export const login = (email: string, password: string) => {
    return async (dispatch: any) => {
        try {
            const data = await sessionService.sessionLogin(email, password)
            window.localStorage.setItem('loggedUser', JSON.stringify(data[1]))
            dispatch(setUser(data[0]))
            dispatch(setToken(data[1]))
        } catch(error) {
            dispatch(setUser(null))
            dispatch(setToken(''))
        }
    }
}

export const logout = () => {
    return async (dispatch: any) => {
        const sessionToken = window.localStorage.getItem('loggedUser') || ''
        await sessionService.sessionLogout(sessionToken)
        window.localStorage.removeItem('loggedUser')
        dispatch(setUser(null))
        dispatch(setToken(''))
    }
}

export default userSlice.reducer