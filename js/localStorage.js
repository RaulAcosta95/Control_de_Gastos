var alarmasActivas = [];
alarmasActivas = JSON.parse(localStorage.getItem('alarmasLocalStorage'));
localStorage.setItem('alarmasLocalStorage',JSON.stringify(alarmasActivas));