function compareVersion() { // return true or false
  const localVersion = localStorage.getItem('frontend-navigation-version');
  const curVersion = document.querySelector('head').dataset.version;
  return localVersion === curVersion;
}

function openLink(e) {
  e.preventDefault();
  open(this.href);
}

function rmActive() {
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

function changeHash() {
  toggleActive(this);
  // 修改hash
  const newHistory = this.parentNode.getAttribute('id');
  history.replaceState({ hash: newHistory }, '', `#${newHistory}`);
}

function changeHeadColor() {
  rmActive();
  const hashName = location.hash;
  const targetHead = document.querySelector(hashName).querySelector('.thead');
  targetHead.classList.toggle('is-active');
}

function scrollToHash() {
  const hash = location.hash;
  document.querySelector(hash).scrollIntoView();
}

function createBody(response) {
  const data = response;
  const newHead = name => `<figure class="thead">${name}</figure>`;
  const newItem = item => `
    <a href="${item[1]}">
      <figure>
        <figcaption>${item[0]}</figcaption>
          <p class="desc">${item[2]}</p>
        </figure>
    </a>
    `;
  const newBody = (d) => {
    let result = '';
    d.forEach((item) => {
      result += newItem(item);
    });
    return `<figure class="tbody">${result}</figure>`;
  };
  const newCategory = d => `
      <div id="${d.type}" class="table">
        ${newHead(d.name)}
        ${newBody(d.data)}
      </div>
    `;

  let result = '';
  data.forEach((category) => {
    result += newCategory(category);
  });
  return `${result}`;
}

document.addEventListener('DOMContentLoaded', () => {
  // on hash change
  window.addEventListener('hashchange', changeHeadColor, false);

  if (compareVersion()) {
    const data = localStorage.getItem('frontend-navigation-data');
    document.body.innerHTML = createBody(JSON.parse(data));
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
        document.body.innerHTML = createBody(data);
        localStorage.setItem('frontend-navigation-version', document.head.dataset.version);
        localStorage.setItem('frontend-navigation-data', JSON.stringify(data));
      })
      .then(() => {
        if (location.hash) {
          scrollToHash();
          changeHeadColor();
        }
      })
      .catch((err) => { throw new Error(err); });
  }

  window.addEventListener('load', () => {
    // link onclick
    const linkEl = document.getElementsByTagName('a');
    for (let i = 0; i < linkEl.length; i++) {
      linkEl[i].addEventListener('click', openLink, false);
    }
    // .thead onclick
    const tHead = document.getElementsByClassName('thead');
    for (let i = 0; i < tHead.length; i++) {
      tHead[i].addEventListener('click', changeHash, false);
    }
  });
});
