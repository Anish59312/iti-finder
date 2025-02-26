import React, { useState, useEffect } from 'react';
import { ArrowLeft, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

const BASE_URL = process.env.BACKEND_BASE_URL;

// Main component
export default function TradeTable() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [selectedTrades, setSelectedTrades] = useState([]);
  const [trades, setTrades] = useState([]); // State to hold fetched trades
  const itemsPerPage = 15;
  const location = useLocation();

  // Fetch trades data when the component mounts
  useEffect(() => {
    const fetchTrades = async () => {
      const { selectedInterests } = location.state || {}; 
      try {
        const response = await fetch(`${BASE_URL}/trade/recommend`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            InterestIds: selectedInterests,
          }),
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTrades(data); // Set the fetched trades
      } catch (error) {
        console.error('Error fetching trades:', error);
      }
    };    

    fetchTrades();
  }, []); // Empty dependency array means this runs once when the component mounts

  const totalPages = Math.ceil(trades.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = trades.slice(indexOfFirstItem, indexOfLastItem);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const { selectedInterests } = location.state || {}; 
    console.log('Selected Trades:', selectedTrades);
    console.log('Selected Interests:',selectedInterests)
    const tradeIDs = selectedTrades.join(',');
    document.cookie = `tradeIDs=${tradeIDs};path=/;`;

    try {
      const response = await fetch(`${BASE_URL}http://localhost:5001/InterestTrade/insert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          InterestIds: selectedInterests,
          TradesSelected : selectedTrades,
        }),
        credentials: 'include'
      });

      if (response.ok) {
        navigate('/iti')
      } else {
        alert('Error submitting the form');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      <Link to="/interest" className="mb-4 flex items-center text-blue-600 hover:text-blue-800">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to What do you like?
      </Link>

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
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trade ID</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trade Name</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Info</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trade Code</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trade Type</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Minimum Qualification</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">NSQF Level</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((trade) => (
              <tr key={trade.no}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedTrades.includes(trade.no)}
                    onChange={() => handleCheckboxChange(trade.no)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{trade.no}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trade.tradeName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => openModal(trade)} className="text-blue-600 hover:text-blue-800">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">More info about {trade.tradeName}</span>
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{trade.tradeCode}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trade.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trade.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trade.minimumEducationalQualification}</td>
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
            <h2 className="text-xl font-bold mb-4">{selectedTrade.tradeName}</h2>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">Duration:</span>
                <span>{selectedTrade.duration}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">Minimum Qualification:</span>
                <span>{selectedTrade.minimumEducationalQualification}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">NSQF Level:</span>
                <span>{selectedTrade.nsqfLevel}</span>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="mt-4 px-4 py-2 border rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Submit Selected Trades
        </button>
      </form>
    </div>
  );
}
