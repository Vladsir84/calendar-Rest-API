const baseUrl = 'https://crudcrud.com/api/0e90d26f5cab4926ab93902f204a05de/arrOfEvents';

const mapTasks = tasks =>
    tasks.map(({ _id, ...rest }) => ({...rest, id: _id }));

export const getEvents = () => {
    return fetch(baseUrl)
        .then(response => response.json())
        .then(tasks => mapTasks(tasks))
        .catch(error => {
            error.message = 'Server calls limit is exceeded. Need update server URL';
        });
};

export const saveEvents = eventData => {
    return fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(eventData)
        })
        .catch(error => {
            error.message = 'Server calls limit is exceeded. Need update server URL';
        });
};


export const editEvents = (eventId, eventData) => {
    return fetch(`${baseUrl}/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(eventData)
        })
        .catch(error => {
            error.message = 'Server calls limit is exceeded. Need update server URL';
        });
};


export const deleteEvents = (eventId) => {
    return fetch(`${baseUrl}/${eventId}`, {
            method: 'DELETE',

        })
        .catch(error => {
            error.message = 'Server calls limit is exceeded. Need update server URL';
        });
};