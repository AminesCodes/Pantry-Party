/*
Hashtags Queries | Server | Tost-Host/Pantry Party Web App
GROUP 7: Suzette Islam, Douglas MacKrell, Maliq Taylor
*/

// DATABASE CONNECTION
const db = require('../database/db')

//GET 
const getAllHashtagsByRecipeId = async (recipeId) => {
    const getQuery = `SELECT * FROM hashtags WHERE recipe_id = $1;`;
    let hashtags = await db.any(getQuery, [recipeId]);
    return hashtags
}

//POST
const createHashtag = async (bodyObj) => {
    const postQuery = `
        INSERT INTO hashtags (
            tag_body
            recipe_id
        ) VALUES ($1, $2)
        RETURNING *;`;

    let recipe = await db.one(postQuery, [bodyObj.tag_body, bodyObj.recipe_id]);

    return recipe
}

//PATCH
const rewriteIngredient = async (ingredient) => {
    let { ingredient_name, amount, measurement } = ingredient;
    try {
        let patchQuery = `UPDATE ingredients SET `
        if (ingredient_name) {
            patchQuery += `ingredient_name = $/ingredient_name/,`
        }
        if (amount) {
            patchQuery += `amount = $/amount/,`
        }
        if (measurement) {
            patchQuery += `measurement = $/measurement/,`
        }

        patchQuery = patchQuery.slice(0, patchQuery.length - 1);

        patchQuery += ` WHERE id = $/id/ RETURNING *`
        return await db.one(patchQuery, ingredient);
    } catch (err) {
        throw (err);
    }
}

/* EXPORT */
module.exports = {
    getAllHashtagsByRecipeId,
    createHashtag,
    rewriteIngredient
}

