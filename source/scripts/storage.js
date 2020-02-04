import { renderDates } from './navigation.js';

export let arrOfEvents = [];

export function getFromLocalStorage() {
    arrOfEvents = localStorage.getItem('storage') ? JSON.parse(localStorage.getItem('storage')) : [];
};

export function savetoLocalStorage() {
    localStorage.setItem('storage', JSON.stringify(arrOfEvents));
};

export function onStorageChange(event) {
    if (event.key == 'storage') {
        arrOfEvents = localStorage.getItem('storage') ? JSON.parse(localStorage.getItem('storage')) : []
        renderDates();
    }
}

window.addEventListener('storage', onStorageChange);