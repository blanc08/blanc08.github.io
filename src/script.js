// Material 3 Portfolio Interactions

document.addEventListener('DOMContentLoaded', function () {
  // Initialize Material Web Components
  console.log('Material 3 Portfolio loaded');

  // Initialize Connected Magazine
  initializeConnectedMagazine();

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

  // Connected Magazine Functionality
  function initializeConnectedMagazine() {
    const workCards = document.querySelectorAll('.work-card[data-connection]');
    const projectCards = document.querySelectorAll('.project-card[data-connection]');
    const svg = document.querySelector('.connection-lines');
    const journeySection = document.querySelector('.journey-section');
    const timeline = document.querySelector('.timeline-progress');

    let connections = new Map();
    let currentConnection = null;
    let isHovering = false;

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
          if (!isHovering) {
            deactivateConnection();
          }
        });
      });

      // Project card hover events
      projectCards.forEach(projectCard => {
        projectCard.addEventListener('mouseenter', () => {
          const connectionId = projectCard.dataset.connection;
          activateConnection(connectionId);
        });

        projectCard.addEventListener('mouseleave', () => {
          if (!isHovering) {
            deactivateConnection();
          }
        });
      });
    }

    function activateConnection(connectionId) {
      if (!connections.has(connectionId)) return;

      const connection = connections.get(connectionId);
      currentConnection = connectionId;
      isHovering = true;

      // Add connected classes
      connection.work.classList.add('connected');
      connection.project.classList.add('connected');

      // Create connection line
      drawConnectionLine(connection);

      // Dim other cards
      workCards.forEach(card => {
        if (card !== connection.work) {
          card.style.opacity = '0.4';
        }
      });

      projectCards.forEach(card => {
        if (card !== connection.project) {
          card.style.opacity = '0.4';
        }
      });
    }

    function deactivateConnection() {
      if (!currentConnection) return;

      isHovering = false;

      setTimeout(() => {
        if (!isHovering) {
          // Remove connected classes
          workCards.forEach(card => {
            card.classList.remove('connected');
            card.style.opacity = '';
          });

          projectCards.forEach(card => {
            card.classList.remove('connected');
            card.style.opacity = '';
          });

          // Remove connection lines
          if (svg) {
            const lines = svg.querySelectorAll('.connection-line');
            lines.forEach(line => line.remove());
          }

          currentConnection = null;
        }
      }, 100);
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

      // Create curved path
      const midX = (startX + endX) / 2;
      const curveOffset = 50;

      const path = `M ${startX} ${startY} Q ${midX} ${startY - curveOffset} ${endX} ${endY}`;

      // Create SVG path element
      const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathElement.setAttribute('d', path);
      pathElement.classList.add('connection-line', 'active');

      // Remove existing lines
      const existingLines = svg.querySelectorAll('.connection-line');
      existingLines.forEach(line => line.remove());

      // Add new line
      svg.appendChild(pathElement);
    }
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

});

// ===== CONNECTED MAGAZINE FUNCTIONALITY =====

class ConnectedMagazine {
  constructor() {
    this.connections = new Map();
    this.isActive = false;
    this.svg = null;
    this.init();
  }

  init() {
    this.setupConnections();
    this.createSVGElements();
    this.bindEvents();
    this.animateOnLoad();
  }

  setupConnections() {
    // Define connections between work experience and projects
    this.connections.set('education-1', {
      work: 'education-1',
      project: 'education-1',
      description: 'Foundation learning projects built during high school'
    });

    this.connections.set('project-1', {
      work: 'project-1',
      project: 'project-1',
      description: 'Professional client websites developed during internship'
    });

    this.connections.set('education-2', {
      work: 'education-2',
      project: 'education-2',
      description: 'Academic research and methodology projects'
    });

    this.connections.set('project-2', {
      work: 'project-2',
      project: 'project-2',
      description: 'Educational platform serving thousands of students'
    });

    this.connections.set('project-3', {
      work: 'project-3',
      project: 'project-3',
      description: 'International microservices architecture development'
    });

    this.connections.set('project-4', {
      work: 'project-4',
      project: 'project-4',
      description: 'Enterprise solutions and system integrations'
    });
  }

  createSVGElements() {
    this.svg = document.querySelector('.connection-lines');
    if (!this.svg) return;

    // Clear existing paths
    this.svg.innerHTML = '';

    // Create defs for gradients and patterns
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

    // Animated gradient
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'connectionGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '0%');

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', 'var(--md-sys-color-primary)');
    stop1.setAttribute('stop-opacity', '0.3');

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '50%');
    stop2.setAttribute('stop-color', 'var(--md-sys-color-tertiary)');
    stop2.setAttribute('stop-opacity', '0.8');

    const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop3.setAttribute('offset', '100%');
    stop3.setAttribute('stop-color', 'var(--md-sys-color-primary)');
    stop3.setAttribute('stop-opacity', '0.3');

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    gradient.appendChild(stop3);
    defs.appendChild(gradient);
    this.svg.appendChild(defs);
  }

  bindEvents() {
    // Add hover events to work and project cards
    this.connections.forEach((connection, id) => {
      const workCard = document.querySelector(`[data-connection="${connection.work}"]`);
      const projectCard = document.querySelector(`[data-connection="${connection.project}"]`);

      if (workCard && projectCard) {
        [workCard, projectCard].forEach(card => {
          card.addEventListener('mouseenter', () => this.highlightConnection(id));
          card.addEventListener('mouseleave', () => this.clearHighlight());
          card.addEventListener('click', () => this.toggleConnection(id));
        });
      }
    });

    // Clear highlight when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('[data-connection]')) {
        this.clearHighlight();
      }
    });
  }

  highlightConnection(connectionId) {
    if (this.isActive) return;

    const connection = this.connections.get(connectionId);
    if (!connection) return;

    const container = document.querySelector('.journey-container');
    if (!container) return;

    container.classList.add('connection-active');

    // Highlight connected cards
    const workCard = document.querySelector(`[data-connection="${connection.work}"]`);
    const projectCard = document.querySelector(`[data-connection="${connection.project}"]`);

    if (workCard) workCard.classList.add('highlighted');
    if (projectCard) projectCard.classList.add('highlighted');

    // Draw connection line
    this.drawConnection(workCard, projectCard, connectionId);
  }

  clearHighlight() {
    if (this.isActive) return;

    const container = document.querySelector('.journey-container');
    if (container) {
      container.classList.remove('connection-active');
    }

    // Remove all highlights
    document.querySelectorAll('.highlighted').forEach(card => {
      card.classList.remove('highlighted');
    });

    // Clear connection lines
    if (this.svg) {
      this.svg.querySelectorAll('.connection-line').forEach(line => line.remove());
    }
  }

  toggleConnection(connectionId) {
    this.isActive = !this.isActive;

    if (this.isActive) {
      this.highlightConnection(connectionId);
      this.showConnectionTooltip(connectionId);
    } else {
      this.clearHighlight();
      this.hideConnectionTooltip();
    }
  }

  drawConnection(workCard, projectCard, connectionId) {
    if (!this.svg || !workCard || !projectCard) return;

    const container = document.querySelector('.journey-container');
    const containerRect = container.getBoundingClientRect();
    const workRect = workCard.getBoundingClientRect();
    const projectRect = projectCard.getBoundingClientRect();

    // Calculate relative positions
    const startX = workRect.right - containerRect.left;
    const startY = (workRect.top + workRect.height / 2) - containerRect.top;
    const endX = projectRect.left - containerRect.left;
    const endY = (projectRect.top + projectRect.height / 2) - containerRect.top;

    // Create curved path
    const midX = (startX + endX) / 2;
    const controlY = Math.min(startY, endY) - 50;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const pathData = `M ${startX} ${startY} Q ${midX} ${controlY} ${endX} ${endY}`;

    path.setAttribute('d', pathData);
    path.setAttribute('stroke', 'url(#connectionGradient)');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('fill', 'none');
    path.setAttribute('class', 'connection-line');
    path.setAttribute('opacity', '0');

    // Add animation
    const pathLength = path.getTotalLength();
    path.setAttribute('stroke-dasharray', pathLength);
    path.setAttribute('stroke-dashoffset', pathLength);

    this.svg.appendChild(path);

    // Animate the line
    path.animate([
      { strokeDashoffset: pathLength, opacity: 0 },
      { strokeDashoffset: 0, opacity: 1 }
    ], {
      duration: 800,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    });

    // Add flowing dots
    this.addFlowingDots(path, pathLength);
  }

  addFlowingDots(path, pathLength) {
    const dotCount = 3;
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('r', '3');
      dot.setAttribute('fill', 'var(--md-sys-color-primary)');
      dot.setAttribute('opacity', '0.8');
      dot.setAttribute('class', 'connection-dot');

      this.svg.appendChild(dot);

      // Animate dot along path
      const motionPath = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
      motionPath.setAttribute('dur', '2s');
      motionPath.setAttribute('repeatCount', 'indefinite');
      motionPath.setAttribute('begin', `${i * 0.5}s`);

      const mpath = document.createElementNS('http://www.w3.org/2000/svg', 'mpath');
      mpath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${path.id || 'connectionPath'}`);

      motionPath.appendChild(mpath);
      dot.appendChild(motionPath);
    }
  }

  showConnectionTooltip(connectionId) {
    const connection = this.connections.get(connectionId);
    if (!connection) return;

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'connection-tooltip';
    tooltip.innerHTML = `
      <div class="tooltip-content">
        <md-icon>link</md-icon>
        <span>${connection.description}</span>
      </div>
    `;

    document.body.appendChild(tooltip);

    // Position tooltip
    const container = document.querySelector('.journey-container');
    const rect = container.getBoundingClientRect();
    tooltip.style.position = 'absolute';
    tooltip.style.top = `${rect.top + 20}px`;
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.zIndex = '1000';

    // Style tooltip
    tooltip.style.background = 'var(--md-sys-color-inverse-surface)';
    tooltip.style.color = 'var(--md-sys-color-inverse-on-surface)';
    tooltip.style.padding = '0.75rem 1rem';
    tooltip.style.borderRadius = 'var(--md-sys-shape-corner-medium)';
    tooltip.style.boxShadow = 'var(--md-sys-elevation-level3)';
    tooltip.style.fontSize = '0.875rem';
    tooltip.style.maxWidth = '300px';
    tooltip.style.textAlign = 'center';

    // Animate tooltip
    tooltip.animate([
      { opacity: 0, transform: 'translateX(-50%) translateY(10px)' },
      { opacity: 1, transform: 'translateX(-50%) translateY(0)' }
    ], {
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    });
  }

  hideConnectionTooltip() {
    const tooltip = document.querySelector('.connection-tooltip');
    if (tooltip) {
      tooltip.animate([
        { opacity: 1, transform: 'translateX(-50%) translateY(0)' },
        { opacity: 0, transform: 'translateX(-50%) translateY(-10px)' }
      ], {
        duration: 200,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      }).addEventListener('finish', () => tooltip.remove());
    }
  }

  animateOnLoad() {
    // Animate timeline progress
    setTimeout(() => {
      const timelineProgress = document.querySelector('.timeline-progress');
      if (timelineProgress) {
        timelineProgress.style.height = '100%';
      }
    }, 500);

    // Stagger card animations
    const workCards = document.querySelectorAll('.work-card');
    const projectCards = document.querySelectorAll('.project-card');

    [...workCards, ...projectCards].forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';

      setTimeout(() => {
        card.animate([
          { opacity: 0, transform: 'translateY(20px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], {
          duration: 600,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards'
        });
      }, index * 100);
    });
  }
}

// Initialize connected magazine
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.journey-container')) {
    new ConnectedMagazine();
  }
});

// ===== ORIGINAL TIMELINE EXPANDABLE FUNCTIONALITY (Preserved for fallback) =====
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
