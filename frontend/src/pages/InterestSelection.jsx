import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { useLocation } from 'react-router-dom';


const interests = [
  {
    title: "Mechanical Interest",
    subInterests: ["Fitter", "Turner", "Machinist", "Mechanic (Motor Vehicle)", "Mechanic Diesel", "Draughtsman (Mechanical)", "Tool and Die Maker"]
  },
  {
    title: "Electrical and Electronics Interest",
    subInterests: ["Electrician", "Wireman", "Electronics Mechanic", "Mechanic Consumer Electronics", "Electrical Maintenance", "Instrument Mechanic", "Refrigeration and Air Conditioning Technician"]
  },
  {
    title: "Civil and Architectural Interest",
    subInterests: ["Surveyor", "Draughtsman (Civil)", "Interior Design and Decoration", "Plumber"]
  },
  {
    title: "Information Technology and Computers Interest",
    subInterests: ["Computer Operator and Programming Assistant (COPA)", "Information and Communication Technology System Maintenance (ICTSM)", "Desktop Publishing Operator", "Web Designing and Multimedia", "Software Development", "Database Management"]
  },
  {
    title: "Chemical and Laboratory Interest",
    subInterests: ["Laboratory Assistant (Chemical Plant)", "Attendant Operator (Chemical Plant)", "Instrument Mechanic (Chemical Plant)", "Plastic Processing Operator"]
  },
  {
    title: "Automobile Interest",
    subInterests: ["Mechanic Motor Vehicle", "Mechanic Diesel", "Mechanic (Tractor)", "Mechanic Auto Electrical and Electronics"]
  },
  {
    title: "Textile and Fashion Interest",
    subInterests: ["Fashion Design Technology", "Sewing Technology", "Dressmaking", "Surface Ornamentation Techniques (Embroidery)", "Textile Technology (Spinning/Weaving/Knitting)"]
  },
  {
    title: "Agriculture and Rural Development Interest",
    subInterests: ["Agriculture Machinery Mechanic", "Horticulture", "Poultry Farming", "Agro-Processing"]
  },
  {
    title: "Construction and Woodworking Interest",
    subInterests: ["Carpenter", "Mason (Building Constructor)", "Furniture and Cabinet Maker", "Construction Equipment Mechanic"]
  },
  {
    title: "Healthcare and Beauty Interest",
    subInterests: ["Health Sanitary Inspector", "Cosmetology", "Hair and Skin Care", "Spa Therapy"]
  },
  {
    title: "Printing and Graphics Interest",
    subInterests: ["Offset Printing", "Screen Printing", "Book Binder", "Pre/Press Operator"]
  },
  {
    title: "Welding and Metal Work Interest",
    subInterests: ["Welder (Gas and Electric)", "Sheet Metal Worker", "Forger and Heat Treater", "Foundryman"]
  },
  {
    title: "Industrial Automation and Instrumentation Interest",
    subInterests: ["Industrial Automation Technician", "Instrument Mechanic", "Boiler Attendant", "Maintenance Mechanic (Chemical Plant)"]
  },
  {
    title: "Food Processing Interest",
    subInterests: ["Food Production (General)", "Bakery and Confectionery", "Food and Beverage Service Assistant"]
  },
  {
    title: "Hospitality and Tourism Interest",
    subInterests: ["Hospitality Management", "Front Office Assistant", "Travel and Tour Assistant", "Catering and Hospitality Assistant"]
  },
  {
    title: "Art and Craft Interest",
    subInterests: ["Hand Embroidery", "Craftsman Food Production (Vegetarian and Non-Vegetarian)", "Weaving of Silk and Woolen Fabrics"]
  },
  {
    title: "Environment and Safety Interest",
    subInterests: ["Fire Technology and Industrial Safety Management", "Environment Protection Technology", "Sanitary Hardware Fitter"]
  },
  {
    title: "Telecommunication Interest",
    subInterests: ["Mechanic (Telecommunication Systems)", "Mechanic (Radio and Television)", "Telecommunication Technician"]
  },
  {
    title: "Renewable Energy and Green Technology Interest",
    subInterests: ["Solar Technician", "Renewable Energy Systems Technician", "Wind Energy Technician"]
  },
  {
    title: "Logistics and Supply Chain Interest",
    subInterests: ["Warehouse Executive", "Inventory Management Technician", "Supply Chain Management Assistant"]
  }
];

function InterestSelection() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [openInfo, setOpenInfo] = useState(0);
  const location = useLocation();
  const { formData } = location.state || {};

  const handleInterestChange = (title, index) => {
    setSelectedInterests(prevInterests => 
      prevInterests.some(i => i.index === index)
        ? prevInterests.filter(i => i.index !== index)
        : [...prevInterests, {title, index}]
    );
  };


  const toggleInfo = (index) => {
    setOpenInfo(openInfo === index ? null : index);
  };

    const handleSubmit = async () => {
      console.log(formData)
      console.log(selectedInterests);
      

      // try {
      //   const response = await fetch('https://your-api-url.com/api/userinfo', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(formData),
      //   });
  
      //   if (response.ok) {
      //     alert('Form submitted successfully!');
      //     navigate('/'); // Redirect to the home page or another page
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
                  checked={selectedInterests.some( i => i.title === interest.title)}
                  onChange={() => handleInterestChange(interest.title, index )}
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
                  {interest.subInterests.map((subInterest, subIndex) => (
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