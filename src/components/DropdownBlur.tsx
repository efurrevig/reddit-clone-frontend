'use client'
import { useEffect } from 'react'

const DropdownBlur = (
    props: {
        children: React.ReactNode,
        setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>,
        targetRef: React.RefObject<HTMLDivElement>
}) => {
    const dropdownRef = props.targetRef
    
    const handleClickOutsideDropdown = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            props.setShowDropdown(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideDropdown)
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDropdown)
        }
    }, [])

    return (
        <div className='w-full h-full flex items-center'>
            {props.children}
        </div>
    )
}

export default DropdownBlur