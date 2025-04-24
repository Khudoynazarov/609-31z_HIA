document.addEventListener('DOMContentLoaded', function() {

    // Получаем кнопку и панель мобильного меню

    const btn   = document.getElementsByClassName('mobile-menu-button')[0];
    const panel = document.getElementsByClassName('mobile-menu-panel')[0];

// Добавляем обработчик клика для кнопки мобильного меню
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        btn.classList.toggle('active');
        panel.classList.toggle('active');
    });

// Добавляем обработчики клика для всех ссылок

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {

                 // Плавно прокручиваем страницу к целевому элементу
                 
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Отступ от верха страницы
                    behavior: 'smooth'// Плавный скролл
                });
            }
        });
    });
 // Получаем элемент заголовка
    const header = document.querySelector('.header');
    let lastScroll = 0; // Сохраняем последнее значение прокрутки


     // Добавляем обработчик прокрутки для окна
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset; // Получаем текущее значение прокрутки
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up'); // Удаляем класс 'scroll-up', если прокрутка в начале
            return;
        }
        // Если прокрутка вниз и класс 'scroll-down' не установлен, добавляем его
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        }
        // Если прокрутка вверх и класс 'scroll-down' установлен, добавляем класс 'scroll-up'
        if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll; // Обновляем последнее значение прокрутки
    });


    // Функция для анимации элементов при прокрутке
    function animateOnScroll() {
        // Получаем все элементы, которые нужно анимировать
        const elements = document.querySelectorAll('.card, .testimonial-image, .testimonial-content, .achievement-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;// Получаем позицию элемента относительно окна
            const windowHeight = window.innerHeight; // Получаем высоту окна
            
             // Если элемент виден в окне (с отступом 100px), добавляем класс 'animate'
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
    
    // Добавляем обработчик прокрутки для окна
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Вызываем функцию сразу после загрузки страницы

    // Получаем форму подписки на новостную рассылку
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
         // Добавляем обработчик отправки формы
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();// Предотвращаем стандартное поведение формы

            const emailInput = this.querySelector('input[type="email"]');//  Поле ввода Почты
            const email = emailInput.value;// Получаем значение Почты
            
             // Проверяем, введен ли корректный email
            if (email && email.includes('@')) {
                alert('Thank you for subscribing!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address');
            }
        });
    }
});