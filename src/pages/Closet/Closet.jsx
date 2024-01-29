import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../../components/ItemCard/ItemCard.jsx';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import * as tokenService from '../../services/tokenService.js';
import * as closetService from '../../services/closetService.js';
import ItemModal from '../../components/ItemModal/ItemModal.jsx';

// Styling
import './Closet.css';

const Closet = () => {
  const [closet, setCloset] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [closetItems, setClosetItems] = useState([]);
  const navigate = useNavigate();
  const [ShowModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['Footwear', 'Clothing', 'Accessories', 'Outerwear'];

  const handleCategorySelect = async (category) => {
    setIsLoading(true);
    const lowerCaseCategory = category.toLowerCase();
    const closetId = tokenService.getClosetFromToken();
    try {
      const items = await closetService.getByCategory(closetId, lowerCaseCategory);
      console.log('Items fetched:', items);
      setClosetItems(items);
      setSelectedCategory(category);
      localStorage.setItem('selectedCategory', category);
    } catch (error) {
      console.error('Error fetching items by category', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await closetService.deleteItem(itemId);
      const closetId = tokenService.getClosetFromToken();
      const closetData = await closetService.getCloset(closetId);
      setCloset(closetData);
      setClosetItems(closetData.items);

      setSelectedCategory(null);
    } catch (error) {   
      console.error('Error deleting item', error);
    }
  }

  useEffect(() => {
    const  savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
      setSelectedCategory(savedCategory);
    }

    const getCloset = async () => {
      const closetId = tokenService.getClosetFromToken();
      if (closetId) {
        try {
          const closetData = await closetService.getCloset(closetId);
          setCloset(closetData);
          console.log(closetData);
          setClosetItems(closetData.items);
        } catch (error) {
          console.error('Error fetching closet', error);
        }
      } else {
        console.log('No closet in token');
      }
    };
    getCloset();
    
    return () => {
      localStorage.removeItem('selectedCategory');
    }
  }, []);

  const handleBackButtonClick = () => {
    setSelectedCategory(null);
    localStorage.removeItem('selectedCategory', null);
  }

  const navigateToItemDetails = (itemId) => {
    navigate(`/items/${itemId}`);
  };

  const handleAddItemButtonClick = () => {
    setShowModal(true);
  };

  const refreshItemsAfterAdd = async () => {
    if (selectedCategory){
      await handleCategorySelect(selectedCategory);
    }
  }

  return (
    <div className="closet">
      <h1>My Closet</h1>
      <div className='add-item-button'>
      <button onClick={handleAddItemButtonClick}>Add Item</button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      
      ): selectedCategory === null ? (
        // Display category list when no category is selected
        <div className="category-list">
          {categories.map((category) => (
            <CategoryFilter
              key={category}
              category={category}
              handleCategorySelect={handleCategorySelect}
            />
          ))}
        </div>
      ) : closetItems.length > 0 ? (
        // Display items when a category is selected
        <div className="selected-category">
          <h2>{selectedCategory}</h2>
          <button onClick={handleBackButtonClick}>Back</button>
          <div className="closet-items">
            {closetItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                handleItemSelect={() => navigateToItemDetails(item._id)}
                handleDelete={() => deleteItem(item._id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="no-items-message">
        <h2>{selectedCategory}</h2>
        <p>No items in this category.</p>
        <button onClick={handleBackButtonClick}>Back</button>
      </div>
      )}
      {ShowModal && (
        <ItemModal 
        show={ShowModal} 
        onClose={() => setShowModal(false)} 
        onItemAdded={refreshItemsAfterAdd}/>
      )}
    </div>
  );
};

export default Closet;
