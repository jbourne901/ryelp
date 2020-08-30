import React from 'react';

function StarRating(props) {
    const rating = props.rating;
    const stars = [];
    for(let i=1; i<=5; i++) {
        let cls="fa text-warning";
        if(i<=rating) {
            cls += " fa-star";
        } else if(i === Math.ceil(rating) && !Number.isInteger(rating)) {
            cls += " fa-star-half-empty";
        } else {
            cls += " fa-star-o";
        }
        stars.push(<i key={i} className={cls}></i>);
    }
    return (
        <>
            {stars}            
        </>
    );
}

export default StarRating;