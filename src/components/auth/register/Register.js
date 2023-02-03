import React, { Component, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { httpClient } from '../../../utils/httpClient'
import { notify } from '../../../utils/notify'
import { errorHandler } from '../../../service/error.service'
import { getAuthenticationToken } from '../../../utils/index'
import { SubmitButton } from '../../common/submitButton/submitButton'

// const token = getAuthenticationToken()

const defaultForm = {
  firstname: '',
  middlename: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
}

const defaultErrorFields = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export const Register = (props) => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formFields, setFormFields] = useState({
    ...defaultForm
  })
  const [errorFields, setErrorFields] = useState({
    ...defaultErrorFields
  })
  const [currentFormField, setCurrentFormField] = useState(null)
  const [isValidForm, setIsValidForm] = useState(false)
  let navigate = useNavigate()

  useEffect(() => {
    validateForm(currentFormField)
  }, [formFields])

  const validateForm = (fieldName) => {
    let errMsg;
    switch (fieldName) {
      case 'username':
        errMsg = formFields[fieldName]
          ? formFields.username.length > 6
            ? ''
            : 'username must be more than 6 characters long'
          : 'required fields*'
        break;
      case 'password':
        errMsg = formFields['confirmPassword']
          ? formFields['password'] === formFields[fieldName]
            ? ''
            : 'password didnot match'
          : formFields[fieldName]
            ? formFields[fieldName].length > 8
              ? ''
              : 'weak password'
            : 'required fields*'
        break;
      case 'confirmPassword':
        errMsg = formFields['password']
          ? formFields['confirmPassword'] === formFields[fieldName]
            ? ''
            : 'password didnot match'
          : formFields['password']
            ? formFields[fieldName].length > 8
              ? ''
              : 'weak password'
            : 'required fields*'
        break;
      case 'email':
        errMsg = formFields[fieldName]
          ? formFields[fieldName].includes('@') && formFields[fieldName].includes('.com')
            ? ''
            : 'invalid email'
          : 'required fields*'
        break;
      default:
        break;
    }

    // check for errors
    const customErrObj = { ...errorFields }
    if (!errMsg) {
      if (customErrObj[fieldName]) {
        delete customErrObj[fieldName]
      }
    }

    let prevErrors = Object.values(customErrObj).filter(err => err)

    if (errMsg) prevErrors.push(errMsg)

    setIsValidForm(prevErrors.length === 0)
    // state update
    setErrorFields({
      ...errorFields,
      [fieldName]: errMsg
    })

  }

  

  const submit = (e) => {
    e.preventDefault()
    setIsSubmitting(false)
    // api call
console.log('register submit event')
    httpClient.POST('auth/register', formFields)
    .then(response => {
      console.log('response is>>>',response)
      notify.showSuccess("Registration Successfull Please Login")
      navigate('/')
    })
    .catch(err => {
      errorHandler(err)
      setIsSubmitting(false)
    })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      value = checked;
    }
    setCurrentFormField(name)

    // preserve existing formfileds data
    setFormFields({
      ...formFields,
      [name]: value
    })

  }

  return (
    <div className='container register' style={{ alignItems: "center", textAlign: "center", width: '500px' }}>
      <h2>Register</h2>
      <p>Fill all the required necessary fields*</p>
      <form className='form-group' onSubmit={submit} >
        <label htmlFor='firstname' >First Name</label>
        <input type="text" className='form-control' name="firstname" id='firstname' placeholder='First Name' onChange={handleChange} />
        <label htmlFor='middlename' >Middle Name</label>
        <input type="text" className='form-control' name="middlename" id='middlename' placeholder='Middle Name' onChange={handleChange} />
        <label htmlFor='lastname' >Last Name</label>
        <input type="text" className='form-control' name="lastname" id='lastname' placeholder='Last Name' onChange={handleChange} />
        <label htmlFor='username' >User Name</label>
        <input type="text" className='form-control' name="username" id='username' placeholder='User Name' onChange={handleChange} />
        <p className='error'>{errorFields.username}</p>
        <label htmlFor='email' >Email</label>
        <input type="email" className='form-control' name="email" id='email' placeholder='Email' onChange={handleChange} />
        <p className='error'>{errorFields.email}</p>
        <label htmlFor='password' >Password</label>
        <input type="password" className='form-control' name="password" id='password' placeholder='Password' onChange={handleChange} />
        <p className='error'>{errorFields.password}</p>
        <label htmlFor='confirmpassword' >Confirm Password</label>
        <input type="password" className='form-control' name="confirmpassword" id='confirmpassword' placeholder='Confirm Password' onChange={handleChange} />
        <p className='error'>{errorFields.password}</p>
        <input type="checkbox" name="isMarried" onChange={handleChange} />
        <label>&nbsp;Is Married</label>
        <hr />
        <SubmitButton
        isDisabled={!isValidForm}
        isSubmitting={isSubmitting}
        ></SubmitButton>
      </form>
      <p>Already Have An Account?<a href='/'>Here</a></p>
    </div>
  )
}
