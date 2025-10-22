document.addEventListener('DOMContentLoaded', function () {
  const $burger = document.querySelector('.nav__burger');
  const $navItems = document.querySelector('.nav__items');
  const $body = document.body;

  function toggleMenu() {
    $burger.classList.toggle('active');
    $navItems.classList.toggle('active');
    $body.classList.toggle('menu-open');
  }

  $burger.addEventListener('click', toggleMenu);

  const $navLinks = document.querySelectorAll('.nav__item a');
  $navLinks.forEach((link) => {
    link.addEventListener('click', function () {
      $burger.classList.remove('active');
      $navItems.classList.remove('active');
      $body.classList.remove('menu-open');
    });
  });

  document.addEventListener('click', function (event) {
    if (
      !event.target.closest('.nav') &&
      $navItems.classList.contains('active')
    ) {
      toggleMenu();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && $navItems.classList.contains('active')) {
      toggleMenu();
    }
  });
});
