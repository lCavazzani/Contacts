import React, {Component} from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import { Link } from 'react-router-dom';
import sortBy from 'sort-by'

class ListContact extends Component{
    
    state ={
        query: ''
    }
    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        })        
    }
    clearQuery = () => {
        this.setState({
            query: ""
        })
    }
    render(){
        
        let showingContacts; //novo array para utilizar a query
        if (this.state.query){ //se tiver algo no input
            const match = new RegExp(escapeRegExp(this.state.query), 'i') // cria a variavel match, 'i' tira o case sensitive
            showingContacts = this.props.contacts.filter(contact => match.test(contact.name)) // faz um filtro no array usando a funcao test em match, que faz todo trabaho
        }else{
            showingContacts = this.props.contacts
        }
        
        return(
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input className='search-contacts' 
                       type= 'text' 
                       placeholder='Search...' 
                       value={this.state.query} 
                       onChange={(event)=> this.updateQuery(event.target.value)}>
                        
                    </input>  
                    <Link className='add-contact'
                       to='/create'>
                        Add contact
                    </Link>  
                </div>
                {showingContacts.length !== this.props.contacts.length && (
                <div className="showing-contacts">
                <span>Showing {showingContacts.length} of {this.props.contacts.length} contacts</span>
                <button onClick={this.clearQuery}>Show All</button>
                </div>
                )}
                 <ol className='contact-list'>
                {showingContacts.map(contact=>
                                     <li key={contact.id} className='contact-list-item'>
                                             <div className='contact-avatar' style={{
                                                     backgroundImage: `url(${contact.avatarURL})`
                                                    }}/>
                                             <div className='contact-details'>
                                                 <p>{contact.name}</p>
                                                 <p>{contact.email}</p>
                                             </div>
                                             <div>
                                                 <button className='contact-remove' onClick={()=> this.props.remove(contact)}>
                                                     botao
                                                 </button>
                                             </div>
                                         </li>
                                        )}
                </ol>
            </div>
           
        )
    }
}

    ListContact.PropTypes ={
        contacts: PropTypes.array.isRequired,
        remove: PropTypes.func.isRequired,
    }
export default ListContact
