import React, { useEffect, useState } from 'react'
import { SubmitButton } from '../common/submitButton/submitButton'
import { formatDate } from '../../utils/dateUtil'
import { FaTrashAlt } from 'react-icons/fa'
import './ItemStyle.css'

const IMG_URL = process.env.REACT_APP_IMG_URL;

const defaultFormFields = {
  name: '',
  description: '',
  category: '',
  brand: '',
  size: '',
  images: '',
  price: '',
  quantity: '',
  color: '',
  status: '',
  modelNo: '',
  warrentyStatus: '',
  warrentyPeriod: '',
  discountedItem: '',
  discountType: '',
  discountValue: '',
  isReturnEligible: '',
  offers: '',
  tags: '',
  manuDate: '',
  expiryDate: '',
  slesDate: '',
  purchaseDate: '',
  returnedDate: '',
}

export const ItemForm = (props) => {
  const [categories, setCategories] = useState([])
  const [filesToUpload, setFilesToUpload] = useState([])
  const [filesToPreview, setFilesToPreview] = useState([])
  const [filesToRemove, setFilesToRemove] = useState([])

  const [formFields, setFormFields] = useState({ ...defaultFormFields })
  // console.log('form fileds are>>', formFields)

  // console.log('item data form edit form',props.itemData)
  useEffect(() => {
    // only form edit
    if (props.itemData) {
      let discountProp = props.itemData.discount;
      setFormFields({
        ...defaultFormFields,
        ...props.itemData,
        discountedItem: discountProp && discountProp.discountedItem ? discountProp.discountedItem : '',
        discountType: discountProp && discountProp.discountType ? discountProp.discountType : '',
        discountValue: discountProp && discountProp.discountValue ? discountProp.discountValue : '',
        // purchaseDate: props.itemDate.purchaseDate ? formatDate(props.itemData.purchaseDate, 'YYYY-MM-DD') : '',
        salesDate: props.itemData.salesDate ? formatDate(props.itemData.salesDate, 'YYYY-MM-DD') : '',
        returnedDate: props.itemData.returnedDate ? formatDate(props.itemData.returnedDate, 'YYYY-MM-DD') : '',
      })
      // console.log('from',formFields)
    }
  },[])

  const handleChange = e => {
    const { name, value, type, checked, files } = e.target;
    console.log(type, name, value)
    if (type === 'checkbox') {
      value = checked;
    }

    if (type === 'file') {
      const newFilesToUpload = [...filesToUpload]
      newFilesToUpload.push(files[0])
      setFilesToUpload(newFilesToUpload)
      return
    }
    setFormFields({
      ...formFields,
      [name]: value,
    })
  }

  const submit = e => {
    e.preventDefault();
    const requestData = {
      ...formFields,
      filesToRemove: filesToRemove,
    }
    console.log('request data in form',requestData)
    props.submitCallback(requestData, filesToUpload)
  }

  const removeUploadSelection = (index) => {
    const existingFiles = [...filesToUpload]
    existingFiles.splice(index, 1)
    setFilesToUpload(existingFiles)
  }

  const removeExistingImages = (item, index) => {
    console.log('item is >>', item)
    const removeContent = [...filesToRemove]
    removeContent.puth(item)

    setFilesToRemove(removeContent)

    // remove from state
    let existingFiles = [...filesToPreview]
    existingFiles.splice(index, 1)
    setFilesToPreview(existingFiles)
  }

  return (
    <div className="item-form-container" style={{ marginLeft: '20px' }}>
      <h1>Product {props.title} Form</h1>
      <form className='form' onSubmit={submit}>
        <div className='form-item' >
          <label>Name</label>
          <input type="text" name="name" placeholder="Name" className="form-control" value={formFields.name} onChange={handleChange}></input>
        </div>
        <div className='form-item'>
          <label>Description</label>
          <input type="text" name="description" placeholder="Description" className="form-control" value={formFields.description} onChange={handleChange}></input>
        </div>
        <div className='form-item'>
          <label>Category</label>
          <input type="text" name="category" placeholder="Category" className="form-control" value={formFields.category} onChange={handleChange}></input>
        </div>
        <div className='form-item'>
          <label>Brand</label>
          <input type="text" name="brand" placeholder="Brand" className="form-control" value={formFields.brand} onChange={handleChange}></input>
        </div>
        <div className='form-item'>
          <label>Size</label>
          <input type="text" name="size" placeholder="Size" className="form-control" value={formFields.size} onChange={handleChange}></input>
        </div>
        <div className='form-item'>
          <label>Price</label>
          <input type="text" name="price" placeholder="Price" className="form-control" value={formFields.price} onChange={handleChange}></input>
        </div>
        <div className='form-item'>
          <label>Quantity</label>
          <input type="text" name="quantity" placeholder="Quantity" className="form-control" value={formFields.quantity} onChange={handleChange}></input>
        </div>
        <div className='form-item'>
          <label>Color</label>
          <input type="text" name="color" placeholder="Color" className="form-control" value={formFields.color} onChange={handleChange}></input>
        </div>
        <div className='form-item'>
          <label>Status</label>
          <select className='form-control' name="status" value={formFields.status} onChange={handleChange}>
            <option value=''>(Select Options)</option>
            <option value='OutOfStock'>Out Of Stock</option>
            <option value="available">Available</option>
            <option value='booked'>Booked</option>
          </select>
        </div>
        <div className='form-item'>
          <label>Modle No</label>
          <input type="text" name="modelNo" placeholder="Modle No" className="form-control" value={formFields.modelNo} onChange={handleChange}></input>
        </div>
        <div className='form-item'>
          <input type="checkbox" name="warrentyStatus" value={formFields.warrentyStatus} onChange={handleChange}></input>
          <label>&nbsp;WarrentyStatus</label>
          <br />
          <label>Warrenty Period</label>
          <input type="text" name="warrentyPeriod" placeholder="Warrenty Period" className="form-control" value={formFields.warrentyPeriod} onChange={handleChange}></input>
        </div>
        <br />
        <div className='form-item'>
          <input type="checkbox" name="discountedItem" value={formFields.discountedItem} onChange={handleChange}></input>
          <label>&nbsp;Discounted Item</label>
          <br />
          <label>Discount Type</label>
          <select className="form-control" name="discountType" value={formFields.discountType} onChange={handleChange} >
            <option value=''>(Discount Options)</option>
            <option value='percentage'>In Percentage</option>
            <option value='quantity'>In Quantity</option>
            <option value='value'>In Value</option>
          </select>
          <br />
          <label>Discount Value</label>
          <input type="text" name="discountValue" placeholder="Discount Value" className="form-control" value={formFields.discountValue} onChange={handleChange}></input>
        </div>
        <div className='form-item'>
          <label>Is Return Eligible</label>
          <input type="text" name="isReturnEligible" placeholder="Is Return Eligible" className="form-control" value={formFields.isReturnEligible} onChange={handleChange}></input>
        </div>
        <div className='form-item'>
          <label>Offers</label>
          <input type="text" name="offers" placeholder="Offers" className="form-control" value={formFields.offers} onChange={handleChange}></input>
        </div>
        <div className='form-item'>
          <label>Tags</label>
          <input type="text" name="tags" placeholder="Tags" className="form-control" value={formFields.tags} onChange={handleChange}></input>
        </div>
        <div className='form-item'>
          <label>Manu Date</label>
          <input type="date" name="manuDate" placeholder="Manu Date" className="form-control" value={formFields.manuDate} onChange={handleChange}></input>
        </div>
        <div className='form-item'>
          <label>Expiry Date</label>
          <input type="date" name="expiryDate" placeholder="Expiry Date" className="form-control" value={formFields.expiryDate} onChange={handleChange}></input>
        </div>
        <div className='form-item'>
          <label>Sales Date</label>
          <input type="date" name="salesDate" placeholder="Sales Date" className="form-control" value={formFields.slesDate} onChange={handleChange}></input>
        </div>
        <div className='form-item'>
          <label>Purchase Date</label>
          <input type="date" name="purchaseDate" placeholder="Purchase Date" className="form-control" value={formFields.purchaseDate} onChange={handleChange}></input>
        </div>
        <div className='form-item'>
          <label>Returned Date</label>
          <input type="date" name="returnedDate" placeholder="Returned Date" className="form-control" value={formFields.returnedDate} onChange={handleChange}></input>
        </div>
        <div className='form-item'>
          {
            filesToPreview.length > 0 && (
              <div>
                <label>Existing Images:</label>
                {filesToPreview.map((item, index) => (
                  <div style={{ marginTop: '5px' }} key={index} >
                    <img src={`${IMG_URL}/${item}`} alt="upload.png" width='200px' />
                    <span onClick={() => removeExistingImages(item, index)} title="remvoe file" style={{ marginLeft: '5px', cursor: 'pointer' }} >
                      <FaTrashAlt color='red' />
                    </span>
                  </div>
                ))}
              </div>
            )
          }
          <label>Choose Image(s)</label>
          <input type="file" className="form-control" onChange={handleChange}></input>
          {
            filesToUpload.length > 0 && filesToUpload.map((item, index) => (
              <div style={{ marginTop: '5px' }} key={index} >
                <img src={URL.createObjectURL(item)} alt="upload.png" width='200px' ></img>
                <span onClick={() => removeUploadSelection(index)} title="remove file" style={{ marginLeft: '5px', cursor: 'pointer' }} >
                  <FaTrashAlt color="red" />
                </span>
              </div>
            ))
          }
        </div>
        <span style={{ position: 'absolute', bottom: '-10vh' }}>
          <SubmitButton
            isSubmitting={props.isSubmitting} >Submit</SubmitButton>
        </span>
      </form >
    </div >
  )
}
