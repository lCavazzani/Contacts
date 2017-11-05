import React, { Component, PropTypes } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsApi from './utils/ContactsAPI';


class App extends Component {
    state ={
        list: 'list', //list, create
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
                
  render() {
    return (
      <div>
       {this.state.list === 'list' && (
                    <ListContacts contacts={this.state.contacts} remove={this.removeContact} filterContact={this.filterContact}/>
            )}
      {this.state.list === 'create' && (
                    <CreateContact />
            )}
      </div>
    )
  }
}

export default App;
