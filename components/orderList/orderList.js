import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Header, Image, TouchableHighlight, Alert, Modal, Dimensions, CheckBox, TextInput, Picker, DatePickerAndroid, Button, LayoutAnimation, NetInfo, AsyncStorage } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import ModalDropdown from 'react-native-modal-dropdown';
import logo from '../../assets/Qwikmile-logo.jpg'
import ListItem from '../ListItem/ListItem';
import SignatureCapture from 'react-native-signature-capture';
var SQLite = require('react-native-sqlite-storage')
var current = {};

class orderList extends Component {

  constructor(props) {
    super(props);
    current = this;
    this.setModalVisible = this.setModalVisible.bind(this);
    this.saveDeliveryStatus = this.saveDeliveryStatus.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.openSignaturePad = this.openSignaturePad.bind(this);
    this.saveSign = this.saveSign.bind(this);
    this._onSaveEvent = this._onSaveEvent.bind(this);
    this.width = Dimensions.get('window').width; //full width
    this.height = Dimensions.get('window').height;
  }

  db = SQLite.openDatabase({ name: 'qwikimile.db', createFromLocation: "~qwikimile.db" }, this.successCB, this.errorCB);
  paymentModes = {
    '-1': 'None',
    '0': 'Cash',
    '1': 'PayTM',
    '2': 'Card'
  };
  state = {
    removeDeliveredOrder: this.props.doneEvent,
    modalVisible: false,
    orders: this.props.orders,
    selectedOrder: {},
    checked: false,
    deliveryStatus: "Please select delivery status",
    rescheduledDate: "",
    paymentMode: -1,
    signatureVisible: false,
    base64Image: ""
  };

  setModalVisible(orderinfo) {
    this.setState({ modalVisible: true });
    this.setState({ selectedOrder: orderinfo })
  }

  openSignaturePad() {
    this.setState({ signatureVisible: true });
  }

  hideModal() {
    this.setState({ modalVisible: false });
    this.setState({ selectedOrder: {}, deliveryStatus: "Please select delivery status", rescheduledDate: "" })
  }

  updateStatus(status) {
    this.setState({ deliveryStatus: status });
    if (status == "Rescheduled") {
      this.openDatePicker();
    } else {
      this.setState({ rescheduledDate: "" })
    }
  }

  saveSign() {
    this.refs["sign"].saveImage();
  }

  resetSign() {
    this.refs["sign"].resetImage();
  }

  _onSaveEvent(result) {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name   
    //LayoutAnimation.easeInEaseOut(); 
    //Alert.alert(result.pathName)
  }
  _onDragEvent() {
    // This callback will be called when the user enters signature
    console.log("dragged");
  }
  componentWillUpdate() {
    //LayoutAnimation.easeInEaseOut();
  }

  closeSignature() {
    setTimeout(() => {
      this.setState({ signatureVisible: false }, (res) => {
        Alert.alert(res.toString())
      });
    }, 600)
  }

  resetSign() {
    this.refs["sign"].resetImage();
  }

  _onPressButton() {
    //Alert.alert('You tapped the button!')
  }

  _onLongPressButton() {
    //Alert.alert('You long-pressed the button!')
  }

  async openDatePicker() {
    try {
      let date = new Date();
      if (this.state.rescheduledDate) {
        date = new Date(this.state.rescheduledDate);
      }
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: date
      });
      if (action == DatePickerAndroid.dismissedAction) {
        this.setState({ rescheduledDate: "" });
        this.updateStatus("Please select delivery status");
      } else {
        this.setState({ rescheduledDate: year + "/" + (month + 1) + "/" + day })
      }
    } catch ({ code, message }) {
      Alert.alert(message)
      //console.warn('Cannot open date picker', message);
    }
  }

  componentWillReceiveProps(nextProp) {
    this.setState({
      orders: nextProp.orders
    });
  }

  errorCB(err) {
    //Alert.alert("SQL Error: " + err);
  }

  successCB() {
    //Alert.alert("SQL executed fine");
  }

  saveDeliveryStatus() {
    Alert.alert("Order Synced.");
    this.props.doneEvent(this.state.selectedOrder);
    this.hideModal();
    /*NetInfo.getConnectionInfo().then(async (connectionInfo) => {
      if (connectionInfo.type == 'none') {
        //Alert.alert('ETTHE!')
        let query = `insert into runsheet_details values ('1', ${this.state.selectedOrder.order_id}, ${this.state.paymentMode != -1 ? 'DELIVERED' : this.state.deliveryStatus},
        50, ${this.paymentModes[this.state.paymentMode]}, 300, 2);`
        this.db.transaction((tx) => {
          Alert.alert('ETTHE!')
          tx.executeSql(query, [], (tx, results) => {
            Alert.alert('Record saved succesfully.')
          })
        });
        try {
          let orders = await AsyncStorage.getItem('orders');
          if(!orders){
            await AsyncStorage.setItem('orders', JSON.stringify([]));
          }
          orders = await AsyncStorage.getItem('orders');
          orders = JSON.parse(orders)
          orders.push({
             payment_mode: this.paymentModes[this.state.paymentMode],
             deliveryStatus: this.state.paymentMode != -1 ? 'DELIVERED' : this.state.deliveryStatus,
             runsheet_id: 1,
             order_id: this.state.selectedOrder.order_id,
             weive_off: 60,
             collected_amt: 300
           })
           //Alert.alert('Alo ithe!')
           await AsyncStorage.setItem('orders', JSON.stringify(orders));
        } catch (error) {
          Alert.alert(error.message)
        }
      } else {
        //Alert.alert('valyues: ' + this.paymentModes[this.state.paymentMode] + ', ' + this.state.deliveryStatus)
        fetch('http://132.148.135.110:3000/delivery', {
           method: 'POST',
           headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify([{
             payment_mode: paymentModes[this.state.paymentMode],
             deliveryStatus: this.state.paymentMode != -1 ? 'DELIVERED' : this.state.deliveryStatus,
             runsheet_id: 1,
             order_id: this.state.selectedOrder.order_id,
             weive_off: 60,
             collected_amt: 300
           }]),
         }).then((response) => {
           response.json()
         }).then(responseJson => {
           Alert.alert(responseJson.toString())
           this.hideModal();
           //this.props.removeDeliveredOrder(this.state.selectedOrder)
         }).catch((error) => {
           Alert.alert(error.toString())
         });
      }
    })*/
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Image resizeMode="contain" source={logo} style={styles.logo} />
          <Text style={styles.header}>Pending Orders</Text>
        </View>
        <FlatList
          data={this.state.orders}
          renderItem={(orderinfo) => (
            <TouchableHighlight onPress={() => this.setModalVisible(orderinfo.item)} underlayColor="white">
              <ListItem
                customer={orderinfo.item.customer_name}
                key={orderinfo.item.key}
                c_id={orderinfo.item.order_id}
                status={orderinfo.item.status}
                city={orderinfo.item.city}
                amount={orderinfo.item.amount} />
            </TouchableHighlight>
          )}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.hideModal();
          }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableHighlight
              onPress={() => {
                this.hideModal();
              }}
              style={{ width: '100%' }}
            >
              <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'right', marginRight: '2%' }}>X</Text>
            </TouchableHighlight>
          </View>
          <View style={{ marginTop: 15 }}>
            <View>
              <View >

                <View style={styles.OrderInfoParent}>
                  <Text style={styles.OrderInfoItem}>
                    Naaptol
                  </Text>
                  <Text style={styles.OrderInfoItem}>
                    Order Id - {this.state.selectedOrder.order_id}
                  </Text>
                </View>

                <RadioForm style={{ marginLeft: '10%' }}
                  radio_props={[
                    { label: 'None', value: -1 },
                    { label: 'Cash', value: 0 },
                    { label: 'PayTM', value: 1 },
                    { label: 'Card', value: 2 }
                  ]}
                  initial={-1}
                  formHorizontal={true}
                  labelHorizontal={true}
                  buttonColor={'#fd4900'}
                  labelColor={'#0a14ce'}
                  buttonSize={20}
                  labelStyle={{ marginLeft: 0, paddingLeft: 2.5, paddingRight: 5 }}
                  onPress={(value) => { this.setState({ paymentMode: value }) }}
                />
                {this.state.paymentMode != -1 ?
                  <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center', justifyContent: 'center' }}>
                    <CheckBox
                      value={this.state.checked}
                      onValueChange={() => this.setState({ checked: !this.state.checked })}
                    />
                    <Text style={{ marginTop: 5 }}> Waive Off</Text>
                  </View>
                  : null}

                <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', justifyContent: 'center' }}>
                  {this.state.checked && this.state.paymentMode != -1 ? <Text style={{ fontSize: 17, marginTop: 10 }}>
                    Amount
                </Text> : null
                  }
                  {this.state.checked && this.state.paymentMode != -1 ? <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 0, borderRadius: 5, width: '50%' }}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                  /> : null
                  }
                </View>
                {this.state.paymentMode == -1 ?
                <View style ={{flexDirection: 'column'}} >
                <Text style = {{width: '20%', marginRight: 10 }}> Amount: </Text>
                  <Picker style={{ width: '80%', marginRight: 5 }} selectedValue={this.state.deliveryStatus} onValueChange={this.updateStatus}>
                    <Picker.Item label="Please select a status" value="Please select delivery status" />
                    <Picker.Item label="Rescheduled" value="Rescheduled" />
                    <Picker.Item label="Refused at door" value="Refused at door" />
                    <Picker.Item label="Customer non-contactable" value="Customer non-contactable" />
                  </Picker>
                  </View>
                  : null}
                {this.state.rescheduledDate ? <TouchableHighlight onPress={() => this.openDatePicker()} underlayColor="white">
                  <Text style={{ textAlign: 'center', fontSize: 22, textDecorationLine: 'underline' }}>Rescheduled To: {this.state.rescheduledDate}</Text>
                </TouchableHighlight> : null}
              </View>

            </View>
            <View style={{ width: "50%", marginLeft: "25%", marginTop: 15 }}>
              <Button title="Signature" onPress={this.openSignaturePad} />
            </View>
            <View style={{ width: "50%", marginLeft: "25%", marginTop: 20 }}>
              <Button title="Save" onPress={this.saveDeliveryStatus} />
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.signatureVisible}
            onRequestClose={() => {
              this.closeSignature();
            }}
          >
            <SignatureCapture
              style={[{ flex: 1 }, styles.signature]}
              ref="sign"
              onSaveEvent={this._onSaveEvent}
              saveImageFileInExtStorage={false}
              showNativeButtons={false}
              showTitleLabel={false}
              viewMode={"portrait"} />
            <View style={{ flex: 1, flexDirection: "row" }}>
              <TouchableHighlight style={styles.buttonStyle}
                onPress={() => { this.saveSign() }} >
                <Text>Save</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.buttonStyle}
                onPress={() => { this.resetSign() }} >
                <Text>Reset</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.buttonStyle}
                onPress={() => { this.closeSignature() }} >
                <Text>Close</Text>
              </TouchableHighlight>
            </View>

          </Modal>
        </Modal>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fd4900',
    //width : "100%"
  },
  container: {
    justifyContent: 'center',
    alignItems: "center"
  },
  logo: {
    height: 50
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  parentContainer: {
    padding: 10,
    flex: 1
  },
  OrderInfoItem: {
    fontSize: 22,
    color: '#0a14ce',
    textAlign: 'center'
  },
  OrderInfoParent: {
    marginBottom: 20,
    borderColor: "#fd4900",
    borderRadius: 5,
    borderWidth: 1,
    width: '80%',
    marginLeft: '10%'
  },
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
  },
  buttonStyle: {
    flex: 1, justifyContent: "center", alignItems: "center", height: 50,
    backgroundColor: "#eeeeee",
    margin: 10
  }
});

export default orderList;
