import React from 'react';
import { Map, MapPin, Phone, Building, BookOpen, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import {ContactFooter} from '../component/footer'; // Adjusted import path

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

// Mock data for a single ITI
const itiData = {
    code: 'GITI001',
    name: 'Government ITI, Pune',
    district: 'Pune',
    city: 'Pune',
    contactNumber: '020-12345678',
    type: 'Government',
    address: '123 Main St, Shivajinagar, Pune, Maharashtra 411005',
    courses: [
        'Electrician',
        'Fitter',
        'Welder',
        'Mechanic (Motor Vehicle)',
        'Computer Operator and Programming Assistant',
        'Electronics Mechanic',
        'Plumber',
        'Carpenter',
        'Machinist'
    ]
};

export default function ITIDetails() {
    return (
        <div className="min-h-screen w-full mx-auto bg-white overflow-hidden">
            <div className="bg-[#675ff4] px-6 py-4 mb-5">
                <h1 className="text-5xl font-bold text-white">{itiData.name}</h1>
                <p className="text-blue-100 mt-1">{itiData.code}</p>
            </div>

            <div className="px-6 py-4">
                <div className="grid grid-cols-2 gap-2">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                            <span>{itiData.district}</span>
                        </div>
                        <div className="flex items-center">
                            <Map className="h-5 w-5 text-gray-500 mr-2" />
                            <span>{itiData.city}</span>
                        </div>
                        <div className="flex items-center">
                            <Phone className="h-5 w-5 text-gray-500 mr-2" />
                            <span>{itiData.contactNumber}</span>
                        </div>
                        <div className="flex items-center">
                            <Building className="h-5 w-5 text-gray-500 mr-2" />
                            <span>{itiData.type} ITI</span>
                        </div>
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold text-gray-800">Address</h2>
                            <p className="mt-2 text-gray-600">{itiData.address}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center h-full p-auto">
                        <img
                            src='/images/education.svg'
                            alt="Education"
                            className="h-48 md:h-72 w-auto transform scale-x-[-1]" />
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                        <BookOpen className="h-5 w-5 text-gray-500 mr-2" />
                        Courses Offered
                    </h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {itiData.courses.slice(0, 9).map((course, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                {course}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <Link to="/trade" className="mt-4 flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Trades
            </Link>

            <ContactFooter />
        </div>
    );
}