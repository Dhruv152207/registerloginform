const container = document.getElementById('authContainer');
const showReg = document.getElementById('showReg');
const showLogin = document.getElementById('showLogin');

// UI Toggle
showReg.onclick = () => container.classList.add('active');
showLogin.onclick = () => container.classList.remove('active');

// --- REGISTRATION LOGIC ---
document.getElementById('regForm').onsubmit = (e) => {
    e.preventDefault();
    
    const user = {
        name: document.getElementById('rName').value,
        email: document.getElementById('rEmail').value,
        pass: document.getElementById('rPass').value
    };

    // Get existing users or empty array
    let db = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if email exists
    if(db.find(u => u.email === user.email)) {
        alert("This email is already registered!");
    } else {
        db.push(user);
        localStorage.setItem('users', JSON.stringify(db)); // Save to local storage
        alert("Registration Successful! Now please login.");
        container.classList.remove('active'); // Switch to login view
    }
};

// --- LOGIN LOGIC ---
document.getElementById('logForm').onsubmit = (e) => {
    e.preventDefault();
    
    const email = document.getElementById('lEmail').value;
    const pass = document.getElementById('lPass').value;

    let db = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find matching user
    const validUser = db.find(u => u.email === email && u.pass === pass);

    if(validUser) {
        alert("Login Successful! Welcome, " + validUser.name);
        // In a real app, you'd redirect here:
        // window.location.href = "dashboard.html";
    } else {
        alert("Invalid Email or Password. Please try again.");
    }
};