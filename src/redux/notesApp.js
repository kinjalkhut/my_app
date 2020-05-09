// import remove from 'lodash.remove'
import { SERVER_URL } from "../constants/constants";
import { Contact } from "../schema/schemas";
import { useSelector, useDispatch } from 'react-redux'
// const dispatch = useDispatch()
// Action Types
export const CONFIG = 'CONFIG'
export const ADD_CONTACT = 'ADD_CONTACT'
export const CONTACT_LIST = 'CONTACT_LIST'

const databasOptions={
  path:'contact.realm',
  schema:[Contact],
  schemaVersion:0
}
// Action Creators

export function addcontact(contact) {
  return {
    type: ADD_CONTACT,
    contact
  }
}

export function contactlist(contactList) {
  return {
    type: CONTACT_LIST,
    contactList
  }
}

export function setConfig(config) {
  return {
    type: CONFIG,
    config
  }
}

  export const insertContact = contact => {
    return dispatch =>{
      // try{
      Realm.open(databasOptions).then(realm=>{
        realm.write(() => {
             const contactList =  realm.create("Contact", contact);
            console.warn("1234",contactList)
            dispatch( addcontact(contactList))
      
            })
      })
    // }catch(error){
      
    // }
    }
 
}



export const config = () => new Promise((resolve, reject)=>{
  Realm.open(databasOptions).then(realm=>{
   useDispatch(setConfig(realm))
  })
})

// reducer

const initialState = []
function notesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTACT:
      return [
        ...state,
         action.contact
        
      ]

    case CONTACT_LIST:
           return action.contactList

    case CONFIG:
            return [
              ...state.realm,
              action.config
            ]
              
            
    default:
      return state
  }
}

export default notesReducer
