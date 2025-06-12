document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const submenuParents = document.querySelectorAll('.has-submenu > a');
  const scrollTopBtn = document.getElementById('scroll-top');
  const navbar = document.querySelector('.navbar');

  // Mobile nav toggle
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('nav-menu-active');
  });

  // Close mobile menu on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('nav-menu-active')) {
        navMenu.classList.remove('nav-menu-active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Submenu toggle for mobile and keyboard
  submenuParents.forEach(link => {
    const parentLi = link.parentElement;

    link.addEventListener('click', e => {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        const isOpen = parentLi.classList.contains('open');
        parentLi.classList.toggle('open');
        link.setAttribute('aria-expanded', String(!isOpen));
      }
    });

    link.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isOpen = parentLi.classList.contains('open');
        parentLi.classList.toggle('open');
        link.setAttribute('aria-expanded', String(!isOpen));
      }
    });
  });

  // Desktop submenu toggle on click (close others)
  submenuParents.forEach(link => {
    link.addEventListener('click', e => {
      if (window.innerWidth > 991) {
        e.preventDefault();

        submenuParents.forEach(otherLink => {
          if (otherLink !== link) {
            otherLink.setAttribute('aria-expanded', 'false');
            otherLink.nextElementSibling.classList.remove('submenu-active');
          }
        });

        const expanded = link.getAttribute('aria-expanded') === 'true';
        link.setAttribute('aria-expanded', String(!expanded));
        link.nextElementSibling.classList.toggle('submenu-active');
      }
    });
  });

  // Scroll to top button
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Sticky navbar on scroll
  const stickyClass = 'navbar-sticky';
  const scrollThreshold = 80;

  function handleNavbarSticky() {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add(stickyClass);
    } else {
      navbar.classList.remove(stickyClass);
    }
  }

  window.addEventListener('scroll', handleNavbarSticky);
  handleNavbarSticky();
});
