// Create confetti
function createConfetti() {
    const colors = ['#ff1493', '#ff69b4', '#ffb6c1', '#ffd700', '#87cefa', '#ff85a2', '#ff0'];
    const container = document.getElementById('confetti-container');
    
    for (let i = 0; i < 200; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 5 + 's';
        confetti.style.width = Math.random() * 15 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.animationDuration = Math.random() * 3 + 3 + 's';
        container.appendChild(confetti);
    }
}

// Create balloons
function createBalloons() {
    const colors = ['#ff1493', '#ff69b4', '#ffb6c1', '#ffd700', '#87cefa', '#ff85a2'];
    const container = document.getElementById('balloons-container');
    const balloonShapes = ['', 'ellipse', 'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)'];
    
    for (let i = 0; i < 15; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 90 + 5 + 'vw';
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.animationDelay = Math.random() * 5 + 's';
        balloon.style.animationDuration = Math.random() * 10 + 10 + 's';
        
        // Random balloon shape
        if (Math.random() > 0.7) {
            balloon.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
        } else if (Math.random() > 0.5) {
            balloon.style.clipPath = balloonShapes[1];
        }
        
        // Add pop effect
        balloon.addEventListener('click', function() {
            popBalloon(this);
        });
        
        container.appendChild(balloon);
    }
}

// Balloon pop effect
function popBalloon(balloon) {
    // Create pop effect
    const pop = document.createElement('div');
    pop.className = 'balloon-pop';
    pop.style.left = balloon.offsetLeft + 'px';
    pop.style.top = balloon.offsetTop + 'px';
    document.body.appendChild(pop);
    
    // Animate pop
    setTimeout(() => {
        pop.style.transform = 'scale(2)';
        pop.style.opacity = '0.8';
        setTimeout(() => {
            pop.remove();
        }, 300);
    }, 10);
    
    // Remove balloon
    balloon.remove();
    
    // Show surprise message occasionally
    if (Math.random() > 0.7) {
        setTimeout(() => {
            showPopup("Balloon Surprise!", "You popped a balloon! Here's a virtual hug! 🤗");
        }, 500);
    }
}

// Show popup message
function showPopup(title, message) {
    const popup = document.getElementById('popupMessage');
    const overlay = document.getElementById('popupOverlay');
    
    if (title) popup.querySelector('h3').textContent = title;
    if (message) popup.querySelector('p').textContent = message;
    
    overlay.classList.add('show');
    popup.classList.add('show');
}

// Close popup
function closePopup() {
    const popup = document.getElementById('popupMessage');
    const giftPopup = document.getElementById('giftPopup');
    const overlay = document.getElementById('popupOverlay');
    
    overlay.classList.remove('show');
    popup.classList.remove('show');
    giftPopup.classList.remove('show');
}

// Scroll to section
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Animate sections on scroll
function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    const photoFrame = document.querySelector('.photo-frame');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            section.classList.add('visible');
            
            // Special animations for specific sections
            if (section.id === 'countdown') {
                document.querySelector('.countdown-container').classList.add('visible');
            }
            
            if (section.id === 'gifts') {
                const gifts = document.querySelectorAll('.gift-card');
                gifts.forEach((gift, index) => {
                    setTimeout(() => {
                        gift.classList.add('visible');
                    }, index * 200);
                });
            }
            
            if (section.id === 'videos') {
                const videos = document.querySelectorAll('.video-card');
                videos.forEach((video, index) => {
                    setTimeout(() => {
                        video.classList.add('visible');
                    }, index * 300);
                });
            }
        }
    });
    
    // Show photo frame after some scrolling
    if (window.scrollY > 500) {
        photoFrame.classList.add('visible');
    } else {
        photoFrame.classList.remove('visible');
    }
}

// Animate timeline items
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 100) {
            item.classList.add('visible');
        }
    });
}

// Animate messages
function animateMessages() {
    const messages = document.querySelectorAll('.message');
    
    messages.forEach((message, index) => {
        setTimeout(() => {
            const messageTop = message.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (messageTop < windowHeight - 100) {
                message.classList.add('visible');
            }
        }, index * 500);
    });
}

// Typewriter effect for name
function typeWriterName() {
    const name = "Roshna My Pretty Bestie💖"; // Replace with actual name
    const nameElement = document.getElementById('bestie-name');
    let i = 0;
    
    function type() {
        if (i < name.length) {
            nameElement.textContent = name.substring(0, i+1);
            i++;
            setTimeout(type, 150);
        } else {
            // Show surprise message after name finishes typing
            setTimeout(() => {
                showPopup("Pretty Bestie💖", "This website is dedicated to you on your special day!");
            }, 1000);
        }
    }
    
    type();
}

// Initialize
window.onload = function() {
    createConfetti();
    createBalloons();
    typeWriterName();
    
    // Set up countdown timer
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Show welcome message
    setTimeout(() => {
        showPopup("Welcome!", "Scroll down to explore this special birthday website!");
    }, 3000);
};

window.addEventListener('scroll', () => {
    animateOnScroll();
    animateTimeline();
    animateMessages();
});

// Close popup when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('popup-overlay')) {
        closePopup();
    }
});


  const messages = document.querySelectorAll('.message, .reason-list li');
  const revealOnScroll = () => {
    messages.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        el.classList.add('visible');
      }
    });
  };
 



  