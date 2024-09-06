import Swiper from "swiper";
import { Navigation, Pagination, FreeMode, Grid } from "swiper/modules";
import { EffectFade } from 'swiper/modules';
import { Fancybox } from "@fancyapps/ui";

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector(".header");
    const select = document.querySelectorAll("select");

    select.forEach(el => {
        el.addEventListener("focus", () => {
            el.classList.add("active");
        });

        el.addEventListener("blur", () => {
            el.classList.remove("active");
        })
    })

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

    if (window.innerWidth <= 1220) {
        const footerBtn = document.querySelector(".footer__btn");
        const footerColInfo = document.querySelector(".footer__col--info");

        footerColInfo.prepend(footerBtn);
    }

    if (window.innerWidth <= 1200) {
        if (document.querySelector(".model-single-calc")) {
            const singleCalcBtn = document.querySelector(".model-single-calc__btn");
            const singleCalcRes = document.querySelector(".model-single-calc__results");
            const singleCalcMdColBtn = document.querySelector(".model-single-calc__col--md-btn");
            const singleCalcMdColRes = document.querySelector(".model-single-calc__col--md-results");

            singleCalcMdColBtn.append(singleCalcBtn);
            singleCalcMdColRes.append(singleCalcRes);
        }
    }

    if (window.innerWidth <= 992) {
        const headerColUi = document.querySelector(".header__col--ui");
        const headerRow = header.querySelector(".row");

        headerRow.append(headerColUi);

        if (document.querySelector(".credit__form")) {
            const creditBtn = document.querySelector(".credit__form-btn");
            const creditRes = document.querySelector(".credit__form-results");
            const creditRowBottom = document.querySelector(".credit__form-bottom");

            creditRowBottom.append(creditRes);
            creditRowBottom.append(creditBtn);
        }


        if (document.querySelector("[data-md-bg]")) {
            const dataBgItems = document.querySelectorAll("[data-md-bg]");

            dataBgItems.forEach(el => {
                console.log(el.getAttribute("data-md-bg"));
                el.style.backgroundImage = `url(${el.getAttribute("data-md-bg")})`;
            })
        }
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
        });

        if (document.querySelector(".model-single-complect__item-info")) {
            const modelSingleCompOption = document.querySelectorAll(".model-single-complect__item-option");
            const modelSingleCompUi = document.querySelectorAll(".model-single-complect__item-ui");
            const modelSingleCompInfo = document.querySelectorAll(".model-single-complect__item-info");

            for (let i = 0; i <= modelSingleCompOption.length - 1; i++) {
                console.log(i);
                modelSingleCompOption[i].insertBefore(modelSingleCompInfo[i], modelSingleCompUi[i])
            }
        }


        if (document.querySelector("[data-sm-bg]")) {
            const dataBgItems = document.querySelectorAll("[data-sm-bg]");

            dataBgItems.forEach(el => {
                console.log(el.getAttribute("data-sm-bg"));
                el.style.backgroundImage = `url(${el.getAttribute("data-sm-bg")})`;
            })
        }
    }

    let deadline;
    let deadlineFixed;
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
                if (el.input.closest(".card__back").length > 0) {
                    el.input.closest('.card__back').find(".card__back-res-val span").text(Math.round(res));
                } else {
                    const contribEl = el.input.closest('.big-calc').find(".big-calc__result-item-val--contribution span");
                    const deadlineEl = el.input.closest('.big-calc').find(".big-calc__result-item-val--deadline span");
                    const payEl = el.input.closest('.big-calc').find(".big-calc__result-item-val--pay span");

                    deadlineFixed = deadline / 12 < 1 ? (deadline / 12).toFixed(1) : Math.round((deadline / 12));

                    contribEl.text(contribution);
                    deadlineEl.text(deadlineFixed >= 5 ? deadlineFixed + " лет" : deadlineFixed + " года");
                    payEl.text(Math.round(res))
                }
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
            const parent = el.input.closest(".card__back").length ? el.input.closest(".card__back") : el.input.closest(".big-calc");

            contribution = Math.round(summ * (el.from_value / 100));

            el.input.parent().parent().find(".input-slider__res--percent .input-slider__res-val").text(contribution);
            if (deadline != undefined && contribution != undefined && summ != undefined) {
                res = (summ - contribution) / deadline;
                if (el.input.closest(".card__back").length > 0) {
                    el.input.closest('.card__back').find(".card__back-res-val span").text(Math.round(res));
                } else {
                    const contribEl = el.input.closest('.big-calc').find(".big-calc__result-item-val--contribution span");
                    const deadlineEl = el.input.closest('.big-calc').find(".big-calc__result-item-val--deadline span");
                    const payEl = el.input.closest('.big-calc').find(".big-calc__result-item-val--pay span");

                    deadlineFixed = deadline < 1 ? (deadline / 12).toFixed(1) : Math.round((deadline / 12));

                    contribEl.text(contribution);
                    deadlineEl.text(deadlineFixed >= 5 ? deadlineFixed + " лет" : deadlineFixed + " года");
                    payEl.text(Math.round(res))
                }
            } else {
                res = 0;
            }
        }
    });

    if (document.querySelector(".card")) {
        const cards = document.querySelectorAll(".card");

        cards.forEach(element => {
            element.querySelector(".card__btn").addEventListener("click", () => {
                element.classList.toggle("active");
            });
        });
    }

    if (document.querySelector(".model-single-calc")) {
        const singleCalcBtn = document.querySelector(".model-single-calc__btn");
        const singleCalcForm = document.querySelector(".model-single-calc__form");

        singleCalcForm.append(singleCalcBtn);
    }

    if (document.querySelector(".spoiler")) {
        $(".spoiler").each(function (i, el) {
            $(el).on("click", () => {
                $(el).toggleClass("active");
                $(el).next().slideToggle(100)
            })
        })
    }

    Fancybox.bind("[data-fancybox]", {
        // Your custom options
    });


    if (document.querySelector(".banks__slider")) {
        const banksSlider = new Swiper(".banks__slider", {
            modules: [Grid, Navigation],
            slidesPerView: 2,
            grid: {
                rows: 5,
                fill: "row",
            },
            navigation: {
                nextEl: ".slider__arrow--next",
                prevEl: ".slider__arrow--prev"
            },

            breakpoints: {
                992: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                    grid: {
                        rows: 3,
                        fill: "row",
                    },
                },
            }
        })
    }

        Fancybox.bind('[data-fancybox-modal]', {
            mainClass: "modal",
            on: {
                "reveal": (fancybox, slide) => {
                    const modal = slide.contentEl;
                    const card = slide.triggerEl.parentNode;
                    const autoNameInp = modal.querySelector("[name=autoName]");
                    const creditDeadlineInp = modal.querySelector("[name=creditDeadline]");
                    const creditContributionInp = modal.querySelector("[name=creditContribution]");
                    const creditPayInp = modal.querySelector("[name=creditPay");
                    const autoName = card.querySelector("[name=autoName]").value;
                    const creditDeadline = card.querySelector(".input-slider__res--deadline span").innerText;
                    const creditConribution = card.querySelector(".input-slider__res--percent span").innerText;
                    const creditPay = card.querySelector(".card__back-res .credit__back-res-val").innerText;

                    autoNameInp.value = autoName ? autoName : "Не указано";
                    creditDeadlineInp.value = creditDeadline ? creditDeadline : "Не указано";
                    creditContributionInp.value = creditConribution ? creditConribution : "Не указано";
                    creditPayInp.value = creditPay ? creditPay : "Не указано";

                }
            }
        });

});

