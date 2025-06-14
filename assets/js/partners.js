// Карусель партнеров
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.partners-carousel');
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    
    if (!carousel || !track || !prevBtn || !nextBtn) return;
    
    let currentTranslate = 0;
    const scrollAmount = 200; // Количество пикселей для прокрутки
    
    // Дублируем логотипы для бесконечной прокрутки
    const originalContent = track.innerHTML;
    track.innerHTML = originalContent + originalContent;
    
    // Обработчики кнопок
    prevBtn.addEventListener('click', function() {
        currentTranslate += scrollAmount;
        if (currentTranslate > 0) {
            currentTranslate = -track.scrollWidth / 2;
        }
        track.style.transform = `translateX(${currentTranslate}px)`;
    });
    
    nextBtn.addEventListener('click', function() {
        currentTranslate -= scrollAmount;
        if (currentTranslate <= -track.scrollWidth / 2) {
            currentTranslate = 0;
        }
        track.style.transform = `translateX(${currentTranslate}px)`;
    });
    
    // Пауза анимации при наведении на кнопки
    prevBtn.addEventListener('mouseenter', function() {
        track.style.animationPlayState = 'paused';
    });
    
    nextBtn.addEventListener('mouseenter', function() {
        track.style.animationPlayState = 'paused';
    });
    
    prevBtn.addEventListener('mouseleave', function() {
        track.style.animationPlayState = 'running';
    });
    
    nextBtn.addEventListener('mouseleave', function() {
        track.style.animationPlayState = 'running';
    });
});

