import './styles/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  // Login modal logic
  const loginBtn = document.querySelector('.header__login-btn');
  const modal = document.getElementById('signInModal');
  const closeModalBtn = document.querySelector('.close');

  // Show modal when Login button is clicked
  loginBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  // Close modal when X button is clicked
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close modal when clicking outside the modal content
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Show more/less button logic for appointment cards
  const showMoreButtons = document.querySelectorAll('.appointment-card__show-more');

  showMoreButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const card = event.target.closest('.appointment-card');
      card.classList.toggle('appointment-card--expanded');

      if (card.classList.contains('appointment-card--expanded')) {
        button.textContent = 'Show Less';
      } else {
        button.textContent = 'Show More';
      }
    });
  });
});
