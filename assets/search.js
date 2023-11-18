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

getParams();

searchForm.addEventListener('submit', searchSubmit);