const baseUrl = 'https://crudcrud.com/api/41cf9a29272e4539a1e2a261c1d521df/event';


export const getEvents = () => {
    return fetch(baseUrl)
        .then(response => response.json())

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
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        })
        .catch(error => {
            error.message = 'Server calls limit is exceeded. Need update server URL';
        });
};