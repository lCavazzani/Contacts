import React, { Component, PropTypes } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsApi from './utils/ContactsAPI';
import { Route } from 'react-router-dom';


class App extends Component {
    state ={
        contacts: []
    }

    componentDidMount(){
        ContactsApi.getAll().then((contacts) => {
            this.setState({contacts: contacts})
        })
    }        
    
    
removeContact = (contact) => {
    this.setState((prevState) => ({
        contacts: prevState.contacts.filter( c => c.id !== contact.id)
    }))
    ContactsApi.remove(contact)
}
navigate = () => {
    this.setState(()=>({
    list: 'create'
    }))
}
                
  render() {
    return (
      <div>
      <Route exact path='/'  render={()=>(
                   <ListContacts contacts={this.state.contacts} remove={this.removeContact} filterContact={this.filterContact} />)}></Route>
                   <Route path='/create' component={CreateContact}></Route>
      </div>
    )
  }
}

export default App;
