import axios from "axios"
// const axios = require('axios').default;
// 10.22.129.62
// https://goblue-back.onrender.com
export const blueClient = axios.create({ baseURL: 'https://goblue-back.onrender.com/api/v1',
                                        timeout: 10000,})