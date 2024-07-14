let ingredientsBtn = document.querySelector('#ingredients');
let ingredientData = document.querySelector('#ingredient-data');

ingredientsBtn.addEventListener('click', srcIng);

async function srcIng() {
    $(sideBar).animate({ left: '-257px' }, 500);
    $(toggler).removeClass('fa-x').addClass('fa-bars');
    await fetchIng();
}

async function fetchIng() {
    try {
        loader.classList.remove('d-none');
        let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        let data = await response.json();
        const ingredients = data.meals.slice(0, 20);

        console.log(ingredients);

        // Hide other sections
        ingredientData.classList.remove('d-none');
        areaData.classList.add('d-none');
        rowData.classList.add('d-none');
        catData.classList.add('d-none');
        document.querySelector('#search-section').classList.add('d-none');
        document.querySelector('.access-meal').classList.add('d-none');
        contactDiv.classList.add('d-none')

        // Function to display first 10 words of description
        function displayFirst10Words(text) {
            const words = text.split(' ');
            const first10Words = words.slice(0, 10).join(' ');
            return first10Words + '...';
        }

        let cartona = '';
        ingredients.forEach(ingredient => {
            const ingredientsDesc = displayFirst10Words(ingredient.strDescription);
            cartona += `
                <div onclick="filterByIngredient('${ingredient.strIngredient}')" class="col-md-3">
                    <div class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ingredient.strIngredient}</h3>
                        <p>${ingredientsDesc}</p>
                    </div>
                </div>`;
        });

        ingredientData.innerHTML = cartona;
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        // Handle error, e.g., display an error message to the user
    }
    finally{
        loader.classList.add('d-none');
    }
}

// Function to handle click on ingredient and perform filtering
async function filterByIngredient(ingredientName) {
    try {
        loader.classList.remove('d-none');
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
        let data = await response.json();
        console.log(data);

        getIngItems(data.meals);
    } catch (error) {
        console.error('Error filtering meals by ingredient:', error);
        // Handle error, e.g., display an error message to the user
    }
    finally{
        loader.classList.add('d-none');
    }
}

function getIngItems(meals) {
    let cartona = '';
    meals.forEach(meal => {
        cartona += `
            <div class="col-md-3 meal-card position-relative overflow-hidden rounded-2 cursor-pointer" mealId="${meal.idMeal}">
                <img class="w-100 rounded-2" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>`;
    });

    ingredientData.innerHTML = cartona;
    // )
    // rowData.classList.remove('d-none');
    catData.classList.add('d-none');


    // Event delegation for click handling
    ingredientData.addEventListener('click', handleMealClick);
    
}
