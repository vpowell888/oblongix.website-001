// Improved app.js
function openSignupModal() {
  document.getElementById('signupModal').style.display = 'block';
}

function closeSignupModal() {
  document.getElementById('signupModal').style.display = 'none';
}

function openLoginModal() {
  document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
}

window.onclick = function (event) {
  const signupModal = document.getElementById('signupModal');
  const loginModal = document.getElementById('loginModal');
  if (event.target === signupModal) {
    closeSignupModal();
  } else if (event.target === loginModal) {
    closeLoginModal();
  }
}

document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const data = {
    firstName: this.elements['firstName'].value,
    surname: this.elements['surname'].value,
    company: this.elements['company'].value,
    email: this.elements['email'].value,
    phone: this.elements['phone'].value
  };
  console.log('Signup data:', data);
  alert('Signup initiated. Backend not yet connected.');
  closeSignupModal();
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const data = {
    email: this.elements['email'].value,
    password: this.elements['password'].value
  };
  console.log('Login data:', data);
  alert('Login initiated. Backend not yet connected.');
  closeLoginModal();
});
