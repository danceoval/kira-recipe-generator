import React, { useState } from 'react';
import axios from 'axios'; // You'll need to install axios

import {OPEN_AI_KEY} from '../../../secrets';


export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddIngredient = () => {
    if (inputValue.trim() !== '') {
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Set your OpenAI API key here
    const apiKey = OPEN_AI_KEY;

    // Create a prompt using the user's ingredients
    const prompt = `I have the following ingredients: ${ingredients.join(', ')}. What snack recipe can I make?`;

    // Send a request to the OpenAI API
    try {
      setIsLoading(true);

      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        "model": "gpt-3.5-turbo",
        "messages": [
          { role: "system", content: prompt}
        ]
      }, {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
      });

      console.log("POSTING", response)

      const recommendedRecipe = response.data.choices[0].message.content;
      setIsLoading(false);
      setRecipe(recommendedRecipe);
    } catch (error) {
      console.error('Error fetching data from OpenAI:', error);
    } 
  };

  return (
    <div className="container">
      <h1>Snack Recipe Recommendations</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Add Ingredient:
              <input type="text" value={inputValue} onChange={handleInputChange} />
            </label>
            <button type="button" onClick={handleAddIngredient}>
              Add Ingredient
            </button>
          </div>
          {ingredients.length > 0 && (
            <div className="ingredients-list">
              <h2>Ingredients List:</h2>
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient}
                    <button type="button" onClick={() => handleRemoveIngredient(index)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!isLoading && ingredients.length > 0 && (
            <button type="submit">
              Get Recipe
            </button>
          )}
        </form>
        </div>
        {
          isLoading ? 'Generating Recipe' : ''
        }
        {recipe && !isLoading && (
          <div className="recipe-container">
            <h2>Recommended Snack Recipe:</h2>
            <p>{recipe}</p>
          </div>
        )}
    </div>
  );
};
