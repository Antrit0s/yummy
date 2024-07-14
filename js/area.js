let areaBtn = document.querySelector('#area');
let areaData = document.querySelector('#area-data');

areaBtn.addEventListener('click', async () => {
    try {
        loader.classList.remove('d-none'); // Show loader
        $(sideBar).animate({ left: '-257px' }, 500);
    $(toggler).removeClass('fa-x').addClass('fa-bars');
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        const data = await response.json();
        const areas = data.meals;

        areaData.classList.remove('d-none');
        rowData.classList.add('d-none');
        catData.classList.add('d-none');
        document.querySelector('#search-section').classList.add('d-none');
        document.querySelector('.access-meal').classList.add('d-none');
        contactDiv.classList.add('d-none')

        // Hide ingredientData
        ingredientData.classList.add('d-none');

        let cartona = '';
        areas.forEach(area => {
            cartona += `
                <div onclick="filterByArea('${area.strArea}')" class="col-md-3">
                    <div class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${area.strArea}</h3>
                    </div>
                </div>`;
        });

        areaData.innerHTML = cartona;
    } catch (error) {
        console.error('Error fetching areas:', error);
        // Handle error, e.g., display an error message to the user
    } finally {
        loader.classList.add('d-none'); // Hide loader
    }
});

// filter by area
async function filterByArea(areaParam) {
    try {
        loader.classList.remove('d-none'); // Show loader

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaParam}`);
        const data = await response.json();
        console.log(data);

        displayFilteredMeals(data.meals);
    } catch (error) {
        console.error('Error filtering meals by area:', error);
        // Handle error, e.g., display an error message to the user
    } finally {
        loader.classList.add('d-none'); // Hide loader
    }
}

function displayFilteredMeals(meals) {
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

    areaData.innerHTML = cartona;
    // rowData.classList.remove('d-none');
    catData.classList.add('d-none');

    // Event delegation for click handling
    areaData.addEventListener('click', handleMealClick);
}
