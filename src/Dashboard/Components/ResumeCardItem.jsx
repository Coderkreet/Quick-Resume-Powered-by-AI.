import React, { useState } from 'react';
import { BiDownload, BiEdit } from 'react-icons/bi';
import { BsEye, BsThreeDots } from 'react-icons/bs';
import { FiDelete } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { PiNotebookBold } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';
import GlobalApi from '../../../Service/GlobalApi';
import { toast } from 'react-toastify';
import { reference } from 'three/webgpu';

const ResumeCardItem = ({resume,referenceData}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const navigation = useNavigate();

  const onClickMenu = (url) => {
    navigation(url);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    // Show modal
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    // Logic for deleting the resume goes here
    GlobalApi.DeleteResumeById(resume.documentId).then(()=>{
      toast.success("Resume Deleted")
      referenceData();
    })
    setIsModalOpen(false); // Close modal after delete
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div className="hover:scale-105 cursor-pointer hover:shadow-purple-500 duration-300 transition-all hover:shadow-2xl rounded-lg text-5xl border-2 border-blue-900 border-4 py-[10rem] w-[16rem] items-center flex justify-center bg-slate-400">
          <PiNotebookBold />
        </div>
        <h2 className="text-center my-1">{resume.title}</h2>
      </Link>

      <div className="absolute z-20 top-3 right-2">
        <button
          id="dropdownDefaultButton"
          onClick={toggleDropdown}
          className="text-black"
          type="button"
        >
          <BsThreeDots className="text-2xl rotate-90" />
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div
            id="dropdown"
            className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <a
                  onClick={() => onClickMenu(`/my-resume/${resume.documentId}/view`)}
                  href="#"
                  className="flex gap-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <BsEye /> View
                </a>
              </li>
              <li>
                <a
                  onClick={() => onClickMenu(`/my-resume/${resume.documentId}/download`)}
                  href="#"
                  className="flex gap-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <BiDownload /> Download
                </a>
              </li>
              <li>
                <a
                  onClick={() => onClickMenu(`/dashboard/resume/${resume.documentId}/edit`)}
                  href="#"
                  className="flex gap-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <BiEdit /> Edit
                </a>
              </li>
              <li>
                <a
                  onClick={handleDelete}
                  href="#"
                  className="flex gap-x-3 items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <MdDelete /> Delete
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
  <>
    {/* Background overlay */}
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

    {/* Modal content */}
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <h3 className="text-lg font-bold mb-4">Delete Resume</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this resume? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={confirmDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </>
)}

    </div>
  );
};

export default ResumeCardItem;
