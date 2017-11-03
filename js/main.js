function compareVersion() { // return true or false
  const localVersion = localStorage.getItem('frontend-navigation-version');
  const curVersion = document.querySelector('head').dataset.version;
  return localVersion === curVersion;
}

function openLink(e) {
  e.preventDefault();
  open(this.href);
}

function rmActive(e) {
  const el = document.getElementsByClassName('is-active');
  for (let i = 0; i < el.length; i++) {
    el[i].classList.remove('is-active');
  }
}

function toggleActive(el) {
  if (el.classList.contains('is-active')) {
    rmActive();
  } else {
    rmActive();
    el.classList.toggle('is-active');
  }
}

function changeHash(e) {
  toggleActive(this);
  // 修改hash
  const newHistory = this.parentNode.getAttribute('id');
  history.replaceState({ hash: newHistory }, '', `#${newHistory}`);
}

function changeHeadColor(e) {
  rmActive();
  const hashName = location.hash;
  const targetHead = document.querySelector(hashName).querySelector('.thead');
  targetHead.classList.toggle('is-active');
}

function scrollToHash() {
  const hash = location.hash;
  document.querySelector(hash).scrollIntoView();
}

function addText(el, str) {
  const textNode = document.createTextNode(str);
  el.appendChild(textNode);
}

function setAttributes(el, attrs) {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function createBody(response) {
  const data = response;
  data.forEach((item) => {
    const category = document.createElement('div');
    setAttributes(category, { id: item.type, class: 'table' });

    const cateHead = document.createElement('figure');
    cateHead.setAttribute('class', 'thead');
    addText(cateHead, item.name);
    category.appendChild(cateHead);

    const cateBody = document.createElement('figure');
    cateBody.setAttribute('class', 'tbody');

    item.data.forEach((iData) => {
      const link = document.createElement('a');
      link.setAttribute('href', iData[1]);
      const elWrap = document.createElement('figure');
      const elTitle = document.createElement('figcaption');
      addText(elTitle, iData[0]);

      const elDesc = document.createElement('p');
      elDesc.setAttribute('class', 'desc');
      addText(elDesc, iData[2]);

      elWrap.appendChild(elTitle);
      elWrap.appendChild(elDesc);
      link.appendChild(elWrap);
      cateBody.appendChild(link);
      category.appendChild(cateBody);
    });

    document.body.appendChild(category);
  });

  // link onclick
  const linkEl = document.getElementsByTagName('a');
  for (let i = 0; i < linkEl.length; i++) {
    linkEl[i].addEventListener('click', openLink, false);
  }

  // .thead onclick
  const tHead = document.querySelectorAll('.thead');
  for (let i = 0; i < tHead.length; i++) {
    tHead[i].addEventListener('click', changeHash, false);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // on hash change
  window.addEventListener('hashchange', changeHeadColor, false);

  if (compareVersion()) {
    const data = localStorage.getItem('frontend-navigation-data');
    createBody(JSON.parse(data));
    setTimeout(() => {
      if (location.hash) {
        scrollToHash();
        changeHeadColor();
      }
    }, 1);
  } else {
    fetch('js/data.json')
      .then((response) => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        }
        throw new TypeError('JSON please');
      })
      .then((data) => {
        createBody(data);
        const json = JSON.stringify(data);
        localStorage.setItem('frontend-navigation-version', document.querySelector('head').dataset.version);
        localStorage.setItem('frontend-navigation-data', json);
      })
      .then(() => {
        if (location.hash) {
          scrollToHash();
          changeHeadColor();
        }
      })
      .catch((err) => { throw new Error(err); });
  }
});
