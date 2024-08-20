import Swiper from "swiper";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import { EffectFade } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector(".header");
    // const burger = document.querySelector(".header__burger");
    // const menu = document.querySelector(".header__col--menu");
    // const header = document.querySelector("header");

    // burger.addEventListener("click", () => {
    //     burger.classList.toggle("active");
    //     menu.classList.toggle("active");
    //     document.body.classList.toggle("lock");
    // });

    if (document.querySelector(".slider")) {
        const slider = new Swiper('.slider', {
            modules: [Pagination, Navigation, EffectFade],
            effect: "fade",
            pagination: {
                el: ".slider__pagination",
                type: "bullets"
            },
            breakpoints: {
                
                992: {
                    navigation: {
                        nextEl: ".slider__arrow--next",
                        prevEl: ".slider__arrow--prev"
                    },
                }
            }
        })
    }

    if (document.querySelector(".choose__banners")) {
        const chooseSlider = new Swiper(".choose__banners", {
            modules: [FreeMode],
            spaceBetween: 12,
            slidesPerView: "auto",
            slideToClickedSlide: true,
            freeMode: true,
            breakpoints: {
                576: {
                    spaceBetween: 20
                }
            }
        });
    }

    if (document.querySelector(".model")) {
        const modelSlider = new Swiper(".model__slider", {
            modules: [FreeMode],
            spaceBetween: 12,
            slidesPerView: 4,
            slideToClickedSlide: true,
            freeMode: true,
            breakpoints: {
                576: {
                    spaceBetween: 20
                }
            }
        });
    }

    if (window.innerWidth <= 992) {
        const headerColUi = document.querySelector(".header__col--ui");
        const headerRow = header.querySelector(".row");
        
        headerRow.append(headerColUi);
    }

    if (window.innerWidth <= 768) {
        const headerMenu = header.querySelector(".header__menu");
        const headerCallBtn = header.querySelector(".header__call"); 
        const headerTop = header.querySelector(".header__top");
        const mobmenuWrapper = document.querySelector(".mob-menu-wrapper");
        const mobmenuBody = document.querySelector(".mob-menu__body");
        const mobmenuFooter = document.querySelector(".mob-menu__footer");
        const burger = document.querySelector(".header__burger");

        mobmenuWrapper.querySelector(".mob-menu").style.paddingTop = header.clientHeight + "px";

        mobmenuBody.append(headerMenu);
        mobmenuFooter.append(headerTop);

        burger.addEventListener("click", () => {
            burger.classList.toggle("active");
            mobmenuWrapper.classList.toggle("active");
        });

        mobmenuWrapper.addEventListener("click", (e) => {
            if (!e.target.closest(".mob-menu")) {
                mobmenuWrapper.classList.toggle("active");
                burger.classList.toggle("active");
            }
        });

        document.querySelectorAll("[src-mob]").forEach(el => {
            el.setAttribute("src", el.getAttribute("src-mob"));
        })
    }

    if (document.querySelector(".card")) {
        const cards = document.querySelectorAll(".card");

        cards.forEach(element => {
            element.querySelector(".card__btn").addEventListener("click", () => {
                element.classList.toggle("active");
            });
        });
    }
});

let deadline; 
let contribution;
let summ = 6000000;
let res;
$('.input-slider__range--deadline').ionRangeSlider({ 
    values: ["2", "6", "12", "24", "36", "48", "60", "72", "84", "96"],
    hide_min_max: true,
    hide_from_to: true,
    onChange: (el) => {
        el.input.parent().parent().find(".input-slider__res--deadline .input-slider__res-val").text(el.from_value);
        deadline = el.from_value;
        if (deadline != undefined && contribution != undefined && summ != undefined) {
            res = (summ - contribution) / deadline;
            el.input.parent().parent().parent().find(".card__back-res-val span").text(Math.round(res));
        } else {
            res = 0;
        }
    }
})
$(".input-slider__range--percent").ionRangeSlider({ 
    values: ["0", "10", "20", "30", "40", "50", "60", "70", "80"],
    hide_min_max: true,
    hide_from_to: true,
    onChange: (el) => {
        contribution =  Math.round(summ * (el.from_value / 100))
        el.input.parent().parent().find(".input-slider__res--percent .input-slider__res-val").text(contribution);
        if (deadline != undefined && contribution != undefined && summ != undefined) {
            res = (summ - contribution) / deadline;
            el.input.parent().parent().parent().find(".card__back-res-val span").text(Math.round(res));
        } else {
            res = 0;
        }
    }
});