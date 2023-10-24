'use client'

import { useState } from 'react';
import ProfileSettings from './ProfileSettings';
//todo add other settings
//todo border color match other color idk
const UserSettings = () => {
    const [settingTab, setSettingTab] = useState<string>('profile')
    const tabs: string[] = [
        'Profile',
        'Account (TBA)',
        'Messages (TBA)',
        'Notifications (TBA)',
    ]

    const handleTabChange = (tab: string) => {
        setSettingTab(tab)
    }

    return (
        <div className='flex justify-center w-screen h-screen bg-gray-900'>
            <div className= 'flex flex-col w-4/6 bg-gray-900 p-4 gap-5'>
                <h1 className='font-medium'>User Settings</h1>
                <div className='flex gap-4 w-full border-b border-gray-600'>
                    {tabs.map((tab) => {
                        return (
                            <div 
                                key={tab}
                                className={`relative flex justify center items-center p-2 hover:cursor-pointer ${settingTab === tab.toLowerCase() ? 'border-b-2 border-cyan-700' : 'border-b-2 border-transparent'}`}
                                onClick={() => handleTabChange(tab.toLowerCase())}
                            >
                                <span className={`${settingTab === tab.toLowerCase() ? '' : 'text-gray-400'}`}>
                                    {tab}
                                </span>
                            </div>
                        )
                        })}
                </div>
                {settingTab === 'profile' && (
                    <ProfileSettings />
                )}
            </div>
        </div>
    )
}

export default UserSettings

