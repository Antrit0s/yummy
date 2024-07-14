/// <reference types="../@types/jquery" />

// loading screen onLoad
$(function mainLoader() {
    $('.loading-screen').fadeIn(500, function() {
        $(this).hide();
    });
});
// toggle side bar
const toggler = $('.open-close-icon');
const sideBar = $('.side-nav-menu');
const listItems = $('.slided li');

// Ensure the sidebar is initially closed and list items are off-screen
sideBar.css('left', '-257px');
listItems.css('top', '300px');

$(toggler).on('click', function() {
    if (sideBar.css('left') === '-257px') {
        sideBar.animate({ left: 0 }, 500, function() {
            listItems.each(function(index) {
                $(this).delay(index * 100).animate({ top: 0 }, 500); // Adjusted delay and animation timing
            });
        });
        toggler.removeClass('fa-bars').addClass('fa-x');
    } else {
        sideBar.animate({ left: '-257px' }, 500, function() {
            listItems.animate({ top: 300 }, 300); // Ensure list items animate out
        });
        toggler.removeClass('fa-x').addClass('fa-bars');
    }
});

// show search inputs 
const searchBtn = $('#search');
const searchSec = $('#search-section');
$(searchBtn).on('click', function() {
    $(sideBar).animate({ left: '-257px' }, 500);
    $(toggler).removeClass('fa-x').addClass('fa-bars');
    $(searchSec).removeClass('d-none');
    $('#meal-data').addClass('d-none')
    $('main').removeClass('d-none')
    $('#cat-data').addClass('d-none')
    $('#area-data').addClass('d-none')
    $(ingredientData).addClass('d-none')
    $('.contact').addClass('d-none')
});
// Event listener for searching meals by name and letter
// const searchByName = document.querySelector('.sN');
// const serachByLetter = document.querySelector('.sL')
let rowData = document.querySelector('#row-data');
const loader = document.querySelector('.inner-loading-screen');
document.querySelectorAll('#search-section input').forEach(input =>{
    input.addEventListener('input',function getTerm() {
        let term = input.value.trim()
        console.log(term);
        searchByName(term)
        searchByLetter(term);
        
    })
})

// fetch by Name 
    async function searchByName(term){
    try{
        loader.classList.remove('d-none');
        contactDiv.classList.add('d-none')
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        let data = await response.json()
        displayAfterSearch(data)
        accessMeal ()
        rowData.classList.remove('d-none')
        console.log(data.meals)
    }catch(error){console.error('Error fetching meals:', error);}
    finally{loader.classList.add('d-none');}
}
// fetch by letter 
async function searchByLetter(term){
    try{
        loader.classList.remove('d-none');
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
        let data = await response.json()
        displayAfterSearch(data)
        accessMeal()
        console.log(data)
    }catch(error){console.error('Error fetching meals:', error);}
    finally{loader.classList.add('d-none');}
}

//  display data
    function displayAfterSearch(data){
    let cartona = '';
    data.meals.forEach(meal => {
            cartona += `
                <div  class="col-md-3 meal-card position-relative overflow-hidden rounded-2 cursor-pointer" mealId="${meal.idMeal}">
                    <img class="w-100 rounded-2" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>`;
        });
        rowData.innerHTML = cartona;
}

// insta display of data onload of document
document.addEventListener('DOMContentLoaded',function(){
    let term = ''
        console.log(term);
        searchByName(term)
        
})
// get id of clicked  meal
function accessMeal() {
    document.querySelector('#row-data').addEventListener('click', function(e) {
        const mealCard = e.target.closest('.meal-card');
        console.log(mealCard)
        if (mealCard) {
            let id = mealCard.getAttribute('mealId');
            console.log(id);
            accessMealById(id)
            document.getElementById('search-section').classList.add('d-none')
        }
    });
}
// fetch clicked meal by id
async function accessMealById(id) {
  try {
    loader.classList.remove('d-none');
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();

    if (data.meals && data.meals.length > 0) {
      const meal = data.meals[0];
      displayClickedMeal(meal);
    }
  } catch (error) {
    console.error('Error accessing meal:', error);
    // Handle error, e.g., display an error message
  } finally {
    loader.classList.add('d-none');
  }
}
// display clicked  meal 
                    function displayClickedMeal(meal) {
document.querySelector('main').classList.add('d-none');
document.querySelector('#meal-data').classList.remove('d-none');
const mealInfo = document.querySelector('.access-meal');
        mealInfo.querySelector('#mealImg').setAttribute('src',`${ meal.strMealThumb}`)
        mealInfo.querySelector('#mealName').textContent = meal.strMeal;
        mealInfo.querySelector('#instructions').textContent =meal.strInstructions
        mealInfo.querySelector('#mealArea').innerHTML =`Area: ${meal.strArea}`
        mealInfo.querySelector('#category').innerHTML =`Category: ${meal.strCategory}`
        loopRecipe(meal,mealInfo)
        loopTags(meal,mealInfo)
        mealInfo.querySelector('#source').href = `${meal.strSource}`
        // leeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeh
            let yB = document.querySelector('#youtube');
            yB.href = meal.strYoutube;
            yB.target = '_blank'; // Open link in a new tab
}


// function to loop on ingrediants
function loopRecipe(meal, mealInfo) {
  const cartona = mealInfo.querySelector('#recpie'); // Assuming an element with id 'ingredients'
  cartona.innerHTML = ''; // Clear previous content

    for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== '') {
    const li = document.createElement('li');
    li.classList.add('alert', 'alert-info', 'm-2', 'p-1');
    li.textContent = `${measure} ${ingredient}`;
    cartona.appendChild(li);
    }
    }
}

// function to loop on tags 
function loopTags(meal,mealInfo){
    let tags = meal.strTags ? meal.strTags.split(',') : [];
        let cartona =''
        for (let i = 0; i < tags.length; i++) {
    let tag = tags[i].trim();
    cartona += `<li class="alert alert-danger m-2 p-1">${tag}</li>`;
        }
        mealInfo.querySelector('#tags').innerHTML =cartona
    }
