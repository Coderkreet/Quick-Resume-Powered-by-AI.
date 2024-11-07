import axios from "axios";

// const API_KEY = import.meta.env.VIT_STRAPI_KEY;
const API_KEY = '82198f4a4ecde4ed44529e5b2281d6efe39b340ac3aaac5c1290a26a92bb2c2c58f8a8a3dac3976d696fe58ed2a016dd7bd8ade8625febf213f087fcd11cb08897fa06df137c19541b3c77db160e3cfe76fddb29189da0d0f40be8f06b218632f96899473cc43c979504941764dbba4438466f6b3ea4bf26fe6de11c29cb852b';

const axiosClint = axios.create({
baseURL:"http://localhost:1337/api/",
headers:{
    'Content-Type':"application/json",
    'Authorization':`Bearer ${API_KEY}`
}

})

const CreateNewResume = (data)=>axiosClint.post('/user-resumes',{data})

const GetUserResume = (userEmail) => axiosClint.get('/user-resumes?filters[userEmail][$eq]='+userEmail);

const UpdateResumeDetail = (id, data) => axiosClint.put(`/user-resumes/${id}`, data);

const GetResumeById = (id) => axiosClint.get(`/user-resumes/${id}?populate=*`);
const DeleteResumeById = (id) => axiosClint.delete(`/user-resumes/${id}`);
export default {
    CreateNewResume ,GetUserResume,UpdateResumeDetail,GetResumeById,DeleteResumeById
}