var cocktailContainerEl = document.querySelector('#cocktail-container')
var cocktailSectionEl = document.querySelector('#cocktail-title')
var foodSectionEl = document.querySelector('#food-title'); 
var recipeContainer = document.querySelector("#recipe-container")
var searchFormEl = document.querySelector('#search-btn')
var searchForm = document.querySelector('#search-input-form')
var drinkTitle = document.querySelectorAll(".drink-title")
var dinnerTheme = JSON.parse(localStorage.getItem("dinnerTheme"))
var favoritesNavEl = document.querySelector('#favorites')
//EDAMAM API
var apiID = "0c3909d6"
var apiKey = "533370b8e8005d53cb946109d8f345ed"

// *********************
var drinksData;
var storeData = [];
var recipeData;
// *********************

// Function that captures user input from landing page and save to local storage
function getParams() {
    var searchParamsArr = document.location.search.split();
    console.log(searchParamsArr)

    var query = searchParamsArr[0].split('=').pop();
    // console.log(query)

    storeData.push({ query });
    // console.log(storeData)

    // save user input to share local storage array
    localStorage.setItem("event", JSON.stringify(storeData));
}

// Function for event-listener when submit is clicked
function searchSubmit(event) {
    console.log("click");
    event.preventDefault();

    var foodInput = document.querySelector('#food-input').value;
    console.log(foodInput)

    var cocktailInput = document.querySelector('#cocktail-input').value;
    console.log(cocktailInput)

    if (!foodInput & !cocktailInput) {
        alert('Please enter food and cocktail choices');
        return;
    } else {
        getRecipe(foodInput);
        getCocktailData(cocktailInput);
        cocktailContainerEl.textContent = "";
        recipeContainer.textContent = "";
        
        cocktailSectionEl.textContent = "";
        foodSectionEl.textContent = "";
        
        var drinksSectionTitle = document.createElement('h2');
        drinksSectionTitle.textContent = 'DRINKS';
        cocktailSectionEl.appendChild(drinksSectionTitle);

        var foodSectionTitle = document.createElement('h2');
        foodSectionTitle.textContent = 'FOOD';
        foodSectionEl.appendChild(foodSectionTitle);

    }

}


//Retrieve data from Food Recipe API
function getRecipe(recipe) {
    const url = `https://api.edamam.com/search?q=${recipe}&app_id=${apiID}&app_key=${apiKey}`
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            displayRecipes(data.hits.slice(0,6))
        })
}


// Display data on screen from Food Recipe API
function displayRecipes(data) {
    recipeData = data
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        console.log(data[i]);

        const recipeCardEl = document.createElement("div");
        const btnEl = document.createElement('button');
        btnEl.classList = 'button';
        btnEl.id = data[i].recipe.label
        btnEl.setAttribute("type", "button")
          // ********************* Event listener and function to save chosen recipe to favorites
          btnEl.addEventListener("click", function (event) {
            addrecipetoFavorites(event.target.id)
            console.log("button clicked")
        })  // *********************

        const iconEl = document.createElement ('i')
        iconEl.id = data[i].recipe.label
        iconEl.classList = "fa-sharp fa-solid fa-heart fa-sm"
        const recipeTitleEl = document.createElement("h3");
        recipeTitleEl.textContent = data[i].recipe.label;
        const recipeUrlEl = document.createElement("a");
        recipeUrlEl.href = data[i].recipe.url;
        const recipeImage = document.createElement("img");
        recipeImage.className = "img-hover"
        recipeImage.src = data[i].recipe.image;
        recipeUrlEl.appendChild(recipeImage);
        recipeCardEl.appendChild(btnEl)
        btnEl.appendChild(iconEl);
        recipeCardEl.appendChild(recipeTitleEl);
        recipeCardEl.appendChild(recipeUrlEl);
        recipeContainer.appendChild(recipeCardEl);

        // console.log(data[i].recipe.label)
        // console.log(data[i].recipe.image)
        
        // save data result data to local storage
        var label = data[i].recipe.label;
        var image = data[i].recipe.image;
        // storeData.push({label,image});
        // console.log(storeData)
        // localStorage.setItem("event", JSON.stringify(storeData));
        }
    }

// Retrieve data from Cocktail API
function getCocktailData(userInput) {
    var apiUrl = 'https://api.api-ninjas.com/v1/cocktail?name=' + userInput;
    var options = {
        method: 'GET',
        headers: { 'x-api-key': 'GMHVNXZRoCDIxxWN2NU9VQ==QnmOLePp49huqtNq' }
    }

    fetch(apiUrl, options)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    //ingredientsIndex = 0;
                    displayCocktailData(data.slice(0,6));
                    console.log(data);
                })
            } else {
                alert('Error:' + response.statusText);
            }
        })
}

// Display data on screen from Cocktail Recipe API
function displayCocktailData(data) {
    drinksData = data
    console.log(data)

    for (var i = 0; i < data.length; i++) {
        console.log(data[i])

       const cocktailCard = document.createElement('div')
       const btnEl = document.createElement('button');
       btnEl.classList = 'button';
       btnEl.id = data[i].name
       btnEl.setAttribute("type", "button")
       const iconEl = document.createElement ('i')
         //    ********************* 
         iconEl.id = data[i].name
         //    ********************* Event listener and function to save chosen drink to favorites
         btnEl.addEventListener("click", function (event) {
             adddrinktoFavorites(event.target.id)
             console.log(data)
         })
         //    *********************
       iconEl.classList = "fa-sharp fa-solid fa-heart fa-sm"
       const cocktailTitle = document.createElement('h3')
       cocktailTitle.textContent = data[i].name;
       const instructionstitleEl = document.createElement('h4')
       instructionstitleEl.textContent = 'Instructions:'
       const instructionsEl = document.createElement('p')
       instructionsEl.textContent = data[i].instructions
       const ingredientsTitle = document.createElement('h4')
       ingredientsTitle.textContent = 'Ingredients:'
       cocktailCard.appendChild(btnEl);
       btnEl.appendChild(iconEl)
       cocktailCard.appendChild(cocktailTitle)
       cocktailCard.appendChild(instructionstitleEl)
       cocktailCard.appendChild(instructionsEl)
       cocktailCard.appendChild(ingredientsTitle)
       const ingredientsContainer = document.createElement('ul')
        for (let j = 0; j< data[i].ingredients.length; j++) {
            const ingredientsEl = document.createElement('li')
            ingredientsEl.textContent = data[i].ingredients[j]
            ingredientsContainer.appendChild(ingredientsEl);
        }
        cocktailCard.appendChild(ingredientsContainer);
        cocktailContainerEl.appendChild(cocktailCard);

        console.log(data[i].name)
        console.log(data[i].instructions)
        // save data result data to local storage
        var name = data[i].name;
        var instructionsList = data[i].instructions;
        var ingred = data[i].ingredients;
        // storeData.push({ name, instructionsList, ingred });
        // console.log(storeData)
        // localStorage.setItem("event", JSON.stringify(storeData));
    }
}
// ********************* Function that prevents duplication of saved recipes and adds the recipe to local storage if not already there. 
var savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || []
function addrecipetoFavorites(title) {
    const recipe = recipeData.find(item => item.recipe.label === title)
    const existingRecipes = savedRecipes.find (item => item.recipe.label === recipe.label)
    if (!existingRecipes) {
        savedRecipes.push(recipe)
        localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes))
    }
}
// ********************* Function that prevents duplication of saved drinks and adds the recipe to local storage if not already there. 
var savedDrinks = JSON.parse(localStorage.getItem("savedDrinks")) || []
function adddrinktoFavorites(title) {
    const drink = drinksData.find(item => item.name === title)
    const existingDrink = savedDrinks.find (item => item.name === drink.name)
    if (!existingDrink) {
        savedDrinks.push(drink)
        localStorage.setItem("savedDrinks", JSON.stringify(savedDrinks))
    }
}
// *********************
getParams();

// function favoritesClick(event) {
//     event.preventDefault();
//     localStorage.clear();
    
//     var queryString = './dinner-details.html';

//     location.assign(queryString);
// }

searchForm.addEventListener('submit', searchSubmit);

// favoritesNavEl.addEventListener('click', favoritesClick)