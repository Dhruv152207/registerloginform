const regForm = document.getElementById('regForm');
const logForm = document.getElementById('logForm');

function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function showSuccess(user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    sessionStorage.setItem('welcomeName', user.fullName || user.username);
    window.location.href = 'success.html';
}

if (regForm) {
    regForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const user = {
            username: document.getElementById('rUsername').value.trim(),
            fullName: document.getElementById('rFullName').value.trim(),
            email: document.getElementById('rEmail').value.trim(),
            password: document.getElementById('rPass').value,
            confirmPassword: document.getElementById('rConfirmPass').value
        };

        const users = getUsers();

        if (!user.username || !user.fullName || !user.email || !user.password || !user.confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (user.password !== user.confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        if (users.some(u => u.username === user.username || u.email === user.email)) {
            alert('Username or email already exists.');
            return;
        }

        const savedUser = {
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            password: user.password
        };

        users.push(savedUser);
        saveUsers(users);
        showSuccess(savedUser);
    });
}

if (logForm) {
    logForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const identifier = document.getElementById('lIdentifier').value.trim();
        const password = document.getElementById('lPass').value;

        const users = getUsers();
        const validUser = users.find(u =>
            (u.username === identifier || u.email === identifier) && u.password === password
        );

        if (validUser) {
            showSuccess(validUser);
        } else {
            alert('Invalid username, email, or password.');
        }
    });
}
 