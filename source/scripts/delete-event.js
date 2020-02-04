import { deleteEvents } from './gateways.js'
import { renderDates } from './navigation.js'

export function deleteButtonOnclick(obj) {
    let deleteButton = document.querySelector('.delete-event');
    deleteButton.addEventListener('click', deleteEvent);

    function deleteEvent() {
        event.preventDefault();
        deleteEvents(obj._id)
            .then(() => renderDates())

        const popup = document.querySelector(`.popup`);
        popup.classList.remove('popup-switch');

    }
}