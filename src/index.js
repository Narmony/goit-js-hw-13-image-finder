import './styles.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { notice, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
// const debounce = require('lodash.debounce');
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';


import ImagesApiService from './js/apiService.js';
import cardTpl from './templates/photo-card.hbs';

const refs = {
    cardContainer: document.querySelector('.js-gallery-container'),
    searchForm: document.querySelector('.search-form'),
    sentinel: document.querySelector('#sentinel'),
    // loadMoreBtn: document.querySelector('[data-action = "load-more"]')
}

const imagesApiService = new  ImagesApiService();
refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);



function onSearch(e){ 
    e.preventDefault();
    
    imagesApiService.query = e.currentTarget.elements.query.value;
    if (imagesApiService.query === '') {
        return error({
          title: 'O, нет !',
          text: 'Заполни строку поиска!',
          delay: 1200,
  })
    }
    imagesApiService.resetPage();
    imagesApiService.fetchImages()
        .then(hits => {
        clearCardsContainer();
        appendCardsMarkup(hits);
            // refs.loadMoreBtn.classList.remove('hidden');
        })
        .catch(error => {
            notice({
                title: 'Упс !',
                text: 'Нет такого изображения! Попробуй еще раз!',
                delay: 1200,
            })
        }) 

};
// function onLoadMore() {
//     imagesApiService.fetchImages().then(appendCardsMarkup);
   
// }
 
function appendCardsMarkup(hits) { 
    refs.cardContainer.insertAdjacentHTML('beforeend', cardTpl(hits));
    
}

function clearCardsContainer() { 
    refs.cardContainer.innerHTML = '';
    // refs.loadMoreBtn.classList.add('hidden');

}

const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && imagesApiService.query !== '') {
        imagesApiService.fetchImages().then(appendCardsMarkup);
        }
    })
}
const options = {
    rootMargin: '500px'
}
const observer = new IntersectionObserver(onEntry, options)


observer.observe(refs.sentinel);

const onModal = event => {
  const imgTag = event.target;
  if (imgTag.nodeName !== 'IMG') return;
    const imgSrc = imgTag.dataset.source;
    console.log(imgSrc);
  const instance = basicLightbox.create(
    `<img src=${imgSrc} alt="" width="100%"/>`,
  );
    console.log(instance)
  instance.show();
};

refs.cardContainer.addEventListener('click', onModal);

