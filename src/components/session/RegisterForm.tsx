'use client'
import { useState } from 'react'
import Button from '../Button'

type RegisterFormProps = {
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ setDisplay }) => {
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(form)
    }

    return (
        <div className="mx-10 flex flex-col items-center">
            <h1> Sign Up </h1>
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
                    type="text"
                    placeholder="Username"
                    className="rounded-3xl bg-gray-800 p-2"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="rounded-3xl bg-gray-800 p-2"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    required
                />
                <Button customClass="rounded-3xl">Register</Button>
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