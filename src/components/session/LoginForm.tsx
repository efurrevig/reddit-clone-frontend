'use client'
import { useState } from 'react'
import Button from '../Button'
import { login } from '@/reducers/userReducer'
import { useAppDispatch } from '@/app/hooks'

type LoginFormProps = {
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ setDisplay }) => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const dispatch = useAppDispatch()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            console.log('login')
            await dispatch(login(form.email, form.password))
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="mx-10 flex flex-col items-center">
            <h1> Log In </h1>
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 py-6 m-0"
            >
                <input
                    type="email"
                    placeholder="Email"
                    className="rounded-3xl bg-gray-800 p-2"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="rounded-3xl bg-gray-800 p-2"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                />
                <Button customClass="rounded-3xl">Log In</Button>
            </form>
            <div className="mb-10">
                <div className="flex gap-2"> 
                    <p>New to Creddit?</p>
                    <Button clearDefault={true} onClick={() => setDisplay(false)} customClass="text-blue-500 hover:text-blue-600 cursor-pointer"> 
                        Sign Up 
                    </Button> 
                </div>
            </div>
        </div>
    )
}

export default LoginForm