import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity,Image, ScrollView,Dimensions } from 'react-native'
// import { IconButton, TextInput, FAB } from 'react-native-paper'
import Header from '../components/Header'
import { useSelector, useDispatch } from 'react-redux'
import { addcontact, insertContact } from '../redux/notesApp'

import DatePicker from 'react-native-datepicker'
import Realm from "realm";
import AsyncStorage from "@react-native-community/async-storage";
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import { contactlist } from '../redux/notesApp'
import { SERVER_URL } from "../constants/constants";
import { Contact } from "../schema/schemas";
import { databasOptions } from "../utils/utils";

const width = Dimensions.get('window').width

function AddContact({ navigation }) {
  const [Name, setName] = useState('')
  const [PhoneNo, setPhoneNo] = useState(0)
  const [DOB, setDOB] = useState(0)
  const [Email, setEmail] = useState('')
  const [ImageUrl, setImage] = useState('')

  const [config, setConfig] = useState({})
  const realm = useSelector(state => state)
  const dispatch = useDispatch()
  const getcontactlist = contact => dispatch(contactlist(contact))
  // const addContact = contact => dispatch(addcontact(contact))


useEffect(()=>{
 
  console.warn("realm",realm)
},[realm])

useEffect(()=>{
console.warn("update", navigation.getParam('updateContact'))
if(navigation.getParam('updateContact')){
  const updateContact = navigation.getParam('updateContact')
  setName(updateContact.Name)
  setPhoneNo(updateContact.PhoneNo.toString())
  setEmail(updateContact.Email)
  setImage(updateContact.ImageUrl)
  setDOB(updateContact.DOB)
}
},[])



function getData() {
  return dispatch =>{
    
    Realm.open(databasOptions).then(realm=>{
      realm.write(() => {
           const contactList =  realm.objects("Contact");
          console.warn("017",contactList)
          dispatch(getcontactlist(contactList))
        })
    })
  }
}

function addData(contact) {
  // return dispatch =>{
    // try{
    Realm.open(databasOptions).then(realm=>{
      realm.write(() => {
           const contactList =  realm.create("Contact", contact);
          console.warn("1234",contactList)
          dispatch( getData())
        navigation.navigate('ViewNotes')
          })
    })
  // }
}

function updateData(contact) {

    Realm.open(databasOptions).then(realm=>{
      realm.write(() => {
           let updatecontact =  realm.objectForPrimaryKey("Contact", contact.Id);
           updatecontact.Name = contact.Name
           updatecontact.Email = contact.Email
           updatecontact.PhoneNo = contact.PhoneNo
           updatecontact.DOB = contact.DOB
           updatecontact.ImageUrl = contact.ImageUrl


          console.warn("016",updatecontact)
          dispatch(getData())
          navigation.navigate('ViewNotes')

          // dispatch( addcontact(contactList))
        // navigation.navigate('ViewNotes')
          })
    })
 
}


  function onAddContact() {
    const data ={
      Id:Math.floor(Math.random() * 100) + 1,
       Name: Name,
       PhoneNo:parseInt( PhoneNo),
       DOB: DOB,
       Email: Email,
       ImageUrl :ImageUrl
    }
   
  addData(data)
 }

  function onUpdateContact(){
    const data ={
      Id:navigation.getParam('updateContact').Id,
       Name: Name,
       PhoneNo:parseInt( PhoneNo),
       DOB: DOB,
       Email: Email,
       ImageUrl :ImageUrl
    }
    updateData(data)
  }

function  onPressActionItem (i) {
    switch (i) {
      case 1:
        ImagePicker.openCamera({
          compressImageQuality: 0.4,
          mediaType: 'photo',
        }).then((image) => {
          console.warn("image",image)
          setImage(image.path)
        }).catch(error => console.log("error", error));
        break;
      case 0:
        ImagePicker.openPicker({
          compressImageQuality: 0.4,
          mediaType: 'photo',
        }).then((image) => {
          console.warn("image",image)
            setImage(image.path)
        });
        break;
      default:
        break;
    }
  }
var actionSheet={};
 function showActionSheet() {
    actionSheet.show();
  }
  // console.warn("image11", ImageUrl)
  return (
    <View style={{flex:1,  alignItems:'center'}}>
      <Header titleText={'Add Contact'}/>
    <ScrollView contentContainerStyle={styles.formContainer}>
    {/* <View style={styles.photoSubContainer}> */}
                <TouchableOpacity onPress={showActionSheet} style={styles.photoSubContainer}>
                  {
                    ImageUrl ? 
                    <Image source={{ uri: ImageUrl}} style={styles.image} />
                    : 
                    <Text>Add Profile Picture</Text>
                  }
                 
                </TouchableOpacity>
               <ActionSheet
                  ref={o => actionSheet = o}
                  title={"Choose_Source:"}
                  options={['Gallery', 'Camera', 'Cancel']}
                  cancelButtonIndex={2}
                  destructiveButtonIndex={2}
                  onPress={(index) => {
                   onPressActionItem(index)
                  }}
                />
              {/* </View> */}
    <TextInput
      style={styles.textInput}
      placeholder ={'Enter your Name'}
      onChangeText={text => setName(text)}
      value={Name}
    />
     <TextInput
      style={styles.textInput}
      placeholder ={'Enter your Phone No'}
      onChangeText={text => setPhoneNo(text)}
      value={PhoneNo}
    />
    <TextInput
      style={styles.textInput}
      placeholder ={'Enter your Email Address'}
      onChangeText={text => setEmail(text)}
      value={Email}
    />
     <DatePicker
        style={styles.textInput}
        date={DOB}
        mode="date"
        placeholder="Enter Your Birth Date"
        format="YYYY-MM-DD"
         onDateChange={(date) => setDOB(date)}
      />
    
  </ScrollView>
  <TouchableOpacity style={styles.button} onPress={navigation.getParam('updateContact') ? onUpdateContact : onAddContact}>
        <Text>{navigation.getParam('updateContact') ? 'UPDATE' : 'ADD'}</Text>
      </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:'5%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  formContainer:{
    // width:'100%',
    width: width,
    alignItems:'center'
  },
  textInput:{
    height: 40,width:'90%', borderColor: 'gray',  borderBottomWidth :1,
    marginVertical:25
    // marginLeft:'10%'
  },
  button:{
    width:'90%',
    height : 40,
    alignItems :'center',
    justifyContent:'center',
    backgroundColor : 'gray',
    borderRadius:20,
    position:'absolute',
    bottom:10
  },
  buttonText:{
    color : 'black'
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
    height:150,width:150,
    borderRadius:75,
  }
})

export default AddContact
