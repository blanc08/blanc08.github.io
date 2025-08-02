// Material 3 Portfolio Interactions

document.addEventListener('DOMContentLoaded', function () {
  // Initialize Material Web Components
  console.log('Material 3 Portfolio loaded');

  // Initialize Analytics
  initializeAnalytics();

  // Initialize Connected Magazine
  initializeConnectedMagazine();

  // Handle FAB click - scroll to contact section
  const fab = document.querySelector('md-fab');
  const contactSection = document.querySelector('section:last-of-type');

  if (fab && contactSection) {
    fab.addEventListener('click', () => {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

  // Handle contact links - Updated to use Material components
  const contactButtons = document.querySelectorAll('md-filled-tonal-button');
  contactButtons.forEach((button) => {
    const iconText = button.querySelector('md-icon').textContent;

    button.addEventListener('click', () => {
      switch (iconText) {
        case 'code':
          window.open('https://github.com/blanc08', '_blank');
          break;
        case 'email':
          window.open('mailto:bagusoktaviadi1@gmail.com', '_blank');
          break;
        case 'business':
          window.open('https://linkedin.com/in/bagus-oktaviadi', '_blank');
          break;
        case 'phone':
          window.open('tel:+62085158622062', '_blank');
          break;
        default:
          console.log('Unknown contact type');
      }
    });
  });

  // Connected Magazine Functionality
  function initializeConnectedMagazine() {
    const workCards = document.querySelectorAll('.work-card[data-connection]');
    const projectCards = document.querySelectorAll('.project-card[data-connection]');
    const svg = document.querySelector('.connection-lines');
    const journeySection = document.querySelector('.journey-section');
    const timeline = document.querySelector('.timeline-progress');

    // Validate required elements
    if (!workCards.length || !projectCards.length) {
      console.warn('Connection mechanism: No work or project cards found');
      return;
    }

    if (!svg) {
      console.warn('Connection mechanism: SVG element not found');
      return;
    }

    if (!journeySection) {
      console.warn('Connection mechanism: Journey section not found');
      return;
    }

    let connections = new Map();
    let currentConnection = null;
    let isHovering = false;
    let deactivateTimeout = null;

    // Setup connection mappings
    setupConnections();

    // Initialize timeline animation
    initializeTimeline();

    // Bind hover events
    bindHoverEvents();

    function setupConnections() {
      // Map work cards to project cards
      workCards.forEach(workCard => {
        const connectionId = workCard.dataset.connection;
        const projectCard = document.querySelector(`.project-card[data-connection="${connectionId}"]`);

        if (projectCard) {
          connections.set(connectionId, {
            work: workCard,
            project: projectCard,
            line: null
          });
        }
      });
    }

    function initializeTimeline() {
      if (!timeline) return;

      // Animate timeline on scroll
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const progress = Math.min((entry.intersectionRatio * 100), 100);
            timeline.style.height = `${progress}%`;
          }
        });
      }, { threshold: [0, 0.25, 0.5, 0.75, 1] });

      if (journeySection) {
        observer.observe(journeySection);
      }
    }

    function bindHoverEvents() {
      // Work card hover events
      workCards.forEach(workCard => {
        workCard.addEventListener('mouseenter', () => {
          const connectionId = workCard.dataset.connection;
          activateConnection(connectionId);
        });

        workCard.addEventListener('mouseleave', () => {
          // Use a short delay to allow moving to connected project card
          deactivateTimeout = setTimeout(() => {
            deactivateConnection();
          }, 150);
        });

        // Keyboard navigation support
        workCard.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const connectionId = workCard.dataset.connection;
            activateConnection(connectionId);

            // Auto-deactivate after 3 seconds for keyboard users
            setTimeout(() => {
              deactivateConnection();
            }, 3000);
          }
          if (e.key === 'Escape') {
            deactivateConnection();
          }
        });

        workCard.addEventListener('focus', () => {
          const connectionId = workCard.dataset.connection;
          activateConnection(connectionId);
        });

        workCard.addEventListener('blur', () => {
          deactivateTimeout = setTimeout(() => {
            deactivateConnection();
          }, 150);
        });

        // Touch events for mobile devices
        workCard.addEventListener('touchstart', (e) => {
          const connectionId = workCard.dataset.connection;
          activateConnection(connectionId);

          // Auto-deactivate after 2 seconds on touch
          setTimeout(() => {
            deactivateConnection();
          }, 2000);
        }, { passive: true });
      });

      // Project card hover events
      projectCards.forEach(projectCard => {
        projectCard.addEventListener('mouseenter', () => {
          const connectionId = projectCard.dataset.connection;
          activateConnection(connectionId);
        });

        projectCard.addEventListener('mouseleave', () => {
          // Use a short delay to allow moving to connected work card
          deactivateTimeout = setTimeout(() => {
            deactivateConnection();
          }, 150);
        });

        // Keyboard navigation support
        projectCard.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const connectionId = projectCard.dataset.connection;
            activateConnection(connectionId);

            // Auto-deactivate after 3 seconds for keyboard users
            setTimeout(() => {
              deactivateConnection();
            }, 3000);
          }
          if (e.key === 'Escape') {
            deactivateConnection();
          }
        });

        projectCard.addEventListener('focus', () => {
          const connectionId = projectCard.dataset.connection;
          activateConnection(connectionId);
        });

        projectCard.addEventListener('blur', () => {
          deactivateTimeout = setTimeout(() => {
            deactivateConnection();
          }, 150);
        });

        // Touch events for mobile devices
        projectCard.addEventListener('touchstart', (e) => {
          const connectionId = projectCard.dataset.connection;
          activateConnection(connectionId);

          // Auto-deactivate after 2 seconds on touch
          setTimeout(() => {
            deactivateConnection();
          }, 2000);
        }, { passive: true });
      });
    }

    function activateConnection(connectionId) {
      if (!connectionId || !connections.has(connectionId)) {
        console.warn(`Connection mechanism: Invalid connection ID: ${connectionId}`);
        return;
      }

      // If the same connection is already active, just clear any pending deactivation
      if (currentConnection === connectionId) {
        if (deactivateTimeout) {
          clearTimeout(deactivateTimeout);
          deactivateTimeout = null;
        }
        return;
      }

      const connection = connections.get(connectionId);
      if (!connection.work || !connection.project) {
        console.warn(`Connection mechanism: Missing work or project card for connection: ${connectionId}`);
        return;
      }

      // Deactivate any existing connection first
      if (currentConnection) {
        deactivateConnection();
      }

      currentConnection = connectionId;
      isHovering = true;

      // Clear any pending deactivation
      if (deactivateTimeout) {
        clearTimeout(deactivateTimeout);
        deactivateTimeout = null;
      }

      // Add connected classes with enhanced effects
      connection.work.classList.add('connected');
      connection.project.classList.add('connected');

      // Add preview effect for related cards
      addConnectionPreview(connectionId);

      // Create connection line
      drawConnectionLine(connection);

      // Dim other cards with smart opacity
      const workCards = document.querySelectorAll('.work-card');
      const projectCards = document.querySelectorAll('.project-card');

      workCards.forEach(card => {
        if (card !== connection.work) {
          const cardStrength = card.dataset.connectionStrength;
          const opacity = getSmartOpacity(cardStrength);
          card.style.opacity = opacity;
          // Removed blur effect that was causing UX issues
        }
      });

      projectCards.forEach(card => {
        if (card !== connection.project) {
          const cardStrength = card.dataset.connectionStrength;
          const opacity = getSmartOpacity(cardStrength);
          card.style.opacity = opacity;
          // Removed blur effect that was causing UX issues
        }
      });
    }

    function getSmartOpacity(strength) {
      switch (strength) {
        case 'very-high': return '0.3';
        case 'high': return '0.4';
        case 'medium': return '0.5';
        case 'foundation': return '0.6';
        default: return '0.4';
      }
    }

    function addConnectionPreview(connectionId) {
      // Find cards with same connection type for preview
      const currentType = document.querySelector(`[data-connection="${connectionId}"]`)?.dataset.connectionType;

      if (currentType) {
        const relatedCards = document.querySelectorAll(`[data-connection-type="${currentType}"]`);
        relatedCards.forEach(card => {
          if (card.dataset.connection !== connectionId) {
            card.classList.add('related-preview');
          }
        });

        // Note: related-preview will be removed in deactivateConnection
        // No setTimeout needed here to avoid conflicts
      }
    }

    function deactivateConnection() {
      if (!currentConnection) return;

      // Clear any pending deactivation timeout
      if (deactivateTimeout) {
        clearTimeout(deactivateTimeout);
        deactivateTimeout = null;
      }

      // Remove connected classes immediately
      const workCards = document.querySelectorAll('.work-card');
      const projectCards = document.querySelectorAll('.project-card');

      workCards.forEach(card => {
        card.classList.remove('connected', 'related-preview');
        card.style.opacity = '';
      });

      projectCards.forEach(card => {
        card.classList.remove('connected', 'related-preview');
        card.style.opacity = '';
      });

      // Remove connection lines and particles
      if (svg) {
        const lines = svg.querySelectorAll('.connection-line, .connection-particle, circle');
        lines.forEach(line => line.remove());
      }

      currentConnection = null;
      isHovering = false;
    }

    function drawConnectionLine(connection) {
      if (!svg) return;

      const workRect = connection.work.getBoundingClientRect();
      const projectRect = connection.project.getBoundingClientRect();
      const journeyRect = journeySection.getBoundingClientRect();

      // Calculate relative positions
      const startX = workRect.right - journeyRect.left;
      const startY = workRect.top + workRect.height / 2 - journeyRect.top;
      const endX = projectRect.left - journeyRect.left;
      const endY = projectRect.top + projectRect.height / 2 - journeyRect.top;

      // Determine connection type based on data
      const connectionId = connection.work.dataset.connection;
      const connectionType = getConnectionType(connectionId);

      // Create curved path with enhanced curve
      const midX = (startX + endX) / 2;
      const curveOffset = Math.abs(startY - endY) > 100 ? 80 : 50;
      const controlY = Math.min(startY, endY) - curveOffset;

      const path = `M ${startX} ${startY} Q ${midX} ${controlY} ${endX} ${endY}`;

      // Remove existing lines and labels
      const existingLines = svg.querySelectorAll('.connection-line');
      const existingLabels = svg.querySelectorAll('.connection-label');
      const existingParticles = svg.querySelectorAll('.connection-particle');

      existingLines.forEach(line => line.remove());
      existingLabels.forEach(label => label.remove());
      existingParticles.forEach(particle => particle.remove());

      // Create enhanced SVG path element
      const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathElement.setAttribute('d', path);
      pathElement.setAttribute('id', `connection-${connectionId}`);
      pathElement.classList.add('connection-line', 'active', connectionType);

      // Add gradient for enhanced visual appeal
      const gradientId = `gradient-${connectionId}`;
      createConnectionGradient(gradientId, connectionType);
      pathElement.setAttribute('stroke', `url(#${gradientId})`);

      svg.appendChild(pathElement);

      // Add data flow particles
      addDataFlowParticles(pathElement, connectionId);

      // Add connection label
      addConnectionLabel(connectionId, midX, controlY - 20);

      // Add connection strength indicator
      addConnectionStrength(connection, startX, startY, endX, endY);
    }

    function getConnectionType(connectionId) {
      const workCard = document.querySelector(`[data-connection="${connectionId}"]`);
      return workCard?.dataset.connectionType || 'primary-connection';
    }

    function createConnectionGradient(gradientId, connectionType) {
      const defs = svg.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      if (!svg.querySelector('defs')) {
        svg.appendChild(defs);
      }

      const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
      gradient.setAttribute('id', gradientId);
      gradient.setAttribute('x1', '0%');
      gradient.setAttribute('y1', '0%');
      gradient.setAttribute('x2', '100%');
      gradient.setAttribute('y2', '0%');

      const colors = {
        'primary-connection': ['var(--md-sys-color-primary)', 'var(--md-sys-color-secondary)'],
        'secondary-connection': ['var(--md-sys-color-tertiary)', 'var(--md-sys-color-primary)'],
        'skill-transfer': ['var(--md-sys-color-secondary)', 'var(--md-sys-color-tertiary)']
      };

      const [startColor, endColor] = colors[connectionType] || colors['primary-connection'];

      const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop1.setAttribute('offset', '0%');
      stop1.setAttribute('stop-color', startColor);
      stop1.setAttribute('stop-opacity', '0.8');

      const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop2.setAttribute('offset', '100%');
      stop2.setAttribute('stop-color', endColor);
      stop2.setAttribute('stop-opacity', '0.8');

      gradient.appendChild(stop1);
      gradient.appendChild(stop2);
      defs.appendChild(gradient);
    }

    function addDataFlowParticles(pathElement, connectionId) {
      const pathLength = pathElement.getTotalLength();
      const particleCount = 3;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        particle.classList.add('connection-particle', 'pulse');
        particle.setAttribute('r', '3');
        particle.setAttribute('fill', 'var(--md-sys-color-primary)');

        svg.appendChild(particle);

        // Animate particle along path
        const animateMotion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
        animateMotion.setAttribute('dur', '3s');
        animateMotion.setAttribute('repeatCount', 'indefinite');
        animateMotion.setAttribute('begin', `${i * 1}s`);

        const mpath = document.createElementNS('http://www.w3.org/2000/svg', 'mpath');
        mpath.setAttribute('href', `#connection-${connectionId}`);

        animateMotion.appendChild(mpath);
        particle.appendChild(animateMotion);
      }
    }

    function addConnectionLabel(connectionId, x, y) {
      const workCard = document.querySelector(`[data-connection="${connectionId}"]`);
      const labelText = workCard?.dataset.connectionLabel || 'Connection';
      const connectionStrength = workCard?.dataset.connectionStrength || 'medium';

      const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
      foreignObject.setAttribute('x', x - 60);
      foreignObject.setAttribute('y', y - 15);
      foreignObject.setAttribute('width', '120');
      foreignObject.setAttribute('height', '30');

      const labelDiv = document.createElement('div');
      labelDiv.classList.add('connection-label', 'active', `strength-${connectionStrength}`);
      labelDiv.textContent = labelText;
      labelDiv.style.textAlign = 'center';

      foreignObject.appendChild(labelDiv);
      svg.appendChild(foreignObject);

      // Auto-hide label after duration based on strength
      const hideDuration = connectionStrength === 'very-high' ? 5000 :
        connectionStrength === 'high' ? 4000 : 3000;

      setTimeout(() => {
        labelDiv.classList.remove('active');
        setTimeout(() => foreignObject.remove(), 300);
      }, hideDuration);
    }

    function addConnectionStrength(connection, startX, startY, endX, endY) {
      // Add pulsing dots at connection points
      const startDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      startDot.setAttribute('cx', startX);
      startDot.setAttribute('cy', startY);
      startDot.setAttribute('r', '6');
      startDot.setAttribute('fill', 'var(--md-sys-color-primary)');
      startDot.setAttribute('opacity', '0.8');
      startDot.style.animation = 'connectionPulse 2s ease-in-out infinite';

      const endDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      endDot.setAttribute('cx', endX);
      endDot.setAttribute('cy', endY);
      endDot.setAttribute('r', '6');
      endDot.setAttribute('fill', 'var(--md-sys-color-secondary)');
      endDot.setAttribute('opacity', '0.8');
      endDot.style.animation = 'connectionPulse 2s ease-in-out infinite 0.5s';

      svg.appendChild(startDot);
      svg.appendChild(endDot);
    }
  }

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

// ===== ANALYTICS FUNCTIONALITY =====

function initializeAnalytics() {
  // Track page view
  if (window.trackPortfolioEvent) {
    window.trackPortfolioEvent('page_view', 'Navigation', window.location.pathname, 1);
  }

  // Track user engagement
  trackUserEngagement();

  // Track scroll depth
  trackScrollDepth();

  // Track connection interactions
  trackConnectionInteractions();

  // Track performance metrics
  trackPerformanceMetrics();
}

function trackUserEngagement() {
  let engagementTimer;
  let isEngaged = false;

  const trackEngagement = () => {
    if (!isEngaged) {
      isEngaged = true;
      sessionStorage.setItem('user_engaged', 'true');

      if (window.trackPortfolioEvent) {
        window.trackPortfolioEvent('engagement', 'User', 'engaged', 1);
      }
    }
  };

  // Track various engagement signals
  const engagementEvents = ['scroll', 'click', 'keydown', 'mousemove', 'touchstart'];

  engagementEvents.forEach(event => {
    document.addEventListener(event, () => {
      clearTimeout(engagementTimer);
      engagementTimer = setTimeout(trackEngagement, 2000);
    }, { once: true, passive: true });
  });
}

function trackScrollDepth() {
  const scrollDepths = [25, 50, 75, 90];
  const tracked = new Set();

  const trackScroll = () => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

    scrollDepths.forEach(depth => {
      if (scrollPercent >= depth && !tracked.has(depth)) {
        tracked.add(depth);

        if (window.trackPortfolioEvent) {
          window.trackPortfolioEvent('scroll_depth', 'Engagement', `${depth}%`, depth);
        }
      }
    });
  };

  window.addEventListener('scroll', trackScroll, { passive: true });
}

function trackConnectionInteractions() {
  // Track work-project connection interactions
  document.addEventListener('click', (e) => {
    const workCard = e.target.closest('.work-card[data-connection]');
    const projectCard = e.target.closest('.project-card[data-connection]');

    if (workCard) {
      const connectionId = workCard.dataset.connection;
      const connectionType = workCard.dataset.connectionType;

      if (window.trackPortfolioEvent) {
        window.trackPortfolioEvent('connection_click', 'Interaction', `work_${connectionId}`, 1);
        window.trackPortfolioEvent('connection_type', 'Interaction', connectionType, 1);
      }
    }

    if (projectCard) {
      const connectionId = projectCard.dataset.connection;
      const connectionType = projectCard.dataset.connectionType;

      if (window.trackPortfolioEvent) {
        window.trackPortfolioEvent('connection_click', 'Interaction', `project_${connectionId}`, 1);
        window.trackPortfolioEvent('connection_type', 'Interaction', connectionType, 1);
      }
    }
  });

  // Track contact button clicks
  document.querySelectorAll('.contact-button').forEach(button => {
    button.addEventListener('click', () => {
      const iconText = button.querySelector('md-icon').textContent;

      if (window.trackPortfolioEvent) {
        window.trackPortfolioEvent('contact_click', 'Contact', iconText, 1);
      }
    });
  });
}

function trackPerformanceMetrics() {
  // Track page load performance
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];

      if (perfData && window.trackPortfolioEvent) {
        const loadTime = Math.round(perfData.loadEventEnd - perfData.fetchStart);
        const domContentLoaded = Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart);

        window.trackPortfolioEvent('performance', 'Load Time', 'page_load', loadTime);
        window.trackPortfolioEvent('performance', 'Load Time', 'dom_content_loaded', domContentLoaded);
      }
    }, 1000);
  });
}


