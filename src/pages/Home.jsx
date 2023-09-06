import React, { useState, useEffect } from 'react';
import PokeCard from '../component/PokeCard';
import axios from 'axios';

export default function Home() {
    const [selectedType, setSelectedType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonList, setPokemonList] = useState([]);
    const [typeList, setTypeList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/type")
            .then(({ data: { results } }) => {
                setTypeList(results);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching Pokemon types:', error);
            });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=12&offset=${(currentPage - 1) * 12}`;

                if (selectedType) {
                    apiUrl = `https://pokeapi.co/api/v2/type/${selectedType}?limit=12`;
                }

                const response = await axios.get(apiUrl);

                if (selectedType) {
                    const results = response.data.pokemon;
                    const pokemonData = await Promise.all(
                        results.map(async (pokemon) => {
                            const detailResponse = await axios.get(pokemon.pokemon.url);
                            return detailResponse.data;
                        })
                    );
                    setPokemonList(pokemonData);
                } else {
                    const results = response.data.results;
                    const pokemonData = await Promise.all(
                        results.map(async (pokemon) => {
                            const detailResponse = await axios.get(pokemon.url);
                            return detailResponse.data;
                        })
                    );
                    setPokemonList(pokemonData);
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            }
        };

        fetchData();
    }, [selectedType, currentPage]);

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        setCurrentPage(1);
    };

    return (
        <>
            <section className='container text-center'>
                <div className="row justify-content-end">
                    <div className="col-md-4 mt-5">
                        <h5>Sort by Type</h5>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            value={selectedType}
                            onChange={handleTypeChange}
                        >
                            <option value="">Select type</option>
                            {typeList.map((type, index) => (
                                <option key={index} value={type.name}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="container-fluid">
                    {!isLoading ? <PokeCard pokemonList={pokemonList} /> : <div>Loading...</div>}
                </div>
                <div className="button-section m-4">
                    <button
                        type="button"
                        className="btn btn-primary me-1"
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1 || selectedType !== ''}
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary ms-1"
                        onClick={goToNextPage}
                        disabled={selectedType !== ''}
                    >
                        Next
                    </button>
                </div>
            </section>
        </>
    );
}
