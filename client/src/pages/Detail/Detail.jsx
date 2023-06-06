import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getPokemonDetail } from "../../redux/actions/actions";
import Louder from "../../components/Loader/Loader"
import { DetailContainer, NamePokemon, ImagePokemon, TypesPokemon } from "./styled.components";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(true); // Estado para controlar el loading

  useEffect(() => {
    dispatch(getPokemonDetail(id))
      .then(() => setLoading(false)) // Cuando se completa la acción, se actualiza el estado de loading a false
      .catch(() => setLoading(false)); // En caso de error, también se actualiza el estado de loading a false
  }, [dispatch, id]);
  
  const pokemonDetail = useSelector((state) => state.pokemonDetail);

  return (
    <DetailContainer>
      {loading ? ( // Si está cargando, muestra el loader
        <Louder>&nbsp;</Louder>
      ) : (
        <>
          <ImagePokemon src={pokemonDetail.image} alt={pokemonDetail.name} />
          <div>ID: {pokemonDetail.id}</div>
          <NamePokemon> Name: {pokemonDetail.name} </NamePokemon>
          <TypesPokemon>
            Types:{" "}
            {pokemonDetail?.types && pokemonDetail.types.length > 0 ? (
              pokemonDetail.types.join(" | ")
            ) : (
              ""
            )}
          </TypesPokemon>
          <div> HP: {pokemonDetail.hp} </div>
          <div> Attack: {pokemonDetail.attack} </div>
          <div> Defense: {pokemonDetail.defense} </div>
          <div> Speed: {pokemonDetail.speed} </div>
          <div> Height: {pokemonDetail.height} </div>
          <div> Weight: {pokemonDetail.weight} </div>
        </>
      )}
      <NavLink to="/home">
        <button>Back to Home</button>
      </NavLink>
    </DetailContainer>
  );
};

export default Detail;



// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { getPokemonDetail } from "../../redux/actions/actions";

// import { DetailContainer, NamePokemon, ImagePokemon, TypesPokemon, StyleLouder } from "./styled.components";

// const Detail = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true); // Estado para controlar el loading
//   const [imageLoaded, setImageLoaded] = useState(false); // Estado para controlar si la imagen se ha cargado

//   useEffect(() => {
//     dispatch(getPokemonDetail(id))
//       .then(() => setLoading(false)) // Cuando se completa la acción, se actualiza el estado de loading a false
//       .catch(() => setLoading(false)); // En caso de error, también se actualiza el estado de loading a false
//   }, [dispatch, id]);

//   const pokemonDetail = useSelector((state) => state.pokemonDetail);

//   const handleImageLoad = () => {
//     setImageLoaded(true); // Se setea el estado imageLoaded a true cuando la imagen se ha cargado correctamente
//   };

//   return (
//     <DetailContainer>
//       {loading ? (
//         <StyleLouder>&nbsp;</StyleLouder>
//       ) : (
//         <>
//           <div style={{ display: imageLoaded ? "none" : "block" }}>
//             <div
//               style={{
//                 width: "100px",
//                 height: "100px",
//                 backgroundColor: "red",
//               }}
//             ></div>
//           </div>
//           {pokemonDetail.image && (
//             <ImagePokemon
//               src={pokemonDetail.image}
//               alt={pokemonDetail.name}
//               onLoad={handleImageLoad} // Manejador de evento para detectar cuando la imagen se ha cargado
//               style={{ display: imageLoaded ? "block" : "none" }} // Mostrar la imagen solo cuando se ha cargado
//             />
//           )}
//           <div>ID: {pokemonDetail.id}</div>
//           <NamePokemon> Name: {pokemonDetail.name} </NamePokemon>
//           <TypesPokemon>
//             Types:{" "}
//             {pokemonDetail?.types && pokemonDetail.types.length > 0
//               ? pokemonDetail.types.join(" | ")
//               : ""}
//           </TypesPokemon>
//           <div> HP: {pokemonDetail.hp} </div>
//           <div> Attack: {pokemonDetail.attack} </div>
//           <div> Defense: {pokemonDetail.defense} </div>
//           <div> Speed: {pokemonDetail.speed} </div>
//           <div> Height: {pokemonDetail.height} </div>
//           <div> Weight: {pokemonDetail.weight} </div>
//         </>
//       )}
//     </DetailContainer>
//   );
// };

// export default Detail;

// Este ultimo le quise poner un placeHolder image pero mori en el intento, mas adelante volvere con mas fuerzas jajaja
// PD: Por lo menos hice funcionar el Loader, asi que Santi del futuro no te decepciones, lo hicimos