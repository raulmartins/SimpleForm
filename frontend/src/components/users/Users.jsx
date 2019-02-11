import './Users.css'
import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const headerProps = {
 icon: 'users',
 title: 'Usuários',
 subtitle: 'Tela de cadastro de usuário'
}

const baseURL = 'http://localhost:3001/users'
const initialState = {
 user: { name: '', email: '' },
 list: []
}
export default class User extends Component {

 state = { ...initialState }

 componentWillMount = () => {
  axios(baseURL).then(res => {
   this.setState({ list: res.data })
  })
 }

 clearForm = () => this.setState({ user: initialState.user })

 save = () => {
  const user = this.state.user
  const method = user.id ? 'put' : 'post'
  const url = user.id ? `${baseURL}/${user.id}` : baseURL

  axios[method](url, user)
   .then(res => {
    const list = this.getUpdatedList(res.data)
    this.setState({ user: initialState.user, list })
   })
 }

 getUpdatedList = (user) => {
  const list = this.state.list.filter(currentUser => currentUser.id !== user.id)
  list.unshift(user)
  return list;
 }

 updateField = (event) => {
  const user = { ...this.state.user }
  user[event.target.name] = event.target.value;
  this.setState({ user })
 }

 loadUser = (user) => {
  this.setState({ user })
 }
 delete = (user) => {
   console.log(user.id)
  axios.delete(`${baseURL}/${user.id}`).then(res => {
   const list = this.state.list.filter(u => u !== user)
   this.setState({ list })
  })
 }

 renderForm = () => {
  return (
   <form>
    <div className="form-group">
     <label htmlFor="name">Name</label>
     <input
      type="text"
      className="form-control"
      id="name"
      name="name"
      value={this.state.user.name}
      placeholder="Name"
      onChange={this.updateField}
     />
    </div>
    <div className="form-group">
     <label htmlFor="email">Email</label>
     <input type="email"
      className="form-control"
      id="email"
      name="email"
      value={this.state.user.email}
      aria-describedby="emailHelp"
      placeholder="Email"
      onChange={this.updateField} />
    </div>
    <button type="submit" onClick={this.save} className="btn btn-warning">Submit</button>
    <button type="cancel" onClick={this.clearForm} className="btn btn-danger ml-2">Cancel</button>
   </form>
  )
 }

 tableForm = () => {
  return (
   <table className="table table-dark mt-3">
    <thead>
     <tr>
      <th scope="col">ID</th>
      <th scope="col">NAME</th>
      <th scope="col">EMAIL</th>
      <th scope="col">AÇÃO</th>
     </tr>
    </thead>
    <tbody>
     {this.renderRows()}
    </tbody>
   </table>
  )
 }

 renderRows = () => {
  return this.state.list.map(user => {
   return (
    <tr key={user.id}>
     <th scope="row">{user.id}</th>
     <td>{user.name}</td>
     <td>{user.email}</td>
     <td>
      <button className="btn btn-outline-warning" onClick={() => this.delete(user)}><i className="fa fa-trash"></i></button>
      <button className="btn btn-outline-danger ml-2" onClick={() => this.loadUser(user)}><i className="red fa fa-edit"></i></button>
     </td>
    </tr>
   )
  })
 }

 render() {
  console.log(this.state.list)
  return (
   <Main {...headerProps}>
    {this.renderForm()}
    {this.tableForm()}
   </Main>
  )
 }
}