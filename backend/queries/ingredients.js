/*
Ingredients Queries | Server | Tost-Host/Pantry Party Web App
GROUP 7: Suzette Islam, Douglas MacKrell, Maliq Taylor
*/

// DATABASE CONNECTION
const db = require('../database/db')

//GET 
const getAllIngredientsByRecipeId = async (recipeId) => {
    const getQuery = `SELECT * FROM ingredients WHERE recipe_id = $1;`;
    let ingredients = await db.any(getQuery, [recipeId]);
    return ingredients
}

//POST
const createIngredient = async (bodyObj) => {
    const postQuery = `
        INSERT INTO recipes (
            ingredient_name,
            amount,
            measurement,
            recipe_id
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`;

    let recipe = await db.one(postQuery, [bodyObj.ingredient_name, bodyObj.amount, bodyObj.measurement, bodyObj.recipe_id]);

    return recipe
}

//PATCH
const rewriteIngredient = async (recipe) => {
    let { recipe_name, directions, recipe_img, recipe_active, recipe_public } = recipe;
    try {
        let patchQuery = `UPDATE recipes SET `
        if (recipe_name) {
            patchQuery += `recipe_name = $/recipe_name/,`
        }
        if (directions) {
            patchQuery += `directions = $/directions/,`
        }
        if (recipe_img) {
            patchQuery += `recipe_img = $/recipe_img/,`
        }
        if (recipe_active) {
            patchQuery += `recipe_active = $/recipe_active/,`
        }
        if (recipe_public) {
            patchQuery += `recipe_public = $/recipe_public/,`
        }

        patchQuery = patchQuery.slice(0, patchQuery.length - 1);

        patchQuery += ` WHERE id = $/id/ RETURNING *`
        console.log(patchQuery)
        return await db.one(patchQuery, recipe);
    } catch (err) {
        throw (err);
    }
}

/* EXPORT */
module.exports = {
    getAllIngredientsByRecipeId,
    createIngredient,
    rewriteIngredient
}
