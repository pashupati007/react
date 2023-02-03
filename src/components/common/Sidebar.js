import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const SidebarContainer = styled.div`
// position: absolute;
position: fixed;
width: 10%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background-color: teal;
color: white;
`

const Sidebar = () => {
    return (
        <SidebarContainer>
        <Link to='/view_item' style={{textDecoration: 'none',color: 'white', fontWeight: '400', fontSize: '19px'}}>View Item</Link>
        <Link to='/add_item' style={{textDecoration: 'none',color: 'white', fontWeight: '400', fontSize: '19px'}}>Add Item</Link>
        <Link to='/edit_item' style={{textDecoration: 'none',color: 'white', fontWeight: '400', fontSize: '19px'}}>Edit Item</Link>
        </SidebarContainer>
    )
}

export default Sidebar