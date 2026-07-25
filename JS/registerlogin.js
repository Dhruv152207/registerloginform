const regForm = document.getElementById('regForm');
const logForm = document.getElementById('logForm');
const authContainer = document.querySelector('.auth-container');

function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function showLoggedInState(user) {
    if (!authContainer) return;

    authContainer.innerHTML = `
        <div class="form-box">
            <h2>Login Successful</h2>
            <p>Welcome, ${user.name}!</p>
            <p>You are now logged in.</p>
            <button class="btn" id="logoutBtn">Logout</button>
        </div>
    `;

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }
}

function logoutUser() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

function restoreSession() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (loggedInUser) {
        showLoggedInState(loggedInUser);
    }
}

if (regForm) {
    regForm.addEventListener('submit', (e) => {
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

        if (users.some(u => u.email === user.email)) {
            alert('This email is already registered!');
            return;
        }

        users.push(user);
        saveUsers(users);
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        showLoggedInState(user);
    });
}

if (logForm) {
    logForm.addEventListener('submit', (e) => {
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
    });
}

restoreSession();