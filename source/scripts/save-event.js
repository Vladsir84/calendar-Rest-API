import { getEvents, saveEvents } from './gateways.js'
import { renderEvents } from './slots-logic.js'
import { activeEventOnclick } from './edit-event.js'
import { renderDates } from './navigation.js'
import { calendarRendering } from './calendar-visualization.js';
import { validate } from './validate.js';

let popupForm = document.querySelector('.popup__form');
export let saveButton = document.querySelector('.submit-button');

export function saveEvent() {
    event.preventDefault();
    const formData = [...new FormData(popupForm)];

    let name = formData[0][1];
    let color = formData[1][1];
    let startDate = `${formData[2][1]}T${formData[3][1]}`;
    let endDate = `${formData[5][1]}T${formData[4][1]}`;
    let description = formData[6][1];


    if (validate(new Date(startDate), new Date(endDate)) == false) {
        return;
    }

    createNewEvent(name, color, startDate, endDate, description);
    renderEvents(getEvents);


    const popup = document.querySelector(`.popup`);
    popup.classList.remove('popup-switch');

    renderDates();
    activeEventOnclick();
    calendarRendering();
}


let newEvent = {
    id: Math.random() * 1000,
    name: name,
    color: color,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    description: description,
}

saveEvents(newEvent)
    .then(() => renderDates())


saveButton.addEventListener('click', saveEvent);