import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'


import ItemModal from '../../components/ItemModal/ItemModal.jsx'
import * as tokenService from '../../services/tokenService.js'
import * as itemService from '../../services/itemService.js'

//css
import './ItemDetails.css'



const ItemDetails = () => {
  const {itemId} = useParams() 
  console.log(itemId)
  const [itemDetail, setItemDetail] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

useEffect(() => {
  const getItemDetails = async () => {
    const itemData = await itemService.getItem(itemId)
    setItemDetail(itemData)
  } 
  getItemDetails()
}, [itemId])

const handleEditButtonClick = () => {
  setIsModalOpen(!isModalOpen)
}

const updateItemDetail = (updatedData) => {
  setItemDetail(updatedData);
};

const handleBackButtonClick = () => {
  navigate(-1)
}

return (
  <div className="item-details">
    {itemDetail ? (
      <>
        <h2>Item Details</h2>
        <div><strong>Category:</strong> {itemDetail.category}</div>
        <div><strong>Color:</strong> {itemDetail.color || 'N/A'}</div>
        <div><strong>Type:</strong> {itemDetail.type || 'N/A'}</div>
        <div><strong>Size:</strong> {itemDetail.size || 'N/A'}</div>
        <div><strong>Brand:</strong> {itemDetail.brand || 'N/A'}</div>
        <div><strong>Wear Count:</strong> {itemDetail.wearCount || 'N/A'}</div>
        <div><strong>Notes:</strong> {itemDetail.notes || 'N/A'}</div>
        {itemDetail.imageUrl && (
          <img src={itemDetail.imageUrl} alt="Item" style={{ maxWidth: '200px' }} />
        )}
        <button onClick={handleBackButtonClick}>Back</button>
        <button onClick={handleEditButtonClick}>Edit</button>
        {isModalOpen && (
          <ItemModal
            item={itemDetail}
            onClose={handleEditButtonClick}
            itemToEdit={itemDetail}
            onUpdated={updateItemDetail}
          />
        )}
      </>
    ) : (
      <div>Loading...</div>
    )}
  </div>
);

}

export default ItemDetails