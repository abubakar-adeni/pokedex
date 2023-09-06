import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function PokemonProfile() {
    const { id } = useParams();
    const [pokemonData, setPokemonData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const data = response.data;
                setPokemonData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            }
        };

        fetchData();
    }, [id]);

    if (isLoading) {
        return <div className='container-fluid text-center m-5'>Loading...</div>;
    }

    const { name, types, height, weight, abilities, sprites, stats, base_experience } = pokemonData;

    return (
        <div className="container-fluid text-center mt-5">
            <div className="text-start">
                <Link to={'/'} className='btn btn-primary ms-5'>Back</Link>
            </div>
            <div className="row justify-content-start justify-content-md-center">
                <div className="col-12 col-md-4 movier">
                    <div className="pokemon-image">
                        <img
                            className='movies-buy'
                            src={sprites.other['official-artwork'].front_default}
                            alt={name}
                            loading="lazy"
                        />
                    </div>
                </div>
                <div className="col col-sm-12" style={{ width: '130vh', height: '60vh' }}>
                    <div className="description">
                        <h1 className='title text-md-start mt-2 pb-3'>{name}</h1>
                        <div className="date-release">
                            <div className="row row-cols-4 row-movie">
                                <div className="col col-4 text-start fw-bold">Height
                                    <p className='text-start  fw-normal'>{height / 10} m</p>
                                </div>
                                <div className="col col-8 text-start fw-bold">Weight
                                    <p className='text-start fw-normal'>{weight / 10} Kg</p>
                                </div>
                                <div className="col col-4 text-start fw-bold">Type
                                    <p className='text-start fw-normal'>{types.map(type => type.type.name).join(', ')}</p>
                                </div>
                                <div className="col col-8 text-start fw-bold">Abilities
                                    <p className='text-start fw-normal'>{abilities.map(ability => ability.ability.name).join(', ')}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="container text-start">
                                <h5>Stats</h5>
                                <ul>
                                    {stats.map(stat => (
                                        <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="container text-start">
                                <h5>Ability</h5>
                                <ul>
                                    {abilities.map(ability => (
                                        <li key={ability.ability.name}>{ability.ability.name}</li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
