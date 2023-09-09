import React from 'react'
import clsx from 'clsx'
import Spinner from './Spinner'

const Button = (
    props: React.ComponentPropsWithoutRef<'button'> & {
        onClick?: () => void,
        clearDefault?: boolean,
        customClass?: string,
        isLoading?: boolean,
        disabled?: boolean,
    }
) => {
    const isLoading = props.isLoading
    const className = props.clearDefault ? '' 
        : 'bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-3xl flex justify-center items-center gap-2 hover:cursor-pointer disabled:cursor-not-allowed'
    return (
        <button
            className={clsx(className, props.customClass)}
            onClick={props.onClick}
            disabled={isLoading || props.disabled}
        >
            {/* {isLoading && <Spinner />} */}
            {props.children}
        </button>
    )
}

export default Button