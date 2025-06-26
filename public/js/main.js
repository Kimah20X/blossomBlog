// Mobile menu toggle
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  mobileNav.classList.toggle('show');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  const mobileNav = document.getElementById('mobileNav');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  
  if (!mobileNav.contains(event.target) && !menuBtn.contains(event.target)) {
    mobileNav.classList.remove('show');
  }
});

// Like post functionality
async function likePost(slug) {
  try {
    const response = await fetch(`/posts/${slug}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      const likeCount = document.getElementById('like-count');
      const likeBtn = document.querySelector('.like-btn');
      
      if (likeCount) {
        likeCount.textContent = data.likes;
        likeBtn.classList.add('liked');
        
        // Add animation
        likeBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
          likeBtn.style.transform = 'scale(1)';
        }, 200);
      }
    }
  } catch (error) {
    console.error('Error liking post:', error);
  }
}

// Share post functionality
function sharePost() {
  const title = document.querySelector('.post-title').textContent;
  const url = window.location.href;

  if (navigator.share) {
    navigator.share({
      title: title,
      url: url,
    }).catch(console.error);
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(url).then(() => {
      showNotification('Link copied to clipboard!');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showNotification('Link copied to clipboard!');
    });
  }
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'flash-message flash-success';
  notification.innerHTML = `
    ${message}
    <button onclick="this.parentElement.remove()" class="flash-close">&times;</button>
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 3000);
}

// Auto-hide flash messages
document.addEventListener('DOMContentLoaded', function() {
  const flashMessages = document.querySelectorAll('.flash-message');
  
  flashMessages.forEach(message => {
    setTimeout(() => {
      if (message.parentElement) {
        message.style.opacity = '0';
        message.style.transform = 'translateX(100%)';
        setTimeout(() => {
          message.remove();
        }, 300);
      }
    }, 5000);
  });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Form validation enhancement
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = 'var(--error-color)';
          
          // Remove error styling on input
          field.addEventListener('input', function() {
            this.style.borderColor = '';
          }, { once: true });
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        showNotification('Please fill in all required fields.');
      }
    });
  });
});

// Search functionality enhancement
document.addEventListener('DOMContentLoaded', function() {
  const searchInputs = document.querySelectorAll('.search-input');
  
  searchInputs.forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.closest('form').submit();
      }
    });
  });
});

// Image lazy loading fallback
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
});

// Add loading states to buttons
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('button[type="submit"], .btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      if (this.type === 'submit') {
        this.style.opacity = '0.7';
        this.style.pointerEvents = 'none';
        
        // Reset after 3 seconds (fallback)
        setTimeout(() => {
          this.style.opacity = '';
          this.style.pointerEvents = '';
        }, 3000);
      }
    });
  });
});