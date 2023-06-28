'use client'

import Button from '../Button'
import { Icons } from '../Icons'
import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

type SessionFormProps = {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const SessionForm: React.FC<SessionFormProps> = ({ setShowForm }) => {
    const [display, setDisplay] = useState(true)

    const closeForm = () => {
        setShowForm(false)
    }

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
            <div className="bg-gray-900 w-96 rounded-lg p-0">
                <div className='flex justify-end h-10 items-center'>
                    <Button customClass="m-4 text-white text-2xl" clearDefault={true} onClick={closeForm}> <Icons.closeX /> </Button>
                </div>
                {display && <LoginForm setDisplay={setDisplay} />}
                {!display && <RegisterForm setDisplay={setDisplay} />}
            </div>
        </div>
    )
}

export default SessionForm