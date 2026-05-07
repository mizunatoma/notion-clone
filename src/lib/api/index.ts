import axios from "axios";

import { addAuthorizationHeaders } from "./interceptors/requests";

const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({ baseURL }); // axiosの慣用句「URLのプレフィックスを設定したaxiosを作る」
api.defaults.headers.common["Content-Type"] = "application/json";
api.interceptors.request.use(addAuthorizationHeaders); // インターセプターの利用設定

export default api;
