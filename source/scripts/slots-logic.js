import { arrayOfDates } from './navigation.js';
import { getEvents, savetoLocalStorage, getFromLocalStorage } from './storage.js'

let eventPlace = document.querySelectorAll('.day');
let eventDay = document.querySelectorAll('.day-number');

export function displayEvent(starttime, endTime, name, descriprion, id, color) {
    if (arrayOfDates[0].getMonth() === starttime.getMonth()) {
        let diff = ((endTime - starttime) / 1000 / 60);
        for (let i = 0; i < 7; i++) {

            let timeParts = (starttime + '').split(' ')[4].split(':');

            if (eventDay[i].innerHTML == endTime.getDate()) {
                //create long event
                if (starttime.getDate() !== endTime.getDate()) {
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
                    activeEventLong.innerHTML += `${(starttime + '').split(' ')[4]} - ${(endTime + '').split(' ')[4]}<br>`;
                    activeEventLong.innerHTML += `${descriprion}`;

                    activeEventShort.innerHTML += `${name}<br>`
                    activeEventShort.innerHTML += `${(starttime + '').split(' ')[4]} - ${(endTime + '').split(' ')[4]}<br>`;
                    activeEventShort.innerHTML += `${descriprion}`;


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
                    activeEvent.innerHTML += `${(starttime + '').split(' ')[4]} - ${(endTime + '').split(' ')[4]}<br>`;
                    activeEvent.innerHTML += `${descriprion}`;


                    activeEvent.setAttribute('data-id', id);
                    activeEvent.style.backgroundColor = color;
                }
            }
        }
    }
};

export function renderEvents() {
    getFromLocalStorage();
    for (let i = 0; i < getEvents.length; i++) {
        if (typeof(getEvents[i].startDate) !== 'object') {
            getEvents[i].startDate = new Date(getEvents[i].startDate);
            getEvents[i].endDate = new Date(getEvents[i].endDate);
        }
        displayEvent(getEvents[i].startDate, getEvents[i].endDate, getEvents[i].name,
            getEvents[i].description, getEvents[i].id, getEvents[i].color);
    };
};