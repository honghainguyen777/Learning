import Search from "./models/Search";
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as ListView from './views/ListView';
import * as LikesView from './views/LikesView';
import { elements, renderLoader, clearLoader } from './views/base';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from "./models/Likes";

/* 
Global state of the app - Constroller
- Search object
- Current recipe object
- Shopping list object
- Linked recipes
*/

const state = {};

/** SEARCH CONTROLLER */
const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();

    // if query, create search object
    if (query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        // clean input into the search
        searchView.clearInput();
        // clean all results before a new search
        searchView.clearResults();
        // after clear the previous results and start a new search
        // while loading, loading animation appear
        renderLoader(elements.searchRes);

        try {
            // 4. Search for recipes
            await state.search.getResults();

            // 5. Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert('Something wrong with the search...');
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', e => {
    // prevent the page to reload when clicking the search button
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    // closest is a property to choose the area/element we can click
    // here we choose btn-inline because it includes icon, button ..
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/** RECIPE CONTROLLER */
// change the # in the window - browser

const controlRecipe = async () => {
    // get the ID from the url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data and parse ingradients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            
            // highlight selected rearch item
            if (state.search) searchView.highlightSelected(id);

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
                );
        } catch (error) {
            alert('Error processing recipe!');
        }
        
    }
}
//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


/** LIST CONTROLLER */
const controlList = () => {
    // Create a new list IF there is none yet
    if (!state.list) state.list = new List();

    // add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        ListView.renderItem(item);
    });
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // handle the delete butten
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        ListView.deleteItem(id);

        // Handle the count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});


/** LIKE CONTROLLER */

const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;
    
    // User has not yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        
        // Toggle the like button
        LikesView.toggleLikeBtn(true);

        // Add like to UI list
        LikesView.renderLike(newLike);

    // User has liked current recipe
    } else {
        // remove like to the state
        state.likes.deleteLike(currentID);
        
        // Toggle the like button
        LikesView.toggleLikeBtn(false);

        // remove like from UI list
        LikesView.deleteLike(currentID);
    }

    LikesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Restore liked recipe on page load

window.addEventListener('load', () => {
    state.likes = new Likes();

    // Restore likes
    state.likes.readStorage();

    // Toggle like menu button
    LikesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the existing likes
    state.likes.likes.forEach(like => LikesView.renderLike(like));
});


// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Like controller
        controlLike();
    }
});