import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';


const NewRecipe = (props) => {
    const {user} = props;
    const history = useHistory();
    
    // const user_id = user.id;
    const user_id = 1; // hard coded to 1 for test purpose, couldn't log in to have access to logged user
    const [recipe_name, setRecipe_name] = useState('');
    const [directions, setDirections] = useState('');
    const [recipe_img, setRecipe_img] = useState('');
    const [recipe_public, setRecipe_public] = useState(false);
    const [ingredients, setIngredients] = useState([{ing: '', amn: '', meas: ''}]);

    const handleIngredient = (index, ingredient, amount, measurement) => {
        const copy = [...ingredients];
        copy[index] = {ing: ingredient, amn: amount, meas: measurement};

        setIngredients(copy);
    }

    const handleAddIngredient = () => {
        const copy = [...ingredients];
        copy.push({ing: '', amn: '', meas: ''});

        setIngredients(copy);
    }

    const validateIngredients = () => {
        let arr = [];
        for (let ing of ingredients) {
            if (ing.ing && ing.amn && ing.meas) {
                arr.push(ing)
            }
        }
        return arr
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (user_id && recipe_name && recipe_img && directions && ingredients) {
            try {
                const ingList = validateIngredients();
                const recipe = {
                    user_id,
                    recipe_name,
                    directions,
                    recipe_img,
                    recipe_public,
                    ingredients: ingList
                }
                const {data} = await axios.post('/api/recipes/new', recipe);
            } catch (err) {
                console.log(err);
            }
        }
    }
    

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Recipe Name: 
                    <input type='text' placeholder='name' value={recipe_name} onChange={e => setRecipe_name(e.target.value)}/> 
                </label><br />

                <label>Image Link: 
                    <input type='link' placeholder='link' value={recipe_img} onChange={e => setRecipe_img(e.target.value)}/> 
                </label><br />

                <label>Directions: 
                    <textarea placeholder='directions' value={directions} onChange={e => setDirections(e.target.value)}/> 
                </label><br />

                <label>Ingredients: </label>
                { ingredients.map((ing, index) => 
                    <Ingredient key={index} index={index} ing={ing} handleIngredient={handleIngredient}/>)}
                <strong onClick={handleAddIngredient}>Add Ingredient</strong>
                <br />

                <label>Publicly Accessed?: 
                    <input type='checkbox' checked={recipe_public} onChange={e => setRecipe_public(e.target.checked)}/> 
                </label><br />

                <button>Submit</button>
            </form>
        </div>
    )

}

export default NewRecipe;

const Ingredient = (props) => {
    const { ing } = props;
    const [ingredient, setIngredient] = useState(ing.ing);
    const [amount, setAmount] = useState(ing.amn);
    const [measurement, setMeasurement] = useState(ing.meas);

    useEffect(() => {
        props.handleIngredient(props.index, ingredient, amount, measurement);
    }, [ingredient, amount, measurement]);

    return (
        <div>
            <label> Ingredient:
                <input type='text' value={ingredient} onChange={e => setIngredient(e.target.value)} />
            </label>

            <label> Amount:
                <input type='number'  value={amount} onChange={e => setAmount(e.target.value)} />
            </label>

            <label> Measurement:
                <input type='text'  value={measurement} onChange={e => setMeasurement(e.target.value)} />
            </label>
        </div>
    )
}