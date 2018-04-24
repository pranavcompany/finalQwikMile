import React from 'react';
import { StyleSheet, Text, View, Alert, NetInfo, AsyncStorage } from 'react-native';
console.disableYellowBox = true;
import OrderList from './components/orderList/orderList'
//const IMEI = require('react-native-imei');
var SQLite = require('react-native-sqlite-storage');
var dummyData = [
    {
        "runsheet_details_id": 12,
        "runsheet_id": 4,
        "order_id": "45592666",
        "order_status": "PENDING",
        "weive_off": "",
        "payment_mode": "Cash",
        "collected_amt": "",
        "branch": "2",
        "created_by": "1",
        "employee_id": 2,
        "order_date": "2018-03-05",
        "runsheet_status": "OPEN",
        "start_km": "455",
        "end_km": "",
        "start_time": "10:24:13",
        "end_time": "00:00:00",
        "emp_password": "jin",
        "employee_type": "3",
        "emp_fname": "jinaa",
        "emp_mname": "jina",
        "emp_lname": "shing",
        "emp_mobileno": "1111111111",
        "emp_email": "jin@test.in",
        "emp_add": "pashan,pune",
        "emp_city": "pune",
        "emp_dob": "1999-03-21",
        "emp_doc": "1,3",
        "emp_resume": "20180321_052840_exportfile (68).xls",
        "emp_branch": "1",
        "emp_doj": "2018-03-01",
        "emp_parmanent_add": "pune",
        "emp_imei_no": "11122",
        "emp_status": "Active",
        "emp_enddate": "0000-00-00",
        "orderunique_id": 1,
        "sr_no": 1,
        "fkskuid": 9668,
        "product_desc": "",
        "product_color": "",
        "product_size": "",
        "pending_in_q_hrs": "10",
        "pincode": "411007",
        "city": "PUNE",
        "amount": "1499",
        "uploaded_by": "6",
        "main_order_status": ""
    },
    {
        "runsheet_details_id": 13,
        "runsheet_id": 4,
        "order_id": "45594078",
        "order_status": "PENDING",
        "weive_off": "",
        "payment_mode": "Cash",
        "collected_amt": "",
        "branch": "2",
        "created_by": "1",
        "employee_id": 2,
        "order_date": "2018-03-05",
        "runsheet_status": "OPEN",
        "start_km": "455",
        "end_km": "",
        "start_time": "10:24:13",
        "end_time": "00:00:00",
        "emp_password": "jin",
        "employee_type": "3",
        "emp_fname": "jinaa",
        "emp_mname": "jina",
        "emp_lname": "shing",
        "emp_mobileno": "1111111111",
        "emp_email": "jin@test.in",
        "emp_add": "pashan,pune",
        "emp_city": "pune",
        "emp_dob": "1999-03-21",
        "emp_doc": "1,3",
        "emp_resume": "20180321_052840_exportfile (68).xls",
        "emp_branch": "1",
        "emp_doj": "2018-03-01",
        "emp_parmanent_add": "pune",
        "emp_imei_no": "11122",
        "emp_status": "Active",
        "emp_enddate": "0000-00-00",
        "orderunique_id": 3,
        "sr_no": 3,
        "fkskuid": 12590,
        "product_desc": "",
        "product_color": "",
        "product_size": "",
        "pending_in_q_hrs": "3",
        "pincode": "411001",
        "city": "PUNE",
        "amount": "2699",
        "uploaded_by": "6",
        "main_order_status": ""
    },
    {
        "runsheet_details_id": 15,
        "runsheet_id": 4,
        "order_id": "45594131",
        "order_status": "PENDING",
        "weive_off": "",
        "payment_mode": "Cash",
        "collected_amt": "",
        "branch": "2",
        "created_by": "1",
        "employee_id": 2,
        "order_date": "2018-03-05",
        "runsheet_status": "OPEN",
        "start_km": "455",
        "end_km": "",
        "start_time": "10:24:13",
        "end_time": "00:00:00",
        "emp_password": "jin",
        "employee_type": "3",
        "emp_fname": "jinaa",
        "emp_mname": "jina",
        "emp_lname": "shing",
        "emp_mobileno": "1111111111",
        "emp_email": "jin@test.in",
        "emp_add": "pashan,pune",
        "emp_city": "pune",
        "emp_dob": "1999-03-21",
        "emp_doc": "1,3",
        "emp_resume": "20180321_052840_exportfile (68).xls",
        "emp_branch": "1",
        "emp_doj": "2018-03-01",
        "emp_parmanent_add": "pune",
        "emp_imei_no": "11122",
        "emp_status": "Active",
        "emp_enddate": "0000-00-00",
        "orderunique_id": 5,
        "sr_no": 5,
        "fkskuid": 12590,
        "product_desc": "",
        "product_color": "",
        "product_size": "",
        "pending_in_q_hrs": "1",
        "pincode": "411005",
        "city": "PUNE",
        "amount": "3298",
        "uploaded_by": "6",
        "main_order_status": ""
    },
    {
        "runsheet_details_id": 12,
        "runsheet_id": 4,
        "order_id": "45592666",
        "order_status": "PENDING",
        "weive_off": "",
        "payment_mode": "Cash",
        "collected_amt": "",
        "branch": "1",
        "created_by": "1",
        "employee_id": 2,
        "order_date": "2018-03-05",
        "runsheet_status": "OPEN",
        "start_km": "455",
        "end_km": "",
        "start_time": "10:24:13",
        "end_time": "00:00:00",
        "emp_password": "jin",
        "employee_type": "3",
        "emp_fname": "jinaa",
        "emp_mname": "jina",
        "emp_lname": "shing",
        "emp_mobileno": "1111111111",
        "emp_email": "jin@test.in",
        "emp_add": "pashan,pune",
        "emp_city": "pune",
        "emp_dob": "1999-03-21",
        "emp_doc": "1,3",
        "emp_resume": "20180321_052840_exportfile (68).xls",
        "emp_branch": "1",
        "emp_doj": "2018-03-01",
        "emp_parmanent_add": "pune",
        "emp_imei_no": "11122",
        "emp_status": "Active",
        "emp_enddate": "0000-00-00",
        "orderunique_id": 37,
        "sr_no": 1,
        "fkskuid": 9668,
        "product_desc": "",
        "product_color": "",
        "product_size": "",
        "pending_in_q_hrs": "10",
        "pincode": "411007",
        "city": "PUNE",
        "amount": "1499",
        "uploaded_by": "7",
        "main_order_status": ""
    },
    {
        "runsheet_details_id": 13,
        "runsheet_id": 4,
        "order_id": "45594078",
        "order_status": "PENDING",
        "weive_off": "",
        "payment_mode": "Cash",
        "collected_amt": "",
        "branch": "1",
        "created_by": "1",
        "employee_id": 2,
        "order_date": "2018-03-05",
        "runsheet_status": "OPEN",
        "start_km": "455",
        "end_km": "",
        "start_time": "10:24:13",
        "end_time": "00:00:00",
        "emp_password": "jin",
        "employee_type": "3",
        "emp_fname": "jinaa",
        "emp_mname": "jina",
        "emp_lname": "shing",
        "emp_mobileno": "1111111111",
        "emp_email": "jin@test.in",
        "emp_add": "pashan,pune",
        "emp_city": "pune",
        "emp_dob": "1999-03-21",
        "emp_doc": "1,3",
        "emp_resume": "20180321_052840_exportfile (68).xls",
        "emp_branch": "1",
        "emp_doj": "2018-03-01",
        "emp_parmanent_add": "pune",
        "emp_imei_no": "11122",
        "emp_status": "Active",
        "emp_enddate": "0000-00-00",
        "orderunique_id": 39,
        "sr_no": 3,
        "fkskuid": 12590,
        "product_desc": "",
        "product_color": "",
        "product_size": "",
        "pending_in_q_hrs": "3",
        "pincode": "411001",
        "city": "PUNE",
        "amount": "2699",
        "uploaded_by": "7",
        "main_order_status": ""
    },
    {
        "runsheet_details_id": 15,
        "runsheet_id": 4,
        "order_id": "45594131",
        "order_status": "PENDING",
        "weive_off": "",
        "payment_mode": "Cash",
        "collected_amt": "",
        "branch": "1",
        "created_by": "1",
        "employee_id": 2,
        "order_date": "2018-03-05",
        "runsheet_status": "OPEN",
        "start_km": "455",
        "end_km": "",
        "start_time": "10:24:13",
        "end_time": "00:00:00",
        "emp_password": "jin",
        "employee_type": "3",
        "emp_fname": "jinaa",
        "emp_mname": "jina",
        "emp_lname": "shing",
        "emp_mobileno": "1111111111",
        "emp_email": "jin@test.in",
        "emp_add": "pashan,pune",
        "emp_city": "pune",
        "emp_dob": "1999-03-21",
        "emp_doc": "1,3",
        "emp_resume": "20180321_052840_exportfile (68).xls",
        "emp_branch": "1",
        "emp_doj": "2018-03-01",
        "emp_parmanent_add": "pune",
        "emp_imei_no": "11122",
        "emp_status": "Active",
        "emp_enddate": "0000-00-00",
        "orderunique_id": 41,
        "sr_no": 5,
        "fkskuid": 12590,
        "product_desc": "",
        "product_color": "",
        "product_size": "",
        "pending_in_q_hrs": "1",
        "pincode": "411005",
        "city": "PUNE",
        "amount": "3298",
        "uploaded_by": "7",
        "main_order_status": ""
    }
];

export default class App extends React.Component {
  constructor(props) {
    super(props)

    //this.getMoviesFromApiAsync()

    db = SQLite.openDatabase({ name: 'qwikimile.db', createFromLocation: "~qwikimile.db" });
    this.state = {
      db: db,
      deliveries: dummyData
    }

    this.removeDeliveredOrder = this.removeDeliveredOrder.bind(this)
    //this.checkConnectionAndSyncData();


    //Alert.alert(this.state.IMEI);
    db.transaction((tx) => {
      //tx.executeSql('DELETE FROM branch_master WHERE branch_id=?', ['4'], (tx, results) => {})
    });

    //this.updateQuery()


    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM branch_master', [], (tx, results) => {
        //Alert.alert("ikde yetoy")
        var len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          //Alert.alert(row.branch_id.toString() + " " + row.branch_name.toString())
        }
      });
    });
  }



  updateQuery() {
    var table = 'branch_master'
    var updateQuery = "UPDATE " + table + " SET branch_name='HaRBARA' WHERE branch_id='2' "
    this.state.db.transaction((tx) => {
      tx.executeSql(updateQuery, [], (tx, results) => { })
    })
  }

  checkConnectionAndSyncData() {
    let data = [];
    NetInfo.getConnectionInfo().then(async (connectionInfo) => {
      //Alert.alert('Nana mama!');
      //Alert.alert('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
      if (connectionInfo.type == 'none') {
        let pendingOrders = await AsyncStorage.getItem('pendingOrders');
        if(!pendingOrders){
          pendingOrders = '[]';
        }
        pendingOrders = JSON.parse(pendingOrders);
        this.setState({deliveries: pendingOrders})
      } else {
        let orders = await AsyncStorage.getItem('orders');
        orders = JSON.parse(orders);
        this.saveLocallyStoredOrders(orders);
        this.getMoviesFromApiAsync();
      }
    }).catch(err => {
      Alert.alert(err.toString())
    });

  }


  getMoviesFromApiAsync() {
    return fetch('http://132.148.135.110:3000/delivery/getDeliveries', {
      method : 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({emp_imei_no : '111'})
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        //Alert.alert(Object.keys(responseJson[0]).toString())
        await AsyncStorage.setItem('pendingOrders', JSON.stringify(responseJson))
        this.setState({ deliveries: responseJson });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  saveLocallyStoredOrders(orders) {
    fetch('http://132.148.135.110:3000/delivery', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orders),
    }).then((response) => {
      response.json()
    }).then(responseJson => {
      //Alert.alert(responseJson.toString())
      this.hideModal();
      //this.props.removeDeliveredOrder(this.state.selectedOrder)
    }).catch((error) => {
      Alert.alert(error.toString())
    });
  }

  removeDeliveredOrder(deliveredOrder) {
    //Alert.alert('here')
    let deliveries = this.state.deliveries;
    let deliveryIndex = null;
    deliveries.forEach((order, index) => {
      if (order.orderunique_id == deliveredOrder.orderunique_id) {
        deliveryIndex = index;
      }
    })
    deliveries.splice(deliveryIndex, deliveryIndex + 1);
    this.setState({ deliveries : deliveries });
  }
  //status_codes = 0 - pending, 1 - delivered, 2 - could not deliver

  render() {
    //Alert.alert(this.state.deliveries[0] ? Object.keys(this.state.deliveries[0]).toString() : 'veda')
    return (
      <View style={styles.container}>
        <OrderList doneEvent={this.removeDeliveredOrder} orders={this.state.deliveries} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25
  },
});
