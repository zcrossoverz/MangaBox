import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import getListHistory from "../../apis";


const renderItem = ({item}) => {
    return (
        <View style={styles.itemRow}>
            <Image source={{uri: item.url}} style={styles.itemImage}></Image>
            <Text style={styles.itemText}>{item.title}</Text>
            <Text style={styles.itemText}>{item.id}</Text>
        </View>
    )
}

const ListHistory = () => {
    const [data, setData] = useState([]);
    
    
    useEffect(() => {
        getListHistory()
        .then(res => {
            setData(res.data);
        });
    }, []);


    

    return (
        <FlatList
        style={styles.container}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        />
    );
};

export default ListHistory;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: '#f5fcff'
    },
    itemRow: {
        borderBottomColor: '#ccc',
        marginBottom: 10,
        borderBottomWidth: 1
    },
    itemImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    },
    itemText: {
        fontSize: 16,
        padding: 5
    }
    
});