import { useState, useEffect} from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addPokemon, getAllTypes } from '../../redux/actions/actions';
import validate from "./validate.js";
import { CreateContainer, ErrorMessage } from "./styled.components";
import { useNavigate } from 'react-router-dom';

const Create = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const types = useSelector((state)=>state.types)
    // console.log(types);
    const [error, setError]= useState({});

    useEffect(()=>{
        dispatch(getAllTypes())
    }, [dispatch]);

    const [input, setInput]= useState({
        name:"",
        image:"",
        hp:"",
        attack:"",
        defense:"",
        speed:"",
        height:"",
        weight:"",
        type:[],
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){
        const selectedTypeId = Number(e.target.value);

        if (input.type.length < 2 ) {
            setInput({
                ...input,
                type: [...input.type, selectedTypeId],
            });
        }

        // Cuando seleccionamos un type, quiero obtener el objeto completo que representa al type que seleccionamos, no solo su ID. Por eso uso find() en types para para encontrar el objeto cuyo ID coincide con el value que seleccione en el select

        // const selectedType = types.find((type) => type.id === Number(e.target.value));

        // Luego almaceno ese objeto completo en el estado en lugar de solo su id. Con esto tendria que tener acceso a todas los props del type, incluido su name
        // if (input.type.length < 2 ) {
        //     setInput({
        //         ...input,
        //         type: [...input.type, selectedType], // Almaceno el objeto
        //     });
        // }
    }

    function handleDelete(e, selectedTypeId) {
        e.preventDefault();

        setInput({
            ...input,
            type: input.type.filter(type => type !== selectedTypeId)
        });
    }

    function handleSubmit(submit){
        submit.preventDefault();
        const newObj = {
            name: input.name.trim(),
            image: input.image,
            hp: Number(input.hp),
            attack: Number(input.attack),
            defense: Number(input.defense),
            speed: Number(input.speed),
            height: Number(input.height),
            weight: Number(input.weight),
            types: input.type
        }
        console.log(newObj);

        dispatch(addPokemon(newObj));
        setInput({
            name:"",
            image:"",
            hp:"",
            attack:"",
            defense:"",
            speed:"",
            height:"",
            weight:"",
            type:[],
        })

        alert("Your Pokemon has been created successfully!");
        navigate("/home");
    }

    // Verificamos si hay UN error presente en el estado "error". Si el array de las propiedades o sea keys de del objeto error es mayor que cero, significa que hay al menos un error presente, por lo tanto el submit va a aparece desactivado.

    // Verificamos si hay ALGUN valor vacío en el estado "input".
    // Object.values(input) = array de los valores del input.
    // some() = itera sobre los elementos del array que creamos y nos devuelve true si al menos uno de los elementos cumple con la condición.
    // Nuestra condicion es (value === ""), lo que significa que se verifica si algún valor es un string vacio. Entonces, si por lo menos se encuentra al menos un valor vacío, el submit tambien va a estar desactivado.
    const isSubmitDisabled = Object.keys(error).length > 0 || Object.values(input).some(value => value === "" || input.type.length === 0)

    return (
        <CreateContainer>
            <h1>Create your Pokemon</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>

                <div>
                    <label>NAME: </label>
                    <input
                        type="text"
                        value={input.name}
                        name= "name"
                        onChange={e=>{handleChange(e)}}/>
                </div>
                {/* Si existe, hay un error, entonces se renderiza <p>{error.name}</p> */}
                {error.name && (<ErrorMessage>{error.name}</ErrorMessage>)}

                <div>
                    <label>HP: </label>
                    <input
                        // className="no-spin"
                        // input.no-spin {
                        //    -moz-appearance: textfield;
                        //    appearance: textfield;
                        // }

                        // input.no-spin::-webkit-inner-spin-button,
                        // input.no-spin::-webkit-outer-spin-button {
                        //    -webkit-appearance: none;
                        //    margin: 0;
                        // }
                        type="number"
                        value={input.hp}
                        name="hp"
                        onChange={handleChange}/>
                </div>
                {error.hp && (<ErrorMessage>{error.hp}</ErrorMessage>)}

                <div>
                    <label>ATTACK: </label>
                    <input
                        type="number"
                        value={input.attack}
                        name="attack"
                        onChange={handleChange}/>
                </div>
                {error.attack && (<ErrorMessage>{error.attack}</ErrorMessage>)}

                <div>
                    <label>WEIGHT: </label>
                    <input
                        type="number"
                        value={input.weight}
                        name="weight"
                        onChange={handleChange}/>
                </div>
                {error.weight && (<ErrorMessage>{error.weight}</ErrorMessage>)}

                <div>
                    <label>SPEED: </label>
                    <input
                        type="number"
                        value= {input.speed}
                        name="speed"
                        onChange={handleChange}/>
                </div>
                {error.speed && (<ErrorMessage>{error.speed}</ErrorMessage>)}

                <div>
                    <label>HEIGHT: </label>
                    <input
                        type="number"
                        value={input.height}
                        name="height"
                        onChange={handleChange}/>
                </div>
                {error.height && (<ErrorMessage>{error.height}</ErrorMessage>)}

                <div>
                    <label>DEFENSE: </label>
                    <input
                        type="number"
                        value={input.defense}
                        name="defense"
                        onChange={handleChange}/>
                </div>
                {error.defense && (<ErrorMessage>{error.defense}</ErrorMessage>)}

                <div>
                    <label>IMAGE:</label>
                    <input
                        type="text"
                        value={input.image}
                        name="image"
                        onChange={e=>{handleChange(e)}}
                    />
                </div>
                {error.image && (<ErrorMessage>{error.image}</ErrorMessage>)}

                <div>
                    <p>Select your type/s</p>
                    <select onChange={(selection) => handleSelect(selection)}>
                        <option value="" disabled selected>Select your Type</option>
                        {
                            types.map((type)=> (
                                <option value={type.id} key={type.name}>
                                    {type.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div>
                    {
                        input.type.map((typeId)=>{
                            const selectedType = types.find((type) => type.id === typeId);
                            return (
                                <div key={typeId}>
                                    <h5>{selectedType.name}</h5>
                                    <button onClick={(e)=> {handleDelete(e, typeId)}}>x</button>
                                </div>
                            );
                        })
                    }
                </div>

                <button type="submit" disabled={isSubmitDisabled}>Create your Pokemon</button>
                {/* <Link to="/home"><button >Back</button></Link> */}
            </form>
            <NavLink to={"/home"}>
                Back to Home
            </NavLink>
        </CreateContainer>
    )
}

export default Create;
