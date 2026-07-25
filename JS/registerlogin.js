const regForm = document.getElementById('regForm');
const logForm = document.getElementById('logForm');

const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');

if (loggedInUser) {
    showLoggedInState(loggedInUser);
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function showLoggedInState(user) {
    const authContainer = document.querySelector('.auth-container');
    if (authContainer) {
        authContainer.innerHTML = `
            <div class="form-box">
                <h2>Login Successful</h2>
                <p>Welcome, ${user.name}!</p>
                <p>You are now logged in.</p>
                <button class="btn" id="logoutBtn">Logout</button>
            </div>
        `;

        document.getElementById('logoutBtn').addEventListener('click', logoutUser);
    }
}

function logoutUser() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

if (regForm) {
    regForm.onsubmit = (e) => {
        e.preventDefault();

        const user = {
            name: document.getElementById('rName').value.trim(),
            email: document.getElementById('rEmail').value.trim(),
            pass: document.getElementById('rPass').value
        };

        const users = getUsers();

        if (!user.name || !user.email || !user.pass) {
            alert('Please fill in all fields.');
            return;
        }

        if (users.find(u => u.email === user.email)) {
            alert('This email is already registered!');
        } else {
            users.push(user);
            saveUsers(users);
            alert('Registration Successful! Please login.');
            window.location.href = 'login.html';
        }
    };
}

if (logForm) {
    logForm.onsubmit = (e) => {
        e.preventDefault();

        const email = document.getElementById('lEmail').value.trim();
        const pass = document.getElementById('lPass').value;

        const users = getUsers();
        const validUser = users.find(u => u.email === email && u.pass === pass);

        if (validUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(validUser));
            showLoggedInState(validUser);
        } else {
            alert('Invalid Email or Password. Please try again.');
        }
    };
}