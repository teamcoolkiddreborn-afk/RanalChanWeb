/*
  MODIFIER LE SITE : les listes ci-dessous sont les seules données à changer
  pour ajouter une annonce, une application ou un partenaire.
*/
const annonces = [
  { date: 'DERNIÈRE UPDATE', tag: 'AGARTHAKIT', title: 'Syscall implémenté', text: 'La dernière mise à jour d’AGARTHAKIT intègre désormais syscall. Découvre les changements sur GitHub.' },
  { date: 'À VÉRIFIER', tag: 'Important', title: 'Les conditions d’utilisation ont changé', text: 'Les Terms of Use ont été modifiés. Pense à les relire avant d’utiliser les projets concernés.' }
];

const applications = [
  { icon: '✦', title: 'AGARTHAKIT', text: 'La boîte à outils de la Team CoolKidd Reborn, disponible sur GitHub.', url: 'https://github.com/teamcoolkiddreborn-afk/AGARTHAKIT' },
  { icon: '⌘', title: 'Tes projets', text: 'Cet espace est prévu pour présenter simplement les applications et créations de la communauté.' },
  { icon: '↗', title: 'Proposer une idée', text: 'Une idée ou un projet à partager ? Rejoins la communauté pour en discuter.' }
];

const partenaires = [
  { icon: '◉', title: 'Discord', text: 'Le point de rencontre de la communauté RanalChan.', url: 'https://discord.gg/Vybc8EsdE2' },
  { icon: '▶', title: 'YouTube', text: 'Retrouve les vidéos, lives et contenus de RanalChan.', url: 'https://www.youtube.com/@ck4TeamC00lkiddreborn' },
  { icon: '⌘', title: 'GitHub', text: 'Les projets et codes open source de RanalChan.', url: 'https://github.com/teamcoolkiddreborn-afk' }
];

const images = {
  Normal: ['file_000000000d64820ab03a6c42a74caa24.png', 'file_000000009e4c820aa7f2c91bb5834b0c.png', 'file_00000000bbb4820a85538094994bb59c-removebg-preview.png'],
  Hivers: ["Capture d'écran 2026-11-13 140621 (2).png", "Capture d'écran 2026-11-13 140655.png", 'file_00000000c230820a979f30e8c6664499.png'],
  Halloween: ["Capture d'écran 2026-11-13 140751.png", "Capture d'écran 2026-11-13 140831.png", 'file_000000007a00820aa0f021f1c55d7e86.png']
};

// Images possibles pour le cercle à droite de l'accueil.
// Une image différente est choisie aléatoirement à chaque rafraîchissement.
const mascots = {
  Normal: ['file_00000000bbb4820a85538094994bb59c-removebg-preview.png', 'file_000000000d64820ab03a6c42a74caa24.png', 'file_000000009e4c820aa7f2c91bb5834b0c.png'],
  Hivers: ['file_00000000c230820a979f30e8c6664499.png', "Capture d'écran 2026-11-13 140621 (2).png", "Capture d'écran 2026-11-13 140655.png"],
  Halloween: ['file_000000007a00820aa0f021f1c55d7e86.png', "Capture d'écran 2026-11-13 140751.png", "Capture d'écran 2026-11-13 140831.png"]
};

function getTheme() {
  const month = new Date().getMonth() + 1;
  if (month === 10) return 'Halloween';
  if ([12, 1, 2].includes(month)) return 'Hivers';
  return 'Normal';
}

function imagePath(theme, file) { return `../image/${theme}/${encodeURIComponent(file)}`; }

function randomImage(theme, collection) {
  const lastKey = `ranalchan-last-image-${theme}`;
  const lastImage = localStorage.getItem(lastKey);
  const choices = collection.length > 1 ? collection.filter(file => file !== lastImage) : collection;
  const selected = choices[Math.floor(Math.random() * choices.length)];
  localStorage.setItem(lastKey, selected);
  return selected;
}

function renderCards() {
  document.querySelector('#news-count').textContent = `${annonces.length} PUBLICATIONS`;
  document.querySelector('#news-list').innerHTML = annonces.map(item => `<article class="news-card"><div class="card-meta"><span>${item.date}</span><span class="tag">${item.tag}</span></div><h3>${item.title}</h3><p>${item.text}</p><span class="card-arrow">↗</span></article>`).join('');
  document.querySelector('#applications-list').innerHTML = applications.map(item => `<${item.url ? 'a' : 'article'} class="info-card"${item.url ? ` href="${item.url}" target="_blank" rel="noopener"` : ''}><div class="info-icon">${item.icon}</div><h3>${item.title}${item.url ? ' <span class="card-arrow">↗</span>' : ''}</h3><p>${item.text}</p></${item.url ? 'a' : 'article'}>`).join('');
  document.querySelector('#partners-list').innerHTML = partenaires.map(item => `<a class="info-card" href="${item.url}" target="_blank" rel="noopener"><div class="info-icon">${item.icon}</div><h3>${item.title} <span class="card-arrow">↗</span></h3><p>${item.text}</p></a>`).join('');
}

function showSection(id) {
  document.querySelectorAll('main, .content-section').forEach(section => section.hidden = section.id !== id && !(id === 'accueil' && section.tagName === 'MAIN'));
  document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.dataset.section === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setTheme(theme, save = true) {
  const chosenImage = randomImage(theme, images[theme]);
  const chosenMascot = randomImage(`${theme}-mascot`, mascots[theme]);
  document.body.dataset.theme = theme;
  document.documentElement.style.setProperty('--background-image', `url("${imagePath(theme, chosenImage)}")`);
  document.querySelector('#hero-mascot').src = imagePath(theme, chosenMascot);
  document.querySelector('#season-label').textContent = theme === 'Hivers' ? 'Hiver' : theme;
  document.querySelector('#theme-select').value = theme;
  if (save) localStorage.setItem('ranalchan-theme', theme);
}

const savedTheme = localStorage.getItem('ranalchan-theme');
const initialTheme = images[savedTheme] ? savedTheme : getTheme();
setTheme(initialTheme, false);
document.querySelector('#year').textContent = new Date().getFullYear();
renderCards();

document.querySelectorAll('[data-section], [data-section-target]').forEach(button => button.addEventListener('click', () => showSection(button.dataset.section || button.dataset.sectionTarget)));
document.querySelector('#theme-select').addEventListener('change', event => setTheme(event.target.value));
window.addEventListener('load', () => setTimeout(() => document.querySelector('#loader').classList.add('hide'), 350));
