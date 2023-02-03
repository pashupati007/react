import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { errorHandler } from '../../service/error.service'
import { httpClient } from '../../utils/httpClient'
import axios from 'axios';
import { FaTrashAlt, FaPencilAlt, FaTruckLoading } from 'react-icons/fa';
import { formatDate } from '../../utils/dateUtil';
import { notify } from '../../utils/notify';

const IMG_URL = process.env.REACT_APP_IMG_URL;

export const ViewProduct = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    httpClient.GET('/product', true)
      .then(response => {
        setIsLoading(true)
        setItems(response.data)
      })
      .catch(err => {
        setIsLoading(false)
        errorHandler(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [items])

  const editItem = (id) => {

  }
  
  const removeItem = (id, index) => {
    let confirmation = window.confirm('Are you sure to remove?')
    if(confirmation) {
      httpClient.DELETE(`/product/${id}`,true)
      .then(response => {
        notify.showSuccess('Item removed')
        // setItems(items.splice(index,1))
      })
      .catch(err => {
        errorHandler(err)
      })
    }
  }
  
  let content = isLoading
    ? <h1>Loading...</h1>
    : <div>
      <h2>View Items</h2>
<table className='table table-bordered'>
<thead>
<tr>
<th>S.N</th>
<th>Name</th>
<th>Category</th>
<th>Price</th>
<th>Brand</th>
<th>CreatedAt</th>
<th>Tags</th>
<th>Images</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{(items || []).map((item,index) => (
  <tr key={index}>
  <td>{index + 1}</td>
  <td>{item.name}</td>
  <td>{item.category}</td>
  <td>{item.price}</td>
  <td>{item.brand}</td>
  <td>{formatDate(item.createdAt)}</td>
  <td>{item.tags.join(',')}</td>
  <td>
  <img src={`${IMG_URL}/${item.images[0]}`} alt="itemImage.png" width="150px"></img>
  </td>
  <td>
<Link to={`/edit_item/${item._id}`} >
<FaPencilAlt onClick={() => editItem(item._id)} title="Edit" color="blue" />
</Link>
<FaTrashAlt onClick={() => removeItem(item._id, index)} title="remove" color="red" />
  </td>
  </tr>
))}
</tbody>
</table>
    </div>

  return (
    <div>{content}</div>
  )
}
