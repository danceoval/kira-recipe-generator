import React, { useState } from 'react';
import axios from 'axios'; 

import {OPEN_AI_KEY} from '../../../secrets';


export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [recipe, setRecipe] = useState('')

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="container">
      <h1>Snack Recipe Recommendations</h1>
      <div className="form-container">
        <form >
          <div>
            <label>
              Add Ingredient:
              <input type="text" value={inputValue} onChange={handleInputChange} />
            </label>
            <button type="button" >
              Add Ingredient
            </button>
          </div>
        </form>
        </div>
        {recipe && (
          <div className="recipe-container">
            <h2>Recommended Snack Recipe:</h2>
            <p>{recipe}</p>
          </div>
        )}
    </div>
  );
};
