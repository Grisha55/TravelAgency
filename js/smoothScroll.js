document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav__items-links a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    function smoothScroll(targetId) {
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        const offset = 100; // Отступ сверху
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    function closeMobileMenu() {
        if (window.innerWidth <= 768) {
            const burger = document.querySelector('.nav__burger');
            const navItems = document.querySelector('.nav__items');
            const body = document.body;
            
            if (burger?.classList.contains('active')) {
                burger.classList.remove('active');
                navItems.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
            }
        }
    }
    
    // Обработчик клика по ссылкам
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            closeMobileMenu();
            
            setTimeout(() => {
                smoothScroll(targetId);
            }, 300);
        });
    });
    
    // Подсветка активной секции при скролле (опционально)
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});