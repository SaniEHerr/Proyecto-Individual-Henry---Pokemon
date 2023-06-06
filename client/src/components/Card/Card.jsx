import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import "./card.modules.css"

const Card = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pokemons } = useSelector((state) => state);
  const pokemon = (pokemons && pokemons.length > 1) ? pokemons.find((pokemon) => pokemon.id === id) : null

  const name = pokemon ? pokemon.name : "";
  const image = pokemon ? pokemon.image : "";
  const types = pokemon ? pokemon.types : [];

  const handleDetailClick = () => {
    dispatch(getPokemonDetail(id));
    navigate(`/detail/${id}`);
  };

  return (
    <div className="card-container" onClick={handleDetailClick}>
      {name ? <h2>{name.toUpperCase()}</h2> : <h2>No tiene nombre</h2>}
      <br />
      {image ? (
        <img src={image} alt="" />
      ) : (
        <h2>No se encontró imagen</h2>
      )}

      <div>
      <div className="types">
          {types.length > 0 ? (
            <h4>{types.map((type) => type.toUpperCase()).join(" | ")}</h4>
          ) : (
            <h4>Unknown</h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;