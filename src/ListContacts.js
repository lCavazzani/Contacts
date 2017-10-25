import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ListContact extends Component{
    
    state ={
        query: ''
    }
    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        })
        
    }
    render(){
        return(
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input className='search-contacts' 
                       type= 'text' 
                       placeholder='Search...' 
                       value={this.state.query} 
                       onChange={(event)=> this.updateQuery(event.target.value)}>
                        
                    </input>    
                </div>
                 <ol className='contact-list'>
                {this.props.contacts.map(contact=>
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
