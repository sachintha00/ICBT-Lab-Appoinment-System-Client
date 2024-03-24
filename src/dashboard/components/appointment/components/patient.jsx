import React, { useEffect, useState } from "react";
import 'react-dropdown/style.css';
import { IoIosArrowDown } from "react-icons/io";
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import useAuth from "../../../../libs/hooks/UseAuth";

function Patient() {
    const { setAuth, auth } = useAuth()
    const [isDropdownShow, setIsDropdownShow] = useState(false)
    const [genderValue, setGenderValue] = useState('')
    const [selectedDate, setDate] = useState(null)
    const [user, setUser] = useState({})
    const [userBankDetails, setUserBankDetails] = useState({})
    const [isDeposit, setDeposit] = useState(true)

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://localhost:9000/user/get_user/${auth.userId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${auth.accessToken}`
                    },
                    redirect: "follow"
                });
                if (response.ok) {
                    const result = await response.json();
                    setUser(result);
                } else {
                    console.error('Failed to fetch user details');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        const fetchUserBankDetails = async () => {
            try {
                const response = await fetch(`http://localhost:9000/bank-details/${auth.userId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${auth.accessToken}`
                    },
                    redirect: "follow"
                });
                if (response.ok) {
                    const result = await response.json();
                    setUserBankDetails(result || {
                        cardType: "",
                        cardHolder: "",
                        cardNumber: "",
                        expireDate: "",
                        expireYear: "",
                        cvv: "",
                    });
                } else {
                    console.error('Failed to fetch bank details');
                }
            } catch (error) {
                console.error('Error fetching bank details:', error);
            }
        };

        fetchUserDetails();
        fetchUserBankDetails();
    }, [auth.userId, auth.accessToken]);

    const handleOptionClick = (value, actions) => {
        setGenderValue(value);
        setIsDropdownShow(false);
    };

    const initialValues = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        address: "",
        contactNumber: user.mobileNumber || "",
        emailAddress: user.email || "",
        procedureRequest: "",
        additionalInformation: "",

        cardType: userBankDetails.userBankCardType || "",
        cardHolder: userBankDetails.userBankCardHolderName || "",
        cardNumber: userBankDetails.userBankCardNumber || "",
        expireDate: `${userBankDetails.userBankCardExpireMonth} / ${userBankDetails.userBankCardExpireMonth}` || "",
        expireYear: userBankDetails.userBankCardExpireYear,
        cvv: "",
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        address: Yup.string().required("Address is required"),
        contactNumber: Yup.string().required("Contact Number is required"),
        emailAddress: Yup.string().email("Invalid email").required("Email Address is required"),
        procedureRequest: Yup.string().required("Procedure Request is required"),
        additionalInformation: Yup.string(),

        cardType: Yup.string().required("Card Type is required"),
        cardHolder: Yup.string().required("Card Holder name is required"),
        cardNumber: Yup.string()
            .required("Card Number is required")
            .matches(/^\d{16}$/, "Invalid card number"),
        expireDate: Yup.string()
            .required("Expiration Date is required")
            .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiration date"),
        cvv: Yup.string()
            .required("CVV is required")
            .matches(/^\d{3,4}$/, "Invalid CVV"),
    });

    const handleSubmit = async (values, actions) => {
        const { name, value } = e.target;
        let gender = genderValue;
        const date = new Date(selectedDate);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        const birthDate = `${year}-${month}-${day}`;

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.accessToken}`,
                "X-API-Key": "{{token}}"
            },
            body: JSON.stringify({
                userId: 1,
                userFirstName: values.firstName,
                userLastName: values.lastName,
                userDateOfBirth: birthDate,
                userGender: gender,
                userContactNumber: values.contactNumber,
                userEmail: values.emailAddress,
                userAddress: values.address,
                userProcedureRequest: values.procedureRequest,
                userAdditionalInformation: values.additionalInformation,
            })
        };

        try {
            const response = await fetch("http://localhost:9000/user/appointment/schedule", requestOptions);
            const data = await response.json();
            toast.success(`${data.message}`)
        } catch (error) {
            toast.error(`${data.message}`)
        }

        actions.setSubmitting(false);
    };

    return (
        <div className="m-10 w-full">
            <Toaster />
            <div className="mb-16 w-3/4">
                <h1 className="text-2xl mb-4 font-semibold">Schedule Appointment</h1>
                <p className='text-lg font-normal'>The appointment section simply lists your upcoming medical appointments, including the date and time, so you can easily keep track of your scheduled visits.</p>
            </div>
            <Formik
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="grid grid-flow-col gap-3">
                            <div className="col-span-1">
                                <p className="text-md italic text-gray-500 mb-10"><span className="font-bold">Please note:</span> There is an additional fee of Rs 300 for scheduling appointments.</p>
                                <div className="w-full max-w-lg">
                                    <div className="flex flex-wrap -mx-3 mb-4">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                First Name
                                            </label>
                                            <Field name="firstName" className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
                                            {errors.firstName && touched.firstName && <div className="text-red-500">{errors.firstName}</div>}
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                Last Name
                                            </label>
                                            <Field name="lastName" className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
                                            {errors.lastName && touched.lastName && <div className="text-red-500">{errors.lastName}</div>}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-4">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                                                Address
                                            </label>
                                            <Field name="address" className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="text" placeholder="No street, city." />
                                            {errors.address && touched.address && <div className="text-red-500">{errors.address}</div>}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-4">
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                                Gender
                                            </label>
                                            <div className="relative">
                                                <div
                                                    onClick={() => setIsDropdownShow(!isDropdownShow)}
                                                    className="border-solid border-gray-300 border-[1px] px-5 py-2 rounded cursor-pointer font-medium flex justify-between capitalize">
                                                    {genderValue === '' ? "select" : genderValue}
                                                    <IoIosArrowDown />
                                                </div>
                                                <div className={`rounded border-gray-300 border-[0.5px] bg-white px-2 absolute w-full ${isDropdownShow ? "" : "hidden"}`}>
                                                    <div onClick={() => handleOptionClick("male")} className="cursor-pointer hover:bg-gray-300 p-2">Male</div>
                                                    <div onClick={() => handleOptionClick("female")} className="cursor-pointer hover:bg-gray-300 p-2">Female</div>
                                                    <div onClick={() => handleOptionClick("other")} className="cursor-pointer hover:bg-gray-300 p-2">Other</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                                Date of Birth
                                            </label>
                                            <div className="relative">
                                                <Datepicker
                                                    selected={selectedDate}
                                                    onChange={date => setDate(date)}
                                                    className="py-2 px-4 w-[240px] rounded-md border-solid border-gray-300 border-[1px]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mt-6">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                Contact Number
                                            </label>
                                            <Field name="contactNumber" className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="07# ### ####" />
                                            {errors.contactNumber && touched.contactNumber && <div className="text-red-500">{errors.contactNumber}</div>}
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                Email Address
                                            </label>
                                            <Field name="emailAddress" className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="sample@gmail.com" />
                                            {errors.emailAddress && touched.emailAddress && <div className="text-red-500">{errors.emailAddress}</div>}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-4 mt-4">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                                                Report type
                                            </label>
                                            <Field name="procedureRequest" className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="example@gmail.com" />
                                            {errors.procedureRequest && touched.procedureRequest && <div className="text-red-500">{errors.procedureRequest}</div>}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-4">
                                        <div className="w-full px-3">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                                            <Field name="additionalInformation" id="message" rows="4" className="resize-none block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500 " placeholder="Write your thoughts here..."></Field>
                                            {errors.additionalInformation && touched.additionalInformation && <div className="text-red-500">{errors.additionalInformation}</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 flex ml-10">
                                <hr className="w-[0.5px] h-[500px] bg-gray-300" />
                                <div className="w-full max-w-lg ml-16">
                                    <div className=" md:flex md:items-center md:-mx-2 mb-10">
                                        <button className={`flex justify-center w-full px-6 py-3 ${isDeposit ? "text-white bg-black" : "text-black border border-black"} rounded-md md:w-auto md:mx-2 focus:outline-none`} onClick={(e) => setDeposit(true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span className="mx-2">
                                                Bank Card
                                            </span>
                                        </button>
                                        <button className={`flex justify-center w-full px-6 py-3 mt-4 ${!isDeposit ? "text-white bg-black" : "text-black border border-black"} rounded-md md:mt-0 md:w-auto md:mx-2 dark:border-gray-800 dark:text-gray-800 focus:outline-none`} onClick={(e) => setDeposit(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span className="mx-2">
                                                Bank Deposit
                                            </span>
                                        </button>
                                    </div>

                                    {isDeposit ?
                                        (<div>
                                            <div className="flex flex-wrap -mx-3 mb-4">
                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                        Card Type
                                                    </label>
                                                    <Field name="cardType" className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Visa/Master" />
                                                    {errors.cardType && touched.cardType && <div className="text-red-500">{errors.cardType}</div>}
                                                </div>
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                        Card Holder Name
                                                    </label>
                                                    <Field name="cardHolder" className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Sachintha Madhawa" />
                                                    {errors.cardHolder && touched.cardHolder && <div className="text-red-500">{errors.cardHolder}</div>}
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -mx-3 mb-4">
                                                <div className="w-full px-3">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                                                        Card Number
                                                    </label>
                                                    <Field name="cardNumber" className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="text" placeholder="0000 0000 0000 0000" />
                                                    {errors.cardNumber && touched.cardNumber && <div className="text-red-500">{errors.cardNumber}</div>}
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -mx-3 mt-6">
                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                        Expiration Date
                                                    </label>
                                                    <Field name="expireDate" className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="00/00" />
                                                    {errors.expireDate && touched.expireDate && <div className="text-red-500">{errors.expireDate}</div>}
                                                </div>
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                        Expiration Year
                                                    </label>
                                                    <Field name="expireYear" className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="2000" />
                                                    {errors.expireYear && touched.expireYear && <div className="text-red-500">{errors.expireYear}</div>}
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -mx-3 mt-6">
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                        CVV
                                                    </label>
                                                    <Field name="cvv" className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="000" />
                                                    {errors.cvv && touched.cvv && <div className="text-red-500">{errors.cvv}</div>}
                                                </div>
                                            </div>
                                        </div>)
                                        :
                                        <div className="">
                                            <div className=" border border-yellow-800 p-3 rounded-md bg-yellow-700/25">
                                                <p>⚠️ Your order will be processed once we receive the funds.</p>
                                            </div>
                                            <div className="mt-10">
                                                <h1 className="text-3xl font-bold">Bank account</h1>
                                                <h3 className="text-lg mt-2">Please transfer the payment to the bank account details shown below.</h3>
                                                <div className="flex flex-col w-[200px] mt-6">
                                                    <div className="flex justify-between">
                                                        <h1 className="text-lg font-semibold text-gray-800">Bank:</h1>
                                                        <p className="font-bold">Mastercredit</p>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h1 className="text-lg font-semibold text-gray-800">Account number:</h1>
                                                        <p className="font-bold">123456789</p>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h1 className="text-lg font-semibold text-gray-800">Routing number:</h1>
                                                        <p className="font-bold">987654321</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-10">
                                                <p className="text-red-600 font-normal text-lg italic"><span className="font-bold">*Notice </span>After completing the payment, please send us your billing slip</p>
                                                <div className="w-[220px] text-gray-800 italic mt-6">
                                                    <div className="flex justify-between ">
                                                        <p className="font-bold">Whatsapp Number: </p>
                                                        <p>+(94)70 187 1192</p>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <p className="font-bold">Email Address: </p>
                                                        <p>abc@gmail.com</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>

                            {isDeposit ? (<div className="col-span-4 flex">
                                <div className="w-96 h-56 bg-gray-900 rounded-xl relative text-white shadow-2xl transition-transform transform">
                                    {/* <img
                                        className="relative object-cover w-full h-full rounded-xl"
                                        src="https://i.imgur.com/kGkSg1v.png"
                                    /> */}
                                    <div className="w-full px-8 absolute top-8">
                                        <div className="flex justify-between">
                                            <div className="">
                                                <p className="font-light">Name</p>
                                                <p className="font-medium tracking-widest">Sachintha Madhawa</p>
                                            </div>
                                            <img className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" />
                                        </div>
                                        <div className="pt-1">
                                            <p className="font-light">Card Number</p>
                                            <p className="font-medium tracking-more-wider">4642 3489 9867 7632</p>
                                        </div>
                                        <div className="pt-6 pr-6">
                                            <div className="flex justify-between">
                                                <div className="">
                                                    <p className="font-light text-xs">Valid</p>
                                                    <p className="font-medium tracking-wider text-sm">11/15</p>
                                                </div>
                                                <div className="">
                                                    <p className="font-light text-xs">Expiry</p>
                                                    <p className="font-medium tracking-wider text-sm">03/25</p>
                                                </div>
                                                <div className="">
                                                    <p className="font-light text-xs">CVV</p>
                                                    <p className="font-bold tracking-more-wider text-sm">···</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-24">
                                            <div className="mb-2">
                                                <p className="text-md italic text-gray-700"><span className="font-bold">Please note:</span> There is an additional fee of Rs 300 for scheduling appointments.</p>
                                                <div className="flex justify-between items-center mt-2">
                                                    <h1>Total:</h1>
                                                    <h1 className="text-xl font-bold">Rs.300</h1>
                                                </div>
                                            </div>
                                            <button type="submit" className=" bg-black font-semibold text-white py-2 px-4 border hover:bg-gray-800 hover:border-transparent rounded w-64">
                                                Schedule Appointment
                                            </button>
                                        </div>
                                    </div>

                                </div>

                            </div>) :
                                (<div className="col-span-4 flex">
                                    <div className="w-96 h-56 bg-white rounded-xl relative text-white">
                                        <div className="w-full px-8 absolute top-8">
                                            <div className="pt-6 pr-6">

                                            </div>
                                        </div>

                                    </div>

                                </div>)}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Patient