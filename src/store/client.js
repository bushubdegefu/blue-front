import axios from "axios"
// const axios = require('axios').default;

export const blueClient = axios.create({ baseURL: 'http://localhost:5500/api/v1',
                                        timeout: 10000,})