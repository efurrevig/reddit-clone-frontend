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
    }
})

export const { setUser } = userSlice.actions

export const login = (email: string, password: string) => {
    return async (dispatch: any) => {
        try {
            const data = await sessionService.login(email, password)
            window.localStorage.setItem('loggedUser', JSON.stringify(data[1]))
            dispatch(setUser(data[0]))
        } catch(error) {
            dispatch(setUser(null))
        }
    }
}

export default userSlice.reducer