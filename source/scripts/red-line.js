import { arrayOfDates } from './navigation.js';

let redLinePlace = document.querySelectorAll('.day');

export function redLine() {
    for (let i = 0; i < arrayOfDates.length; i++) {
        if ((arrayOfDates[i] + '').split(' ')[2] == (new Date() + '').split(' ')[2]) {
            let redLineContainer = document.createElement('div');
            redLineContainer.classList.add('redLine');
            redLinePlace[i].append(redLineContainer);
            let redLineRound = document.createElement('div');
            let redLineLine = document.createElement('div');
            redLineRound.classList.add('redLine-round');
            redLineLine.classList.add('redLine-line');
            redLineContainer.append(redLineRound);
            redLineContainer.append(redLineLine);
            let timeParts = (arrayOfDates[i] + '').split(' ')[4].split(':');
            let margin = +timeParts[0] * 60 + +timeParts[1];
            redLineContainer.style.marginTop = `${margin + 100}px`;
        }
    }
};