
export const userService = {
    login,
    logout
};

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function login(user) {
    // store user details and access token
    localStorage.setItem('user', JSON.stringify(user));
}

