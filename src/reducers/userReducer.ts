import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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


export const selectCount = (state: RootState) => state.user.user


export default userSlice.reducer

//TBDeleted?