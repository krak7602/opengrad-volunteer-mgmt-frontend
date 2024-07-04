import axios from 'axios';
import { cookies } from "next/headers"
const full= cookies().get("connect.sid")
const val = full?.name+"="+full?.value

// // const cook = "connect.sid="+val
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Cookie': val
  },
});

export default axiosInstance;