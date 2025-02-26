import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;


const talukas = [
    "Ahmedabad",
    "Daskroi",
    "Sanand",
    "Sarkhej",
    "Bavla",
    "Detroj-Rampura",
    "Viramgam",
    "Mandal",
    "Ranpur",
    "Dhank",
    "Amreli",
    "Babra",
    "Dhari",
    "Lathi",
    "Rajula",
    "Savarkundla",
    "Vallabhipur",
    "Khambhalida",
    "Anand",
    "Borsad",
    "Khambhat",
    "Petlad",
    "Sojitra",
    "Tarapur",
    "Umreth",
    "Bayad",
    "Malpur",
    "Modasa",
    "Dhansura",
    "Matar",
    "Khedbrahma",
    "Danta",
    "Deesa",
    "Palanpur",
    "Tharad",
    "Vav",
    "Kankrej",
    "Kheralu",
    "Bharuch",
    "Ankleshwar",
    "Jhagadia",
    "Vagra",
    "Amod",
    "Dabhoi",
    "Ekta Nagar",
    "Bhavnagar",
    "Bhavnagar Rural",
    "Mahuva",
    "Palitana",
    "Sihor",
    "Talaja",
    "Botad",
    "Barwala",
    "Gadhada",
    "Ranpur",
    "Chhota Udaipur",
    "Chhota Udaipur",
    "Bodeli",
    "Jetpur Pavi",
    "Kavant",
    "Nasvadi",
    "Sankheda",
    "Dahod",
    "Devgadh Baria",
    "Dhanpur",
    "Fatepura",
    "Garbada",
    "Limkheda",
    "Sanjeli",
    "Khambhalia",
    "Okhamandal",
    "Bhanvad",
    "Kalyanpur",
    "Gandhinagar",
    "Dehgam",
    "Kalol",
    "Mansa",
    "Gir Gadhada",
    "Kodinar",
    "Talala",
    "Una",
    "Sutrapada",
    "Jamnagar",
    "Dhrol",
    "Kalavad",
    "Lalpur",
    "Jamjodhpur",
    "Jodiya",
    "Junagadh",
    "Bhesana",
    "Keshod",
    "Mangrol",
    "Manavadar",
    "Visavadar",
    "Bhuj",
    "Gandhidham",
    "Mandvi",
    "Mundra",
    "Anjar",
    "Kheda",
    "Nadiad",
    "Mahudha",
    "Matar",
    "Thasra",
    "Vaso",
    "Lunawada",
    "Balasinor",
    "Khanpur",
    "Santrampur",
    "Mehsana",
    "Becharaji",
    "Kadi",
    "Unjha",
    "Vadnagar",
    "Morbi",
    "Tankara",
    "Wankaner",
    "Halvad",
    "Maliya",
    "Rajpipla",
    "Dediapada",
    "Garudeshwar",
    "Nandod",
    "Navsari",
    "Chikhli",
    "Gandevi",
    "Jalalpore",
    "Godhra",
    "Halol",
    "Jambughoda",
    "Kalol",
    "Morwa Hadaf",
    "Shehera",
    "Patan",
    "Harij",
    "Radhanpur",
    "Sami",
    "Sidhpur",
    "Porbandar",
    "Kutiyana",
    "Ranavav",
    "Rajkot",
    "Gondal",
    "Jamkandorna",
    "Dhoraji",
    "Himatnagar",
    "Idar",
    "Khedbrahma",
    "Prantij",
    "Surat",
    "Bardoli",
    "Choryasi",
    "Olpad",
    "Mandvi",
    "Surendranagar",
    "Dhangadhra",
    "Chotila",
    "Tapi",
    "Songadh",
    "Vyara",
    "Vadodara",
    "Savli",
    "Karjan",
    "Sinor",
    "Valsad",
    "Umbergaon",
    "Dharampur",
    "Ahwa",
    "Subir",
    "Waghai"
];

const FormPage = () => {
    const navigate = useNavigate();

    const [formData,
        setFormData] = useState({
        user: '', age: '', contactNo: '', taluka: '', // Update state to use taluka instead of district and city
        qualification: ''
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();

        const {taluka, age, contactNo, qualification} = formData;

        const formDataToSend = {
            age,
            contactNo,
            taluka, // Send taluka instead of district and city
            qualification
        };

        try {
            const response = await fetch(`${BASE_URL}/user_info/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataToSend),
                credentials: 'include'
            });

            if (response.ok) {
                navigate('/interest');
                console.log('Form submitted successfully!');
            } else {
                console.log(response);
                alert('Error submitting the form');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Inline styles
    const formStyle = {
        backgroundColor: 'white',
        color: 'blue',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '500px',
        margin: 'auto',
        textAlign: 'left'
    };

    const inputStyle = {
        marginBottom: '10px',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '5px'
    };

    const buttonStyle = {
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h2>User Information Form</h2>

            {/* Age Input */}
            <div>
                <label style={labelStyle}>Age:</label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}/>
            </div>

            {/* Contact Number Input */}
            <div>
                <label style={labelStyle}>Contact Number:</label>
                <input
                    type="tel"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}/>
            </div>

            {/* Taluka Searchable Dropdown */}
            <div>
                <label style={labelStyle}>Taluka:</label>
                <input
                    type="text"
                    list="taluka-list"
                    name="taluka"
                    value={formData.taluka}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                    placeholder="Search Taluka"/>
                <datalist id="taluka-list">
                    {talukas
                        .filter(taluka => taluka.toLowerCase().includes(formData.taluka.toLowerCase()))
                        .map((taluka, index) => (<option key={index} value={taluka}/>))}
                </datalist>
            </div>

            {/* Qualification Dropdown */}
            <div>
                <label style={labelStyle}>Qualification:</label>
                <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}>
                    <option value="">Select Qualification</option>
                    <option value="10th fail">10th Fail</option>
                    <option value="10th pass">10th Pass</option>
                    <option value="12th pass">12th Pass</option>
                </select>
            </div>

            {/* Submit Button */}
            <div>
                <button type="submit" style={buttonStyle}>Submit</button>
            </div>
        </form>
    );
};

export default FormPage;
