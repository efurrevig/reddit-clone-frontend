'use client'
import { useState } from 'react'
import Button from '../Button'
import { signIn } from 'next-auth/react'

type LoginFormProps = {
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>
    closeForm: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ setDisplay, closeForm }) => {
    const initialForm = {
        email: '',
        password: ''
    }
    const [form, setForm] = useState({ ...initialForm })
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent ) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const { email, password } = form
            const res = await signIn('credentials', { redirect: false, email, password })
            if (res?.error) {
                setError('Invalid credentials')
            } else {
                setError('')
                setSuccess('Success')
                closeForm()

            }
        } catch (error) {
            console.log('login error:', error)
        } finally {
            setIsLoading(false)
            location.reload()
        }

    }


    return (
        <div className="mx-10 flex flex-col items-center">
            <h1> Log In </h1>
            <p className="text-green-500 text-xs mt-3"> {success} </p>
            <p className="text-red-500 text-xs mt-3"> {error} </p>
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
                    <Button isLoading={isLoading} clearDefault={true} onClick={() => setDisplay(false)} customClass="text-blue-500 hover:text-blue-600 cursor-pointer"> 
                        Sign Up 
                    </Button> 
                </div>
            </div>
        </div>
    )
}

export default LoginForm