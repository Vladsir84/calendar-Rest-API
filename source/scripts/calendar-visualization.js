import { arrayOfDates } from './navigation.js'
export const visual = document.querySelector('.calendar-visualization');

export const calendarRendering = () => {

    visual.innerHTML = '';

    for (let i = 1; i <= 24; i++) {
        const day = document.createElement('div');
        day.setAttribute('data-time', `${i < 10 ? 0 : ''}${i}:00`);
        day.classList.add('emptyRow');
        visual.append(day);

        for (let j = 1; j <= 7; j++) {
            const hour = document.createElement('div');
            let date = arrayOfDates[j - 1] + '';
            let dayNameOfSlot = date.split(' ')[0];
            let dateOfSlot = date.split(' ')[2];
            hour.setAttribute('data-day', `${dayNameOfSlot}`);
            hour.setAttribute('data-date', `${dateOfSlot}`);
            hour.setAttribute('data-number', `${j - 1}`);
            hour.classList.add('emptyCell');
            day.append(hour);
        }
    }
    // localStorage.clear();
}

calendarRendering();