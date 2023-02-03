import React, { Component, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom'

import { Register } from './components/auth/register/Register'
import { Login } from './components/auth/login/Login'
import Sidebar from './components/common/Sidebar'
import { ItemForm } from './components/items/ItemForm'
import { AddItem } from './components/items/AddItem'
// import ViewItem from './components/items/ViewItem'
import { httpClient } from './utils/httpClient'
import { errorHandler } from './service/error.service'
import { ViewProduct } from './components/items/ViewProduct'
import { EditItem } from './components/items/EditItem'

const DashBoard = () => {
  const [data, setData] = useState({})
  // const data = JSON.parse(localStorage.getItem("user"))
  console.log(data)
useEffect(() => {
// const {user} = httpClient.GET('/auth',true)
httpClient.GET('/auth',true)
.then(response => {
  console.log('user in dash board',response.data)
  
})
.catch(err  => {
  errorHandler(err)
})
// setData(user)
})
  return (
    <div>
      <h1>DashBoard</h1>
    </div>
  )
}

const NotFound = () => {
  return (
    <div style={{position: 'fixed', display: 'flex', flexDirection: 'column', top: '40%', left :'40%'}}>
      <h1>Not Found!</h1>
      <p>Go To Home ---> &nbsp;
        <Link to='/dashboard'>Dashboard</Link>
      </p>
    </div>
  )
}

const PublicRoute = ({ Component, ...rest }) => {
 

  return (
    <div>
      <Component />
    </div>
  )
}

const ProtectedRoute = ({ Component, ...rest }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '10%', width: '100%' }}>
        <Component />
      </div>
    </div >
  )
}

const AppRouting = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicRoute Component={Login} />} />
        <Route path='/register' element={<PublicRoute Component={Register} />} />
        <Route path='/dashboard' element={<ProtectedRoute Component={DashBoard} />} />
        <Route path='/add_item' element={<ProtectedRoute Component={AddItem} />} />
        <Route path='/view_item' element={<ProtectedRoute Component={ViewProduct} />} />
        <Route path='/edit_item/:id' element={<ProtectedRoute Component={EditItem} />} />
        <Route path='*' element={<PublicRoute Component={NotFound} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouting