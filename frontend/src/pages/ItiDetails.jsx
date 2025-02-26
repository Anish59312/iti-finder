import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Map, MapPin, Phone, Building, BookOpen, ArrowLeft } from 'lucide-react';
import { ContactFooter } from '../component/footer';

const BASE_URL = process.env.BACKEND_BASE_URL;

function ItiDetails() {
  const { id } = useParams();
  const [iti, setIti] = useState(null);
  const [tradeNames, setTradeNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchITIById = async () => {
    try {
      const response = await fetch(`${BASE_URL}/iti_trade/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setIti(data);

        if (data.Trades_Offered && data.Trades_Offered.length > 0) {
          fetchTradeNames(data.Trades_Offered);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error fetching ITI details');
      }
    } catch (error) {
      setError('Error in API call');
    } finally {
      setLoading(false);
    }
  };

  const fetchTradeNames = async (tradeCodes) => {
    try {
      const response = await fetch(`${BASE_URL}/trade/get-trade-names`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ noList: tradeCodes }),
      });

      if (response.ok) {
        const data = await response.json();
        setTradeNames(data.tradeNames);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error fetching trade names');
      }
    } catch (error) {
      setError('Error in API call for trade names');
    }
  };

  useEffect(() => {
    fetchITIById();
  }, [id]);

  if (loading) return <div className="text-center text-gray-700">Loading...</div>;
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  return (
    <div className="min-h-screen w-full mx-auto bg-white overflow-hidden">
      <div className="bg-[#675ff4] px-6 py-4 mb-5">
        <h1 className="text-5xl font-bold text-white">{iti.Institution_Name_and_Address}</h1>
        {/* <p className="text-blue-100 mt-1">{id}</p> */}
      </div>

      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-800">Location </h2>
              <MapPin className="h-5 w-5 text-gray-500 mr-2" />
              <span>: {iti.Taluka}</span>
            </div>
            <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-800">Contact Number</h2>
              <Phone className="h-5 w-5 text-gray-500 mr-2" />
              <span>: {iti.Contact_Number}</span>
            </div>
            <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-800">Type</h2>
              <Building className="h-5 w-5 text-gray-500 mr-2" />
              <span>: {iti.Type} ITI</span>
            </div>

          </div>

          <div className="flex items-center justify-center h-full">
            <img
              src="/images/education.svg"
              alt="Education illustration"
              className="h-48 md:h-72 w-auto transform scale-x-[-1]"
            />
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <BookOpen className="h-5 w-5 text-gray-500 mr-2" />
            Courses Offered
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {(tradeNames.length > 0 ? tradeNames : iti.Trades_Offered).map((course, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Add margin to create space above the footer */}
      <div className="mt-8">
        <Link to="/trade" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Trades
        </Link>
        {/* <ContactFooter /> */}
      </div>
    </div>
  );
}

export default ItiDetails;




// Latest stabble code
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';

// function ItiDetails() {
//   const { id } = useParams();
//   const [iti, setIti] = useState(null);
//   const [tradeNames, setTradeNames] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchITIById = async () => {
//     try {
//       const response = await fetch(`http://localhost:5001/iti_trade/${id}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setIti(data);

//         if (data.Trades_Offered && data.Trades_Offered.length > 0) {
//           fetchTradeNames(data.Trades_Offered);
//         }
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || 'Error fetching ITI details');
//       }
//     } catch (error) {
//       setError('Error in API call');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchTradeNames = async (tradeCodes) => {
//     try {
//       const response = await fetch('http://localhost:5001/trade/get-trade-names', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({ noList: tradeCodes }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setTradeNames(data.tradeNames);
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || 'Error fetching trade names');
//       }
//     } catch (error) {
//       setError('Error in API call for trade names');
//     }
//   };

//   useEffect(() => {
//     fetchITIById();
//   }, [id]);

//   if (loading) return <div className="text-center text-gray-700">Loading...</div>;
//   if (error) return <div className="text-red-600 text-center">{error}</div>;

//   return (
//     <div className="container mx-auto p-6">
//       <Link to="/trade" className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 transition duration-200">
//         &larr; Back to Trades
//       </Link>

//       {iti && (
//         <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transition-all duration-200 hover:shadow-xl">
//           <h2 className="text-3xl font-semibold mb-4">{iti.Institution_Name_and_Address}</h2>
//           <p className="text-gray-700"><strong>Location:</strong> {iti.Taluka}</p>
//           <p className="text-gray-700"><strong>Contact Number:</strong> {iti.Contact_Number}</p>
//           <p className="text-gray-700"><strong>Trades Offered:</strong> 
//             {tradeNames.length > 0 
//               ? tradeNames.join(', ') 
//               : iti.Trades_Offered.join(', ')}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ItiDetails;



// Good UI
// import React, { useState, useCallback, useEffect } from 'react';
// import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';

// function ItiTable() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itis, setItis] = useState([]);  // State to hold the fetched ITIs
//   const itemsPerPage = 5;
//   const navigate = useNavigate();

//   // Function to fetch ITIs from backend using trade IDs
//   const fetchITIsByTradeIds = useCallback(async () => {
//     const getCookieValue = (name) => {
//       const value = `; ${document.cookie}`;
//       const parts = value.split(`; ${name}=`);
//       if (parts.length === 2) return parts.pop().split(';').shift();
//     };

//     const tradeIDs = getCookieValue('tradeIDs');  // Get trade IDs from cookies
//     if (!tradeIDs) {
//       console.log('No trade IDs found in cookies');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5001/iti_trade/itis-by-trades/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ "trade_ids": tradeIDs }),
//         credentials: 'include',
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setItis(data);  // Assuming the entire data is an array of ITIs
//       } else {
//         console.error('Error fetching ITIs:', data.message);
//       }
//     } catch (error) {
//       console.error('Error in API call:', error);
//     }
//   }, []);

//   // Use effect to fetch ITIs when the component mounts
//   useEffect(() => {
//     fetchITIsByTradeIds();
//   }, [fetchITIsByTradeIds]);

//   const filteredITIs = itis.filter(iti =>
//     iti.Institution_Name_and_Address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     iti.Taluka?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredITIs.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredITIs.slice(indexOfFirstItem, indexOfLastItem);

//   const handlePageChange = useCallback((pageNumber) => {
//     setCurrentPage(pageNumber);
//   }, []);

//   const handleRowClick = useCallback((id) => {
//     // Pass ITI Code (or _id) as the parameter to the /iti/ route
//     navigate(`/iti/${id}`);
//   }, [navigate]);

//   const handleSearchChange = useCallback((e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   }, []);

//   return (
//     <div className="container mx-auto p-4 overflow-x-auto">
//       <Link to="/trade" className="mb-4 flex items-center text-blue-600 hover:text-blue-800">
//         <ChevronLeft className="mr-2 h-4 w-4" /> Back to Trades
//       </Link>

//       <div className="mb-4 relative">
//         <input
//           type="text"
//           placeholder="Search ITIs..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           className="w-full pl-10 pr-4 py-2 border rounded-md"
//         />
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white mx-2">
//           <thead>
//             <tr>
//               {['Sr. No.', 'Name and Address', 'Taluka', 'Contact Number'].map((header, index) => (
//                 <th key={index} className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((iti, index) => (
//               <tr
//                 key={iti._id}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.boxShadow = " rgba(0, 0, 0, 0.24) 0px 3px 8px";
//                   e.currentTarget.style.backgroundColor = "#675ff4";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.boxShadow = "none";
//                   e.currentTarget.style.backgroundColor = "transparent";
//                 }}
//                 onClick={() => handleRowClick(iti._id)}  // Pass the ITI Code (_id) to the /iti/ route
//                 className="cursor-pointer transition-all duration-200"
//               >
//                 <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{iti.Institution_Name_and_Address}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{iti.Taluka}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{iti.Contact_Number}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex items-center justify-between space-x-2 py-4">
//         <button
//           className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           <ChevronLeft className="h-4 w-4 inline mr-1" />
//           Previous
//         </button>
//         <div className="text-sm text-gray-700">
//           Page {currentPage} of {totalPages}
//         </div>
//         <button
//           className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           Next
//           <ChevronRight className="h-4 w-4 inline ml-1" />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ItiTable;
