import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const interests = [
  {
    "title": "Mechanical Interest",
    "Roles": [
      "Fitter",
      "Turner",
      "Machinist",
      "Mechanic (Motor Vehicle)",
      "Mechanic Diesel",
      "Draughtsman (Mechanical)",
      "Tool and Die Maker"
    ]
  },
  {
    "title": "Electrical and Electronics Interest",
    "Roles": [
      "Electrician",
      "Wireman",
      "Electronics Mechanic",
      "Mechanic Consumer Electronics",
      "Electrical Maintenance",
      "Instrument Mechanic",
      "Refrigeration and Air Conditioning Technician"
    ]
  },
  {
    "title": "Civil and Architectural Interest",
    "Roles": [
      "Surveyor",
      "Draughtsman (Civil)",
      "Interior Design and Decoration",
      "Plumber"
    ]
  },
  {
    "title": "Information Technology and Computers Interest",
    "Roles": [
      "Computer Operator and Programming Assistant (COPA)",
      "Information and Communication Technology System Maintenance (ICTSM)",
      "Desktop Publishing Operator",
      "Web Designing and Multimedia",
      "Software Development",
      "Database Management"
    ]
  },
  {
    "title": "Chemical and Laboratory Interest",
    "Roles": [
      "Laboratory Assistant (Chemical Plant)",
      "Attendant Operator (Chemical Plant)",
      "Instrument Mechanic (Chemical Plant)",
      "Plastic Processing Operator"
    ]
  },
  {
    "title": "Automobile Interest",
    "Roles": [
      "Mechanic Motor Vehicle",
      "Mechanic Diesel",
      "Mechanic (Tractor)",
      "Mechanic Auto Electrical and Electronics"
    ]
  },
  {
    "title": "Textile and Fashion Interest",
    "Roles": [
      "Fashion Design Technology",
      "Sewing Technology",
      "Dressmaking",
      "Surface Ornamentation Techniques (Embroidery)",
      "Textile Technology (Spinning/Weaving/Knitting)"
    ]
  },
  {
    "title": "Agriculture and Rural Development Interest",
    "Roles": [
      "Agriculture Machinery Mechanic",
      "Horticulture",
      "Poultry Farming",
      "Agro-Processing"
    ]
  },
  {
    "title": "Construction and Woodworking Interest",
    "Roles": [
      "Carpenter",
      "Mason (Building Constructor)",
      "Furniture and Cabinet Maker",
      "Construction Equipment Mechanic"
    ]
  },
  {
    "title": "Healthcare and Beauty Interest",
    "Roles": [
      "Health Sanitary Inspector",
      "Cosmetology",
      "Hair and Skin Care",
      "Spa Therapy"
    ]
  },
  {
    "title": "Printing and Graphics Interest",
    "Roles": [
      "Offset Printing",
      "Screen Printing",
      "Book Binder",
      "Pre/Press Operator"
    ]
  },
  {
    "title": "Welding and Metal Work Interest",
    "Roles": [
      "Welder (Gas and Electric)",
      "Sheet Metal Worker",
      "Forger and Heat Treater",
      "Foundryman"
    ]
  },
  {
    "title": "Industrial Automation and Instrumentation Interest",
    "Roles": [
      "Industrial Automation Technician",
      "Instrument Mechanic",
      "Boiler Attendant",
      "Maintenance Mechanic (Chemical Plant)"
    ]
  },
  {
    "title": "Food Processing Interest",
    "Roles": [
      "Food Production (General)",
      "Bakery and Confectionery",
      "Food and Beverage Service Assistant"
    ]
  },
  {
    "title": "Hospitality and Tourism Interest",
    "Roles": [
      "Hospitality Management",
      "Front Office Assistant",
      "Travel and Tour Assistant",
      "Catering and Hospitality Assistant"
    ]
  },
  {
    "title": "Art and Craft Interest",
    "Roles": [
      "Hand Embroidery",
      "Craftsman Food Production (Vegetarian and Non-Vegetarian)",
      "Weaving of Silk and Woolen Fabrics"
    ]
  },
  {
    "title": "Environment and Safety Interest",
    "Roles": [
      "Fire Technology and Industrial Safety Management",
      "Environment Protection Technology",
      "Sanitary Hardware Fitter"
    ]
  },
  {
    "title": "Telecommunication Interest",
    "Roles": [
      "Mechanic (Telecommunication Systems)",
      "Mechanic (Radio and Television)",
      "Telecommunication Technician"
    ]
  },
  {
    "title": "Renewable Energy and Green Technology Interest",
    "Roles": [
      "Solar Technician",
      "Renewable Energy Systems Technician",
      "Wind Energy Technician"
    ]
  },
  {
    "title": "Logistics and Supply Chain Interest",
    "Roles": [
      "Warehouse Executive",
      "Inventory Management Technician",
      "Supply Chain Management Assistant"
    ]
  }
]

function InterestSelection() {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState([]);
const [openInfo, setOpenInfo] = useState(0);

  const location = useLocation();
  const { formData } = location.state || {};

  const handleInterestChange = (index) => {
    setSelectedInterests(prevInterests => 
      prevInterests.includes(index)
        ? prevInterests.filter(i => i !== index)
        : [...prevInterests, index]
    );
  };

  const toggleInfo = (index) => {
    setOpenInfo(openInfo === index ? null : index);
  };

  const handleSubmit = () => {

    console.log("Selected interest indices:", selectedInterests);
    navigate('/trade', { state: { selectedInterests } });

    // try {
    //   const response = await fetch('http://localhost:5001/user_intrest/create', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       ...formData,
    //       selectedInterests: selectedInterests
    //     }),
    //     credentials: 'include'
    //   });

    //   if (response.ok) {
      // navigate('/trade');
      //   } else {
        //     alert('Error submitting the form');
        //   }
        // } catch (error) {
          //   console.error('Error:', error);
          // }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-1 text-center">What do you like?</h1>
      <h2 className="text-slate-500 mb-6 text-center">Take your time - Select all that apply</h2>
      <div className="grid grid-cols-1 gap-6">
        {interests.map((interest, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`interest-${index}`}
                  className="form-checkbox h-5 w-10 text-blue-600"
                  checked={selectedInterests.includes(index)}
                  onChange={() => handleInterestChange(index)}
                />
                <label htmlFor={`interest-${index}`} className="ml-5 lg:ml-10 text-lg font-semibold">
                  {index + 1}. {interest.title}
                </label>
              </div>
              <button
                onClick={() => toggleInfo(index)}
                className="text-blue-500 hover:text-blue-700 focus:outline-none" 
                aria-label={`Toggle info for ${interest.title}`}
              >
                <div className="tooltip-icon">
                  <Info size={24} />
                  <span className='tooltip-text'>Show career paths for this interest</span>
                </div>
              </button>
            </div>
            {openInfo === index && (
              <div className="mt-2 p-4 bg-gray-100 rounded-md">
                <ul className="list-disc pl-5">
                  {interest.Roles.map((subInterest, subIndex) => (
                    <li key={subIndex}>{subInterest}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Submit Interests
        </button>
      </div>
    </div>
  );
}

export default InterestSelection;
