document.getElementById('recipe-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('recipe-title').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const instructions = document.getElementById('recipe-instructions').value;

    addRecipe(title, ingredients, instructions);

    // Form zurücksetzen
    this.reset();
});

function addRecipe(title, ingredients, instructions) {
    const recipeList = document.getElementById('recipes');
    const recipeItem = document.createElement('li');
    recipeItem.classList.add('recipe-item');

    recipeItem.innerHTML = `
        <h3>${title}</h3>
        <p><strong>Zutaten:</strong><br>${ingredients}</p>
        <p><strong>Zubereitung:</strong><br>${instructions}</p>
        <button class="delete-button" onclick="deleteRecipe(this)">Löschen</button>
    `;

    recipeList.appendChild(recipeItem);
}

function deleteRecipe(button) {
    const recipeItem = button.parentElement;
    recipeItem.remove();
}
