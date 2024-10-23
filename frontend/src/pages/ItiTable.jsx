import React, { useState, useCallback, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function ItiTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itis, setItis] = useState([]);  // State to hold the fetched ITIs
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // Function to fetch ITIs from backend using trade IDs
  const fetchITIsByTradeIds = useCallback(async () => {
    const getCookieValue = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const tradeIDs = getCookieValue('tradeIDs');  // Get trade IDs from cookies
    if (!tradeIDs) {
      console.log('No trade IDs found in cookies');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/iti_trade/itis-by-trades/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "trade_ids": tradeIDs }),
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        setItis(data.itis);  // Assuming the entire data is an array of ITIs
      } else {
        console.error('Error fetching ITIs:', data.message);
      }
    } catch (error) {
      console.error('Error in API call:', error);
    }
  }, []);

  // Use effect to fetch ITIs when the component mounts
  useEffect(() => {
    fetchITIsByTradeIds();
  }, [fetchITIsByTradeIds]);

  const filteredITIs = itis.filter(iti =>
    iti.Institution_Name_and_Address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    iti.Taluka?.toLowerCase().includes(searchTerm.toLowerCase())
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
      <Link to="/trade" className="mb-4 flex items-center text-blue-600 hover:text-blue-800">
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
              {['Sr. No.', 'Name and Address', 'Taluka', 'Contact Number', 'ITI Code', 'Trades Offered'].map((header, index) => (
                <th key={index} className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((iti, index) => (
              <tr
                key={iti._id}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = " rgba(0, 0, 0, 0.24) 0px 3px 8px";
                  e.currentTarget.style.backgroundColor = "#675ff4";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                onClick={() => handleRowClick(iti._id)}
                className="cursor-pointer transition-all duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{iti.Institution_Name_and_Address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{iti.Taluka}</td>
                <td className="px-6 py-4 whitespace-nowrap">{iti.Contact_Number}</td>
                <td className="px-6 py-4 whitespace-nowrap">{iti._id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{iti.Trades_Offered.join(', ')}</td>
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

export default ItiTable;
