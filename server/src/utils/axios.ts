import Axios from 'axios';
import { config } from 'dotenv';

config();

export const daemon = Axios.create({
    baseURL: `${process.env.DAEMON_HTTP_URL}`,
    withCredentials: false,
    headers: {
        Authorization: `Bearer ${process.env.DAEMON_API_KEY}`,
    },
});
