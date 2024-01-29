import React from 'react';
import './ItemCard.css'

const ItemCard = ({ item, handleItemSelect, handleDelete }) => {

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    handleDelete(item._id);
  };

  return (
    <div className='item-card' onClick={() => handleItemSelect(item._id)}>
      <h1>{item.type}</h1>
      <h1>{item.brand}</h1>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};

export default ItemCard;
