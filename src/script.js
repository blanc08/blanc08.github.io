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

  // Expandable Timeline Cards functionality
  function initializeExpandableCards() {
    const expandableCards = document.querySelectorAll('.expandable-card');
    
    expandableCards.forEach((card, index) => {
      const header = card.querySelector('.timeline-header');
      const details = card.querySelector('.timeline-details');
      const expandIcon = card.querySelector('.expand-icon');
      
      if (header && details) {
        // Add ripple effect on click
        header.addEventListener('click', (e) => {
          createRippleEffect(e, header);
          setTimeout(() => toggleCard(card, header, details, expandIcon), 100);
        });
        
        header.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            createRippleEffect(e, header);
            setTimeout(() => toggleCard(card, header, details, expandIcon), 100);
          }
        });

        // Add hover animations
        header.addEventListener('mouseenter', () => {
          expandIcon.style.transform = header.getAttribute('aria-expanded') === 'true' 
            ? 'rotate(180deg) scale(1.1)' 
            : 'scale(1.1)';
        });

        header.addEventListener('mouseleave', () => {
          expandIcon.style.transform = header.getAttribute('aria-expanded') === 'true' 
            ? 'rotate(180deg)' 
            : '';
        });

        // Stagger animation for initial load
        setTimeout(() => {
          card.style.transform = 'translateY(0)';
          card.style.opacity = '1';
        }, index * 150);
      }
    });
  }

  function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, var(--md-sys-color-primary) 0%, transparent 70%);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
      pointer-events: none;
      z-index: 1;
    `;
    
    // Add ripple animation keyframes if not already added
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  function toggleCard(card, header, details, expandIcon) {
    const isExpanded = header.getAttribute('aria-expanded') === 'true';
    const newExpanded = !isExpanded;
    
    // Hide hint on first interaction
    const journeySection = document.querySelector('.journey-section');
    if (journeySection && !journeySection.classList.contains('interacted')) {
      journeySection.classList.add('interacted');
    }
    
    // Update ARIA attributes
    header.setAttribute('aria-expanded', newExpanded);
    details.setAttribute('aria-hidden', !newExpanded);
    
    // Update card state
    card.setAttribute('data-expanded', newExpanded);
    
    // Add Material Design 3 haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // Add subtle sound feedback (optional - requires user interaction first)
    // playClickSound();
    
    // Smooth scroll adjustment if card expands beyond viewport
    if (newExpanded) {
      setTimeout(() => {
        const cardRect = card.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        if (cardRect.bottom > viewportHeight) {
          card.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
          });
        }
      }, 200);
    }
  }

  // Initialize expandable cards
  initializeExpandableCards();

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
