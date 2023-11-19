var cocktailContainerEl = document.querySelector('#cocktail-container');
var cocktailTitleEl = document.querySelector('#cocktail-title');
var recipeContainerEl = document.querySelector('#recipe-container')

var finalCocktailArry = [];
var themeNameArry = [];
var finalRecipeArry = [];


// retrieve local storage data and display favorites
function getStorage() {
    themeName = JSON.parse(localStorage.getItem("event"));
    recipe = JSON.parse(localStorage.getItem("savedRecipes"));
    cocktails = JSON.parse(localStorage.getItem("savedDrinks"));

    themeNameArry.push(themeName)
    finalRecipeArry.push(recipe);
    finalCocktailArry.push(cocktails);


    var name = (themeNameArry[0][0].query);
    name = decodeURI(name);

// Display cocktail favorite form local storage
    const cocktailCard = document.createElement('div');
    cocktailCard.classList='cocktail-card';
    cocktailContainerEl.appendChild(cocktailCard)

    const cardTitle = document.createElement('h2');
    cardTitle.textContent=name
    cocktailCard.appendChild(cardTitle);
    
    for (var i=0; i < finalCocktailArry.length; i++) {
        console.log(finalCocktailArry[i])
        const ingredientsContainer = document.createElement('ul')
    
        for (var j=0; j < finalCocktailArry[i].length; j++) {
            console.log(finalCocktailArry[i][j].ingredients);

            var cocktailTitle = document.createElement('h3');
            cocktailTitle.textContent = finalCocktailArry[i][j].name;
            cocktailCard.appendChild(cocktailTitle)

            const instructionsTitleEl = document.createElement('h4')
            instructionsTitleEl.textContent = 'Instructions:'
            cocktailCard.appendChild(instructionsTitleEl)

            const instructionsEl = document.createElement('p')
            instructionsEl.textContent = finalCocktailArry[i][j].instructions;
            cocktailCard.appendChild(instructionsEl)

            const ingredientsTitle = document.createElement('h4')
            ingredientsTitle.textContent = 'Ingredients:'
            cocktailCard.appendChild(ingredientsTitle)
            
            const ingredientsEl = document.createElement('li')
            ingredientsEl.textContent = finalCocktailArry[i][j].ingredients
            ingredientsContainer.appendChild(ingredientsEl);

        }

            cocktailCard.appendChild(ingredientsContainer);
     }
     
     // Display recipe favorite form local storage
     const recipeCard = document.createElement('div');
     recipeCard.classList='recipe-card';
     recipeContainerEl.appendChild(recipeCard)
 
     const cardTitle1 = document.createElement('h2');
     cardTitle1.textContent=name;
     recipeCard.appendChild(cardTitle1);

     for (var i=0; i < finalRecipeArry.length; i++) {
        console.log(finalRecipeArry[i])

        for (var j=0; j < finalRecipeArry[i].length; j++) {
        
            var recipeTitle = document.createElement('h3');
            recipeTitle.textContent = finalRecipeArry[i][j].recipe.label;
            recipeCard.appendChild(recipeTitle);

            const recipeUrlEl = document.createElement("a");
            recipeUrlEl.href = finalRecipeArry[i][j].recipe.url;
            recipeCard.appendChild(recipeUrlEl);

            const recipeImage = document.createElement("img");
            recipeImage.className = "img-hover"
            recipeImage.src = finalRecipeArry[i][j].recipe.image;
            recipeUrlEl.appendChild(recipeImage);
        }
     }
  
}

getStorage();