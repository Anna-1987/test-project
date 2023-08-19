import {fetchImages} from './services/service-api';
import './css/styles.css';
console.log(fetchImages());


const refs ={
    searchForm:document.querySelector('.search-form'),
    submitBtn:document.querySelector('.submit'),
    gallery:document.querySelector('.gallery'),
    loadMoreBtn:document.querySelector('.load-more'),
    // ratingActive:document.querySelector('.rating-active'),
    // ratingValue:document.querySelector('.rating-value'),
}
    
fetchImages()
      .then(data => {
        console.log(data);

        const searchResults = data.results;

        console.log(searchResults);

        createGalleryCard(searchResults);
        refs.gallery.insertAdjacentHTML("beforeend", createGalleryCard(searchResults));

        colorRating (searchResults);

      })


      function createGalleryCard(searchResults){
        return searchResults.map(({thumb, title, description, rating}) => {
            return `<div class="photo-card">
            <div class = "backdrop"></div>
            <img  class="img_wrap" src="${thumb}" alt="${title}"/>
                <div class="info">
                <div class="info-text">
                <p class="text-title">${title}</p>
                <p class="text-description">${description}</p>
                </div>
            </div>
            <div class = "rating">
            <div class="rating-value">${rating}</div>
            <div class="rating-body">
            <div class="rating-active"></div>
            <div class="rating-items">
            <input type = "radio" class="rating-item" value="1" name="rating" >
            <input type = "radio" class="rating-item" value="2" name="rating" >
            <input type = "radio" class="rating-item" value="3" name="rating" >
            <input type = "radio" class="rating-item" value="4" name="rating" >
            <input type = "radio" class="rating-item" value="5" name="rating" >
            </div>
            </div>
            </div>
            <div class = "heard">
            <div class="heard-body">
            <div class="heard-active"></div>
            <div class="heard-items">
            <button type="button" class="btn-heard"></button>
            </div>
            </div>
            </div>
            <button type="button" class="btn-see-recipe">See recipe</button>
            </div>`
        }).join('');
    }
        
    function colorRating (searchResults){
        const ratings = searchResults.flatMap(({ rating }) => rating);

        if (ratings.length > 0){
            initRatings();
         }
        
        function initRatings(){
            let ratingActive, ratingValue;
            for (let index = 0; index < ratings.length; index++){
                const rating = ratings[index];
                console.log(rating);
                initRatingVars(rating);
                setRatingActiveWidth(rating);
            }
        
            function initRatingVars(){
                ratingActive = document.querySelector('.rating-active');
                ratingValue = document.querySelector('.rating-value');
             }
        
             function setRatingActiveWidth(rating){
                const ratingActiveWidth = rating / 0.05;
                ratingActive.style.width = `${ratingActiveWidth}%`;
             }
        }
   
    }


    
    
    
      