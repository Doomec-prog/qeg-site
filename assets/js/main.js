// Основные функции для сайта Q ENGINEERING

// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initHeader();
    initHeroAnimation();
    initScrollAnimations();
    initServicesCards();
    initProjectsSlider();
    initMapInteraction();
    initGallery();
    
    // Добавляем курсор с неоновым свечением
    initCustomCursor();
});

// Функция для анимации хедера при скролле
function initHeader() {
    const header = document.querySelector('.header');
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
    
    // Плавный скролл для навигационных ссылок
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - header.offsetHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Закрываем мобильное меню при клике на ссылку
                if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    navList.classList.remove('active');
                }
            }
        });
    });
}

// Функция для анимации элементов в hero-секции
function initHeroAnimation() {
    // Создаем геометрические элементы
    const geoContainer = document.querySelector('.geometric-elements');
    
    if (geoContainer) {
        // Создаем треугольники
        for (let i = 0; i < 5; i++) {
            createTriangle(geoContainer);
        }
        
        // Создаем линии
        for (let i = 0; i < 8; i++) {
            createLine(geoContainer);
        }
    }
    
    // Функция для создания треугольника
    function createTriangle(container) {
        const triangle = document.createElement('div');
        triangle.classList.add('geo-element', 'triangle');
        
        // Случайный размер
        const size = Math.floor(Math.random() * 100) + 50;
        
        // Случайная позиция
        const posX = Math.floor(Math.random() * 100);
        const posY = Math.floor(Math.random() * 100);
        
        // Случайный тип треугольника
        const types = [
            'border-width: 0 ' + (size/2) + 'px ' + size + 'px ' + (size/2) + 'px; border-color: transparent transparent var(--poison-green-40) transparent;',
            'border-width: ' + size + 'px ' + (size/2) + 'px 0 ' + (size/2) + 'px; border-color: var(--poison-green-40) transparent transparent transparent;',
            'border-width: ' + (size/2) + 'px 0 ' + (size/2) + 'px ' + size + 'px; border-color: transparent transparent transparent var(--poison-green-40);',
            'border-width: ' + (size/2) + 'px ' + size + 'px ' + (size/2) + 'px 0; border-color: transparent var(--poison-green-40) transparent transparent;'
        ];
        
        const randomType = types[Math.floor(Math.random() * types.length)];
        
        triangle.style.cssText = `
            ${randomType}
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${Math.random() * 0.5 + 0.1};
            transform: rotate(${Math.floor(Math.random() * 360)}deg);
        `;
        
        // Добавляем анимацию
        triangle.animate([
            { transform: `rotate(${Math.floor(Math.random() * 360)}deg) translate(0, 0)` },
            { transform: `rotate(${Math.floor(Math.random() * 360)}deg) translate(${Math.random() > 0.5 ? '+' : '-'}${Math.floor(Math.random() * 20)}px, ${Math.random() > 0.5 ? '+' : '-'}${Math.floor(Math.random() * 20)}px)` }
        ], {
            duration: Math.floor(Math.random() * 10000) + 5000,
            iterations: Infinity,
            direction: 'alternate',
            easing: 'ease-in-out'
        });
        
        container.appendChild(triangle);
    }
    
    // Функция для создания линии
    function createLine(container) {
        const line = document.createElement('div');
        line.classList.add('geo-element', 'line');
        
        // Случайная длина
        const length = Math.floor(Math.random() * 200) + 100;
        
        // Случайная позиция
        const posX = Math.floor(Math.random() * 100);
        const posY = Math.floor(Math.random() * 100);
        
        line.style.cssText = `
            width: ${length}px;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${Math.random() * 0.5 + 0.1};
            transform: rotate(${Math.floor(Math.random() * 360)}deg);
        `;
        
        // Добавляем анимацию
        line.animate([
            { opacity: line.style.opacity, boxShadow: '0 0 5px var(--poison-green-20)' },
            { opacity: Number(line.style.opacity) + 0.2, boxShadow: '0 0 15px var(--poison-green-40)' }
        ], {
            duration: Math.floor(Math.random() * 3000) + 2000,
            iterations: Infinity,
            direction: 'alternate',
            easing: 'ease-in-out'
        });
        
        container.appendChild(line);
    }
}

// Функция для анимации элементов при скролле
function initScrollAnimations() {
    // Получаем все элементы, которые нужно анимировать
    const animatedElements = document.querySelectorAll('.service-card, .about-content, .about-image, h2');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.2
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Функция для инициализации карточек услуг
function initServicesCards() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 15px var(--poison-green-20)';
            this.style.borderColor = 'var(--poison-green)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.borderColor = '';
        });
    });
}

// Функция для инициализации слайдера проектов
function initProjectsSlider() {
    const slider = document.querySelector('.projects-slider');
    
    if (!slider) return;
    
    const track = slider.querySelector('.projects-track');
    const items = slider.querySelectorAll('.project-card');
    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');
    
    let currentIndex = 0;
    const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight);
    const visibleItems = Math.floor(slider.offsetWidth / itemWidth);
    const maxIndex = items.length - visibleItems;
    
    // Обработчики для кнопок
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSliderPosition();
            }
        });
    }
    
    // Обновление позиции слайдера
    function updateSliderPosition() {
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        
        // Обновляем состояние кнопок
        if (prevBtn) {
            prevBtn.disabled = currentIndex === 0;
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        }
        
        if (nextBtn) {
            nextBtn.disabled = currentIndex === maxIndex;
            nextBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
        }
    }
    
    // Инициализация
    updateSliderPosition();
    
    // Обработка изменения размера окна
    window.addEventListener('resize', function() {
        const newItemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight);
        const newVisibleItems = Math.floor(slider.offsetWidth / newItemWidth);
        const newMaxIndex = items.length - newVisibleItems;
        
        if (currentIndex > newMaxIndex) {
            currentIndex = newMaxIndex;
        }
        
        updateSliderPosition();
    });
}

// Функция для инициализации интерактивной карты
function initMapInteraction() {
    const mapContainer = document.querySelector('.map-container');
    
    if (!mapContainer) return;
    
    // Данные о проектах (координаты на карте в процентах)
    const projects = [
        { x: 25, y: 40, name: 'Проект в России', location: 'Москва, Россия', description: 'Модернизация оборудования горнодобывающего комплекса' },
        { x: 45, y: 35, name: 'Проект в Казахстане', location: 'Алматы, Казахстан', description: 'Автоматизация процессов обогатительной фабрики' },
        { x: 65, y: 45, name: 'Проект в Китае', location: 'Пекин, Китай', description: 'Поставка оборудования для переработки руды' },
        { x: 15, y: 60, name: 'Проект в Бразилии', location: 'Рио-де-Жанейро, Бразилия', description: 'Модернизация системы транспортировки сырья' },
        { x: 80, y: 30, name: 'Проект в Австралии', location: 'Сидней, Австралия', description: 'Комплексное решение для добычи полезных ископаемых' }
    ];
    
    // Создаем точки на карте
    projects.forEach(project => {
        const point = document.createElement('div');
        point.classList.add('map-point');
        point.style.left = `${project.x}%`;
        point.style.top = `${project.y}%`;
        
        // Создаем всплывающую подсказку
        const tooltip = document.createElement('div');
        tooltip.classList.add('map-tooltip');
        tooltip.innerHTML = `
            <strong>${project.name}</strong>
            <p>${project.location}</p>
            <p>${project.description}</p>
        `;
        
        point.appendChild(tooltip);
        mapContainer.appendChild(point);
    });
}

// Функция для инициализации галереи
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const caption = this.querySelector('.gallery-caption').textContent;
            
            openLightbox(imgSrc, caption);
        });
    });
    
    // Функция для открытия лайтбокса
    function openLightbox(src, caption) {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${src}" alt="${caption}">
                <div class="lightbox-caption">${caption}</div>
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Предотвращаем скролл страницы
        document.body.style.overflow = 'hidden';
        
        // Анимация появления
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
        
        // Обработчик для закрытия
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', closeLightbox);
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
        
        // Функция закрытия
        function closeLightbox() {
            lightbox.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }, 300);
        }
    }
}

// Функция для кастомного курсора с неоновым свечением
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // Добавляем эффект при наведении на интерактивные элементы
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .project-card, .gallery-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('active');
            cursorDot.classList.add('active');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('active');
            cursorDot.classList.remove('active');
        });
    });
}

// Дополнительные стили для кастомного курсора
const cursorStyles = document.createElement('style');
cursorStyles.innerHTML = `
    .custom-cursor {
        position: fixed;
        width: 40px;
        height: 40px;
        border: 1px solid var(--poison-green-40);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        transition: width 0.3s, height 0.3s, border-color 0.3s;
        z-index: 9999;
    }
    
    .cursor-dot {
        position: fixed;
        width: 5px;
        height: 5px;
        background-color: var(--poison-green);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 10px var(--poison-green), 0 0 20px var(--poison-green-40);
    }
    
    .custom-cursor.active {
        width: 60px;
        height: 60px;
        border-color: var(--poison-green);
        background-color: rgba(0, 186, 0, 0.1);
    }
    
    .cursor-dot.active {
        background-color: var(--poison-green);
    }
    
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 80%;
        max-height: 80%;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 80vh;
        border: 1px solid var(--poison-green);
        box-shadow: 0 0 20px var(--poison-green-40);
    }
    
    .lightbox-caption {
        position: absolute;
        bottom: -40px;
        left: 0;
        width: 100%;
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.7);
        color: var(--bone);
        text-align: center;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        width: 30px;
        height: 30px;
        background-color: transparent;
        border: none;
        color: var(--bone);
        font-size: 30px;
        cursor: pointer;
        transition: color 0.3s ease;
    }
    
    .lightbox-close:hover {
        color: var(--poison-green);
    }
`;

document.head.appendChild(cursorStyles);
