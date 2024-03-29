
export const userService = {
    addUser,
    getUser,
    updateUser
    // login,
    // logout
};

const URL = process.env.SERVER_URI || `https://adventourous.sodo.asia/server`;

function addUser(user) {
    return fetch(`${URL}/api/user`, {
        method: 'post',
        headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(user)
    }).then(res => res.json());
}

function getUser(id) {
    return fetch(`${URL}/api/user/${id}`, {
        method: 'get',
        headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*'}
    }).then(res => res.json());
}

function updateUser(user) {
    return fetch(`${URL}/api/user/${user.id}`, {
        method: 'put',
        headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(user)
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

