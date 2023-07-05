'use client'
import { useState } from 'react'
import Button from '../Button'
import sessionService from '@/services/sessions'

type RegisterFormProps = {
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ setDisplay }) => {
    const initialForm = {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    }
    const [form, setForm] = useState({ ...initialForm })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const inputClasses = "rounded-3xl bg-gray-800 p-2"

    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { email, username, password, confirmPassword} = form
        try {
            setIsLoading(true)
            await sessionService.register(username, email, password, confirmPassword)
            setError('')
            setForm({ ...initialForm })
            setSuccess(true)
        } catch (error) {
            if (typeof error === 'object') {
                const errorMessage = (error as Error).message
                setError(errorMessage)
            } else {
                setError('An unknown error occured')
            }
        } finally {
            setIsLoading(false)
        }
    }  

    return (
        <div className="mx-10 flex flex-col items-center">
            <h1> Sign Up </h1>
            <p className="text-green-500 text-xs mt-3">
            {success && (
                <>
                Account created.{' '}
                <Button clearDefault={true} onClick={() => setDisplay(true)} customClass="text-blue-500 hover:text-blue-600 cursor-pointer">
                    Sign in here
                </Button>
                </>
            )}
            </p>
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 py-6 m-0"
            >
                <input
                    type="email"
                    placeholder="Email"
                    className={inputClasses}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Username"
                    className={inputClasses}
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className={inputClasses}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="rounded-3xl bg-gray-800 p-2"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    required
                />
                <div>
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                </div>
                <Button 
                    customClass="rounded-3xl mt-3"
                    isLoading={isLoading}
                    disabled={isLoading}
                >
                    Register
                </Button>
            </form>
            <div className="mb-10">
                <div className="flex gap-2"> 
                    <p>Have an account?</p>
                    <Button clearDefault={true} onClick={() => setDisplay(true)} customClass="text-blue-500 hover:text-blue-600 cursor-pointer"> 
                        Sign in 
                    </Button> 
                </div>
            </div>
        </div>
    )
}


export default RegisterForm