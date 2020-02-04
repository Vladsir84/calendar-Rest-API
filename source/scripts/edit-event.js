import { deleteEvents } from './gateways.js';
import { deleteButtonOnclick } from './delete-event.js';
import { renderDates } from './navigation.js';

export function activeEventOnclick() {
    let activeEvents = document.querySelectorAll('.active_event')
    for (let i = 0; i < activeEvents.length; i++) {
        activeEvents[i].addEventListener('click', function() {
            for (let j = 0; j < getEvents.length; j++) {
                if (event.target.dataset.id == getEvents[j].id) {
                    displayCurrentEvent(getEvents[j]);
                    deleteButtonOnclick(getEvents[j]);

                    // edit event
                    let editButton = document.querySelector('.submit-button ');
                    editButton.addEventListener('click', editEvent.bind(editButton, getEvents[j]));
                }
            }
        })
    }
}

function displayCurrentEvent(editedEvent) {
    const popup = document.querySelector(`.popup`);
    popup.classList.add('popup-switch');

    let name = document.querySelector('.input__name');
    let color = document.querySelector('.event__color-picker');
    let startDate = document.querySelector('.start-date');
    let startTime = document.querySelector('.start-time');
    let endTime = document.querySelector('.end-time');
    let endDate = document.querySelector('.end-date');
    let description = document.querySelector('.description-input ');

    // вносим title в popup
    name.value = editedEvent.name + '';

    color.value = editedEvent.color;

    // вносим дату в popup (input type="date")
    let startMonth = (editedEvent.startDate.getMonth() + 1 < 9) ?
        `0${editedEvent.startDate.getMonth() + 1 + ''}` : `${editedEvent.startDate.getMonth() + 1}`;
    let startYear = (editedEvent.startDate + '').split(' ')[3];
    let startDay = (editedEvent.startDate + '').split(' ')[2];
    startDate.value = `${startYear}-${startMonth}-${startDay}`;

    // вносим время в popup
    startTime.value = (editedEvent.startDate + '').split(' ')[4].split(':').splice(0, 2).join(":");
    endTime.value = (editedEvent.endDate + '').split(' ')[4].split(':').splice(0, 2).join(':');

    // вносим дату в popup (input type="date")
    let endMonth = (editedEvent.endDate.getMonth() + 1 < 9) ?
        `0${editedEvent.endDate.getMonth() + 1 + ''}` : `${editedEvent.endDate.getMonth() + 1}`;
    let endYear = (editedEvent.endDate + '').split(' ')[3];
    let endDay = (editedEvent.endDate + '').split(' ')[2];
    endDate.value = `${endYear}-${endMonth}-${endDay}`;

    // вносим description в popup
    description.value = editedEvent.description;


}

function editEvent(obj) {

    deleteEvents(obj._id)
        .then(() => renderDates())


    let editButton = document.querySelector('.submit-button ');
    editButton.removeEventListener('click', editEvent);
    const popup = document.querySelector(`.popup`);
    popup.classList.remove('popup-switch');
}