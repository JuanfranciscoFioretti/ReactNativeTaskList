// import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, Modal, TouchableOpacity, Image } from 'react-native';
import Checkbox from 'expo-checkbox';
// import CheckBox from '@react-native-community/checkbox'
// import CheckBox from 'react-native-check-box'
// import { CheckBox } from '@rneui/themed';


export default function App() {
  const [ item, setItem ] = useState('');
  const [ items, setItems ] = useState([]);
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const [ selectedItem, setSelectedItem ] = useState(null);
  const [isChecked, setChecked] = useState(false);
  // const [isSelected, setSelection] = useState(false);  DEL CHECKBOX

  const handlerOnChange = (text) => {
    setItem(text)
  }

  const addOnPress = () => {
    setItems([
      ...items,
      {
        id: Math.random().toString(),
        value: item,
      }
    ])
    setItem('');
  }

  const deleteAllOnPress = () => {
    setItems([]);
  }

  const handlerModal = () => {
    setIsModalVisible(!isModalVisible)
    setSelectedItem(item);
  }

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handlerModal(item)}>
      <Text style={styles.itemList}>
        {item.value}
      </Text>
    </TouchableOpacity>
  )

  const keyExtractor = (item) => item.id;

  const handlerCancelModal = () => {
    setIsModalVisible(!isModalVisible);
    setSelectedItem(null);
  }

  const handlerDeleteItem = () => {
    setItems((prevItemsList) => prevItemsList.filter((item) => item.id !== selectedItem.id));
    console.warn('Porque carajo no funciona?');
    setIsModalVisible(!isModalVisible);
    // setItems((prevTaskList) => prevTaskList.filter((item) => item.id !== selectedItem.id));
    // setIsModalVisible(!isModalVisible);
  }

  // const onChangeCheckBox = () => {
  //   setItem('');
  // }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder='Add a new item'
          autoComplete='off'
          autoCorrect={false}
          autoCapitalize='none'
          value={item}
          onChangeText={handlerOnChange}
          />
        <View style={styles.buttonContainer}>
          <Button 
            title='Add' 
            color='#AEC474' 
            onPress={addOnPress}
            disabled={!item}
            style={styles.inputButtons}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title='Delete'
            color= '#BF6969'
            onPress={deleteAllOnPress}
            disabled={!items}
            style={styles.inputButtons}
          />
        </View>
      </View>
      
      {
        //items == 0
        items == 0 ? 
          <View style={styles.bigConditionalContainer}>
            <View style={styles.viewConditionalText}>
              <Text style={styles.conditionalText}> You have 0 products in the list</Text> 
            </View>
            <View style={styles.viewConditionalImg}>
              <Image
                style={styles.imgEmptyCart}
                source={
                  require ('./assets/emptyCart.svg')}
              />
            </View>
          </View>
          : 
          <View style={styles.viewFlatListContainer}>
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              style={styles.listContainer}
            />
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              // onChange={onChangeCheckBox}
              color= 'green' 
            />
          </View>
      }

      <Modal 
        visible={isModalVisible} 
        animationType='slide'
        // handlerCancelModal={handlerCancelModal}
        // handlerDeleteItem={handlerDeleteItem}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>This is the modal text</Text>
          <View style={styles.modalDetailContainer}>
            <Text style={styles.modalDetailText}>Are you sure yo want to delete this item?</Text>
            <Text style={styles.selectedItem}>{selectedItem?.value}</Text>
          </View>

          <View style={styles.modalButtonContainer}>
            <Button
              title='Cancel'
              color='#AEC474'
              onPress={handlerCancelModal}
            />
            <Button
              title='Delete'
              color='#BF6969'
              onPress={handlerDeleteItem}
            />
          </View>

        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    marginHorizontal: 20,
  },
  input: {
    width: '69%',
    borderBottomColor: '#92A662',
    borderBottomWidth: 1,
    height: 40,
    color: '#212121',
  },
  buttonContainer: {
    flexDirection: 'column',
    marginLeft: 3
  },
  inputButtons: {
    marginLeft: 2,
  },
  listContainer: {
    marginHorizontal: 20,
    marginTop: 40
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#A7B389',
    marginBottom: 6,
    borderRadius: 8
  },
  itemList: {
    fontSize: 14,
    color: '#F2F2F2',
    fontWeight: 'bold'
  },
  // bigConditionalContainer: {
    
  // },
  viewConditionalText: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center'
  },
  conditionalText: {
    color: '#BF6969',
    marginTop: 50,
    fontSize: 20,
  },
  viewConditionalImg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  imgEmptyCart: {
    width: 365,
    height: 340,
  },
  viewFlatListContainer: {
    flexDirection: 'row',
  },
  checkbox: {
    marginTop: 57,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    paddingVertical: 20
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  modalDetailContainer: {
    paddingVertical: 20,
  },
  modalDetailText: {
    fontSize: 14,
    color: '#AD5F5F'
  },
  selectedItem: {
    fontSize: 14,
    color: '#212121',
    fontWeight: 'bold',
    paddingVertical: 10,
    textAlign: 'center',
    marginBottom: 20
  },
  modalButtonContainer: {
    width: '65%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 15
  }
  
});

