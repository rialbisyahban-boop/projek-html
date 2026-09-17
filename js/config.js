// js/config.js

const API_KEY = 'fb3a3a97dd9f699d2e3fcd6a7adec72f';
const BASE_URL = 'https://api.themoviedb.org/3';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w780';
const NO_POSTER = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23222%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23aaa%22%20text-anchor%3D%22middle%22%3ENo%20Thumbnail%3C%2Ftext%3E%3C%2Fsvg%3E';

// membaca data user dari local storage 
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
// membaca daftar seluruh pengguna 
let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

// mengkosongkan element html 
function clearElement(element) {
    if (!element) return;
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

