import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { errorHandler } from '../../service/error.service'
import { httpClient } from '../../utils/httpClient'
import { notify } from '../../utils/notify'
import { ItemForm } from './ItemForm'

export const AddItem = () => {
    const navigate = useNavigate()
    const [isSubmitting, setIsSumitting] = useState(false)

    const add = (data, files) => {
        console.log('data in add file',data)
        setIsSumitting(true)
        httpClient.UPLOAD('POST', '/product',data,files)
        .then(response => {
            notify.showInfo("Item Added successfully")
            navigate('/view_item')
        })
        .catch(err => {
            setIsSumitting(false)
            errorHandler(err)
        })
    }
    
  return (
    <ItemForm
    title="Add"
    submitCallback={add}
    isSubmitting={isSubmitting}
    />
  )
}
