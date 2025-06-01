window.onclick = function (event) {
  const signupModal = document.getElementById('signupModal');
  const loginModal = document.getElementById('loginModal');
  if (event.target === signupModal) {
    closeSignupModal();
  } else if (event.target === loginModal) {
    closeLoginModal();
  }
}

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




