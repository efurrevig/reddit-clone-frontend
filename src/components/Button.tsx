import React from 'react'
import clsx from 'clsx'

const Button = (
    props: React.ComponentPropsWithoutRef<'button'> & {
        onClick?: () => void,
        clearDefault?: boolean,
        customClass?: string
    }
) => {
    const className = props.clearDefault ? '' : 'bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded'
    return (
        <button
            className={clsx(className, props.customClass)}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}

export default Button