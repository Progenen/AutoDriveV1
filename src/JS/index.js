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
        })
    }
});