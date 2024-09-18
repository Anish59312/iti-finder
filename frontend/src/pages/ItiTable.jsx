import React, { useState, useCallback } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useColorModes } from '@coreui/react';


// Mock data for the table
const itis = [
  { id: 1, name: 'Government ITI, Pune', address: '123 Main St, Pune', taluka: 'Haveli', city: 'Pune', contactNumber: '020-12345678', itiCode: 'GITI001', itiType: 'Government' },
  { id: 2, name: 'Private ITI, Mumbai', address: '456 Park Ave, Mumbai', taluka: 'Andheri', city: 'Mumbai', contactNumber: '022-87654321', itiCode: 'PITI001', itiType: 'Private' },
  { id: 3, name: 'Government ITI, Nagpur', address: '789 Central Rd, Nagpur', taluka: 'Nagpur City', city: 'Nagpur', contactNumber: '0712-23456789', itiCode: 'GITI002', itiType: 'Government' },
  { id: 4, name: 'Private ITI, Nashik', address: '321 Grape St, Nashik', taluka: 'Nashik', city: 'Nashik', contactNumber: '0253-98765432', itiCode: 'PITI002', itiType: 'Private' },
  { id: 5, name: 'Government ITI, Aurangabad', address: '654 History Ln, Aurangabad', taluka: 'Aurangabad', city: 'Aurangabad', contactNumber: '0240-34567890', itiCode: 'GITI003', itiType: 'Government' },
];

function ItiTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const filteredITIs = itis.filter(iti =>
    iti.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    iti.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredITIs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredITIs.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleRowClick = useCallback((id) => {
    navigate(`/iti/${id}`);
  }, [navigate]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  return (
    <div className="container mx-auto p-4 overflow-x-auto">
      <Link to="/" className="mb-4 flex items-center text-blue-600 hover:text-blue-800">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Trades
      </Link>

      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search ITIs..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 border rounded-md"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white mx-2">
          <thead>
            <tr>
              {['Sr. No.', 'Name', 'Address', 'Taluka', 'City', 'Contact Number', 'ITI Code', 'ITI Type'].map((header, index) => (
                <th key={index} className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <span className="group relative">
                    {header}
                    <span className="absolute hidden group-hover:block bg-gray-800 min-w-64 text-white text-xs rounded p-2 z-10">
                      {getTooltipContent(header)}
                    </span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((iti) => (
              <tr
                key={iti.id}
                onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = " rgba(0, 0, 0, 0.24) 0px 3px 8px";
                    e.currentTarget.style.backgroundColor = "#675ff4";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                
                onClick={() => handleRowClick(iti.id)}
                className="cursor-pointer transition-all duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">{iti.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{iti.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{iti.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{iti.taluka}</td>
                <td className="px-6 py-4 whitespace-nowrap">{iti.city}</td>
                <td className="px-6 py-4 whitespace-nowrap">{iti.contactNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{iti.itiCode}</td>
                <td className="px-6 py-4 whitespace-nowrap">{iti.itiType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <button
          className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 inline mr-1" />
          Previous
        </button>
        <div className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </div>
        <button
          className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4 inline ml-1" />
        </button>
      </div>
    </div>
  );
}

function getTooltipContent(header) {
  switch (header) {
    case 'Sr. No.':
      return 'Unique identifier for the ITI';
    case 'Name':
      return 'Full name of the ITI';
    case 'Address':
      return 'Physical location of the ITI';
    case 'Taluka':
      return 'Administrative subdivision where the ITI is located';
    case 'City':
      return 'City where the ITI is situated';
    case 'Contact Number':
      return 'Phone number to reach the ITI';
    case 'ITI Code':
      return 'Unique code assigned to the ITI';
    case 'ITI Type':
      return 'Whether the ITI is Government or Private';
    default:
      return '';
  }
}


export default ItiTable;