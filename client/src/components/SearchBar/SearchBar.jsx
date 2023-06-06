// import React, {  useState } from "react";
// import { ContainerSearchBar, InputSearchBar, ButtonSearchBar, ErrorMessage } from "./styled.components";
// import { searchValidate } from './searchValidate.js'


// const SearchBar = (props) => {
   
//    const [pokemonName, setPokemonName] = useState('');
//    const [errors, setErrors] = useState({name:''})

//    const onchange = ((event)=>{
//       const {value}= event.target

//       if(value){
//          setPokemonName(value);
//       } else{
//          setPokemonName("");
//       }
//    });
   
//    const handleKeyPress = (event) => {
//       if(event.key === 'Enter'){
//          findByName(event)
//       }
//    }
   
//    const findByName = () => {
//       const validationErrors = searchValidate(pokemonName);
//       setErrors(validationErrors);

//       if (Object.keys(validationErrors).length === 0) {
//          props.onSearch(pokemonName.trim());
//       }
      
//       setPokemonName("");
//    };

//    return (
//       <ContainerSearchBar className="searchBar">
//          <InputSearchBar placeholder="Search a Pokemon" onKeyDown={handleKeyPress} type='search' onChange={onchange} value={pokemonName}/>
//          <ButtonSearchBar onClick={findByName}>Buscar</ButtonSearchBar>
//          {
//             errors? <ErrorMessage>{errors.name}</ErrorMessage>: null
//          }
//       </ContainerSearchBar>
//    );
// }

// export default SearchBar


// ---------------
// ---------------

// import React, { useState } from "react";
// import { ContainerSearchBar, InputSearchBar, ButtonSearchBar, ErrorMessage } from "./styled.components";
// import { searchValidate } from './searchValidate.js'
// import { useDispatch } from "react-redux";
// import { getPokemonName } from "../../redux/actions/actions";

// const SearchBar = () => {
//    const dispatch = useDispatch();
//    const [pokemonName, setPokemonName] = useState('');
//    const [errors, setErrors] = useState({name:''});

//    const handleChange = (event) => {
//       const { value } = event.target;

//       setPokemonName(value);
//    };
   
//    const handleKeyPress = (event) => {
//       if (event.key === 'Enter') {
//          findByName();
//       }
//    }
   
//    const findByName = () => {
//       const validationErrors = searchValidate(pokemonName);
//       setErrors(validationErrors);

//       if (Object.keys(validationErrors).length === 0) {
//          dispatch(getPokemonName(pokemonName.trim()));
//       }
      
//       setPokemonName("");
//    };

//    return (
//       <ContainerSearchBar className="searchBar">
//          <InputSearchBar
//             placeholder="Search a Pokemon"
//             onKeyDown={handleKeyPress}
//             type='search'
//             onChange={handleChange}
//             value={pokemonName}
//          />
//          <ButtonSearchBar onClick={findByName}>Buscar</ButtonSearchBar>
//          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
//       </ContainerSearchBar>
//    );
// }

// export default SearchBar;



// ---------------
// ---------------



// import React, { useState } from "react";
// import { ContainerSearchBar, InputSearchBar, ButtonSearchBar, ErrorMessage } from "./styled.components";
// import { searchValidate } from './searchValidate.js'
// import { useDispatch } from "react-redux";
// import { getPokemonName } from "../../redux/actions/actions";

// const SearchBar = ({ onSearch }) => {
//    const dispatch = useDispatch();
//    const [pokemonName, setPokemonName] = useState('');
//    const [errors, setErrors] = useState({name:''});

//    const handleChange = (event) => {
//       const { value } = event.target;

//       setPokemonName(value);
//    };
   
//    const handleKeyPress = (event) => {
//       if (event.key === 'Enter') {
//          findByName();
//          // dispatch(getPokemonName(event.target.value.trim()))
//       }
//    }
   
//    const findByName = () => {
//       const validationErrors = searchValidate(pokemonName);
//       setErrors(validationErrors);
//       // setPokemonName("");

//       if (!validationErrors.name) {
//          dispatch(getPokemonName(pokemonName));
//        }
//    };

//    return (
//       <ContainerSearchBar className="searchBar">
//          <InputSearchBar
//             placeholder="Search a Pokemon"
//             onKeyDown={handleKeyPress}
//             type='search'
//             onChange={handleChange}
//             value={pokemonName}
//          />
//          <ButtonSearchBar onClick={findByName}>Buscar</ButtonSearchBar>
//          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
//       </ContainerSearchBar>
//    );
// }

// export default SearchBar;

// import { useState } from "react";
// import { ContainerSearchBar, InputSearchBar, ButtonSearchBar, ErrorMessage } from "./styled.components";
// import { getPokemonName } from "../../redux/actions/actions";


// const SearchBar = (props) => {

//    const [pokemonName, setPokemonName] = useState('');
   
//    const findByName = () => {
      
//    };

//    return (
//       <ContainerSearchBar className="searchBar">
//          <InputSearchBar placeholder="Search a Pokemon" onKeyDown={handleKeyPress} type='search' onChange={onchange} value={pokemonName}/>
//          <ButtonSearchBar>Buscar</ButtonSearchBar>
//       </ContainerSearchBar>
//    );
// }

// export default SearchBar

// ----------------
// ---------------
// ---------------

// ULTIMA SB QUEDATELA GUARADAA


// import { useState } from "react";
// import { ContainerSearchBar, InputSearchBar, ButtonSearchBar } from "./styled.components";
// // import { ContainerSearchBar, InputSearchBar, ButtonSearchBar, ErrorMessage } from "./styled.components";
// // import { getPokemonName } from "../../redux/actions/actions";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// // import { useNavigate } from "react-router-dom";
// // import { searchValidate } from "./searchValidate";

// const SearchBar = () => {

//   const [pokemonName, setPokemonName] = useState('');
//   // const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSearch = async () => {
//     const dato = await axios.get(`http://localhost:3001/pokemon/name?name=${pokemonName}`)
//     navigate(`/detail/${dato.data.id}`)
//   }

//   const handleKeyPress = async (event) => {
//     if (event.key === 'Enter') {
//       const dato = await axios.get(`http://localhost:3001/pokemon/name?name=${pokemonName}`)
//       navigate(`/detail/${dato.data.id}`)
//     }
//   };

//   const onChange = (event) => {
//     setPokemonName(event.target.value);
//     // setErrorMessage('');
//   };

//   // const searchPokemon = () => {
//   //   const validation = searchValidate(pokemonName);

//   //   if (validation.isValid) {
//   //     // Llamar a la acción getPokemonName con el nombre del Pokémon
//   //     getPokemonName(pokemonName)
//   //       .then(response => {
//   //         // Redirigir al detalle del Pokémon si se encuentra
//   //         if (response.data) {
//   //           navigate(`/pokemon/${pokemonName}`);
//   //         } else {
//   //           setErrorMessage('Pokemon not found');
//   //         }
//   //       })
//   //       .catch(error => {
//   //         console.error('Error:', error);
//   //         setErrorMessage('An error occurred');
//   //       });
//   //   } else {
//   //     setErrorMessage(validation.errorMessage);
//   //   }
//   // };

//   return (
//     <ContainerSearchBar className="searchBar">
//       <InputSearchBar
//         placeholder="Search a Pokemon"
//         onKeyDown={handleKeyPress}
//         type='search'
//         onChange={onChange}
//         value={pokemonName}
//       />
//       <ButtonSearchBar onClick={handleSearch}>Buscar</ButtonSearchBar>
//       {/* <ErrorMessage>{errorMessage}</ErrorMessage> */}
//     </ContainerSearchBar>
//   );
// };

// export default SearchBar;



// -----------
// -----------

import { useState } from "react";
// import { ContainerSearchBar, InputSearchBar, ButtonSearchBar } from "./styled.components";
import { ContainerSearchBar, InputSearchBar, ButtonSearchBar, ErrorMessage } from "./styled.components";
// import { getPokemonName } from "../../redux/actions/actions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { searchValidate } from "./searchValidate";

const SearchBar = () => {

  const navigate = useNavigate();
  const [pokemonName, setPokemonName] = useState('');
  const [errors, setErrors] = useState({});
  // const [errorMessage, setErrorMessage] = useState('');

  // const handleSearch = async () => {
  //   const validation = searchValidate(pokemonName);
  //   setErrors(validation);
    
  //   if (Object.keys(validation).length === 0) {
  //     const dato = await axios.get(`http://localhost:3001/pokemon/name?name=${pokemonName}`);
  //     navigate(`/detail/${dato.data.id}`);
  //   }
  // }

  const handleSearch = async () => {
    const validation = searchValidate(pokemonName);
    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      try {
        const response = await axios.get(`http://localhost:3001/pokemon/name?name=${pokemonName}`);
        const { data } = response;
        if (data.length === 0) {
          throw new Error ("Pokeon not found")
        } else {
          navigate(`/detail/${data.id}`);
        }
      } catch (error) {
        // setErrors({ name: "Error occurred while searching for the Pokemon" });
        alert('Pokeon not found');
      }
    }
  };

  const handleKeyPress = async (event) => {
    const validation = searchValidate(pokemonName);
    setErrors(validation);

    if (Object.keys(validation).length === 0 && event.key === 'Enter') {
      try {
        const response = await axios.get(`http://localhost:3001/pokemon/name?name=${pokemonName}`);
        const { data } = response;
        if (data.length === 0) {
          // setErrors({ name: "Pokemon not found" });
          alert("Pokeon not found")
        } else {
          navigate(`/detail/${data.id}`);
        }
      } catch (error) {
        // setErrors({ name: "Error occurred while searching for the Pokemon" });
        alert('Pokeon not found');
      }
    }
  };

  const onChange = (event) => {
    setPokemonName(event.target.value);
    // setErrorMessage('');
  };

  return (
    <ContainerSearchBar className="searchBar">
      <InputSearchBar
        // className={errors.name ? 'error' : ''}
        placeholder="Search a Pokemon"
        onKeyDown={handleKeyPress}
        type='search'
        onChange={onChange}
        value={pokemonName}
      />
      {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      {/* {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>} */}
      <ButtonSearchBar onClick={handleSearch}>Search</ButtonSearchBar>
    </ContainerSearchBar>
  );
};

export default SearchBar;