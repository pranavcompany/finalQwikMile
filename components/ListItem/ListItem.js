import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';

const listItem = props => (
    <View style={styles.items}>
        <Text style={styles.Orders}>Order Id : {props.c_id}</Text>
        <Text style={styles.Details}>
            {props.City}
        </Text>
        <Text style={styles.Details}>
            Amount to collect - {props.amount}
        </Text>
    </View>
);
var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    items : {
        flex : 1,
        flexDirection : "column",
        justifyContent : "flex-start",
        alignItems : "center",
        borderColor : "#fd4900",
        borderWidth : 1,
        height : 70,
        backgroundColor : "white",
        elevation : 4,
        padding : 5,
        borderRadius : 5,
        marginTop : 5,
        width: width - 5
    },
    Orders : {
        fontSize : 24,
        fontWeight : 'bold',
        color : '#0a14ce',
        width : "70%",
        marginLeft:"15%"
    },
    Details : {
        fontSize : 16
    }
})

export default listItem;
