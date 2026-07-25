const regForm = document.getElementById('regForm');
const logForm = document.getElementById('logForm');

if (regForm) {
    regForm.onsubmit = (e) => {
        e.preventDefault();

        const user = {
            name: document.getElementById('rName').value,
            email: document.getElementById('rEmail').value,
            pass: document.getElementById('rPass').value
        };

        let db = JSON.parse(localStorage.getItem('users') || '[]');

        if (db.find(u => u.email === user.email)) {
            alert('This email is already registered!');
        } else {
            db.push(user);
            localStorage.setItem('users', JSON.stringify(db));
            alert('Registration Successful! Please login.');
            window.location.href = 'login.html';
        }
    };
}

if (logForm) {
    logForm.onsubmit = (e) => {
        e.preventDefault();

        const email = document.getElementById('lEmail').value;
        const pass = document.getElementById('lPass').value;

        let db = JSON.parse(localStorage.getItem('users') || '[]');
        const validUser = db.find(u => u.email === email && u.pass === pass);

        if (validUser) {
            alert('Login Successful! Welcome, ' + validUser.name);
        } else {
            alert('Invalid Email or Password. Please try again.');
        }
    };
}