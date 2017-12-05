export function get(endpoint, producer, params) {

    var query = ''

    var esc = encodeURIComponent;
    if(params) {
        query = query + '?' + Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
    }

    return fetch(endpoint +'/'+ producer + query)
        .then((response) => response.json())
        .catch(err => {
            console.log(err);
        });
}


export function post(endpoint, producer, item) {
    return fetch(endpoint +'/'+ producer, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: item
    })
}

export function deleteObject(endpoint, producer, id) {
    return fetch(endpoint +'/'+ producer + '/' + id, {method: 'DELETE',})
        .catch(err => {
            console.log(err);
        });
}