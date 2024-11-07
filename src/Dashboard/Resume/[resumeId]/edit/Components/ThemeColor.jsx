import React, { useContext, useState } from 'react';
import { BiHomeAlt2 } from 'react-icons/bi';
import { FiBox } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { ResumeInfoContext } from '../../../../../Context/ResumeinfoContext';
import GlobalApi from '../../../../../../Service/GlobalApi';
import { toast } from 'react-toastify';


const ThemeColor = () => {
  const{resumeinfo , setResumeinfo} = useContext(ResumeInfoContext);
  const {resumeId} = useParams();
  // const [loading , setLoading] = useState(false);
  // const [ThemeColors , setThemeColor] = useState('')



  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const themeColors = [
    '#F7CAC9', // Rose Quartz
    '#92A8D1', // Light Blue
    '#88B04B', // Spring Green
    '#EFC050', // Golden Yellow
    '#DFCFBE', // Sand Beige
    '#45B8AC', // Turquoise
    '#FF6F61', // Coral
    '#6B5B95', // Soft Purple
    '#955251', // Warm Brown
    '#B565A7', // Deep Purple
    '#009B77', // Teal
    '#DD4124', // Red Orange
    '#D65076', // Hot Pink
    '#5B5EA6', // Indigo
    '#9B2335', // Burgundy
  ];
  

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onColorSeletct = (color)=>{
    setResumeinfo({
      ...resumeinfo,
      themeColor:color
    })
    const data = {
      data :{
        themeColor : color
      }
    }
    setIsModalOpen(!isModalOpen);
    GlobalApi.UpdateResumeDetail(resumeId,data).then((resp)=>{
      console.log(resp)
      toast.success("Theme Color Updated")
    })
  }

  return (
    <div>
      <div className="flex items-center gap-7">
        <Link className="p-3 bg-purple-500 rounded-3xl" to={"/"}>
          <BiHomeAlt2 className="text-4xl text-red-50" />
        </Link>
        <button
          onClick={toggleModal}
          className="flex border-gray-400 p-3 rounded-3xl bg-slate-200 border items-center gap-x-4"
        >
          <FiBox className="text-4xl" /> Theme
        </button>
      </div>

      {/* Modal for showing theme colors */}
      {isModalOpen && (
        <>
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleModal}
          ></div>

          {/* Modal content */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative z-50">
              <h3 className="text-lg font-bold mb-4">Choose a Theme Color</h3>
              <div className="grid grid-cols-5 gap-4 mb-6">
                {themeColors.map((color, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    style={{ backgroundColor: color }}
                    onClick={() => onColorSeletct(color)}
                  ></div>
                ))}
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeColor;
