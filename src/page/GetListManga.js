import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text, FlatList, Image, ActivityIndicator, Dimensions, SafeAreaView } from "react-native";
import getNettruyen from "../apis/getNettruyen";


const renderItem = ({item}) => {
    return (
        <View style={styles.itemRow}>
            <Image source={{uri: item.url}} style={styles.itemImage}></Image>
            <Text style={styles.itemText}>{item.title}</Text>
            <Text style={styles.itemText}>{item.id}</Text>
        </View>
    );
};

const renderFooter = () => {
    return (
        <View style={styles.loader}>
            <Text>Loading...</Text>
        </View>
    );
};

const ListManga = () => {
    const [data, setData] = useState([]);
    // const 
    useEffect(() => {
        getNettruyen()
        .then(res => {
            setData(res.data);
            console.log(res.data);
        });
    }, []);


    

    return (
        <SafeAreaView style={styles.container}>
        <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        />
        </SafeAreaView>
    );
};

export default ListManga;
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: '#f5fcff',
        flex: 1,
        width: screenWidth
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
    },
    loader: {
        alignItems: 'center',
    }
});