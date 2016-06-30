document.addEventListener('DOMContentLoaded', () => {
    if (location.hash) {
        changeHeadColor();
    }
    // on hash change
    window.addEventListener('hashchange', changeHeadColor, false);

    // link onclick
    let linkEl = document.getElementsByTagName('a');
    for (let i = 0; i < linkEl.length; i++) {
        linkEl[i].addEventListener('click', linkClick, false);
    }

    // .thead onclick
    let tHead = document.querySelectorAll('.thead');
    for (let i = 0; i < tHead.length; i++) {
        tHead[i].addEventListener('click', theadClick, false);

    }
})


function linkClick(e) {
    e.preventDefault();
    let newTarget = open(this.href);
}

function theadClick(e) {
    if (this.classList.contains('is-active')) {
        rmActive();
    } else {
        rmActive();
        this.classList.toggle('is-active');
    }
    // 修改hashtag
    location.hash = this.parentNode.getAttribute('id');
}

function rmActive(e) {
    let el = document.getElementsByClassName('is-active');
    for (let i = 0; i < el.length; i++) {
        el[i].classList.remove('is-active');
    }
}

function changeHeadColor(e) {
    rmActive();
    let hashName = location.hash;
    let targetHead = document.querySelector(hashName).querySelector('.thead');
    targetHead.classList.toggle('is-active');
}
