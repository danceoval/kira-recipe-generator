import React, { useState } from 'react';
import axios from 'axios'; // You'll need to install axios

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiKey = 'YOUR_OPENAI_API_KEY';
    const prompt = `I have the following ingredients: ${inputValue.trim()}. What snack recipe can I make?`;

    try {
      setIsLoading(true);

      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt,
        max_tokens: 150, // Adjust the max_tokens as needed
      }, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      const recommendedRecipe = response.data.choices[0].text;

      setRecipe(recommendedRecipe);
    } catch (error) {
      console.error('Error fetching data from OpenAI:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Kira Snack Recipe Generator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter ingredients (comma-separated):
          <input type="text" value={inputValue} onChange={handleInputChange} />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? <span>Generating Recipe...</span> : <span>Get Recipe</span>}
        </button>
      </form>
      {recipe && !isLoading && (
        <div>
          <h2>Recommended Snack Recipe:</h2>
          <p>{recipe}</p>
        </div>
      )}
    </div>
  );
};

