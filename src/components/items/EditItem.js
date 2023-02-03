import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { errorHandler } from '../../service/error.service'
import { httpClient } from '../../utils/httpClient'
import { notify } from '../../utils/notify'
import { ItemForm } from './ItemForm'

export const EditItem = () => {
    const [item, setItem] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        httpClient.GET(`/product/${params.id}`, true)
            .then(response => {
                // console.log('data in edit item',response.data)
                setItem(response.data)
            })
            .catch(err => {
                errorHandler(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    })

    const edit = (data, files) => {
        console.log('data to edit is', data)
        httpClient.UPLOAD('PUT',`/product/${params.id}`, data, files)
            .then(response => {
                notify.showSuccess('Product Update Success')
                navigate('/view_item')
                setIsSubmitting(true)
            })
            .catch(err => {
                errorHandler(err)
                setIsSubmitting(false)
            })
    }

    return (
        <ItemForm
            title="Edit"
            submitCallback={edit}
            itemData={item}
            isSubmitting={isSubmitting}
        ></ItemForm>
    )
}
