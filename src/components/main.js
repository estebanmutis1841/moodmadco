import {scrollPage, gallery} from './home';

let selectors =
        {
            menuMobile: '#menu-mobile',
            mobileListContainer: '#mobileContainer',
            menuLanguage: '#menuLanguage',
            desktopListContainer: '#desktopContainer',
            languageDefaultContainer: '#languageDefault',
            arrowLanguage: '#arrowLanguage',
            optionLanguage: '#optionLanguage',
            closeMenu: '#closeMenu',

            mobile: '.mobile',
            menuChooseLanguage: '.Menu-choose-language',
            menuContent: '.Menu-content-items'
        },
    events =
        {
            click: 'click'
        };

function toggleMenu() {
    $(selectors.mobile).toggleClass('hide');
}

function selectLanguage() {
    $(selectors.arrowLanguage).toggleClass('selected');
    $(selectors.menuChooseLanguage).toggleClass('hide');
}

function menuEvents() {
    $(selectors.menuMobile).click(toggleMenu);
    $(selectors.closeMenu).click(toggleMenu);
    $(selectors.languageDefaultContainer).click(selectLanguage);
}

function callData(callbackSuccess) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        let JSONResponse = JSON.parse(xhr.responseText);

        if(xhr.status === 200 && xhr.readyState === 4) {
            callbackSuccess(JSONResponse);
        } else {
            console.log('Not found');
        }
    };
    xhr.open('GET', './data.json', true);
    xhr.send();
}

function templateMenu(items) {
    let listItems = '';

    for(let item in items.menu) {
        if (items.menu.hasOwnProperty(item)) {
            listItems += `<li><a href="./${item}.html">${items.menu[item]}</a></li>`;
        }
    }

    return listItems;
}

function loadContentPage() {
    callData(response => {
        let template,
            flagLanguage,
            optionLanguage;

        if(navigator.language === 'es-ES') {
            template = templateMenu(response.language.spanish);
            flagLanguage = `<img src="${response.language.spanish.image}"/><span>${response.language.spanish.text}</span>`;
            optionLanguage = `<img src="${response.language.english.image}"/><span>${response.language.english.text}</span>`;
        } else {
            template = templateMenu(response.language.english);
            flagLanguage = `<img src="${response.language.english.image}"/><span>${response.language.english.text}</span>`;
            optionLanguage = `<img src="${response.language.spanish.image}"/><span>${response.language.spanish.text}</span>`;
        }

        $(selectors.mobileListContainer).html(template);
        $(selectors.desktopListContainer).html(template);
        $(selectors.languageDefaultContainer).html(flagLanguage + $(selectors.languageDefaultContainer).html());
        $(selectors.optionLanguage).html(optionLanguage);
    });
}

function init() {

    menuEvents();
    loadContentPage();
    gallery();
}

window.onload = init();