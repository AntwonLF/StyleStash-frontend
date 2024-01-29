import React from 'react'


const CategoryFilter = ({ category, handleCategorySelect}) => {

  return (
    <button className='category-button' onClick={() => handleCategorySelect(category)}>
        {category}
    </button>
  )
}

export default CategoryFilter