var cocktailContainerEl = document.querySelector('#cocktail-container');
var cocktailTitleEl = document.querySelector('#cocktail-title');

var finalCocktailArry = [];
var themeNameArry = [];
var finalRecipeArry = [];


function getStorage() {
    themeName = JSON.parse(localStorage.getItem("event"));
    recipe = JSON.parse(localStorage.getItem("savedRecipes"));
    cocktails = JSON.parse(localStorage.getItem("savedDrinks"));

    themeNameArry.push(themeName)
    finalRecipeArry.push(recipe);
    finalCocktailArry.push(cocktails);


    var name = (themeNameArry[0][0].query);
    name = decodeURI(name);


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
  
}


// for (var i=0; i < finalArry.length; i++) {
//     // console.log(finalArry[i][0].recipe);
//     console.log(finalArry[i])
//     // console.log(finalArry[i][0].ingredients)
//     // console.log(finalArry[i][0].instructions)
//     // console.log(finalArry[i][0].name)

//   var cocktailTitle = document.createElement('h4');
//   cocktailTitle.textContent = finalArry[i][0].name;
//   cocktailCard.appendChild(cocktailTitle)

//   const instructionsTitleEl = document.createElement('h4')
//   instructionsTitleEl.textContent = 'Instructions:'
//   cocktailCard.appendChild(instructionsTitleEl)
//   const instructionsEl = document.createElement('p')
//   instructionsEl.textContent = data[i].instructions




 
// }

getStorage();