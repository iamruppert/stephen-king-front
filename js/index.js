document.addEventListener("DOMContentLoaded", function () {
  const quoteElement = document.getElementById("quote");
  const quotes = [{
    quote: "Get busy living or get busy dying. - Stephen King",
  }, {
    quote: "Good books do n't give up all their secrets at once. - Stephen King",
  }, {
    quote: '“Fiction is the truth inside the lie.” - Stephen King',
  },];

  const navbarToggler = document.querySelector('.navbar-toggler');
  const menuOverlay = document.getElementById('menuOverlay');
  const closeMenu = document.getElementById('closeMenu');
  const menuContent = document.querySelector('#menuOverlay');

  let currentQuoteIndex = 0;

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

  function textTypingEffect(element, text, i = 0) {
    element.textContent += text[i];

    if (i === text.length - 1) {
      return;
    }
    setTimeout(() => textTypingEffect(element, text, i + 1), 50);
  }

  function displayQuote() {
    const {quote} = quotes[currentQuoteIndex];

    quoteElement.textContent = "";

    textTypingEffect(quoteElement, quote);

    setTimeout(() => {
      currentQuoteIndex++;
      if (currentQuoteIndex < quotes.length) {
        displayQuote();
      }
    }, quote.length * 50 + 2000);
  }

  displayQuote();
});
