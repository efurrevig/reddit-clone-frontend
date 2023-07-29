'use client'
import Button from "./Button"
import { Icons } from "./Icons"

const ConfirmationModal = ({
    closeModal,
    comment_id,
} : {
    closeModal: () => void,
    comment_id: number,
}) => {
    return (
        <div className="fixed z-20 top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
            <div className="bg-gray-1000 w-96 border border-gray-700">
                <div className='flex justify-between h-10 items-center border-b border-gray-700'>
                    <span className='m-3'> Delete comment </span>
                    <Button 
                        customClass="m-3 text-white text-2xl" 
                        clearDefault={true} 
                        onClick={closeModal}
                    > 
                        <Icons.closeX /> 
                    </Button>
                </div>
                <div className='flex justify-center items-center h-20 border-b border-gray-700'>
                    <span className='text-gray-400'> Are you sure you want to delete this comment? </span>
                </div>
                <div className='flex justify-end items-center'>
                    <Button
                        customClass="m-3 text-white text-sm"
                        clearDefault={true}
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        customClass="m-3 text-white text-sm"
                        clearDefault={true}
                        onClick={() => console.log('delete')}
                    >
                        Delete
                    </Button>
                </div>
            </div>
            
        </div>
    )
}

export default ConfirmationModal