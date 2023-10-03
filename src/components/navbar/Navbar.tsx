'use client'

import React from 'react'
import Link from 'next/link'
import Button from '../Button'
import SessionForm from '../session/SessionForm'
import NavDropdown from './NavDropdown'
import SearchBar from './SearchBar'
import { useSession, signOut } from 'next-auth/react'
import { Icons } from '../Icons'
import { useState } from 'react'
import sessionService from '@/services/sessions'
import ProfileDropdown from '../UserProfile/ProfileDropdown'


const Navbar = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const {data: session} = useSession();


    const showLoginModal = () => {
        setShowLogin(true)
    }

    const handleLogout = async () => {
        try {
          setIsLoading(true)
          await sessionService.logout(session?.user?.accessToken as string)
        } catch (error) {
          console.log(error)
          return
        }
        await signOut({redirect: false})
        setIsLoading(false)
        location.reload()
    }

    return (
        <header className="w-full h-12 bg-gray-900 sticky top-0 inset-x-0 z-[10] flex items-center gap-4 px-3">

            {/* login modal */}
            {showLogin && <SessionForm setShowForm={setShowLogin} />}

            <div className="flex justify-start h-full items-center gap-5 ">
                <Link 
                    href="/" 
                    className="flex gap-2 items-center"
                    prefetch={false}
                >
                    <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6"  />
                    <p className="hidden font-medium md:block">Creddit</p>
                </ Link>
                {session?.user && <NavDropdown />}

                
            </div>


            <div className="flex w-full justify-between items-center">
                <div className='w-full ml-10'>
                    <div className='w-5/6 min-w-search'>
                        <SearchBar />
                    </div>
                </div>
                <div className='flex justify-end items-center'>
                    {session?.user && <Button customClass="m-1 text-white text-2xl" clearDefault={true}> <Icons.bell /> </Button>}
                    {session?.user && 
                        <Link
                            href={'/submit'}
                            className="m-1 text-white text-2xl mr-5"
                            title='Create Post'
                            data-tooltip-style='dark'
                        >
                            <Icons.plus />
                        </Link>      
                    }

                    {session?.user ? (
                      // <Button isLoading={isLoading} onClick={handleLogout} customClass="w-18 h-8 mx-1">
                      //   Logout
                      // </Button>
                      <div className='w-max'>
                        <ProfileDropdown />
                      </div>
                    ) : (
                      <Button onClick={showLoginModal} customClass="w-18 h-8 mx-1">
                        Login
                      </Button>
                    )}
                </div>
            </div>

        </header>
    )
}

export default Navbar