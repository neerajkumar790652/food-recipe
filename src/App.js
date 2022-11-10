import React,{useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Recipe from './Recipe';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
function App() {
  const APP_ID ="030eb585";
  const APP_KEY ="02bb0260ca8a0cbd44053e6692b1efc5";
   const [recipe,setRecipe]=useState([]);
   const [search,setSearch] =useState('');
    const [query,setQuery] = useState('chicken');
  useEffect(()=>{
    getRecipe(query);
    //eslint-disable-next-line
  }, [query]); // add array if required
  const getRecipe = async()=>{
    const response = await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  setRecipe(response.data.hits);
  // console.log(response.data.hits);
  };
   const updateSearch = (e)=>{
    setSearch(e.target.value);
    // console.log(e.target.value);

  }
  const updateQuery=(e)=>{
    e.preventDefault();
    setQuery(search);
  }
  return (
    <div>
       <Paper
      component="form" className="searchBar"
      onSubmit={updateQuery} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,margin:'30px auto' }}
    >
     
      <InputBase
         type="text" value={search} onChange={updateSearch}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Food Recipe"
        inputProps={{ 'aria-label': 'Search Food Recipe' }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
     
    
    </Paper>
      {/* <form onSubmit={updateQuery}>
        <input type="text" value={search} onChange={updateSearch}/>
        <button type="submit">Search</button>
      </form> */}
      <div style={{margin:'10px',padding:'10px'}}>
      <Grid container>
      {recipe.map((recipe)=>(
        <Grid item xs={4}>
       <Recipe 
       key={recipe.recipe.label}
       title={recipe.recipe.label}
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
        </Grid>
       )
      )
      }
      </Grid>
      </div>
    </div>
  )
}

export default App;
