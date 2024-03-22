import React, { useState } from "react";
import 'react-dropdown/style.css';
import { IoIosArrowDown } from "react-icons/io";
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

function Appointment() {

    const [isDropdownShow, setIsDropdownShow] = useState(false)
    const [genderValue, setGenderValue] = useState('')
    const [selectedDate, setDate] = useState(null)

    const handleOptionClick = (value, actions) => {
        setGenderValue(value);
        setIsDropdownShow(false);
    };

    const initialValues = {
        firstName: "",
        lastName: "",
        address: "",
        contactNumber: "",
        emailAddress: "",
        procedureRequest: "",
        additionalInformation: "",

        cardType: "",
        cardHolder: "",
        cardNumber: "",
        expireDate: "",
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

    const handleSubmit = (values, { resetForm }) => {
        let gender = genderValue;
        let birthDate = selectedDate;
        // Handle form submission here
        console.log(values);
        resetForm();
    };

    return (
        <div className="m-10 w-full">
            <div className="mb-10 w-3/4">
                <h1 className="text-xl">Topic</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem perferendis quis in labore illo voluptates suscipit eligendi hic atque nostrum.</p>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="grid grid-flow-col gap-3">
                            <div className="col-span-1">
                                <div className="w-full max-w-lg">
                                    <div className="flex flex-wrap -mx-3 mb-4">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                First Name
                                            </label>
                                            <Field name="firstName" className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                Last Name
                                            </label>
                                            <Field name="lastName" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-4">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                                                Address
                                            </label>
                                            <Field name="address" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="text" placeholder="No street, city." />
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
                                                    className="py-2 px-4 w-[250px] rounded-md border-solid border-gray-300 border-[1px]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mt-6">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                Contact Number
                                            </label>
                                            <Field name="contactNumber" className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="07# ### ####" />
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                Email Address
                                            </label>
                                            <Field name="emailAddress" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="sample@gmail.com" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-4 mt-4">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                                                ProcedureRequest
                                            </label>
                                            <Field name="procedureRequest" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="example@gmail.com" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-4">
                                        <div className="w-full px-3">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                                            <textarea name="additionalInformation" id="message" rows="4" className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 flex">
                                <hr className="w-[1px] bg-gray-200 h-[500px]" />
                                <div className="w-full max-w-lg ml-20">
                                    <div className="flex flex-wrap -mx-3 mb-4">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                Card Type
                                            </label>
                                            <Field name="cardType" className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Visa/Master" />
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                Card Holder Name
                                            </label>
                                            <Field name="cardHolder" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Sachintha Madhawa" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-4">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                                                Card Number
                                            </label>
                                            <Field name="cardNumber" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="text" placeholder="0000 0000 0000 0000" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mt-6">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                Expiration Date
                                            </label>
                                            <Field name="expireDate" className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="00/00" />
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                CVV
                                            </label>
                                            <Field name="cvv" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="000" />
                                        </div>
                                    </div>
                                    <button type="submit" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-64">
                                        Shedule Appointment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Appointment