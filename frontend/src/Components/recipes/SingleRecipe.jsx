/*
Recipe Page | Front End | Tost-Host/Pantry Party Web App
GROUP 7: Suzette Islam, Douglas MacKrell, Maliq Taylor
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Route, useParams } from 'react-router-dom';


const SingleRecipe = () => {
    const {recipeId} = useParams();
    const [recipe, setRecipe] = useState({})

    useEffect(() => {
        getRecipe(recipeId);
    }, [])

    const getRecipe = async (recipeId) => {
        try {
            let { data } = await axios.get(`/api/recipes/${recipeId}`)
            // console.log(data.payload)
            setRecipe(data.payload)  
    
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='recipe-page'>
            <div className='Recipe-header'>
                <h1>{recipe.recipe_name}</h1>
            </div>

            <div className='Recipe-img'>
                <img src={recipe.recipe_img} alt={recipe.recipe_name} />
            </div>

            <div className='Recipe-ingredients'>
                {
                    recipe.ingredient_list
                    ?   <ul>Ingredients:
                            {recipe.ingredient_list.map(ingredient => <li key={ingredient}>{ingredient}</li>)}
                        </ul>
                    : null
                }
            </div>

            <div className='Recipe-steps'>
                {
                    recipe.directions
                    ? recipe.directions.split('\\n').map(step => <p key={step}>{step}</p>)
                    : null
                }
            </div>

            <div className='Recipe-hashtags'>
                {
                    recipe.hashtag_list
                    ?   recipe.hashtag_list.map(hashtag => <strong key={hashtag}>#{hashtag} </strong>)
                    : null
                }
            </div>
        </div>
    )
}

export default SingleRecipe;