import { arrOfEvents } from './slots-logic.js';

export function validate(start, end) {
    if (!errorDate(start, end) || !duration(start, end) || !checkForUpdate(start) || !checkEvent()) return false;
}

let sixHourInMs = 21600000;
let fifteenMinInMs = 900000;
export const errorDate = (start, end) => {
    if (end < start) {
        alert('error')
        return false
    }
    if (start - end > sixHourInMs) {
        alert('error');
        return false;
    }
    return true;
}

export const duration = (start, end) => {
    if (end.getHours() - start.getHours() > 6) {
        alert('You cannot create an event longer than 6 hours')
        return false
    }
    if (start.getTime() - end.getTime() > sixHourInMs) {
        alert('You cannot create an event longer than 6 hours')
        return false;
    }
    return true;
}

export const checkForUpdate = (start) => {
    const now = new Date()
        // if (start - now < 0) return true;
    if (start - now.getTime() < fifteenMinInMs) {
        alert('you cannot delete/update event 15 minutes before the start')
        return false
    }
    return true
}

export const checkEvent = () => {
    let inputName = document.querySelector('.input__name');
    const startDate = document.querySelector(`.start-date`);
    const startTime = document.querySelector('.start-time')
    const endDate = document.querySelector(`.end-date`);
    const endTime = document.querySelector('.end-time');
    let inputDescription = document.querySelector('.description-input');


    let newEventStart = new Date(startDate.value + 'T' + startTime.value);
    let newEventEnd = new Date(endDate.value + 'T' + endTime.value);
    let selectedId;


    for (let i = 0; i < getEvents.length - 1; i++) {
        let eventStart = new Date(getEvents[i].startDate);
        let eventEnd = new Date(getEvents[i].endDate);

        if (startDate.value + 'T' + startTime.value == getEvents[i].startDate) {
            if (getEvents[i].id == selectedId) return true;
            alert('two events cannot intersect 1');
            return false;
        };

        if (newEventStart > eventStart && newEventStart < eventEnd) {
            if (getEvents[i].id == selectedId) return true
            alert('two events cannot intersect 2')
            return false
        };

    };

    let closestBeginLeft;
    let closestBeginRight;
    let closestEndLeft;
    let closestEndRight;
    let beginEv = [];
    let endEv = [];
    let popupBegin = new Date(startDate.value + 'T' + startTime.value);
    let popupEnd = new Date(endDate.value + 'T' + endTime.value);
    let currentBegin;
    let currentEnd;


    arrOfEvents.map(arg => {
        beginEv.push(
            new Date(arg.startDate)
        );
        endEv.push(
            new Date(arg.endDate)
        );
    });

    const getClosestEvent = () => {
        for (let i = 0; i < beginEv.length; i++) {
            currentBegin = beginEv[i];
            currentEnd = endEv[i];
            if (currentBegin < popupBegin && (typeof closestBeginLeft === 'undefined' || closestBeginLeft < currentBegin)) {
                closestBeginLeft = currentBegin;
            } else if (currentBegin > popupBegin && (typeof closestBeginRight === 'undefined' || closestBeginRight > currentBegin)) {
                closestBeginRight = currentBegin;
            };
            if (currentEnd < popupEnd && (typeof closestEndLeft === 'undefined' || closestEndLeft < currentEnd)) {
                closestEndLeft = currentEnd;
            } else if (currentEnd > popupEnd && (typeof closestEndRight === 'undefined' || closestEndRight > currentEnd)) {
                closestEndRight = currentEnd;
            }
        }
    };
    getClosestEvent();
    if (popupBegin >= closestEndLeft && popupBegin <= closestBeginLeft) {
        alert('two events cannot intersect 3');
        return false;
    };
    if (popupEnd > closestBeginRight && popupEnd < closestEndRight) {

        alert('two events cannot intersect 4');
        return false;
    };
    return true;
}