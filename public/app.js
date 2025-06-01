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

document.addEventListener("DOMContentLoaded", () => {
  const tiles = document.querySelectorAll('.tile');

  tiles.forEach(tile => {
    tile.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default link action
      tile.classList.add('tile-pressed');

      setTimeout(() => {
        tile.classList.remove('tile-pressed');
        window.location.href = tile.href; // Navigate after effect
      }, 150); // Delay to simulate press
    });
  });
});


  document.getElementById('categoryFilter').addEventListener('change', function () {
    const selected = this.value;
    const cards = document.querySelectorAll('.solution-card');

    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (selected === 'ALL' || category === selected) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
  function applyFilter(category) {
    const cards = document.querySelectorAll('.solution-card');
    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (category === 'ALL' || cardCategory === category) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
    document.getElementById('categoryFilter').value = category;
  }

  // Get filter from URL query string
  window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const initialFilter = params.get('filter') || 'ALL';
    applyFilter(initialFilter);
  });

  document.getElementById('categoryFilter').addEventListener('change', function () {
    applyFilter(this.value);
  });




