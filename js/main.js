document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

        // Hide on a clear downward scroll, show on any upward scroll
        const delta = currentScrollY - lastScrollY;
        if (delta > 12 && currentScrollY > 300) {
            header.classList.add('header--hidden');
        } else if (delta < -4 || currentScrollY <= 100) {
            header.classList.remove('header--hidden');
        }

        lastScrollY = currentScrollY;
    });

    // 2. Fade-in animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');

    // threshold は 0 にする。背の高い要素に 0.15 などを使うと、画面の低い端末
    // （横向きスマホなど）では「要素の15%」が一度に入りきらず、永久に表示されない。
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0
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

    // 3. 現在ページのナビ強調は _includes/header.html（Jekyll）側で付与している

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }

    // 4. Page Transition Animation (Exit)
    const linksForTransition = document.querySelectorAll('a[href]');
    linksForTransition.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('href');

            // 修飾キー付き・中クリックなど（新規タブで開く操作）は通常動作
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || prefersReducedMotion) {
                return;
            }
            
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
    if (window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion) {
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
