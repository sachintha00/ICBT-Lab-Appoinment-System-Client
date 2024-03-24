import React from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../../../libs/hooks/UseAuth';
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import { MdLogout } from "react-icons/md";

function SideBar() {
    const { setAuth, auth } = useAuth()
    return (
        <div className="p-2 bg-white w-60 flex flex-col md:flex border-r-[0.5px] border-gray-300" id="sideNav">
            <nav>
                <Link to={'/dashboard'} className=" flex items-center text-black py-2.5 px-4 my-4 rounded transition duration-200 hover:font-bold text-lg" >
                    <MdOutlineDashboard className='mr-2' />Dashboard
                </Link>
                <Link to={'/dashboard/appointment'} className="flex items-center text-black py-2.5 px-4 my-4 rounded transition duration-200 hover:font-bold text-lg" >
                    <FaRegFileAlt className='mr-2' />Appointment
                </Link>
                {
                    auth.userRole === 'TECH' ?
                        (
                            <Link to={'/dashboard/report_section'} className="flex items-center text-black py-2.5 px-4 my-4 rounded transition duration-200 hover:font-bold text-lg" >
                                <TbReportSearch className='mr-2' />Report Section
                            </Link>
                        )
                        : auth.userRole === 'USER' ?
                            (
                                <Link to={'/dashboard/report'} className="flex items-center text-black py-2.5 px-4 my-4 rounded transition duration-200 hover:font-bold text-lg" >
                                    <TbReportSearch className='mr-2' />Reports
                                </Link>
                            )
                            : auth.userRole === 'ADMIN' &&
                            (
                                <Link to={'/dashboard/report'} className="flex items-center text-black py-2.5 px-4 my-4 rounded transition duration-200 hover:font-bold text-lg" >
                                    <TbReportSearch className='mr-2' />Reports
                                </Link>
                            )
                }

                <Link to={'/dashboard/settings'} className="flex items-center text-black py-2.5 px-4 my-4 rounded transition duration-200 hover:font-bold text-lg" >
                    <MdOutlineSettings className='mr-2' />Settings 
                </Link>
            </nav>
            <Link to={'/'} className="flex items-center text-black py-2.5 px-4 my-4 rounded transition duration-200 hover:font-bold text-lg" >
                <MdLogout className='mr-2' />Log Out
            </Link>
            <div className='absolute bottom-0'>
                <div className="bg-gray-300 h-px mt-2" />
                <p className="mb-1 px-5 py-3 text-left text-xs blue-700">Copyright ICBT@2023</p>
            </div>
        </div>
    )
}

export default SideBar