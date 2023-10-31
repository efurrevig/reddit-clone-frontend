type MessageSize = 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl' | 'text-2xl' | 'text-3xl' | 'text-4xl' | 'text-5xl' | 'text-6xl' | 'text-7xl' | 'text-8xl' | 'text-9xl'

const ErrorMessage = (
    params: {
        message: string
        size: MessageSize
        
    }
) => {
    return (
        <span
            className={`text-red-500 break-normal ${params.size} ${params.message == '' ? 'hidden' : ''}`}
        >
            {params.message}
        </span>
    )
}

export default ErrorMessage