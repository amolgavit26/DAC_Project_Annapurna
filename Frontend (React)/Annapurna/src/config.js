// src/config.js

const ENV = import.meta.env.VITE_BACKEND?.toUpperCase() || 'SPRING'; // Default to "SPRING" if undefined

const BASE_URL = ENV === 'SPRING'
    ? 'http://localhost:8080'
    : 'https://localhost:7090'; // .NET backend

export default BASE_URL;
