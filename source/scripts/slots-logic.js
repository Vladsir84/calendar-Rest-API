import { arrayOfDates } from './navigation.js';
import { getEvents } from './gateways.js';

let eventPlace = document.querySelectorAll('.day');
let eventDay = document.querySelectorAll('.day-number');

export function displayEvent(startTime, endTime, name, description, id, color) {
    if (arrayOfDates[0].getMonth() === startTime.getMonth()) {
        let diff = ((endTime - startTime) / 1000 / 60);
        for (let i = 0; i < 7; i++) {

            let timeParts = (startTime + '').split(' ')[4].split(':');

            if (eventDay[i].innerHTML == endTime.getDate()) {
                //create long event
                if (startTime.getDate() !== endTime.getDate()) {
                    let activeEventShort = document.createElement('div');
                    let activeEventLong = document.createElement('div');
                    activeEventShort.classList.add('active_event');
                    activeEventLong.classList.add('active_event');

                    let marginTopOfShortEvent = +timeParts[0] * 60 + +timeParts[1];
                    activeEventShort.style.marginTop = `${marginTopOfShortEvent + 100}px`;
                    activeEventShort.style.height = `${1440 - marginTopOfShortEvent}px`;

                    let heightOfLongEvent = endTime
                    activeEventLong.style.marginTop = '100px'
                    activeEventLong.style.height = `${1440 - (1440 - (endTime + '').split(' ')[4].split(':')[0] * 60 +
                        +((endTime + '').split(' ')[4].split(':')[1]))}px`;

                    eventPlace[i - 1].append(activeEventShort);
                    eventPlace[i].append(activeEventLong);

                    activeEventLong.innerHTML += `${name}<br>`
                    activeEventLong.innerHTML += `${(startTime + '').split(' ')[4]} - ${(endTime + '').split(' ')[4]}<br>`;
                    activeEventLong.innerHTML += `${description}`;

                    activeEventShort.innerHTML += `${name}<br>`
                    activeEventShort.innerHTML += `${(startTime + '').split(' ')[4]} - ${(endTime + '').split(' ')[4]}<br>`;
                    activeEventShort.innerHTML += `${description}`;


                    activeEventShort.setAttribute('data-id', id);
                    activeEventShort.style.backgroundColor = color;
                    activeEventLong.setAttribute('data-id', id);
                    activeEventLong.style.backgroundColor = color;

                } else {
                    // create short event
                    let margin = +timeParts[0] * 60 + +timeParts[1];

                    let activeEvent = document.createElement('div');
                    eventPlace[i].append(activeEvent);
                    activeEvent.classList.add('active_event');
                    activeEvent.style.height = `${diff}px`;

                    activeEvent.style.marginTop = `${margin + 100}px`;
                    activeEvent.innerHTML += `${name}<br>`
                    activeEvent.innerHTML += `${(startTime + '').split(' ')[4]} - ${(endTime + '').split(' ')[4]}<br>`;
                    activeEvent.innerHTML += `${description}`;


                    activeEvent.setAttribute('data-id', id);
                    activeEvent.style.backgroundColor = color;
                }
            }
        }
    }
};

export function renderEvents(array) {
    if (array.length !== 0);
    for (let i = 0; i < array.length; i++) {
        if (typeof(array[i].startDate) !== 'object') {
            array[i].startDate = new Date(array[i].startDate);
            array[i].endDate = new Date(array[i].endDate);
        }
        displayEvent(array[i].startDate, array[i].endDate, array[i].name,
            array[i].description, array[i].id, array[i].color);
    };
};

export let arrOfEvents = [];

export function renderFromServer() {
    getEvents()
        .then(result => {
            renderEvents(result);
            // activeEventOnclick(result);
            arrOfEvents = result;
        })
}