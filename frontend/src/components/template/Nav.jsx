import './Nav.css'
import React from 'react'
import NavItem from './NavItem'
export default props =>
<aside className="menu-area">
  <NavItem icon="home" description="Início" />
  <NavItem icon="users" description="Usuarios" />
</aside>

