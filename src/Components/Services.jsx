import React, { useState, useEffect, useRef } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdHealthAndSafety } from "react-icons/md";
import addIcon from '../assets/plus_10023875.png';
import { gsap } from 'gsap';

const Services = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);
  const [editedService, setEditedService] = useState({
    name: '',
    description: '',
    price: ''
  });
  const [healthServices, setHealthServices] = useState([
    {
      name: "General Consultation",
      description: "A comprehensive evaluation of your overall health, including medical history review and physical examination.",
      price: 100
    },
    {
      name: "Blood Test",
      description: "A basic blood test to check for common health indicators like cholesterol, glucose, and hemoglobin levels.",
      price: 50
    },
    {
      name: "X-Ray Imaging",
      description: "An X-ray to diagnose bone fractures or abnormalities in the chest, abdomen, or joints.",
      price: 150
    },
    {
      name: "Dental Cleaning",
      description: "A professional cleaning to remove plaque, tartar, and stains from teeth.",
      price: 80
    },
    {
      name: "Vision Screening",
      description: "A test to assess visual acuity, detect refractive errors, and check for eye diseases.",
      price: 40
    },
    {
      name: "Vaccination",
      description: "Immunization service to protect against preventable diseases such as flu, hepatitis, or tetanus.",
      price: 30
    }
  ]);

  const dropdownRef = useRef();
  const serviceCardRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(serviceCardRefs.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, stagger: 0.2, duration: 1.5, ease: "power3.out" }
    );
  }, [healthServices]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdownIndex(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleInputChange = (e) => {
    setEditedService({
      ...editedService,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (index) => {
    setSelectedServiceIndex(index);
    setEditedService(healthServices[index]);
    setIsEditMode(true);
    setOpenDropdownIndex(null);
  };

  const handleUpdateService = () => {
    if (!editedService.name || !editedService.description || !editedService.price) {
      alert("All fields must be filled!");
      return;
    }

    const updatedServices = [...healthServices];
    updatedServices[selectedServiceIndex] = editedService;
    setHealthServices(updatedServices);
    setIsEditMode(false);
  };

  const handleAddService = () => {
    if (!editedService.name || !editedService.description || !editedService.price) {
      alert("All fields must be filled!");
      return;
    }

    const newServices = [...healthServices, editedService];
    setHealthServices(newServices);
    setIsAddMode(false);
  };

  const handleDelete = (index) => {
    const updatedServices = healthServices.filter((_, i) => i !== index);
    setHealthServices(updatedServices);
  };

  const handleAddClick = () => {
    setEditedService({ name: '', description: '', price: '' });
    setIsAddMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setIsAddMode(false);
  };

  return (
    <div>
      <div className='flex justify-center items-center gap-x-5'>
        <MdHealthAndSafety size={"4rem"} color='#176B87' />
        <div className='text-[2rem] md:text-[4rem] font-bold text-[#176B87] text-center mb-12 mt-12'>Our Health Services</div>
        <MdHealthAndSafety size={"4rem"} color='#176B87' />
      </div>

      <div className='fixed bottom-3 right-10 w-[80px] md:w-[100px] z-30' onClick={handleAddClick}>
        <img src={addIcon} alt="Add" />
      </div>

      {(isEditMode || isAddMode) && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
          <div className="absolute inset-0 flex justify-center items-center z-20">
            <div className="edit-form w-11/12 md:w-1/3 p-6 border rounded-lg shadow-lg bg-white">
              <h3 className="text-[1.5rem] md:text-[2rem] font-bold text-[#176B87] mb-4">
                {isEditMode ? 'Edit Service' : 'Add Service'}
              </h3>
              <div className="mb-4">
                <label className="block text-[#176B87] text-[1rem] md:text-[1.2rem] mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editedService.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#176B87] text-[1rem] md:text-[1.2rem] mb-2">Description</label>
                <textarea
                  name="description"
                  value={editedService.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-[#176B87] text-[1rem] md:text-[1.2rem] mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editedService.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={isEditMode ? handleUpdateService : handleAddService}
                  className="bg-[#176B87] text-white px-4 py-2 rounded-md"
                >
                  {isEditMode ? 'Update' : 'Add'}
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <div className='flex flex-wrap justify-center items-center gap-8 w-11/12 mx-auto'>
        {healthServices.map((service, index) => (
          <div
            key={index}
            ref={el => (serviceCardRefs.current[index] = el)}
            className="service-card relative w-full sm:w-[45%] md:w-[30%] h-[auto] border-dotted border-2 border-sky-500 rounded-md flex flex-col justify-center gap-y-7 p-3"
          >
            <div className='absolute top-2 right-3 cursor-pointer'>
              <BsThreeDotsVertical size={20} onClick={() => setOpenDropdownIndex(openDropdownIndex === index ? null : index)} />
              {openDropdownIndex === index && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-20">
                  <ul className="text-[#176B87] text-left">
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleEdit(index)}>Edit</li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleDelete(index)}>Delete</li>
                  </ul>
                </div>
              )}
            </div>
            <h3 className='text-[1.5rem] md:text-[2rem] font-bold text-[#176B87]'>{service.name}</h3>
            <p className='text-[#44576e] font-bold text-[1rem] md:text-[1.2rem]'>{service.description}</p>
            <p className='text-[1.1rem] md:text-[1.3rem] font-bold text-[#176B87]'>Price: ${service.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
