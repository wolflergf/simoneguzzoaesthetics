// Simone Guzzo Aesthetics - JavaScript Functionality

document.addEventListener("DOMContentLoaded", function() {
    // Initialize all functionality
    initMobileMenu();
    initGalleryFilters();
    initFAQAccordion();
    initContactForm();
    initScrollAnimations();
    initHeaderScroll();
    initSmoothScrolling();
    initLoadingAnimations();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", function() {
            const isHidden = mobileMenu.classList.contains("hidden");
            
            if (isHidden) {
                mobileMenu.classList.remove("hidden");
                mobileMenu.classList.add("mobile-menu", "open");
                mobileMenuBtn.innerHTML = `
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                `;
            } else {
                mobileMenu.classList.remove("open");
                setTimeout(() => {
                    mobileMenu.classList.add("hidden");
                }, 300);
                mobileMenuBtn.innerHTML = `
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                `;
            }
        });
        
        // Close mobile menu when clicking on links
        const mobileMenuLinks = mobileMenu.querySelectorAll("a");
        mobileMenuLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");
                setTimeout(() => {
                    mobileMenu.classList.add("hidden");
                }, 300);
                mobileMenuBtn.innerHTML = `
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                `;
            });
        });
    }
}

// Gallery Filter Functionality
function initGalleryFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");
    
    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                const filter = this.getAttribute("data-filter");
                
                // Update active button
                filterBtns.forEach(b => {
                    b.classList.remove("active", "bg-rose-light", "text-brown-dark");
                    b.classList.add("bg-gray-200", "text-gray-700");
                });
                this.classList.remove("bg-gray-200", "text-gray-700");
                this.classList.add("active", "bg-rose-light", "text-brown-dark");
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    const categories = item.getAttribute("data-category");
                    
                    if (filter === "all" || (categories && categories.includes(filter))) {
                        item.classList.remove("hidden");
                        item.classList.add("visible");
                        setTimeout(() => {
                            item.style.opacity = "1";
                            item.style.transform = "scale(1)";
                        }, 100);
                    } else {
                        item.style.opacity = "0";
                        item.style.transform = "scale(0.8)";
                        setTimeout(() => {
                            item.classList.add("hidden");
                            item.classList.remove("visible");
                        }, 300);
                    }
                });
            });
        });
    }
}

// FAQ Accordion Functionality
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll(".faq-question");
    
    faqQuestions.forEach(question => {
        question.addEventListener("click", function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.classList.contains("open");
            
            // Close all other FAQ items
            faqQuestions.forEach(q => {
                const a = q.nextElementSibling;
                q.classList.remove("active");
                a.classList.remove("open");
                a.style.maxHeight = "0";
            });
            
            // Toggle current item
            if (!isOpen) {
                this.classList.add("active");
                answer.classList.add("open");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
    
    // FAQ Category Filters
    const faqCategoryBtns = document.querySelectorAll(".faq-category-btn");
    const faqItems = document.querySelectorAll(".faq-item");
    
    if (faqCategoryBtns.length > 0 && faqItems.length > 0) {
        faqCategoryBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                const category = this.getAttribute("data-category");
                
                // Update active button
                faqCategoryBtns.forEach(b => {
                    b.classList.remove("active", "bg-rose-light", "text-brown-dark");
                    b.classList.add("bg-gray-200", "text-gray-700");
                });
                this.classList.remove("bg-gray-200", "text-gray-700");
                this.classList.add("active", "bg-rose-light", "text-brown-dark");
                
                // Filter FAQ items
                faqItems.forEach(item => {
                    const itemClasses = item.className;
                    
                    if (category === "all" || itemClasses.includes(category)) {
                        item.style.display = "block";
                        setTimeout(() => {
                            item.style.opacity = "1";
                            item.style.transform = "translateY(0)";
                        }, 100);
                    } else {
                        item.style.opacity = "0";
                        item.style.transform = "translateY(-20px)";
                        setTimeout(() => {
                            item.style.display = "none";
                        }, 300);
                    }
                });
            });
        });
    }
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.querySelector("form[action*=\"formspree\"]");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            const submitBtn = this.querySelector("button[type=\"submit\"]");
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = "Sending<span class=\"loading-dots\">...</span>";
            
            // Add form validation
            const requiredFields = this.querySelectorAll("[required]");
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add("border-red-500");
                    field.addEventListener("input", function() {
                        this.classList.remove("border-red-500");
                    });
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                // Show error message
                showNotification("Please fill in all required fields.", "error");
                return;
            }
            
            // Email validation
            const emailField = this.querySelector("input[type=\"email\"]");
            if (emailField && !isValidEmail(emailField.value)) {
                e.preventDefault();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                emailField.classList.add("border-red-500");
                showNotification("Please enter a valid email address.", "error");
                return;
            }
            
            // If form is submitted successfully (this would be handled by Formspree)
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                showNotification("Message sent successfully! We will get back to you shortly.", "success");
                this.reset();
            }, 2000);
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^
@]+@[^
@]+\.[^
@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;
    
    if (type === "success") {
        notification.classList.add("bg-green-500", "text-white");
    } else if (type === "error") {
        notification.classList.add("bg-red-500", "text-white");
    } else {
        notification.classList.add("bg-blue-500", "text-white");
    }
    
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <div class="flex-1">${message}</div>
            <button class="text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove("translate-x-full");
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add("translate-x-full");
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-fade-in-up");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(".card-hover, .service-card, .testimonial-card, .gallery-item");
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector("header");
    let lastScrollY = window.scrollY;
    
    if (header) {
        window.addEventListener("scroll", () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add("shadow-lg");
                header.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
            } else {
                header.classList.remove("shadow-lg");
                header.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
            }
            
            // Hide/show header on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = "translateY(-100%)";
            } else {
                header.style.transform = "translateY(0)";
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll("a[href^=\"#\"]");
    
    anchorLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            if (href === "#") return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector("header").offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

// Loading Animations
function initLoadingAnimations() {
    // Add staggered animations to cards
    const cards = document.querySelectorAll(".card-hover, .service-card");
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Parallax effect for hero section
    const heroSection = document.querySelector(".hero-bg");
    if (heroSection) {
        window.addEventListener("scroll", () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
}

// WhatsApp Integration
function openWhatsApp(message = "") {
    const phoneNumber = "447900123456"; // UK number
    const defaultMessage = message || "Hello! I would like to book a consultation.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, "_blank");
}

// Service-specific WhatsApp messages
function openWhatsAppForService(service) {
    const messages = {
        "botox": "Hello! I would like to know more about Botox treatment.",
        "preenchimento": "Hello! I am interested in dermal fillers.",
        "harmonizacao": "Hello! I would like information about facial harmonisation.",
        "consulta": "Hello! I would like to book a free initial consultation."
    };
    
    openWhatsApp(messages[service] || "");
}

// Image Lazy Loading
function initLazyLoading() {
    const images = document.querySelectorAll("img[data-src]");
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("opacity-0");
                img.classList.add("opacity-100");
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance Optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 16); // ~60fps
    };
    
    // Preload critical images
    const criticalImages = [
        "assets/images/simone-hero.jpg",
        "assets/images/simone-about.jpg"
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Accessibility Enhancements
function initAccessibility() {
    // Add keyboard navigation for custom elements
    const interactiveElements = document.querySelectorAll(".faq-question, .filter-btn, .faq-category-btn");
    
    interactiveElements.forEach(element => {
        element.setAttribute("tabindex", "0");
        element.setAttribute("role", "button");
        
        element.addEventListener("keydown", function(e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add ARIA labels
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute("aria-label", "Toggle mobile menu");
    }
}

// Initialize accessibility features
document.addEventListener("DOMContentLoaded", function() {
    initAccessibility();
    optimizePerformance();
    initLazyLoading();
});

// Error Handling
window.addEventListener("error", function(e) {
    console.error("JavaScript error:", e.error);
    // Could send error reports to analytics service
});

// Service Worker Registration (for future PWA features)
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        // navigator.serviceWorker.register("/sw.js")
        //     .then(registration => console.log("SW registered"))
        //     .catch(error => console.log("SW registration failed"));
    });
}


