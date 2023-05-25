import { io } from 'socket.io-client';

const url = process.env.NODE_ENV == 'production' ? undefined : 'wss://ws-api.binance.com:443/ws-api/v3';

export const socket = io(url);