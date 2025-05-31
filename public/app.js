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

function openContactModal() {
  document.getElementById('contactModal').style.display = 'block';
}

function closeContactModal() {
  document.getElementById('contactModal').style.display = 'none';
}

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const data = {
    name: this.elements['name'].value,
    email: this.elements['email'].value,
    message: this.elements['message'].value
  };
  console.log('Contact message:', data);
  alert('Your message has been sent. (Simulation — no backend connected)');
  closeContactModal();
});

// Allow clicking outside the modal to close
window.onclick = function (event) {
  const signupModal = document.getElementById('signupModal');
  const loginModal = document.getElementById('loginModal');
  const contactModal = document.getElementById('contactModal');
  if (event.target === signupModal) closeSignupModal();
  else if (event.target === loginModal) closeLoginModal();
  else if (event.target === contactModal) closeContactModal();
};

function toggleMobileMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
}


