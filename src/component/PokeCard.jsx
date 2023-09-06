import React from 'react';
import { Link } from 'react-router-dom';

export default function PokeCard({ pokemonList }) {
    return (
        <div className="row mt-5">
            {pokemonList.map((pokemon, index) => (
                <Link to={`/profile/${pokemon.name}`} key={index} className="col-xl-4 col-md-6 col-sm-6 col-lg-6" style={{ textDecoration: 'none'}}>
                    <div className="card mb-3" style={{ backgroundColor: '#A1D9EF' }}>
                        <div className="row g-5">
                            <div className="col-md-5 d-flex align-items-center">
                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                                    className="img-fluid"
                                    alt={pokemon.name}
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div className="col-md-7 text-md-end">
                                <div className="card-body">
                                    <h5 className="card-title">{pokemon.name}</h5>
                                    <p className="card-text">
                                        {pokemon.types.map((type) => type.type.name).join(', ')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
