var cocktailContainerEl = document.querySelector('#cocktail-container')
var recipeContainer = document.querySelector("#recipe-container")
var searchFormEl = document.querySelector('#search-btn')
var searchForm = document.querySelector('#search-input-form')
var drinkTitle = document.querySelectorAll(".drink-title")
var dinnerTheme = JSON.parse(localStorage.getItem("dinnerTheme"))
//EDAMAM API
var apiID = "0c3909d6"
var apiKey = "533370b8e8005d53cb946109d8f345ed"


var storeData = [];

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
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        console.log(data[i]);

        const recipeCardEl = document.createElement("div");
        const iconEl = document.createElement ('i')
        iconEl.classList = "fa-sharp fa-solid fa-heart fa-sm"
        const recipeTitleEl = document.createElement("h3");
        recipeTitleEl.textContent = data[i].recipe.label;
        const recipeUrlEl = document.createElement("a");
        recipeUrlEl.href = data[i].recipe.url;
        const recipeImage = document.createElement("img");
        recipeImage.src = data[i].recipe.image;
        recipeUrlEl.appendChild(recipeImage);
        recipeCardEl.appendChild(iconEl)
        recipeCardEl.appendChild(recipeTitleEl);
        recipeCardEl.appendChild(recipeUrlEl);
        recipeContainer.appendChild(recipeCardEl);

    }
}

getParams();

searchForm.addEventListener('submit', searchSubmit);