import React, { useState, useEffect } from 'react';
import { HiOutlineDocumentReport } from "react-icons/hi";
import useAuth from '../../../../libs/hooks/UseAuth';
import { getGreetingMessage } from '../../../../libs/helpers/greeting';

function Admin() {
  const { setAuth, auth } = useAuth()
  const [appointment, setAppointment] = useState([]);
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const greeting = getGreetingMessage();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch("http://localhost:9000/user/appointment/get_all_appointment", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${auth.accessToken}`
          },
          redirect: "follow"
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result)
          setAppointment(result);
        } else {
          console.error('Failed to fetch reports');
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    const fetchReports = async () => {
      try {
        const response = await fetch(`http://localhost:9000/lab_report_upload/get_all_report_details`, {
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

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:9000/user/get_all_user`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${auth.accessToken}`
          },
          redirect: "follow"
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result)
          setUsers(result);
        } else {
          console.error('Failed to fetch reports');
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchUser()
    fetchReports()
    fetchAppointment();
  }, []);

  const openPDFInNewTab = () => {
    // Replace 'path_to_your_pdf' with the actual path to your PDF file
    const pdfUrl = `D:/Projects/ICBT/ICBT-Lab-Appoinment-System/src/main/resources/reports/1/dummy.pdf`;
    window.open(pdfUrl, '_blank');
  };
  return (
    <div className="m-10 w-full">
      <div className="mb-10 w-4/5">
        <h1 className="text-2xl mb-4 font-semibold capitalize">Hello, {greeting} !!</h1>
        <p className='text-lg font-normal'>
          The admin dashboard is a centralized hub where administrators can manage various aspects of the system efficiently.</p>
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

          <div className="flex-grow flex flex-col ml-4 p-10 border border-gray-300 rounded-md">
            <h1 className='text-4xl font-bold'>{users.length}</h1>
            <div className="pt-5 text-base font-semibold leading-7">
              <p>
                <a
                  href="#"
                  className="text-sky-500 transition-all duration-300 group-hover:font-bold"
                >
                  Users
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
        <div className="relative overflow-x-auto w-4/5 mt-10">
          <div className='mb-5'>
            <h1 className='text-xl font-semibold'>All Reports</h1>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-300">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Appointment ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Patient ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Patient Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Patient Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Patient Contact No
                </th>
                <th scope="col" className="px-6 py-3">
                  Patient Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Patient DOB
                </th>
                <th scope="col" className="px-6 py-3">
                  Test Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Additional Information
                </th>
              </tr>
            </thead>
            <tbody>
              {appointment.map(appointment => (
                <tr key={appointment.appointmentId} className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {appointment.id}
                  </td>
                  <td className="px-6 py-4">{appointment.userId}</td>
                  <td className="px-6 py-4">{`${appointment.userFirstName} ${appointment.userLastName}`}</td>
                  <td className="px-6 py-4">{appointment.userEmail}</td>
                  <td className="px-6 py-4">{appointment.userContactNumber}</td>
                  <td className="px-6 py-4">{appointment.userAddress}</td>
                  <td className="px-6 py-4">{appointment.userDateOfBirth}</td>
                  <td className="px-6 py-4">{appointment.userProcedureRequest}</td>
                  <td className="px-6 py-4">{appointment.userAdditionalInformation}</td>
                  {/* <td className="px-6 py-4"><button onClick={openPDFInNewTab}>view</button></td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Admin