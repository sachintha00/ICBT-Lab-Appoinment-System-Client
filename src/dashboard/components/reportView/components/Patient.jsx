import React, { useEffect, useState } from 'react'
import useAuth from '../../../../libs/hooks/UseAuth';

function Patient() {
    const { setAuth, auth } = useAuth()
    const [reports, setReports] = useState([]);
    const [reportCount, setReportCount] = useState(0);

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
                    setReportCount(result.length)
                } else {
                    console.error('Failed to fetch reports');
                }
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, []);

    const openPDFInNewTab = () => {
        // Replace 'path_to_your_pdf' with the actual path to your PDF file
        const pdfUrl = `D:/Projects/ICBT/ICBT-Lab-Appoinment-System/src/main/resources/reports/1/dummy.pdf`;
        window.open(pdfUrl, '_blank');
    };
    return (
        <div className="m-10 w-full">
            <div className="mb-16 w-4/5">
                <h1 className="text-2xl mb-4 font-semibold">Report Section</h1>
                <p className='text-lg'>The report section shows a list of your reports organized by your name in a table format. You can easily find and review your reports here.</p>
            </div>
            <div >
                <div className="relative overflow-x-auto w-3/5 mt-10">
                    <div className='mb-5 flex justify-between'>
                        <h1 className='text-xl font-semibold'>All Reports</h1>
                        <form className="flex items-center max-w-sm">
                            <label htmlFor="simple-search" className="sr-only">
                                Search
                            </label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 18 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="simple-search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full ps-10 p-2.5  "
                                    placeholder="Search branch name..."
                                    required=""
                                />
                            </div>
                            <button
                                type="submit"
                                className="p-2.5 ms-2 text-sm font-medium text-white bg-black rounded-lg border hover:bg-gray-800 focus:ring-4 focus:outline-none "
                            >
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </form>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-300">
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
    )
}

export default Patient