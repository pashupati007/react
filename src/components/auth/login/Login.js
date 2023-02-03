import React, { Component, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { errorHandler } from '../../../service/error.service'
import { httpClient } from '../../../utils/httpClient'
import { notify } from '../../../utils/notify'
import { SubmitButton } from '../../common/submitButton/submitButton'

const defaultFields = {
  username: '',
  password: ''
}

class LoginComponent extends Component {

  constructor(props) {
    super(props)
    // initial state
    this.state = {
      data: {
        ...defaultFields,
      },
      error: {
        ...defaultFields,
      },
      remember_me: false,
      isSubmitting: false,
    }
  }

  handleChange = e => {
    let { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      return this.setState({
        remember_me: checked
      })
    }
    this.setState((preState) => ({
      data: {
        ...preState.data,
        [name]: value
      }
    }), () => {
      if (this.state.error[name]) {
        this.validateForm()
      }
    })
  }

  validateForm = () => {
    let unameErr;
    let passwordErr;
    let isValidForm = true;

    if (!this.state.data.username) {
      unameErr = true;
      isValidForm = false;
    }

    if (!this.state.data.password) {
      passwordErr = true;
      isValidForm = false;
    }

    this.setState({
      error: {
        username: unameErr,
        password: passwordErr,
      }
    })
    return isValidForm;

  }

  handleSubmit = e => {
    e.preventDefault()
    let valid = this.validateForm()
    if (!valid) return;
    this.setState({
      isSubmitting: true
    })
    // API call
    httpClient.POST('/auth/login', this.state.data)
      .then(response => {
        toast(`Welcome ${response.data.user.username}`)
        // Storing in localStorage
        localStorage.setItem('token', (response.data.token))
        console.log('response after logn is>>>', response.data)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('remember_me', JSON.stringify(this.state.remember_me))
        this.props.navigate('/dashboard')
      })
      .catch(err => {
        this.setState({
          isSubmitting: false
        })
        errorHandler(err)
      })
  }
  render() {
    return (
      <div className='container login' style={{ alignItems: "center", textAlign: "center", width: '500px' }}>
        <h2>Login</h2>
        <p>Fill all the required necessary fields*</p>
        <form className='form-group' onSubmit={this.handleSubmit} >
          <label htmlFor='username' >User Name</label>
          <input type="text" className='form-control' name="username" id='username' placeholder='User Name' onChange={this.handleChange} />
          <label htmlFor='password' >Password</label>
          <input type="password" className='form-control' name="password" id='password' placeholder='Password' onChange={this.handleChange} />
          <input type="checkbox" name='remember_me' onChange={this.handleChange} />
          <label >Remember_Me</label>
          <hr />
          <SubmitButton
            enabledLabel='Login'
            disabledLabel='Logining...'
            // isDisabled={!this.state.isSubmitting}
            isSubmitting={this.state.isSubmitting}
          ></SubmitButton>
        </form>
        <p>Do Not Have An Account!<a href='/register'>&nbsp;Here</a></p>
      </div>
    )
  }
}


export const Login = () => {
  let navigate = useNavigate()

  useEffect(() => {
    let remember = JSON.parse(localStorage.getItem('remember_me'))
    console.log('rememmber', localStorage.getItem('remember_me'))

    if (remember) {
      navigate('/dashboard')
    }
  }, [])

  return (
    <LoginComponent navigate={navigate} ></LoginComponent>
  )
}