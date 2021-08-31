const APIURL = '/api/todos/';

export async function getTodos(){
    return fetch(APIURL)
            .then(resp => {
                if (!resp.ok) {
                    if (resp.status >= 400 && resp.status < 500) {
                        return resp.json().then(data => {
                            let err = { errorMessage: data.message };
                            throw err
                        })
                    } else {
                        let err = { errorMessage: "Server not working try again later" };
                        throw err
                    }
                }
                return resp.json();
            })
}

export async function createTodo(val){
    return fetch(APIURL,{
        method: "post",
        headers: new Headers({
            'Content-Type':'application/json'
        }),
        body: JSON.stringify({name: val})
    })
    .then(resp => {
        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    let err = { errorMessage: data.message };
                    throw err
                })
            } else {
                let err = { errorMessage: "Server not working try again later" };
                throw err
            }
        }
        return resp.json();
    })
}

export async function deleteTodo(id){
    const deleteURL = APIURL+id;
    return fetch(deleteURL,{
            method: "delete"
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err
                    })
                } else {
                    let err = { errorMessage: "Server not working try again later" };
                    throw err
                }
            }
            return resp.json();
        })
}

export async function updateTodo(todos){
    const updateURL = APIURL+todos._id;
    return fetch(updateURL,{
        method: "put",
        headers: new Headers({
            'Content-Type':'application/json'
        }),
        body: JSON.stringify({completed: !todos.completed})
    })
    .then(resp => {
        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    let err = { errorMessage: data.message };
                    throw err
                })
            } else {
                let err = { errorMessage: "Server not working try again later" };
                throw err
            }
        }
        return resp.json();
    })
}