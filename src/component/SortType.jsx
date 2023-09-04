import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SortType({ onSelectType }) {
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/type');
                const typesData = response.data.results;
                setTypes(typesData);
            } catch (error) {
                console.error('Error fetching Pokemon types:', error);
            }
        };

        fetchData();
    }, []);

    const handleTypeChange = (e) => {
        const type = e.target.value;
        setSelectedType(type); // Update the selected type
        onSelectType(type); // Call the onSelectType function with the selected type
    };

    return (
        <div className="row justify-content-end">
            <div className="col-md-4 mt-5">
                <h5>Sort by Type</h5>
                <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleTypeChange}
                    value={selectedType}
                >
                    <option value="">Select type</option>
                    {types.map((type, index) => (
                        <option key={index} value={type.name}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
