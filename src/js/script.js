{
  'use strict';

  class BookList {
    constructor(data, element){
      const thisBookList = this;
      thisBookList.data = data;
      thisBookList.element = element;

      thisBookList.render();
      thisBookList.getElements();
      thisBookList.initActions();
    }
    render(){
      const thisBookList = this;
      const handlebars = Handlebars.compile(document.querySelector('#template-book').innerHTML);

      for (let book in thisBookList.data){
        thisBookList.data[book].ratingBgc = thisBookList.determineRatingBgc(thisBookList.data[book].rating);
        thisBookList.data[book].ratingWidth = thisBookList.data[book].rating/10*100+'%';
        let generateHTML = handlebars(thisBookList.data[book]);
        const generatedHTML = utils.createDOMFromHTML(generateHTML);
        thisBookList.element.appendChild(generatedHTML);
      }
    }
    getElements(){
      const thisBookList = this;

      thisBookList.filterForm = document.querySelector('.filters');
      thisBookList.filters = [];
      thisBookList.favoriteBooks = [];
    }

    initActions(){
      const thisBookList = this;

      thisBookList.element.addEventListener('click', function(event){
        event.preventDefault();

        const targetElement = event.target.offsetParent;
        const dataId = targetElement.getAttribute('data-id');
        if(targetElement.classList.contains('book__image')) {
          targetElement.classList.toggle('favorite');
          if (thisBookList.favoriteBooks.includes(dataId)){
            thisBookList.favoriteBooks.splice(thisBookList.favoriteBooks.indexOf(dataId),1);
            console.log(thisBookList.favoriteBooks);
          } else {
            thisBookList.favoriteBooks.push(dataId);
            console.log(thisBookList.favoriteBooks);
          }
        }
      });

      thisBookList.filterForm.addEventListener('click', function(event){
        const inputName = event.target.getAttribute('name');
        const inputType = event.target.getAttribute('type');
        const inputValue = event.target.getAttribute('value');

        if(inputName === 'filter' &&
           inputType === 'checkbox' &&
           event.target.tagName === 'INPUT'){
          if (event.target.checked){
            thisBookList.filters.push(inputValue);
            console.log(thisBookList.filters);
          }else{
            thisBookList.filters.splice(thisBookList.filters.indexOf(inputName),1);
            console.log(thisBookList.filters);
          }
        }
        thisBookList.filterBooks();
      });
    }
    filterBooks(){
      const thisBookList = this;

      for(let book in thisBookList.data){
        console.log(thisBookList.data[book]);
        let shouldBeHidden = false;
        const dataID = thisBookList.data[book].id;
        console.log(dataID);
        const currentBookImage = document.querySelector('.book__image[data-id="'+dataID+'"]');
        for (let filter of thisBookList.filters){
          if (thisBookList.data[book].details[filter]){
            console.log('działa');
            shouldBeHidden = true;
            break;
          }else {shouldBeHidden = false;}
        }
        if (shouldBeHidden === true){
          currentBookImage.classList.add('hidden');
        }else {
          currentBookImage.classList.remove('hidden');
        }
      }
    }
    determineRatingBgc(rating){
      if(rating < 6){
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }else if(rating > 6 && rating <= 8){
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }else if(rating > 8 && rating <= 9){
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }else {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }
  }

  const app = new BookList(dataSource.books, document.querySelector('.books-list'));
  console.log(app);
}