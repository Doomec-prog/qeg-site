// Скрипт для управления прелоадером с видео
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, показывался ли уже прелоадер в этой сессии
    const preloaderShown = sessionStorage.getItem('preloaderShown');
    
    if (preloaderShown) {
        // Если прелоадер уже был показан, сразу скрываем его
        hidePreloader();
    } else {
        // Получаем элементы прелоадера
        const preloader = document.getElementById('preloader');
        const preloaderVideo = document.getElementById('preloader-video');
        
        // Обработчик события окончания видео
        preloaderVideo.addEventListener('ended', function() {
            // Запускаем анимацию исчезновения
            hidePreloader();
            
            // Сохраняем информацию о показе прелоадера в sessionStorage
            sessionStorage.setItem('preloaderShown', 'true');
        });
        
        // Обработчик ошибки воспроизведения видео
        preloaderVideo.addEventListener('error', function() {
            console.error('Ошибка воспроизведения видео прелоадера');
            hidePreloader();
            sessionStorage.setItem('preloaderShown', 'true');
        });
        
        // Если видео не запустилось через 5 секунд, скрываем прелоадер
        setTimeout(function() {
            if (preloaderVideo.paused) {
                console.warn('Видео не запустилось автоматически, скрываем прелоадер');
                hidePreloader();
                sessionStorage.setItem('preloaderShown', 'true');
            }
        }, 5000);
    }
    
    // Функция для скрытия прелоадера
    function hidePreloader() {
        const preloader = document.getElementById('preloader');
        const body = document.body;
        
        // Добавляем класс для анимации исчезновения
        preloader.classList.add('fade-out');
        
        // Удаляем класс loading с body для показа основного контента
        body.classList.remove('loading');
        
        // Удаляем прелоадер из DOM после завершения анимации
        setTimeout(function() {
            if (preloader && preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 1000); // Время должно совпадать с длительностью анимации в CSS
    }
    
    // Экспортируем функцию hidePreloader в глобальную область видимости
    window.hidePreloader = hidePreloader;
});
