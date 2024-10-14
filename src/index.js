import './styles/main.scss';

// script.js
document.addEventListener('DOMContentLoaded', () => {
  const showMoreButtons = document.querySelectorAll(
    '.appointment-card__show-more',
  );

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
