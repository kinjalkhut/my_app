import React, {useEffect, useState} from 'react'
import { StyleSheet, View, FlatList,Text, TouchableOpacity, Image } from 'react-native'
// import { Text, FAB, List } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { addnote, deletenote, contactlist } from '../redux/notesApp'
import AsyncStorage from "@react-native-community/async-storage";
import { SERVER_URL } from "../constants/constants";
import Realm from 'realm';
import Header from '../components/Header'
import { Contact } from "../schema/schemas";
import { databasOptions } from "../utils/utils";




// const databasOptions={
//   path:'contact.realm',
//   schema:[Contact],
//   schemaVersion:0
// }



function ViewNotes({ navigation }) {
  const contactList = useSelector(state => state)
  const dispatch = useDispatch();

  const getcontactlist = contact => dispatch(contactlist(contact))

  // const addNote = note => dispatch(addnote(note))
  // const deleteNote = id => dispatch(deletenote(id))
  const [Data, setData] = useState([])


  function getData() {
    return dispatch =>{
      
      Realm.open(databasOptions).then(realm=>{
        realm.write(() => {
             const contactList =  realm.objects("Contact");
            console.warn("12345",contactList)
            dispatch(getcontactlist(contactList))
          })
      })
    }
  }
 

useEffect(()=>{
  // const unsubscribe = navigation.addListener('focus', () => {
    console.warn("focus")
  dispatch( getData())
  // });

  // return unsubscribe;
},[])

  useEffect(()=>{
      console.warn("11111",contactList )
      // dispatch( getData())
      setData(contactList)
      
  },[contactList])

  function  renderItem({item, index}){

    return(
    <TouchableOpacity onPress={()=> navigation.navigate('ContactDetails', {contacts : item})} style={{paddingVertical: 5, flexDirection:'row', alignItems:'center'}}>
      <View>
      <Image source={{ uri: item.ImageUrl}} style={styles.image} />
      </View>
      <Text style={styles.listTitle}>
        {item.Name}
      </Text>
     </TouchableOpacity>
)}

  return (
  <View style={styles.container}>
       <Header titleText={'Contact List'}/>
     <FlatList
        extraData={Data}
        data={Data}
        renderItem={renderItem}
        ItemSeparatorComponent={ () => (
          <View
            style={{
              backgroundColor: 'gray',
              height: 0.5,
            }}
            keyExtractor={item => item.Id}
          />
        )}
      />
      <View style={styles.addContainer}>
      <TouchableOpacity style={styles.addContact} onPress={()=>navigation.navigate('AddContacts')}>
        <Text style={styles.title}>+</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 10,
    // paddingVertical: 20
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    fontSize: 20
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 10
  },
  listTitle: {
    fontSize: 15
  },
  image:{
    height:50,
    width:50,
    borderRadius :25,
    marginHorizontal:25
  },
  addContainer:{
    flex:1,
    width:'100%',
    alignItems:'flex-end',
    position:'absolute',
    bottom:10,
    right:10
  },
  addContact:{
    height: 40,
    width:40,
    borderRadius:20,
    backgroundColor:'gray',
    alignItems:'center',
    justifyContent:'center',
    
  }
})

export default ViewNotes
