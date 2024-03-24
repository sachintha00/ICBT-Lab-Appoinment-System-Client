import React from 'react'
import Logo from '../../../libs/constants/logo'

function TopBar() {
    return (
        <div className="bg-white text-white w-full flex items-center justify-between border border-b-[0.5px] border-gray-300">
            <div className="flex justify-center">
                <Logo />
                <h2 className="font-bold text-2xl text-black mt-[20px] relative -left-5 ">ABC Lab Appointment System</h2>
            </div>
            <div className="space-x-5">
                <button>
                    <i className="fas fa-bell text-gray-500 text-lg" />
                </button>
                <button>
                    <i className="fas fa-user text-gray-500 text-lg" />
                </button>
            </div>
        </div>
    )
}

export default TopBar