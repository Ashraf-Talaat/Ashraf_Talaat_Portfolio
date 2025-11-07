class PortfolioWebsite {
  constructor() {
    this.currentTheme = "dark";
    this.isScrolling = false;
    this.init();
  }

  init() {
    this.setupThemeToggle();
    this.setupScrollAnimations();
    this.setupSmoothScrolling();
    this.setupScrollToTop();
    this.setupFormHandling();
    this.setupInteractiveElements();
    this.setupParallaxEffects();
    this.setupFingerprintScroll();
    this.loadThemePreference();
  }

  // Theme Management
  setupThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;
    const icon = themeToggle.querySelector("i");

    themeToggle.addEventListener("click", () => {
      this.toggleTheme();
    });

    // Keyboard support
    themeToggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  toggleTheme() {
    const body = document.body;
    const icon = document.querySelector("#themeToggle i");

    if (this.currentTheme === "dark") {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
      this.currentTheme = "light";
      icon.className = "fas fa-sun";
      localStorage.setItem("theme", "light");
    } else {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
      this.currentTheme = "dark";
      icon.className = "fas fa-moon";
      localStorage.setItem("theme", "dark");
    }

    // Add transition effect
    this.addThemeTransition();
  }

  addThemeTransition() {
    const body = document.body;
    body.style.transition = "all 0.3s ease";

    setTimeout(() => {
      body.style.transition = "";
    }, 300);
  }

  loadThemePreference() {
    const savedTheme = localStorage.getItem("theme");
    const body = document.body;
    const icon = document.querySelector("#themeToggle i");

    if (savedTheme === "light") {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
      this.currentTheme = "light";
      icon.className = "fas fa-sun";
    }
  }

  // Scroll Animations
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate");
        }
      });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll("[data-aos]");
    animatedElements.forEach((el) => observer.observe(el));

    // Add staggered animations for project cards
    this.setupStaggeredAnimations();
  }

  setupStaggeredAnimations() {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });
  }

  // Smooth Scrolling
  setupSmoothScrolling() {
    // Smooth scroll for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
          this.smoothScrollTo(offsetTop, 800);
        }
      });
    });

    // Smooth scroll for navigation links
    this.setupNavigationSmoothScroll();
  }

  setupNavigationSmoothScroll() {
    const navLinks = document.querySelectorAll(
      ".nav a, .hero-buttons a, .view-more-link, .learn-more-link"
    );

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        if (link.getAttribute("href").startsWith("#")) {
          e.preventDefault();
          const targetId = link.getAttribute("href");
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            this.smoothScrollTo(offsetTop, 800);
          }
        }
      });
    });
  }

  smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = this.easeInOutCubic(
        timeElapsed,
        startPosition,
        distance,
        duration
      );
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  }

  easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  }

  // Scroll to Top
  setupScrollToTop() {
    const scrollTopBtn = document.getElementById("scrollTop");

    if (!scrollTopBtn) return;

    // Show/hide scroll to top button
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = "1";
        scrollTopBtn.style.visibility = "visible";
      } else {
        scrollTopBtn.style.opacity = "0";
        scrollTopBtn.style.visibility = "hidden";
      }
    });

    // Scroll to top functionality
    scrollTopBtn.addEventListener("click", () => {
      this.smoothScrollTo(0, 800);
    });

    // Keyboard support
    scrollTopBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.smoothScrollTo(0, 800);
      }
    });
  }

  // Form Handling
  setupFormHandling() {
    const contactForm = document.querySelector(".contact-form form");

    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleFormSubmission(contactForm);
      });

      // Add floating label effect
      this.setupFloatingLabels();
    }
  }

  setupFloatingLabels() {
    const formInputs = document.querySelectorAll(
      ".form-group input, .form-group textarea"
    );

    formInputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused");
      });

      input.addEventListener("blur", () => {
        if (!input.value) {
          input.parentElement.classList.remove("focused");
        }
      });

      // Check if input has value on load
      if (input.value) {
        input.parentElement.classList.add("focused");
      }
    });
  }

  handleFormSubmission(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      // Show success message
      this.showNotification("Message sent successfully!", "success");

      // Reset form
      form.reset();
      form.querySelectorAll(".form-group").forEach((group) => {
        group.classList.remove("focused");
      });

      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  }

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${
                  type === "success" ? "check-circle" : "info-circle"
                }"></i>
                <span>${message}</span>
            </div>
        `;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-card);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            border: 1px solid var(--border);
            box-shadow: var(--shadow);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }

  // Interactive Elements
  setupInteractiveElements() {
    // Project card interactions
    this.setupProjectCards();

    // Skill item interactions
    this.setupSkillItems();

    // Social link interactions
    this.setupSocialLinks();

    // Button hover effects
    this.setupButtonEffects();
  }

  setupProjectCards() {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px) scale(1.02)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
      });

      // Click to expand (optional)
      card.addEventListener("click", () => {
        this.expandProjectCard(card);
      });
    });
  }

  expandProjectCard(card) {
    // Add expansion animation
    card.style.transition = "all 0.3s ease";
    card.style.transform = "scale(1.05)";

    setTimeout(() => {
      card.style.transform = "scale(1)";
    }, 300);
  }

  setupSkillItems() {
    const skillItems = document.querySelectorAll(".skill-item");

    skillItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        item.style.transform = "scale(1.1) rotate(5deg)";
      });

      item.addEventListener("mouseleave", () => {
        item.style.transform = "scale(1) rotate(0deg)";
      });
    });
  }

  setupSocialLinks() {
    const socialLinks = document.querySelectorAll(".social-link");

    socialLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        link.style.transform = "translateY(-3px) scale(1.1)";
      });

      link.addEventListener("mouseleave", () => {
        link.style.transform = "translateY(0) scale(1)";
      });
    });
  }

  setupButtonEffects() {
    const buttons = document.querySelectorAll(
      ".btn, .action-btn, .details-btn"
    );

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        button.style.transform = "translateY(-2px)";
      });

      button.addEventListener("mouseleave", () => {
        button.style.transform = "translateY(0)";
      });
    });
  }

  // Parallax Effects
  setupParallaxEffects() {
    window.addEventListener("scroll", () => {
      if (this.isScrolling) return;

      this.isScrolling = true;
      requestAnimationFrame(() => {
        this.updateParallax();
        this.isScrolling = false;
      });
    });
  }

  updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(
      ".header::before, .profile-frame"
    );

    parallaxElements.forEach((element) => {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }

  // Performance Optimization
  optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener("scroll", () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        this.handleScrollEnd();
      }, 100);
    });
  }

  handleScrollEnd() {
    // Handle scroll end events
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Load more content if near bottom
    if (scrollTop + windowHeight > documentHeight - 100) {
      this.loadMoreContent();
    }
  }

  loadMoreContent() {
    // Implement infinite scroll or lazy loading here
    console.log("Loading more content...");
  }

  // Accessibility
  setupAccessibility() {
    // Add ARIA labels
    const themeToggle = document.getElementById("themeToggle");
    themeToggle.setAttribute("aria-label", "Toggle dark/light mode");
    themeToggle.setAttribute("role", "button");
    themeToggle.setAttribute("tabindex", "0");

    // Add keyboard navigation
    this.setupKeyboardNavigation();
  }

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      // Escape key to close modals or reset focus
      if (e.key === "Escape") {
        document.activeElement.blur();
      }

      // Tab key navigation enhancement
      if (e.key === "Tab") {
        this.handleTabNavigation(e);
      }
    });
  }

  handleTabNavigation(e) {
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }

  // Fingerprint Scroll to About Section
  setupFingerprintScroll() {
    const fingerprintOverlay = document.getElementById("fingerprintOverlay");
    if (fingerprintOverlay) {
      fingerprintOverlay.addEventListener("click", () => {
        const aboutSection = document.querySelector(".about-section");
        if (aboutSection) {
          const offsetTop = aboutSection.offsetTop - 80;
          this.smoothScrollTo(offsetTop, 800);
        }
      });
    }
  }

  // Utility Functions
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
}

// Initialize the portfolio website when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const portfolio = new PortfolioWebsite();

  // Add some additional interactive features
  portfolio.setupAccessibility();
  portfolio.optimizePerformance();

  // Add loading animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });
});

// Add some CSS for the notification system
const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content i {
        color: var(--accent-primary);
    }
    
    .notification-success .notification-content i {
        color: var(--success);
    }
    
    .notification-error .notification-content i {
        color: var(--error);
    }
    
    .notification-warning .notification-content i {
        color: var(--warning);
    }
    
    .focused input,
    .focused textarea {
        border-color: var(--accent-primary);
        box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
    }
    
    .loaded .header {
        animation: fadeIn 1s ease-out;
    }
    
    .loaded .projects-section,
    .loaded .about-section,
    .loaded .contact-section {
        animation: fadeInUp 1s ease-out;
    }
`;

document.head.appendChild(notificationStyles);

// Add intersection observer polyfill for older browsers
if (!("IntersectionObserver" in window)) {
  // Simple fallback for older browsers
  document.querySelectorAll("[data-aos]").forEach((el) => {
    el.classList.add("aos-animate");
  });
}

// Add smooth scroll polyfill for older browsers
if (!("scrollBehavior" in document.documentElement.style)) {
  // Fallback smooth scrolling
  const smoothScrollPolyfill = (target, duration) => {
    const targetPosition = target.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutCubic(
        timeElapsed,
        startPosition,
        distance,
        duration
      );
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const easeInOutCubic = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t * t + b;
      t -= 2;
      return (c / 2) * (t * t * t + 2) + b;
    };

    requestAnimationFrame(animation);
  };

  // Override smooth scroll behavior
  window.smoothScrollTo = smoothScrollPolyfill;
}

// *********************************************************************************

// projects details data
const projectsData = [
  {
    id: "law-counsel",
    title: "Law Counsel",
    image: "./images/law-counsel.png",
    description:
      "Developed a comprehensive legal platform that connects clients with specialized lawyers across various fields of law. Implemented features including lawyer search, detailed profiles, secure online booking for legal consultations, legal articles, latest updates, and a real-time chat system, ensuring accessible, efficient, and trustworthy legal services.",
    technologies: ["Next.js", "Tailwind CSS", "Firebase", "JavaScript (ES6)"],
    live: "https://law-six-neon.vercel.app/",
    github: "https://github.com/Ashraf-Talaat/law-counsel-web.git",
  },
  {
    id: "yad-b-yad",
    title: "Yad B Yad",
    image: "./images/Yad-b-Yad.png",
    description:
      "Developed “Yad B Yad” campaign website to showcase campaigns through an interactive and engaging interface, ensuring user-friendly navigation and responsive design.",
    technologies: ["HTML5", "CSS3", "Bootstrap", "JavaScript (ES6)"],
    live: "#",
    github: "https://github.com/AMOSAD0/Project-Yad-b-Yad.git",
  },
  {
    id: "weather-site",
    title: "Weather Site",
    image: "./images/weather.png",
    description:
      "Developed a Weather App, a simple and interactive web application that allows users to check the weather for any city in Egypt with an attractive, responsive design compatible with all devices. Use the OpenWeatherMap API to fetch live data.",
    technologies: ["HTML5", "CSS3", "JavaScript (ES6)", "API"],
    live: "https://ashraf-weather-site.netlify.app/",
    github: "https://github.com/Ashraf-Talaat/Weather_Website_ITI.git",
  },
  {
    id: "to-do-list",
    title: "Smart To-Do List",
    image: "./images/todo-list.png",
    description:
      "Developed a dynamic and user-friendly To-Do List application using React.js and Material UI, enabling users to efficiently manage their daily tasks.The app allows users to add new tasks, edit existing ones, delete completed items, and filter tasks based on their status — whether All, Completed, or Incomplete.Designed with an elegant Material UI interface, ensuring a clean, modern, and responsive experience across all devices.",
    technologies: ["React.js", "Material UI", "CSS3", "JavaScript (ES6)"],
    live: "https://react-todo-list-ashraf.netlify.app/",
    github: "https://github.com/Ashraf-Talaat/react_todo_app_tarmez",
  },
  {
    id: "egg-bird",
    title: "Egg Catcher_Bird Shooter ",
    image: "./images/egg-bird.png",
    description:
      "Built two interactive browser games — Egg Catcher and Bird Shooter — using HTML, CSS, and JavaScript, featuring smooth animations, responsive design, and engaging gameplay.",
    technologies: ["HTML5", "CSS3", "JavaScript (ES6)"],
    live: "https://ashraf-talaat.github.io/simple_games_ITI/",
    github: "https://github.com/Ashraf-Talaat/simple_games_ITI",
  },
  {
    id: "bootstrap-template",
    title: "Bootstrap Template",
    image: "./images/bootstrap.png",
    description:
      "Developed a responsive Bootstrap landing page template with a clean design and customizable sections.",
    technologies: ["HTML5", "CSS3", "Bootstrap"],
    live: "https://ashraf-talaat.github.io/Bootstrap_Template_ITI/",
    github: "https://github.com/Ashraf-Talaat/Bootstrap_Template_ITI",
  },
  {
    id: "ui-page",
    title: "UI Page",
    image: "./images/ui page.png",
    description:
      "Built a fully responsive landing page using pure HTML and CSS, featuring custom animations and modern visual effects.",
    technologies: ["HTML5", "CSS3"],
    live: "https://ashraf-talaat.github.io/UI_Page_Elzero/",
    github: "https://github.com/Ashraf-Talaat/UI_Page_Elzero",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    image: "./images/dashboard.png",
    description:
      "Built a fully responsive dashboard using pure HTML and CSS, featuring custom animations, interactive elements, and a creative UI design.",
    technologies: ["HTML5", "CSS3"],
    live: "https://ashraf-talaat.github.io/Dashboard_Elzero/",
    github: "https://github.com/Ashraf-Talaat/Dashboard_Elzero",
  },
  {
    id: "fruits-shop",
    title: "Fruits Shop",
    image: "./images/fruits shop.png",
    description:
      "Built a modern and responsive Fruits Shop landing page using HTML, CSS, and Font Awesome icons, featuring clean design and smooth visual effects.",
    technologies: ["HTML5", "CSS3", "Font Awesome icons"],
    live: "https://ashraf-talaat.github.io/Fruits-Shop_ITI/",
    github: "https://github.com/Ashraf-Talaat/Fruits-Shop_ITI",
  },
  {
    id: "omnifood",
    title: "OmniFood",
    image: "./images/omnifood.png",
    description:
      "Developed a responsive restaurant landing page (OmniFood) with HTML and CSS, showcasing elegant design, intuitive layout, and subtle animations.",
    technologies: ["HTML5", "CSS3"],
    live: "https://ashraf-talaat.github.io/OmniFood_ITI/",
    github: "https://github.com/Ashraf-Talaat/OmniFood_ITI",
  },
];

// ********* display project section ***********

const container = document.getElementById("projects-container");

const pathname = window.location.pathname;
const isHomePage =
  pathname === "/" ||
  pathname.endsWith("index.html") ||
  pathname.toLowerCase().includes("index");

const projectsToShow = isHomePage ? projectsData.slice(0, 6) : projectsData;

projectsToShow.forEach((p) => {
  const card = document.createElement("div");
  card.className = "work-card";

  // check if there is link
  const hasGithub = p.github && p.github !== "#";
  const hasLive = p.live && p.live !== "#";

  card.innerHTML = `
    <div class="work-image">
      <img src="${p.image}" alt="${p.title}" class="work-thumbnail">
    </div>
    <h3 class="work-title">${p.title}</h3>
    <div class="work-tech">
      ${p.technologies
        .map((t) => `<span class="technologies">${t}</span>`)
        .join("")}
    </div>
    <div class="work-actions">
      <div class="work-actions-links">
        <a href="${hasGithub ? p.github : "#"}" 
           target="_blank" 
           class="action-btn ${!hasGithub ? "disabled" : ""}">
           <i class="fab fa-github"></i>
        </a>
        <a href="${hasLive ? p.live : "#"}" 
           target="_blank" 
           class="action-btn ${!hasLive ? "disabled" : ""}">
           <i class="fas fa-external-link-alt"></i>
        </a>
      </div>
      <button class="details-btn" onclick="openProjectDetails('${
        p.id
      }')">Details</button>
    </div>
  `;

  container.appendChild(card);
});

// ******** Project Details Function ************
function openProjectDetails(projectId) {
  // Create modal for project details
  const project = projectsData.find((p) => p.id === projectId);
  if (!project) return;

  const modal = document.createElement("div");
  modal.className = "project-modal";
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>${project.title}</h2>
        <button class="modal-close" onclick="this.closest('.project-modal').remove()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <div class="project-preview">
          <img src="${project.image}" alt="${project.title}" />
        </div>
        <div class="project-info">
          <p>${project.description}</p>
          <h4>Technologies:</h4>
          <div class="work-tech">
            ${project.technologies
              .map((t) => `<span class="technologies">${t}</span>`)
              .join("")}
          </div>
          <div class="work-actions-links">
            <a href="${project.github}" target="_blank" class="action-btn">
              <i class="fab fa-github"></i>
            </a>
            <a href="${project.live}" target="_blank" class="action-btn">
              <i class="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
  // Add modal styles
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

  document.body.appendChild(modal);

  // Animate in
  setTimeout(() => {
    modal.style.opacity = "1";
  }, 10);
}
