

import React from 'react';
import '../../styles/Pagination.scss';


const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <ul className="Pagination">
                {pageNumbers.map((number) => (
                    <li className="PageItem" key={number}>
                        <span className="PageLink" onClick={() => paginate(number)}>{number}</span>
                    </li>
                ))}
            </ul>
        </>
        
    );
};

export default Pagination;