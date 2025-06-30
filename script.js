// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Theme toggling functionality
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference or use default
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
  icon.classList.remove('fa-sun');
  icon.classList.add('fa-moon');
} else {
  // Ensure we start with correct icon for light theme
  icon.classList.remove('fa-moon');
  icon.classList.add('fa-sun');
}

// Toggle theme
themeToggle.addEventListener('click', () => {
  // Toggle the dark-theme class
  body.classList.toggle('dark-theme');
  
  // Update icon based on the current state after toggle
  if (body.classList.contains('dark-theme')) {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    localStorage.setItem('theme', 'dark');
  } else {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    localStorage.setItem('theme', 'light');
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
   
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
   
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      });
    }
  });
});

// Tab functionality for projects section
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
   
    // Add active class to clicked button
    button.classList.add('active');
   
    // Show corresponding content
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
 
  let currentSection = '';
 
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
   
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
 
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
  
  // Check and animate timeline items when they come into view
  animateTimelineOnScroll();
});

// Timeline animation on scroll
function animateTimelineOnScroll() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach(item => {
    // Get the position of the item relative to the viewport
    const rect = item.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Check if the item is visible (in viewport)
    if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) {
      item.classList.add('animate');
    } else {
      // Optional: remove the class when item is out of view for reanimation
      // item.classList.remove('animate');
    }
  });
}

// Initial animations on page load after a short delay
window.addEventListener('load', () => {
  setTimeout(() => {
    animateTimelineOnScroll();
  }, 300);
});

// Mobile menu toggle (add mobile menu markup to HTML if needed)
// Example implementation:
/*
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}
*/