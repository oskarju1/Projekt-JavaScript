import React, {useEffect, useState} from "react";
import Recipe from './Recipe';
import './App.css';

const App = () => {
  
  const APP_ID = '0b9d2db4';
  const APP_KEY = 'a0b6b528657e07bc69b4b68d2e2a43f5';

const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState();
const [query, setQuery] = useState("");

useEffect( () => {getRecipes()}, [query]);

const getRecipes = async () => {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
  const data = await response.json();
  setRecipes(data.hits);
  //console.log(data.hits);
};

const updateSearch = x =>{
  setSearch(x.target.value);
};

const getSearch = x => {
  x.preventDefault();
  setQuery(search)
};

  return(
    <div className="App">
 		  <div className="title">
		    <a className="title" href="refresh"><h1>Recipe search engine</h1></a>
		  </div>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" onChange={updateSearch} value={search}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe
        key = {recipe.recipe.label}
        title={recipe.recipe.label}
        kcal={Math.round(recipe.recipe.calories)}
        img={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        url={recipe.recipe.url}
        />
      ))}
      </div>
      <div className="footer">
        <h5>Oskar Jurgielaniec INIS4_PR3 51073. &copy;All rights reserved</h5>
        <a className="back" href="#">scroll up</a>
      </div>
    </div>

  );
};

export default App;
