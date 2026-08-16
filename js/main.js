document.addEventListener('DOMContentLoaded', () => {
    
    // 0. Intro Animation
    if (document.documentElement.classList.contains('intro-active')) {
        document.body.insertAdjacentHTML('afterbegin', `
            <div class="intro-screen">
                <div class="intro-text">
                    <span class="intro-text-line"><span class="intro-text-inner">NISHIMOTO</span></span>
                    <span class="intro-text-line"><span class="intro-text-inner">YURA</span></span>
                </div>
            </div>
        `);
        
        sessionStorage.setItem('introSeen', 'true');
        const introScreen = document.querySelector('.intro-screen');

        setTimeout(() => {
            document.documentElement.classList.remove('intro-active');
            introScreen.classList.add('is-hidden');
            setTimeout(() => {
                introScreen.remove();
            }, 800);
        }, 1800);
    }

    // 1. Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Shadow & padding
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/Show header based on direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.classList.add('header--hidden');
        } else {
            header.classList.remove('header--hidden');
        }

        lastScrollY = currentScrollY;
    });

    // 2. Fade-in animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Optional: animate only once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // 3. Set active nav link based on current page
    const currentLocation = location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        // If the current path matches the href, add active class
        if (linkHref === currentLocation || (currentLocation === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

    // 4. Page Transition Animation (Exit)
    const linksForTransition = document.querySelectorAll('a[href]');
    linksForTransition.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('href');
            
            // 外部リンク、ページ内リンク、別タブリンクは通常動作
            if (target.startsWith('#') || link.getAttribute('target') === '_blank' || target.startsWith('http') || target.startsWith('mailto:')) {
                return;
            }

            e.preventDefault();
            document.body.classList.add('page-exit');
            
            setTimeout(() => {
                window.location.href = target;
            }, 100); // アニメーション時間
        });
    });

    // BFCache対策 (ブラウザの戻るボタンで戻ってきた時に透明なままになるのを防ぐ)
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            document.body.classList.remove('page-exit');
        }
    });

    // 5. Custom Cursor
    if (window.matchMedia("(pointer: fine)").matches) {
        if (!document.querySelector('.cursor-dot')) {
            document.body.insertAdjacentHTML('beforeend', '<div class="cursor-dot"></div><div class="cursor-outline"></div>');
        }
        
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let outlineX = mouseX;
        let outlineY = mouseY;

        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';

        window.addEventListener('mousemove', (e) => {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        });

        const animateCursor = () => {
            outlineX += (mouseX - outlineX) * 0.2;
            outlineY += (mouseY - outlineY) * 0.2;
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, .footer__huge-text span');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('is-hovering'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('is-hovering'));
        });
    }
});
