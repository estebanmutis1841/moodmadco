import {gallery} from './home';

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
            menuOptions: '.redirect-mobile',
            mobile: '.mobile',
            menuChooseLanguage: '.Menu-choose-language',
            menuContent: '.Menu-content-items',
            moreButton: '.button-more'
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
    $(selectors.mobileListContainer).on('click', selectors.menuOptions, toggleMenu);
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
            listItems += `<li class="redirect-mobile"><a href="#${item}">${items.menu[item]}</a></li>`;
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

function showServices() {
    if($(window).width() > 768) {
        $('.mobileService').remove();
    } else {
        $('.desktopService').remove();
    }
}
function bs_input_file() {
    $(".input-file").before(
        function() {
            if ( ! $(this).prev().hasClass('input-ghost') ) {
                var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0'>");
                element.attr("name",$(this).attr("name"));
                element.change(function(){
                    element.next(element).find('input').val((element.val()).split('\\').pop());
                });
                $(this).find("button.btn-choose").click(function(){
                    element.click();
                });
                $(this).find("button.btn-reset").click(function(){
                    element.val(null);
                    $(this).parents(".input-file").find('input').val('');
                });
                $(this).find('input').css("cursor","pointer");
                $(this).find('input').mousedown(function() {
                    $(this).parents('.input-file').prev().click();
                    return false;
                });
                return element;
            }
        }
    );
}

$(function() {
    bs_input_file();
    menuEvents();
    loadContentPage();
    gallery();
    showServices();
});
