const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

let count = 0;
const fetchRecipes = async (query) => {
    count = 0;
    recipeContainer.innerHTML = "<h2>fetching Recipes...</h2>";
    
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    // console.log(response.meals[0]);

    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {

            // console.log(meal);
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML= `
                 <img src="${meal.strMealThumb}">
                 <h3> ${meal.strMeal}</h3>
                 <p><span>${meal.strArea} Dish</span></p>
                 <p>Belongs to <span>${meal.strCategory}</span> Category</p>
             `

             const button = document.createElement('button');
             button.textContent = "View Recipe";
             recipeDiv.appendChild(button);
             

             //adding eventlistenner
             button.addEventListener(`click`  , () => {
                openRecipePopup(meal);
             })
             recipeContainer.appendChild(recipeDiv);
             count++;
            //  console.log(count);
    });
   
}

const fetchIngredients = (meal) =>{
    let ingredientsList ="";
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const  measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient} </li>`
        }
        else{
            break;
        }

    }
    return ingredientsList;
}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    
        <div class="container">
            <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
         <div class="recipeInstructions">
            <h3>Instructions: </h3>
            <p>${meal.strInstructions}</p>
        </div>
        </div>
    `

    recipeDetailsContent.parentElement.style.display = "block";
    
}


recipeCloseBtn.addEventListener('click', () => {
    recipeCloseBtn.parentElement.style.display = "none";
});



searchBtn.addEventListener('click'  , (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
    console.log("Button Clicked");

});