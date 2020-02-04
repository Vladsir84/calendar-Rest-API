import { getEvents, deleteEvents } from './gateways.js'
import { renderDates } from './navigation.js'

export function deleteButtonOnclick(obj) {
    let deleteButton = document.querySelector('.delete-event');
    deleteButton.addEventListener('click', deleteEvent);

    function deleteEvent() {
        event.preventDefault();
        for (let i = 0; i < getEvents.length; i++) {
            if (obj.id == getEvents[i].id) {
                getEvents.splice(i, 1);
                deleteEvents();
                const popup = document.querySelector(`.popup`);
                popup.classList.remove('popup-switch');
                renderDates();
                return;
            }
        }
    }
}