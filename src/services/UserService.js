
export const userService = {
    addUser,
    getUser
    // login,
    // logout
};

function addUser(user) {
    return fetch(`http://localhost:5000/api/user`, {
        method: 'post',
        headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(user)
    }).then(res => res.json());
}

function getUser(id) {
    return fetch(`http://localhost:5000/api/user/${id}`, {
        method: 'get',
        headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*'}
    }).then(res => res.json());
}

// function logout() {
//     // remove user from local storage to log user out
//     localStorage.removeItem('user');
// }
//
// function login(user) {
//     // store user details and access token
//     localStorage.setItem('user', JSON.stringify(user));
// }

