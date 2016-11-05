document.addEventListener('DOMContentLoaded', () => {

    // on hash change
    window.addEventListener('hashchange', changeHeadColor, false);

    loadJSON('js/data.json')
        .then((response) => {
            createBody(response);
        })
        .then(()=>{
            if(location.hash){
                scrollToHash();
                changeHeadColor();
            }
        })
        .catch((e) => console.error(e));
});

function openLink(e) {
    e.preventDefault();
    open(this.href);
}

function changeHash(e) {
    toggleActive(this);
    // 修改hash
    let newHistory = this.parentNode.getAttribute('id');
    history.replaceState({ hash: newHistory }, "", `#${newHistory}`);
}

function toggleActive(el){
    if(el.classList.contains('is-active')){
        rmActive();
    }else{
        rmActive();
        el.classList.toggle('is-active');
    }
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

function scrollToHash() {
    const hash = location.hash;
    document.querySelector(hash).scrollIntoView();
}

function loadJSON(url) {
    return new Promise((resolve, reject) => {
        const ajax = new XMLHttpRequest();
        ajax.onreadystatechange = () => {
            if (ajax.readyState == 4 && ajax.status == 200) {
                resolve(ajax.responseText);
            }
        }
        ajax.open('GET', url, true);
        ajax.setRequestHeader("Content-type", "application/json");
        ajax.send(null);
    });
}

function addText(el,str){
    let textNode = document.createTextNode(str);
    el.appendChild(textNode);
}

function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

function createBody(response) {
    const data = JSON.parse(response);
    for (let keys in data) {
        let category = document.createElement('div');
        setAttributes(category, { 'id': keys, 'class': 'table' });
        
        let cateHead = document.createElement('figure');
        cateHead.setAttribute('class', 'thead');
        addText(cateHead, data[keys][0]);
        category.appendChild(cateHead);

        let cateBody = document.createElement('figure');
        cateBody.setAttribute('class', 'tbody');

        for (let i = 1; i < data[keys].length; i++) {
            let link = document.createElement('a');
            link.setAttribute('href', data[keys][i][1]);
            let elWrap = document.createElement('figure');
            let elTitle = document.createElement('figcaption');
            addText(elTitle,data[keys][i][0]);

            let elDesc = document.createElement('p');
            elDesc.setAttribute('class', 'desc');
            addText(elDesc, data[keys][i][2]);

            elWrap.appendChild(elTitle);
            elWrap.appendChild(elDesc);
            link.appendChild(elWrap);
            cateBody.appendChild(link);
            category.appendChild(cateBody);
        }
        document.body.appendChild(category);
    }
    // link onclick
    let linkEl = document.getElementsByTagName('a');
    for (let i = 0; i < linkEl.length; i++) {
        linkEl[i].addEventListener('click', openLink, false);
    }

    // .thead onclick
    let tHead = document.querySelectorAll('.thead');
    for (let i = 0; i < tHead.length; i++) {
        tHead[i].addEventListener('click', changeHash, false);
    }
}
