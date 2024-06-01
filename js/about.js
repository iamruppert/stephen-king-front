document.addEventListener("DOMContentLoaded", function () {

  const sections = document.querySelectorAll("section");
  const navbarToggler = document.querySelector('.navbar-toggler');
  const menuOverlay = document.getElementById('menuOverlay');
  const closeMenu = document.getElementById('closeMenu');
  const menuContent = document.querySelector('#menuOverlay');

  sections.forEach((section, index) => {
    if (index % 2 === 0) {
      section.classList.add("animate-slide-right");
    } else {
      section.classList.add("animate-slide-left");
    }
  });

  navbarToggler.addEventListener('click', function () {
    menuOverlay.classList.add('show');
    menuOverlay.classList.remove('hide');
  });

  closeMenu.addEventListener('click', function () {
    menuOverlay.classList.add('hide');
    setTimeout(() => {
      menuOverlay.classList.remove('show');
    }, 500);
  });

  menuContent.addEventListener('click', function (event) {
    event.stopPropagation();
  });

  menuOverlay.addEventListener('click', function (event) {
    if (!menuContent.contains(event.target)) {
      menuOverlay.classList.add('hide');
      setTimeout(() => {
        menuOverlay.classList.remove('show');
      }, 500);
    }
  });

});
