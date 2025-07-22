// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu if open
      const navLinks = document.querySelector('.nav-links');
      const hamburger = document.getElementById('hamburger');
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      }
    }
  });
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile hamburger menu functionality
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', function() {
  this.classList.toggle('active');
  navLinks.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
  if (!hamburger?.contains(e.target) && !navLinks?.contains(e.target)) {
    navLinks?.classList.remove('active');
    hamburger?.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Close mobile menu on window resize
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    navLinks?.classList.remove('active');
    hamburger?.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Scroll animations using Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      
      // Add special animations for different elements
      if (entry.target.classList.contains('content-card')) {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      } else if (entry.target.classList.contains('tech-item')) {
        entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
      } else if (entry.target.classList.contains('stat-item')) {
        // Animate numbers
        animateNumber(entry.target);
      }
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', function() {
  // Add initial styles for animation
  const animatedElements = document.querySelectorAll('.content-card, .tech-item, .blog-card, .prototype-card, .contact-item, .stat-item, .opening-card');
  
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
});

// Animate numbers in statistics
function animateNumber(element) {
  const numberElement = element.querySelector('.stat-number');
  if (!numberElement) return;
  
  const finalNumber = numberElement.textContent;
  const isPercent = finalNumber.includes('%');
  const isPlus = finalNumber.includes('+');
  const numericValue = parseInt(finalNumber.replace(/[^0-9]/g, ''));
  
  let currentNumber = 0;
  const increment = Math.ceil(numericValue / 30);
  
  const timer = setInterval(() => {
    currentNumber += increment;
    if (currentNumber >= numericValue) {
      currentNumber = numericValue;
      clearInterval(timer);
    }
    
    let displayText = currentNumber.toString();
    if (isPlus) displayText += '+';
    if (isPercent) displayText += '%';
    
    numberElement.textContent = displayText;
  }, 50);
}

// Form handling
const contactForm = document.querySelector('.contact-form form');
contactForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const submitButton = this.querySelector('.submit-button');
  const originalText = submitButton.innerHTML;
  
  // Show loading state
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitButton.disabled = true;
  
  // Simulate form submission (replace with actual form handling)
  setTimeout(() => {
    submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitButton.style.background = 'var(--success-green)';
    
    // Reset form
    this.reset();
    
    // Reset button after delay
    setTimeout(() => {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
      submitButton.style.background = '';
    }, 3000);
  }, 2000);
});

// Demo button functionality
const demoButton = document.querySelector('.demo-button');
demoButton?.addEventListener('click', function() {
  // Add ripple effect
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  this.appendChild(ripple);
  
  // Simulate demo launch
  this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Loading Demo...</span>';
  
  setTimeout(() => {
    alert('Demo would launch here! This is a placeholder for the actual demo functionality.');
    this.innerHTML = '<span>Try Demo</span> <i class="fas fa-external-link-alt"></i>';
    ripple.remove();
  }, 2000);
});

// Apply button functionality
document.querySelectorAll('.apply-button').forEach(button => {
  button.addEventListener('click', function() {
    const jobTitle = this.closest('.opening-card').querySelector('h3').textContent;
    
    // Simple modal-like alert (replace with actual application modal)
    if (confirm(`Apply for ${jobTitle}? This would typically open an application form or redirect to a job portal.`)) {
      this.innerHTML = 'Application Started!';
      this.style.background = 'var(--success-green)';
      this.style.borderColor = 'var(--success-green)';
      this.style.color = 'white';
      
      setTimeout(() => {
        this.innerHTML = 'Apply Now';
        this.style.background = '';
        this.style.borderColor = '';
        this.style.color = '';
      }, 3000);
    }
  });
});

// Parallax effect for floating elements
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const floatElements = document.querySelectorAll('.float-element');
  
  floatElements.forEach((element, index) => {
    const speed = 0.5 + (index * 0.2);
    element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
  });
});

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
  // Add tilt effect to cards
  const cards = document.querySelectorAll('.content-card, .blog-card, .prototype-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) rotateX(5deg)';
      this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) rotateX(0)';
    });
  });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
  // Close mobile menu with Escape key
  if (e.key === 'Escape') {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.getElementById('hamburger');
    
    if (navLinks?.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburger?.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

// Add loading animation to page
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
  
  // Trigger hero animations
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.animation = 'fadeInUp 1s ease forwards';
  }
});

// Throttle scroll events for better performance
function throttle(func, wait) {
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

// Throttled scroll handler
const throttledScrollHandler = throttle(function() {
  // Add any additional scroll-based animations or effects here
  const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
  
  // Update custom scrollbar progress (if you want to add a progress bar)
  // document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Add smooth transitions to dynamically loaded content
const addSmoothTransitions = (element) => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  
  requestAnimationFrame(() => {
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  });
};

// Console welcome message

console.log('%c🚀 Welcome to VERNOVATE!', 'color: #FFD700; font-size: 20px; font-weight: bold;');
console.log('%cAI & Computer Vision Innovation', 'color: #00D9FF; font-size: 14px;');
console.log('%cInterested in joining our team? Check out our careers section!', 'color: #B967DB; font-size: 12px;');


