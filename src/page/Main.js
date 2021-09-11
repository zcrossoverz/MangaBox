import React from "react";
import { Text, View, StyleSheet } from "react-native";
import ListHistory from "../components/List/History";
import TestList from "../components/List/TestList";


export default function Main(){
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff'
        },
        wrapperList: {
            paddingTop: 20,
            paddingHorizontal: 20
        },
        sectionTitle: {
            fontSize: 16,
            fontWeight: 'bold'
        },
        item: {

        }
    });
    return (
        <View style={styles.container}>
            <View style={styles.wrapperList}>
                <Text style={styles.sectionTitle}>Lich Su</Text>
                <View style={styles.item}>
                    <TestList />
                </View>
            </View>
        </View>
        
    );
}