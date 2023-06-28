import React from 'react'
import clsx from 'clsx'

const Button = (
    props: React.ComponentPropsWithoutRef<'button'> & {
        onClick?: () => void,
        customClass?: boolean
    }
) => {
    const className = props.customClass ? '' : 'bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded'
    const { ...rest } = props
    return (
        <button
            className={clsx(className, {...rest})}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}

export default Button