// Commentaires pour retirer les erreurs à ignorer dans eslint
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// Ouverture Carousel
let index, last, mediaEnd;
function openModalCarousel(div) {	
	const carousel = document.getElementById('carousel-container');
	document.getElementById('bgc-carousel').style.display = 'block';
	carousel.style.display = 'block';

	// Masquer le background pour les lecteurs
	document.getElementById('main').setAttribute('aria-hidden', 'true');
	document.getElementById('header-photographe').setAttribute('aria-hidden', 'true');

	// Focus trap
	trapFocus(carousel);

	last = allMedias.length - 1;
	const idMediaCarousel = Number(div.getAttribute('data-id'));
	
	// Au clic sur le media , vérification correspondance id
	const mediaClick = allMedias.filter(media => media.id === idMediaCarousel)[0];
	
	// Recherche de l'index du média cliqué
	index = allMedias.map(media => media.id).indexOf(idMediaCarousel);
	createMultimedia(mediaClick);
}

// Création Carousel
function createMultimedia(mediaNeed) {
	
	// Vérification si image ou vidéo, créer la balise en conséquence
	mediaEnd = mediaNeed.image ?
		`<img src="./assets/images/photos/${photographerFiltres[0].name}/${mediaNeed.image}" alt="${mediaNeed.title}" data-id="${mediaNeed.id}"/>`
		:
		`<video src="./assets/images/photos/${photographerFiltres[0].name}/${mediaNeed.video}" controls="controls" alt="${mediaNeed.title}" data-id="${mediaNeed.id}"></video>`;

	document.querySelector('.divCarousel-multimedias').innerHTML= mediaEnd;
	document.querySelector('.carouselPhotosNames').innerHTML= `${mediaNeed.title}`;
	document.querySelector('.modalCarousel').style.display = 'block';
	document.getElementById('bgc-carousel').style.display = 'block';
}

// Fermeture Carousel
function closeModalCarousel() {
	const carousel = document.getElementById('carousel-container');
	document.getElementById('bgc-carousel').style.display = 'none';
	carousel.style.display = 'none';

	// Réactiver le background
	document.getElementById('main').setAttribute('aria-hidden', 'false');
	document.getElementById('header-photographe').setAttribute('aria-hidden', 'false');

	// Remettre le focus sur un élément logique (ex: premier média)
	const firstMedia = document.querySelector('.media-button');
	if (firstMedia) firstMedia.focus();
}

// Boutons Next et Prev
function next(){
	// Si on arrive sur la dernière image, revenir à la première
	if (index === last) {
		index = 0; 
		createMultimedia(allMedias[index]);
		return; 
	}
	// Si non, incrémentation
	index += 1;
	createMultimedia(allMedias[index]);
}

function prev() {
	// Si on est sur la première image, afficher la dernière image
	if (index === 0) {
		index = last;    
		createMultimedia(allMedias[index]);
		return; 
	}
	// Si non, décrémentation
	index -= 1;
	createMultimedia(allMedias[index]);
}

// Gérer les touches clavier (flèches gauche/droite + Escape)
document.addEventListener('keydown', function(e) {
	const carouselOpen = document.getElementById('bgc-carousel').style.display === 'block';
	if (!carouselOpen) return;

	switch(e.key) {
	case 'ArrowLeft':
		prev();
		break;
	case 'ArrowRight':
		next();
		break;
	case 'Escape':
		closeModalCarousel();
		break;
	}
});

// Création d'un “focus trap” : Lorsqu’une modale est ouverte, le focus doit rester à l’intérieur.
function trapFocus(element) {
	const focusableSelectors = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
	const focusableElements = Array.from(element.querySelectorAll(focusableSelectors));
	if (focusableElements.length === 0) return;

	const firstFocusable = focusableElements[0];
	const lastFocusable = focusableElements[focusableElements.length - 1];

	element.addEventListener('keydown', function(e) {
		if (e.key !== 'Tab') return;

		if (e.shiftKey) { // Shift + Tab
			if (document.activeElement === firstFocusable) {
				e.preventDefault();
				lastFocusable.focus();
			}
		} else { // Tab
			if (document.activeElement === lastFocusable) {
				e.preventDefault();
				firstFocusable.focus();
			}
		}
	});

	// Met le focus sur le premier élément au moment de l'ouverture
	firstFocusable.focus();
}



