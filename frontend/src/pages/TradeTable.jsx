import React, { useState } from 'react';
import { ArrowLeft, Search, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for the table
const trades = [
  { id: 1, name: 'Electrician', code: 'ELC101', type: 'Technical', duration: '2 years', minQualification: '10th Pass', language: 'English', nsqfLevel: 4 },
  { id: 2, name: 'Plumber', code: 'PLB102', type: 'Technical', duration: '1 year', minQualification: '8th Pass', language: 'English', nsqfLevel: 3 },
  { id: 3, name: 'Welder', code: 'WLD103', type: 'Technical', duration: '1 year', minQualification: '10th Pass', language: 'English', nsqfLevel: 4 },
  { id: 4, name: 'Carpenter', code: 'CRP104', type: 'Technical', duration: '1 year', minQualification: '8th Pass', language: 'English', nsqfLevel: 3 },
  { id: 5, name: 'Mechanic', code: 'MEC105', type: 'Technical', duration: '2 years', minQualification: '10th Pass', language: 'English', nsqfLevel: 4 },
  // Add more mock data as needed
];

export default function TradeTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [selectedTrades, setSelectedTrades] = useState([]);
  const itemsPerPage = 5;

  const filteredTrades = trades.filter(trade =>
    trade.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTrades.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTrades.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (trade) => {
    setSelectedTrade(trade);
    setModalOpen(true);
  };

  const handleCheckboxChange = (tradeId) => {
    setSelectedTrades(prevSelected => 
      prevSelected.includes(tradeId)
        ? prevSelected.filter(id => id !== tradeId)
        : [...prevSelected, tradeId]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Selected Trades:', selectedTrades);
    const tradeIDs = selectedTrades.join(',');

    console.log("hello")
    document.cookie = `tradeIDs=${tradeIDs};path=/;`;
    console.log("world")

    window.location.href = "http://localhost:3000/iti";
  };

  return (
    <div className="container mx-auto p-4 ">
      <Link to="/interest" className="mb-4 flex items-center text-blue-600 hover:text-blue-800">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to What do you like?
      </Link>

      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search trades..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-md"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    
      <div className='overflow-x-auto'>
        <table className="bg-white min-w-full">
            <thead>
            <tr>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <span className="group relative">
                    Select
                    <span className="absolute hidden min-w-64 group-hover:block bg-gray-800 text-white text-xs rounded p-2">
                    Select the trade
                    </span>
                </span>
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <span className="group relative">
                    Trade ID
                    <span className="absolute hidden min-w-64 group-hover:block bg-gray-800 text-white text-xs rounded p-2">
                    Unique identifier for the trade
                    </span>
                </span>
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <span className="group relative">
                    Trade Name
                    <span className="absolute hidden min-w-64 group-hover:block bg-gray-800 text-white text-xs rounded p-2 ">
                    Name of the trade
                    </span>
                </span>
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <span className="group relative">
                    Info
                    <span className="absolute hidden  min-w-64 group-hover:block bg-gray-800 text-white text-xs rounded p-2 ">
                    Click for more information
                    </span>
                </span>
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <span className="group relative">
                    Trade Code
                    <span className="absolute hidden  min-w-64 group-hover:block bg-gray-800 text-white text-xs rounded p-2 ">
                    Unique code for the trade
                    </span>
                </span>
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <span className="group relative">
                    Trade Type
                    <span className="absolute hidden min-w-64 group-hover:block bg-gray-800 text-white text-xs rounded p-2">
                    Category of the trade
                    </span>
                </span>
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <span className="group relative">
                    Duration
                    <span className="absolute hidden min-w-64 group-hover:block bg-gray-800 text-white text-xs rounded p-2">
                    Time to complete the trade
                    </span>
                </span>
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <span className="group relative">
                    Minimum Qualification
                    <span className="absolute hidden min-w-64 group-hover:block bg-gray-800 text-white text-xs rounded p-2 ">
                    Qualification at the time of taking admission
                    </span>
                </span>
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <span className="group relative">
                    Language
                    <span className="absolute hidden min-w-64 group-hover:block bg-gray-800 text-white text-xs rounded p-2 -mt-8">
                    Official language of teaching
                    </span>
                </span>
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <span className="group relative">
                    NSQF level
                    <span className="absolute hidden min-w-64 group-hover:block bg-gray-800 text-white text-xs rounded -left-64 p-2 -mt-8">
                        NSQF (National Skills Qualifications Framework) Level <a href="https://www.nqr.gov.in/level-descriptors" className='text-cyan-500'>(*)</a>
                    </span>
                </span>
                </th>
            </tr>
            </thead>
            <tbody>
            {currentItems.map((trade) => (
                <tr key={trade.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                    <input
                    type="checkbox"
                    checked={selectedTrades.includes(trade.id)}
                    onChange={() => handleCheckboxChange(trade.id)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                    />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{trade.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trade.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => openModal(trade)} className="text-blue-600 hover:text-blue-800">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">More info about {trade.name}</span>
                    </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{trade.code}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trade.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trade.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trade.minQualification}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trade.language}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trade.nsqfLevel}</td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <button
          className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
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
          className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4 inline ml-1" />
        </button>
      </div>

      {modalOpen && selectedTrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">{selectedTrade.name}</h2>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">Duration:</span>
                <span>{selectedTrade.duration}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">Minimum Qualification:</span>
                <span>{selectedTrade.minQualification}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">Language:</span>
                <span>{selectedTrade.language}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">NSQF Level:</span>
                <span>{selectedTrade.nsqfLevel}</span>
              </div>
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="mt-8 text-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Submit Trade
        </button>
      </div>
    </div>
  );
}