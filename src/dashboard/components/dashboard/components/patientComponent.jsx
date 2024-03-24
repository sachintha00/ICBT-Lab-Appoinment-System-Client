import React, { useState, useEffect } from 'react';
import { HiOutlineDocumentReport } from "react-icons/hi";
import useAuth from '../../../../libs/hooks/UseAuth';
import { getGreetingMessage } from './../../../../libs/helpers/greeting';


function PatientComponent() {
    const { setAuth, auth } = useAuth()
    const [reports, setReports] = useState([]);
    const [appointment, setAppointment] = useState([]);
    const greeting = getGreetingMessage();

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch(`http://localhost:9000/lab_report_upload/get_all_report_details/${auth.userId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${auth.accessToken}`
                    },
                    redirect: "follow"
                });
                if (response.ok) {
                    const result = await response.json();
                    console.log(result)
                    setReports(result);
                } else {
                    console.error('Failed to fetch reports');
                }
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        const fetchAppointments = async () => {
            try {
                const response = await fetch(`http://localhost:9000/user/appointment/get_all_appointment/${auth.userId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${auth.accessToken}`
                    },
                    redirect: "follow"
                });
                if (response.ok) {
                    const result = await response.json();
                    console.log(result)
                    setReports(result);
                    setReportCount(result.length)
                } else {
                    console.error('Failed to fetch reports');
                }
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
        fetchAppointments()
    }, []);

    const openPDFInNewTab = () => {
        const pdfUrl = `D:/Projects/ICBT/ICBT-Lab-Appoinment-System/src/main/resources/reports/1/dummy.pdf`;
        window.open(pdfUrl, '_blank');
    };

    return (
        <div className="m-10 w-full">
            <div className="mb-10 w-4/5">
                <h1 className="text-2xl mb-4 font-semibold capitalize">Hello, {greeting} !!</h1>
                <p className='text-lg font-normal'>
                    The patient dashboard shows your report count and upcoming appointments in a simple table format.</p>
            </div>
            <div>
                <div className='grid grid-cols-3 gap-4 w-4/5'>
                    <div className="flex-grow flex flex-col ml-4 p-10 border border-gray-300 rounded-md">
                        <h1 className='text-4xl font-bold'>{reports.length}</h1>
                        <div className="pt-5 text-base font-semibold leading-7">
                            <p>
                                <a
                                    href="#"
                                    className="text-sky-500 transition-all duration-300 group-hover:font-bold"
                                >
                                    Reports
                                </a>
                            </p>
                        </div>
                        <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:font-bold">
                            <p>
                                Perfect for learning how the framework works
                            </p>
                        </div>
                    </div>

                    <div className="flex-grow flex flex-col ml-4 p-10 border border-gray-300 rounded-md">
                        <h1 className='text-4xl font-bold'>{appointment.length}</h1>
                        <div className="pt-5 text-base font-semibold leading-7">
                            <p>
                                <a
                                    href="#"
                                    className="text-sky-500 transition-all duration-300 group-hover:font-bold"
                                >
                                    Appointments
                                </a>
                            </p>
                        </div>
                        <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:font-bold">
                            <p>
                                Perfect for learning how the framework works
                            </p>
                        </div>
                    </div>

                </div>
                <div className="relative overflow-x-auto w-3/5 mt-10">
                    <div className='mb-5'>
                        <h1 className='text-xl font-semibold'>All Reports</h1>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Appointment ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    User ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Report Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Report
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map(report => (
                                <tr key={report.appointmentId} className="bg-white border-b">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {report.appointmentId}
                                    </td>
                                    <td className="px-6 py-4">{report.userId}</td>
                                    <td className="px-6 py-4">{report.description}</td>
                                    <td className="px-6 py-4"><button onClick={openPDFInNewTab}>view</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}

export default PatientComponent;
