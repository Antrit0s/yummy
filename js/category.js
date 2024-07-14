// categories on click
$('#categories').on('click', function () {
    $(sideBar).animate({ left: '-257px' }, 500);
    $(toggler).removeClass('fa-x').addClass('fa-bars');
    $(rowData).addClass('d-none');
    $('.access-meal').addClass('d-none');
    $('#ingredient-data').addClass('d-none');
    $('#area-data').addClass('d-none');
    if ($('#cat-data').hasClass('d-none')) {
        $('#cat-data').removeClass('d-none');
        $(ingredientData).addClass('d-none')
    }
    fetchCategories();
});
// fetch categories
async function fetchCategories() {
    try {
        loader.classList.remove('d-none');
        contactDiv.classList.add('d-none')
        let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        let data = await response.json();
        let allCategories = data.categories;
        displayCategories(allCategories);
    } catch (error) {
        console.error('Error fetching meals:', error);
    } finally {
        loader.classList.add('d-none');
    }
}
// display category
let catData = document.getElementById('cat-data');
function displayCategories(allCategories) {
    let cartona = '';
    function displayFirst20Words(text) {
        const words = text.split(' ');
        const first20Words = words.slice(0, 20).join(' ');
        return first20Words + '...';
    }
    allCategories.forEach(cat => {
        let filteredDesc = displayFirst20Words(cat.strCategoryDescription);
        cartona += `
            <div class="col-md-3 cat-card cat-item position-relative overflow-hidden rounded-2 cursor-pointer" catName=${cat.strCategory} catId="${cat.idCategory}">
                <img class="w-100 rounded-2" src="${cat.strCategoryThumb}" alt="${cat.strCategory}">
                <div class="cat-layer layer position-absolute d-flefilteredDesc = flex-column align-items-center text-black ">
                    <h3 class="h5">${cat.strCategory}</h3>
                    <p class="fs-6">${filteredDesc}</p>
                </div>
            </div>`;
    });
    catData.innerHTML = cartona;
    catData.classList.remove('d-none');
    accessCategory();
}
// access certain category
function accessCategory() {
    catData.addEventListener('click', function (e) {
        let catCard = e.target.closest('.cat-card');
        if (catCard) {
            let name = catCard.getAttribute('catName');
            console.log(name);
            displayCatByName(name)
            // diplayCatByName(name);
        }
    });
}
// // display certain category
// async function diplayCatByName(name) {
//     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
//     let data = await response.json();
//     console.log(data.meals);
//     rowData.classList.remove('d-none');
//     catData.classList.add('d-none');
//     displayAfterSearch(data);
//     searchByName(name)
// }
// async function searchByName(name){
//     try{
//         console.log(name)
//         loader.classList.remove('d-none');
//         let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
//         let data = await response.json()
//         displayAfterSearch(data)
//         accessMeal ()
//         rowData.classList.remove('d-none')
//         console.log(data.meals)
//     }catch(error){console.error('Error fetching meals:', error);}
//     finally{loader.classList.add('d-none');}
// }



// display certain category
async function displayCatByName(name) {
    try {
        loader.classList.remove('d-none');
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
        const data = await response.json();
        console.log(data.meals);

        let cartona = '';
        data.meals.forEach(meal => {
            cartona += `
                <div class="col-md-3 meal-card position-relative overflow-hidden rounded-2 cursor-pointer" mealId="${meal.idMeal}">
                    <img class="w-100 rounded-2" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>`;
        });

        catData.classList.remove('d-none');
        contactDiv.classList.add('d-none')
        catData.innerHTML = cartona;

        // Event delegation for click handling
        catData.addEventListener('click', handleMealClick);
    } catch (error) {
        console.error('Error fetching meals:', error);
    }
    finally{
        loader.classList.add('d-none');
    }
}
// Handles click to show meal
function handleMealClick(event) {
    const mealCard = event.target.closest('.meal-card');
    if (mealCard) {
        const mealId = mealCard.getAttribute('mealId');
        console.log(mealId);
        accessMealById(mealId);
        areaData.classList.add('d-none');
        ingredientData.classList.add('d-none')
        contactDiv.classList.add('d-none')
    }
}

async function accessMealById(mealId) {
    try {
        loader.classList.remove('d-none');
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();

        if (data.meals && data.meals.length > 0) {
            const meal = data.meals[0];
            console.log(meal);
            displayClickedMeal(meal);
        }
    } catch (error) {
        console.error('Error accessing meal:', error);
    } finally {
        loader.classList.add('d-none');
    }
}

function displayClickedMeal(meal) {
    document.querySelector('main').classList.add('d-none');
    document.querySelector('#meal-data').classList.remove('d-none');
    document.querySelector('.access-meal').classList.remove('d-none');
    catData.classList.add('d-none')
    const mealInfo = document.querySelector('.access-meal');
    
    mealInfo.querySelector('#mealImg').setAttribute('src', `${meal.strMealThumb}`);
    mealInfo.querySelector('#mealName').textContent = meal.strMeal;
    mealInfo.querySelector('#instructions').textContent = meal.strInstructions;
    mealInfo.querySelector('#mealArea').innerHTML = `Area: ${meal.strArea}`;
    mealInfo.querySelector('#category').innerHTML = `Category: ${meal.strCategory}`;
    
    loopRecipe(meal, mealInfo);
    loopTags(meal, mealInfo);
    
    mealInfo.querySelector('#source').href = `${meal.strSource}`;
    
    let yB = document.querySelector('#youtube');
    yB.href = meal.strYoutube;
    yB.target = '_blank'; // Open link in a new tab
}
