import React, { useState, useEffect } from 'react'
import axios from 'axios';


const initialItem = {
    
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovie = (props) => {
    console.log(`props`, props)
    const [film, setFilm] = useState (initialItem);
    const changeIt = e => {
        e.persist();
        let value  = e.target.value;
        // if ( e.target.name === 'metascore'){
        //     value = parseInt(value, 10)
        // }
        if (e.target.name === 'stars'){
            value= value.split(',')
        }
        setFilm ({
            ...film,
            [e.target.name]: value
        });
    };

useEffect(() => {
    if (props.saved.length > 0) {
        const newMovie  = props.saved.find(thing => `${thing.id}` === props.match.params.id
        );
        setFilm(newMovie)
    }
}, [props.saved, props.match.params.id])

const handleSubmit = e => {
    e.preventDefault();
    const check = props.match.params.id
    console.log(check)
    console.log(`film`, film)
    film.id=check
    axios
        .put(`http://localhost:5000/api/movies/${check}`, film) ///api/movies/:id
        .then(res => {
            // props.updatedList(res.data);
            props.history.push('/')
        })
        .catch(err => console.log(err))
    }   
    if (!film) {
		return <h2>Loading</h2>;
	}

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit} >
            <input 
                type='text'
                name='title'
                onChange={changeIt}
                placeholder='Title'
                value={film.title}
            /> 
             <input 
                type='text'
                name='director'
                onChange={changeIt}
                placeholder='Director'
                value={film.director}
            /> 
             <input 
                type='text'
                name='metascore'
                onChange={changeIt}
                placeholder='MetaScore'
                value={film.metascore}
            /> 
             <input 
                type='text'
                name='stars'
                onChange={changeIt}
                placeholder='Movie Stars'
                value={film.stars}
                
            /> 
            <button>Update</button>

            </form>
        </div>
    )
}
export default UpdateMovie;