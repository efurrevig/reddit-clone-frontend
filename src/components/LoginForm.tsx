import React from 'react'
import Button from './Button'
import { Icons } from './Icons'
import { useState } from 'react'

type LoginFormProps = {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ setShowForm }) => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const closeForm = () => {
        setShowForm(false)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

    }

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
            <div className="bg-zinc-950 w-96 rounded-lg p-0">
                <div className='flex justify-end h-10 items-center'>
                    <Button className="m-4 text-white text-2xl" customClass={true} onClick={closeForm}> <Icons.closeX /> </Button>
                </div>
                <div>
                    <h1> Login </h1>
                    <form 
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 p-4"
                    >
                        <input
                            type="email"
                            placeholder="Email"
                            className="rounded-lg p-2"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="border-gray-400 rounded-lg p-2"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                        <Button className="">Log In</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm