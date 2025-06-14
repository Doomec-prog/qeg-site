// Функция для инициализации интерактивной карты
function initMapInteraction() {
    // Проверяем наличие контейнера для карты
    const mapContainer = document.getElementById('interactive-map');
    
    if (!mapContainer) return;
    
    // Данные о проектах (координаты на карте)
    const projects = [
        { lat: 55.7558, lng: 37.6173, name: 'Модернизация оборудования', location: 'Москва, Россия', description: 'Модернизация оборудования горнодобывающего комплекса' },
        { lat: 43.2220, lng: 76.8512, name: 'Автоматизация процессов', location: 'Алматы, Казахстан', description: 'Автоматизация процессов обогатительной фабрики' },
        { lat: 39.9042, lng: 116.4074, name: 'Поставка оборудования', location: 'Пекин, Китай', description: 'Поставка оборудования для переработки руды' },
        { lat: -22.9068, lng: -43.1729, name: 'Модернизация системы', location: 'Рио-де-Жанейро, Бразилия', description: 'Модернизация системы транспортировки сырья' },
        { lat: -33.8688, lng: 151.2093, name: 'Комплексное решение', location: 'Сидней, Австралия', description: 'Комплексное решение для добычи полезных ископаемых' },
        { lat: 51.5074, lng: -0.1278, name: 'Консультационные услуги', location: 'Лондон, Великобритания', description: 'Консультационные услуги по оптимизации производства' },
        { lat: 52.3676, lng: 4.9041, name: 'Логистические решения', location: 'Амстердам, Нидерланды', description: 'Логистические решения для горнодобывающей отрасли' },
        { lat: 61.5240, lng: 105.3188, name: 'Разработка месторождения', location: 'Сибирь, Россия', description: 'Комплексная разработка нового месторождения' }
    ];
    
    // Инициализация карты с центром в России и начальным зумом
    const map = L.map('interactive-map').setView([55, 60], 3);
    
    // Добавляем тайловый слой (карту)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);
    
    // Создаем кастомную иконку для маркеров
    const customIcon = L.divIcon({
        className: 'custom-map-icon',
        html: `<div style="width: 12px; height: 12px; background-color: #00BA00; border-radius: 50%; box-shadow: 0 0 10px rgba(0, 186, 0, 0.8);"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
    });
    
    // Добавляем маркеры проектов на карту
    projects.forEach(project => {
        const marker = L.marker([project.lat, project.lng], {icon: customIcon}).addTo(map);
        
        // Создаем всплывающую подсказку с информацией о проекте
        const popupContent = `
            <div class="map-popup-content">
                <h4>${project.name}</h4>
                <p><strong>${project.location}</strong></p>
                <p>${project.description}</p>
            </div>
        `;
        
        // Привязываем всплывающую подсказку к маркеру
        marker.bindPopup(popupContent, {
            className: 'custom-map-marker'
        });
        
        // Добавляем пульсирующую анимацию при наведении
        marker.on('mouseover', function() {
            this.openPopup();
            this._icon.classList.add('pulse');
        });
        
        marker.on('mouseout', function() {
            this._icon.classList.remove('pulse');
        });
    });
    
    // Добавляем элементы управления масштабом
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);
    
    // Добавляем стили для пульсирующей анимации
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes pulse {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.5);
                opacity: 0.7;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        .pulse {
            animation: pulse 1.5s infinite;
        }
        
        .custom-map-icon {
            transition: transform 0.3s ease;
        }
        
        .custom-map-icon:hover {
            transform: scale(1.2);
        }
    `;
    document.head.appendChild(style);
}

// Заменяем старую функцию initMapInteraction в main.js
