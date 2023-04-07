// import axios from "axios";

// const API_URL = "http://localhost:5000/api/v1/";

// const api = axios.create({
//   baseURL: API_URL,
// });

// const user = JSON.parse(localStorage.getItem('user'));
// if (user) {
//   api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
// }

// export default api;

import axios from 'axios';
import useAuthContext from "../hooks/useAuthContext";


const API_URL = 'http://localhost:5000/api/v1/';

const Axios = () => {
  const {user} = useAuthContext()
  const api = axios.create({
    baseURL: API_URL,
  });

  if (user) {
    api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  }

  return api;
}

export default Axios;
