let wrapper = document.querySelector('.wrapper');

let pageSlider = new Swiper('.page', {
    // обозначить классы для свайпера, чтобы понимал не только стандартные
    wrapperClass: "page__wrapper",
    slideClass: "page__screen",

    // вертикальный слайдер
    direction: 'vertical',

    // количество слайдов для показа
    slidesPerView: 'auto',

    // Включаем паралакс
    parallax: true,

    // управление клавиатурой
    keyboard: {
        enabled: true,
        onlyInViewport: false,
        pageUpDown: true,
    },

    // управление мышью
    mousewheel: {
        sensitivity: 1,
        invert: false,
    },

    // отключение функционала если слайдов меньше чем нужно
    watchOverflow: true,

    // скорость пролистывания
    speed: 500,

    // обновить свайпер при изменении элементов слайдера
    observer: true,

    // обновить свайпер при изменении родительских элементов
    observeParents: true,

    // обновить свайпер при изменении дочерних элементов
    observeSlideChildren: true,

    // буллеты, текущий слайд, прогрессбар
    pagination: {
        el: '.page__pagination',
        type: 'bullets',
        clickable: true,
        bulletClass: "page__bullet",
        bulletActiveClass: "page__bullet_active"
    },

    scrollbar: {
        el: '.page__scrollbar',
        dragClass: "page__drag-scroll",
        draggable: true,
    },

    // отключить автоинициализацию
    init: false,

    // СОБЫТИЯ
    on: {
        init: function() {
            menuSlider();
            setScrollType();
            wrapper.classList.add("_loaded");

        },
        slideChange: function() {
            menuSliderRemoveActive();
            menuLinks[pageSlider.realIndex].classList.add("_active")
        },
        resize: function() {
            setScrollType();
        },
    },

});

// проход по навигации
let menuLinks = document.querySelectorAll(".menu__link");

function menuSlider() {

    if (menuLinks.length > 0) {
        // какой слайд сейчас открыт тому дать активный
        menuLinks[pageSlider.realIndex].classList.add("_active");
        for (let index = 0; index < menuLinks.length; index++) {
            const menuLink = menuLinks[index];
            menuLink.addEventListener("click", function(e) {
                // удаляем класс активный у ссылки
                menuSliderRemoveActive();
                // переход к слайду с нужным индексом в меню
                pageSlider.slideTo(index, 500);
                menuLinks[index].classList.add("_active");
                e.preventDefault();
            });
        }
    }
}

function menuSliderRemoveActive() {
    let menuLinkActive = document.querySelector(".menu__link._active");
    // если такая ссылка существует
    if (menuLinkActive) {
        menuLinkActive.classList.remove("_active");
    }

}

function setScrollType() {
    if (wrapper.classList.contains("_free")) {
        wrapper.classList.remove("_free");
        pageSlider.params.freeMode.enabled = false;
    }

    for (let index = 0; index < pageSlider.slides.length; index++) {
        const pageSlide = pageSlider.slides[index];
        const pageSlideContent = pageSlide.querySelector('.screen__content');
        if (pageSlideContent) {
            const pageSlideContentHeight = pageSlideContent.offsetHeight;
            if (pageSlideContentHeight > window.innerHeight) {
                wrapper.classList.add("_free");
                pageSlider.params.freeMode.enabled = true;
                break;
            }
        }
    }
}

// запуск инициализации слайдера вручную

pageSlider.init();


let mainSwiper = new Swiper('.main-slider-container', {
    wrapperClass: "main-slider-wrapper",
    slideClass: "main-slide",
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // автоматическое перелистывание
    autoplay: {
        delay: 1500,
    },
});