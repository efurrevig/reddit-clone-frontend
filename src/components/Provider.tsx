'use client'
import { Provider } from 'react-redux'
import { store } from '@/services/index'

function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>
}

export default Providers