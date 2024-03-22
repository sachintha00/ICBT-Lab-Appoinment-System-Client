import React from 'react'
import Dashboard from './../dashboard/index';
import { Link } from 'react-router-dom';

function SideBar() {
    return (
        <div className="p-2 bg-white w-60 flex flex-col md:flex border-r-[0.5px] border-gray-300" id="sideNav">
            <nav>
                <Link to={'/dashboard'} className="block text-blacks py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-black hover:text-white" >
                    <i className="fas fa-home mr-2" />Dashboard
                </Link>
                <Link to={'/dashboard/appointment'} className="block text-blacks py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-black hover:text-white" >
                    <i className="fas fa-file-alt mr-2" />Appointment
                </Link>
                <Link to={'/dashboard/settings'} className="block text-blacks py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-black hover:text-white" >
                    <i className="fas fa-users mr-2" />Settings
                </Link>
            </nav>
            <Link to={''} className="block text-blacks py-2.5 px-4 my-2 rounded transition duration-200 hover:bg-black hover:text-white mt-auto" >
                <i className="fas fa-sign-out-alt mr-2" />Log Out
            </Link>
            <div className="bg-gray-300 h-px mt-2" />
            <p className="mb-1 px-5 py-3 text-left text-xs black">Copyright ICBT@2023</p>
        </div>
    )
}

export default SideBar