export function gallery() {
    const panel = document.querySelectorAll('.panel');

    panel.forEach(panel => panel.addEventListener('click', toggleOpen));
    panel.forEach(panel => panel.addEventListener('transitionend', toggleActive));
}

function toggleOpen() {
    this.classList.toggle('open');
}

function toggleActive(e) {
    if(e.propertyName.includes('flex')) {
        this.classList.toggle('open-active')
    }
}