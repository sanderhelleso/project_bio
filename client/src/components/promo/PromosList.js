import React from 'react';

const PromosList = ({ list }) => {
    return list.map(promo => {
        return <li>{promo.name}</li>
    });
}

export default PromosList;