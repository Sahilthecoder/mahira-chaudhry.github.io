document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const submenuParents = document.querySelectorAll('.has-submenu > a');
  const scrollTopBtn = document.getElementById('scroll-top');
  const navbar = document.querySelector('.navbar');
  const stickyClass = 'navbar-sticky';
  const scrollThreshold = 80;

  // Mobile nav toggle
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('nav-menu-active');
  });

  // Close mobile menu on link click (but NOT for Portfolio or its submenu)
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      const parentLi = link.closest('li');
      const isInsideSubmenu = link.closest('.submenu');
      const isSubmenuParent = parentLi && parentLi.classList.contains('has-submenu');

      if (!isSubmenuParent && !isInsideSubmenu && navMenu.classList.contains('nav-menu-active')) {
        navMenu.classList.remove('nav-menu-active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Unified submenu toggle (mobile + desktop)
  submenuParents.forEach(link => {
    const parentLi = link.parentElement;
    const submenu = link.nextElementSibling;

    const toggleSubmenu = () => {
      const isMobile = window.innerWidth <= 991;
      const isOpen = parentLi.classList.contains('open') || submenu.classList.contains('submenu-active');

      // Close other submenus
      submenuParents.forEach(otherLink => {
        const otherSub = otherLink.nextElementSibling;
        const otherLi = otherLink.parentElement;

        if (otherLi !== parentLi) {
          otherLink.setAttribute('aria-expanded', 'false');
          otherLi.classList.remove('open');
          otherSub?.classList.remove('submenu-active');
        }
      });

      // Toggle this submenu
      if (isMobile) {
        parentLi.classList.toggle('open');
      } else {
        submenu.classList.toggle('submenu-active');
      }

      link.setAttribute('aria-expanded', String(!isOpen));
    };

    link.addEventListener('click', e => {
      e.preventDefault();
      toggleSubmenu();
    });

    link.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleSubmenu();
      }
    });

    link.addEventListener('touchstart', e => {
      if (window.innerWidth > 991) {
        e.preventDefault();
        toggleSubmenu();
      }
    });
  });

  // Close submenu on outside click (desktop only)
  document.addEventListener('click', e => {
    if (!e.target.closest('.has-submenu') && window.innerWidth > 991) {
      submenuParents.forEach(link => {
        link.setAttribute('aria-expanded', 'false');
        link.nextElementSibling?.classList.remove('submenu-active');
      });
    }
  });

  // Scroll-to-top button
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Sticky navbar on scroll
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
