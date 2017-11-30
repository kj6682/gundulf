export function get(endpoint, params) {
    var query = ''
    if (params.producer) {
        query = '/' + params.producer
    }

    if (params.page) {
        var esc = encodeURIComponent;
        query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
        query = '?' + query;
    }

    console.log('in get')
    console.log(endpoint)

    return fetch(endpoint + query)
        .then((response) => response.json())
        .catch(err => {
            console.log(err);
        });
}

export function getByName(endpoint, params) {
    var esc = encodeURIComponent;
    var query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');

    return fetch(endpoint + '/search?' + query)
        .then((response) => response.json())
        .catch(err => {
            console.log(err);
        });
}

export function post(endpoint, item) {
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: item
    })
}

export function deleteObject(endpoint, id) {
    return fetch(endpoint + '/' + id, {method: 'DELETE',})
        .catch(err => {
            console.log(err);
        });
}