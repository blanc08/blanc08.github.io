// Material 3 Portfolio Interactions

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Material Web Components
  console.log('Material 3 Portfolio loaded');

  // Handle FAB click - scroll to contact section
  const fab = document.querySelector('.contact-fab');
  const contactSection = document.querySelector('.contact-section');
  
  if (fab && contactSection) {
    fab.addEventListener('click', () => {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    });
  }

  // Handle project link clicks
  const projectButton = document.querySelector('.project-actions md-text-button');
  if (projectButton) {
    projectButton.addEventListener('click', () => {
      window.open('https://skd.tryoutindonesia.com', '_blank');
    });
  }

  // Handle GitHub projects link
  const githubProjectsButton = document.querySelector('.projects-link md-outlined-button');
  if (githubProjectsButton) {
    githubProjectsButton.addEventListener('click', () => {
      window.open('https://github.com/blanc08?tab=repositories', '_blank');
    });
  }

  // Handle contact links
  const contactButtons = document.querySelectorAll('.contact-links md-outlined-button');
  if (contactButtons.length >= 2) {
    // GitHub button
    contactButtons[0].addEventListener('click', () => {
      window.open('https://github.com/blanc08', '_blank');
    });
    
    // Email button
    contactButtons[1].addEventListener('click', () => {
      window.open('mailto:bagusoktaviadi1@gmail.com', '_blank');
    });
  }

  // Add scroll animations for timeline cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe timeline cards
  const timelineCards = document.querySelectorAll('.timeline-card');
  timelineCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Theme toggle functionality (for future dark mode support)
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  function updateTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }

  // Listen for theme changes
  prefersDarkScheme.addEventListener('change', (e) => {
    updateTheme(e.matches);
  });

  // Set initial theme
  updateTheme(prefersDarkScheme.matches);
});
