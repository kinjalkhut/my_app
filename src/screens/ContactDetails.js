import React, {useEffect, useState} from 'react'
import { StyleSheet, View, FlatList,Text, TouchableOpacity, Image } from 'react-native'
// import { Text, FAB, List } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import Realm from 'realm';
import Header from '../components/Header'

function ContactDetails({ navigation }) {
  const contacts = useSelector(state => state)
  const dispatch = useDispatch();
 
  const [ContactDetails, setContactDetails] = useState({})

  useEffect(()=>{
     console.warn("14", navigation.getParam('contacts'))
      setContactDetails(navigation.getParam('contacts'))
  },[])

  console.warn("15", ContactDetails)
  return (
    <View style={styles.container}>
        <Header titleText={'Contact Details'}/>
        {ContactDetails ? 
        <View  style={styles.photoSubContainer}>
            <Image source={{ uri: ContactDetails.ImageUrl}} style={styles.image} />
         </View> : null}
         {
ContactDetails ?
         
         <View>
            <Text style={styles.textStyle}>NAME : {ContactDetails.Name}</Text>
            <Text style={styles.textStyle}>EMAIL : {ContactDetails.Email}</Text>
            {/* <Text style={styles.textStyle}>DOB : {ContactDetails.DOB}</Text> */}
            <Text style={styles.textStyle}>PHONE NUMBER : {ContactDetails.PhoneNo}</Text>

         </View> :
        null
         }

         <TouchableOpacity onPress={()=> navigation.navigate('AddContacts', {updateContact : ContactDetails})} style={styles.updateButton}>
           <Text style={styles.updateText}>Update</Text>
         </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center'
    // paddingHorizontal: 10,
    // paddingVertical: 20
  },
  photoSubContainer:{
    height:150,width:150,
    borderRadius:75,
    borderWidth:1,
    borderColor:'gray',
    alignItems:'center',
    justifyContent:'center',
    marginVertical:25
  },
   image:{
    height:150,
    width:150,
    borderRadius :75,
    marginHorizontal:25
  },
  textStyle:{
      fontSize : 20,
      marginVertical:30
  },
  updateButton:{
    position:'absolute',
    top: 15,
    right: 10,
    // bottom:0
    alignItems:'flex-end',
    width : '100%'
  },
  updateText:{
    color : 'white'

  }
})

export default ContactDetails
