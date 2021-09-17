import React from "react";
import { FlatList, ScrollView, Text, StyleSheet } from "react-native";


const ListChapter = (props) => {
    return ( 
        <ScrollView style={{ height: 200 }} style={styles.container}>
                <FlatList data={props.list_chapter}
                renderItem={({item}) => {
                    return (
                    <Text style={styles.text}>{item.chapter_name}</Text>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                />
        </ScrollView>);
}

export default ListChapter;

const styles = StyleSheet.create({
    container: {
        height: 200,
        borderColor: '#a83232',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 12
    },
    text: {
        padding: 8,
        fontSize: 16,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});