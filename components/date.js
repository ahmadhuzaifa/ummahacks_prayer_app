import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';


const DatesCard = props => ( 
    <View style={styles.dateCard}>
        <Text style={styles.dateText}>{props.date}</Text>
        <Text>{props.month}</Text>
    </View>
)

export default DatesCard;



const styles = StyleSheet.create({
    dateCard:{
        width:68,
        height: 138,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 37,
        backgroundColor: "white",
        marginLeft: 10,
        marginRight: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        marginTop: 20,
        marginBottom: 20
    },
    dateText:{
        fontSize:27,
        fontFamily: "Avenir Next",
        fontWeight: "700",
    }
})