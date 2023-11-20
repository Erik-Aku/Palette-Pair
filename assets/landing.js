var landingInputEl = document.querySelector('#dinner-theme');

function landingSubmit(event) {
    event.preventDefault();
    localStorage.clear();

    var userInputEl = document.querySelector('#userinput').value;
    console.log(userInputEl);
        if (!userInputEl) {
            alert('Please enter a dinner party theme');
            return;
        }
         
    var queryString = './search.html?q=' + userInputEl;

    location.assign(queryString);
    }
  
landingInputEl.addEventListener('submit', landingSubmit);