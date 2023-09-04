import React, { useState } from 'react'
import PokeCard from '../component/PokeCard'
import Pagination from '../component/Pagination'
import SortType from '../component/SortType'

export default function Home() {  
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0); // Add totalPages state
    const [currentType, setCurrentType] = useState('');

    const handleTypeChange = (selectedType) => {
        setCurrentType(selectedType);
    };

    return (
        <>
            <section className='container text-center'>
                {/* Start Form Select */}
                <SortType onSelectType={handleTypeChange} />
                {/* End Form Select */}

                {/* Start Content */}
                <div className="container-fluid">
                    <PokeCard currentPage={currentPage} currentType={currentType} totalPages={totalPages} setTotalPages={setTotalPages} />
                </div>
                {/* End Content */}
                
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </section>
        </>
    );
}
