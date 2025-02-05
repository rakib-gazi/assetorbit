import axios from 'axios';
const axiosPublic = axios.create({
    baseURL: 'https://b10a12-server-side-rakib-gazi.vercel.app/',
    // baseURL: 'http://localhost:5000/',
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;