window.addEventListener('scroll', function() {
    var header = document.querySelector('.header');
    var categories = document.querySelector('.dropdown_genres');
    var section = document.querySelector('.glide__track');
    var sectionTop = section.getBoundingClientRect().top;
  
    // Check if top of section 1 is in view
    if (sectionTop <= 0) {
      // Add fixed class to header
      categories.classList.add('fixed');
      categories.classList.add('addtop');
      header.classList.add('fixed');
    } else {
      // Remove fixed class from header
      header.classList.remove('fixed');
      categories.classList.remove('fixed');
    }
  });