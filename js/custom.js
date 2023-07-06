//Menu-Hamburguer
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');


window.onscroll = () =>{
    //Vai Remover o Menu Hamburguer
    menu.classList.remove('fa-times');
    navbar.classList.remove('active'); 
}

menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
})


 /*Rolagem até o Topo*/
 const rolagem = ()=> {
  const html = document.documentElement
  const seta = document.getElementById('go-top')

  /* Se a rolagem for maior que 550, a seta aparece 
  abaixo de 550 esconde */
  if (html.scrollTop > 350 ) {
    seta.style.display = 'block'
  } else {
    seta.style.display = 'none'
  }
}

//window.addEventListener('scroll', rolagem)
window.onscroll = ()=> rolagem()//evento somente para elem q existem no html


function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}

function Gallery(element) {
  this.container = element;
  this.list = [...element.querySelectorAll('.img')];
  // target
  this.modal = getElement('.modal');
  this.modalImg = getElement('.main-img');
  this.imageName = getElement('.image-name');
  this.modalImages = getElement('.modal-images');
  this.closeBtn = getElement('.close-btn');
  this.nextBtn = getElement('.next-btn');
  this.prevBtn = getElement('.prev-btn');
  // self ref
  // let self = this;
  // bind functions
  // this.openModal = this.openModal.bind(this);
  this.closeModal = this.closeModal.bind(this);
  this.nextImage = this.nextImage.bind(this);
  this.prevImage = this.prevImage.bind(this);
  this.chooseImage = this.chooseImage.bind(this);
  // container event
  this.container.addEventListener(
    'click',
    function (e) {
      // self.openModal();
      if (e.target.classList.contains('img')) {
        this.openModal(e.target, this.list);
      }
    }.bind(this)
  );
}

Gallery.prototype.openModal = function (selectedImage, list) {
  this.setMainImage(selectedImage);
  this.modalImages.innerHTML = list
    .map(function (image) {
      return `<img src="${
        image.src
      }" title="${image.title}" data-id="${image.dataset.id}" class="${selectedImage.dataset.id === image.dataset.id ? 'modal-img selected' : 'modal-img'}"/>`;
    })
    .join('');
  this.modal.classList.add('open');
  this.closeBtn.addEventListener('click', this.closeModal);
  this.nextBtn.addEventListener('click', this.nextImage);
  this.prevBtn.addEventListener('click', this.prevImage);
  this.modalImages.addEventListener('click', this.chooseImage);
};

Gallery.prototype.setMainImage = function (selectedImage) {
  this.modalImg.src = selectedImage.src;
  this.imageName.textContent = selectedImage.title;
};

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove('open');
  this.closeBtn.removeEventListener('click', this.closeModal);
  this.nextBtn.removeEventListener('click', this.nextImage);
  this.prevBtn.removeEventListener('click', this.prevImage);
  this.modalImages.removeEventListener('click', this.chooseImage);
};
Gallery.prototype.nextImage = function () {
  const selected = this.modalImages.querySelector('.selected');
  const next =
    selected.nextElementSibling || this.modalImages.firstElementChild;
  selected.classList.remove('selected');
  next.classList.add('selected');
  this.setMainImage(next);
};
Gallery.prototype.prevImage = function () {
  const selected = this.modalImages.querySelector('.selected');
  const prev =
    selected.previousElementSibling || this.modalImages.lastElementChild;
  selected.classList.remove('selected');
  prev.classList.add('selected');
  this.setMainImage(prev);
};
Gallery.prototype.chooseImage = function (e) {
  if (e.target.classList.contains('modal-img')) {
    const selected = this.modalImages.querySelector('.selected');
    selected.classList.remove('selected');

    this.setMainImage(e.target);
    e.target.classList.add('selected');
  }
};

const salty = new Gallery(getElement('.salty'));
const juice = new Gallery(getElement('.juice'));
const nature = new Gallery(getElement('.house'));

const snack = new Gallery(getElement('.snack'));