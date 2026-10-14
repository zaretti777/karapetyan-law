/* =========================================================
   1. Бургер-меню для мобильных
   ========================================================= */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        // Блокируем прокрутку, когда меню открыто
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Закрываем меню при клике на ссылку
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* =========================================================
   2. Тень/бордер у шапки при прокрутке
   ========================================================= */
const header = document.getElementById('siteHeader');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 30);
    });
}

/* =========================================================
   3. Плавная прокрутка по якорям с учётом фиксированной шапки
   ========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* =========================================================
   4. Появление блоков при прокрутке (лёгкая анимация)
   ========================================================= */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card, .post-card, .about-grid, .contacts-grid').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

/* =========================================================
   5. Автоматический год в подвале
   ========================================================= */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();