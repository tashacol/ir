/**
 * FILENAME: script.js
 * PROJECT: Master Teacher Portal
 * VERSION: 10.0 (Ultra Modern Logic)
 * DESCRIPTION: Handles Preloader, Pill FAB, Modal Locking, and Scroll Spy.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // =======================================================
    // 1. انتخابگرهای DOM (DOM Selectors)
    // =======================================================
    const preloader = document.getElementById('preloader-overlay');
    const header = document.querySelector('.main-header');
    
    // انتخابگرهای سیستم منوی شناور (FAB)
    const fabMainBtn = document.getElementById('fab-main-toggle');
    const fabMenuContainer = document.getElementById('fab-menu-container');
    const fabBadge = document.getElementById('fab-notification-badge');
    const fabIcon = document.querySelector('.fab-pill-icon'); 
    
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMenuButton = document.querySelector('.close-menu-btn');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    
    const allNavLinks = document.querySelectorAll('.nav-link');
    const allSections = document.querySelectorAll('.section');
    const circleCharts = document.querySelectorAll('.circle-chart');
    
    // انتخابگرهای مودال تماس
    const contactModal = document.getElementById('contact-modal-overlay');
    const openContactBtns = document.querySelectorAll('.btn-open-contact');
    const closeContactBtn = document.querySelector('.close-modal-btn');


    // =======================================================
    // 2. تابع اصلی راه‌اندازی (Main Initializer)
    // =======================================================
    function initializePortal() {
        handleModernPreloader(); 
        setupEventListeners();
        setupScrollBehavior();
        setupAnimations();
        setupFabMenuBehavior();
        setupContactModal();
    }


    // =======================================================
    // 3. منطق لودینگ مدرن (Modern Preloader Logic)
    // =======================================================
    function handleModernPreloader() {
        if (!preloader) {
            document.body.classList.remove('loading-active');
            return;
        }

        // زمان برای دیدن انیمیشن لودینگ
        const ANIMATION_TIME = 2000; 

        setTimeout(() => {
            closePreloader();
        }, ANIMATION_TIME);

        function closePreloader() {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            document.body.classList.remove('loading-active');
            
            setTimeout(() => {
                if(preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 500);
        }
    }


    // =======================================================
    // 4. منطق دکمه شناور جدید (Pill FAB Logic)
    // =======================================================
    function setupFabMenuBehavior() {
        if (!fabMainBtn || !fabMenuContainer) return;

        // نمایش نوتیفیکیشن
        setTimeout(() => {
            if (fabBadge) {
                fabBadge.classList.add('show');
                playSoftNotificationSound();
            }
        }, 4000); 

        fabMainBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleFabMenu();
        });

        document.addEventListener('click', (e) => {
            if (!fabMenuContainer.contains(e.target) && !fabMainBtn.contains(e.target)) {
                fabMenuContainer.classList.remove('active');
                if(fabIcon) {
                    fabIcon.classList.remove('fa-xmark');
                    fabIcon.classList.add('fa-headset');
                }
            }
        });
    }

    function toggleFabMenu() {
        const isActive = fabMenuContainer.classList.contains('active');
        
        if (isActive) {
            fabMenuContainer.classList.remove('active');
            if (fabIcon) {
                fabIcon.classList.remove('fa-xmark');
                fabIcon.classList.add('fa-headset');
            }
        } else {
            fabMenuContainer.classList.add('active');
            if (fabBadge) fabBadge.classList.remove('show');
            
            if (fabIcon) {
                fabIcon.classList.remove('fa-headset');
                fabIcon.classList.add('fa-xmark');
            }
        }
    }

    function playSoftNotificationSound() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.type = 'sine';
            oscillator.frequency.value = 800; 
            gainNode.gain.value = 0.02; 
            oscillator.start();
            setTimeout(() => oscillator.stop(), 150);
        } catch (e) {
            // Ignored
        }
    }


    // =======================================================
    // 5. مدیریت رویدادها (Event Listeners)
    // =======================================================
    function setupEventListeners() {
        if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
        if (closeMenuButton) closeMenuButton.addEventListener('click', closeMobileMenu);
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', (e) => {
                if (e.target === mobileMenuOverlay) closeMobileMenu();
            });
        }
        if (mobileNavLinks) {
            mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
        }
    }

    // =======================================================
    // 5.1. مدیریت مودال تماس جدید
    // =======================================================
    function setupContactModal() {
        if (!contactModal) return;

        openContactBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); 
                openModal();
            });
        });

        if (closeContactBtn) {
            closeContactBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                closeContactModal();
            });
        }

        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                e.preventDefault();
                e.stopPropagation();
                closeContactModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && contactModal.classList.contains('active')) {
                closeContactModal();
            }
        });
    }

    function openModal() {
        if (contactModal) {
            contactModal.classList.add('active');
            document.body.classList.add('modal-open'); 
        }
    }

    function closeContactModal() {
        if (contactModal) {
            contactModal.classList.remove('active');
            setTimeout(() => {
                document.body.classList.remove('modal-open');
            }, 300);
        }
    }


    // =======================================================
    // 6. رفتار اسکرول (Scroll Behavior)
    // =======================================================
    function setupScrollBehavior() {
        window.addEventListener('scroll', () => {
            handleHeaderSticky();
            updateActiveNavLink();
        }, { passive: true });
    }

    function handleHeaderSticky() {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    function updateActiveNavLink() {
        let currentSection = '';
        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const headerHeight = header ? header.offsetHeight : 85;
            
            if (pageYOffset >= (sectionTop - headerHeight - 100)) {
                currentSection = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }


    // =======================================================
    // 7. منوی موبایل (Mobile Menu Functions)
    // =======================================================
    function openMobileMenu() {
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        }
    }

    function closeMobileMenu() {
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = ''; 
        }
    }


    // =======================================================
    // 8. انیمیشن‌ها (Animations Logic)
    // =======================================================
    function setupAnimations() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out-cubic',
                once: true,
                offset: 50, 
            });
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circle = entry.target;
                    const percent = circle.dataset.percent;
                    const meter = circle.querySelector('.meter');
                    if (meter) {
                        meter.style.strokeDasharray = `${percent}, 100`;
                    }
                    observer.unobserve(circle);
                }
            });
        }, observerOptions);

        circleCharts.forEach(chart => observer.observe(chart));
    }

    // شروع برنامه
    initializePortal();
});
