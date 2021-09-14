import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text, FlatList, Image, Dimensions, SafeAreaView, TouchableOpacity } from "react-native";
import getNettruyen from "../apis/nettruyen/getNettruyen";
import * as Animatable from 'react-native-animatable';
import DetailManga from "./GetDetailManga";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const numColumn = 2;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



const ListManga = ({navigation}) => {
    const [data, setData] = useState([]);

    useEffect(() => {

        const cheerio = require('cheerio');
        getNettruyen()
        .then(res => res.text())
        .then(data => {
            const $ = cheerio.load(data);
            const items = $('#ctl00_divCenter .items .item .clearfix div.image > a')
            .map((index, item) => {
                const image = item.childNodes[1].attribs['data-original'];
                return {
                    title: item.attribs.title,
                    url: item.attribs.href,
                    image: image,
                    index: index
                };
            });
            // console.log(items);
            setData(items);
        });
    }, []);



    return (
        
            <SafeAreaView style={styles.container}>
                <FlatList
                data={data}
                numColumns={2}
                renderItem={({item}) => {
                    return (
                    <TouchableOpacity
                    onPress={()=> {
                        navigation.push('Details', {
                            url: item.url,
                            title: item.title
                        });
                        // console.log('detail '+item.title);
                    }}
                    >
                        <Animatable.View style={styles.itemRow} animation="fadeInUp">

                            <View style={styles.item}>
                                    <View style={styles.itemImage}>
                                        <Image source={{uri: item.image}} style={styles.itemImageThumbnail}></Image>
                                    </View>
                                    <View style={styles.itemText}>
                                        <Text style={styles.itemTextTitle}>{item.title.replace('Truyện tranh ','')}</Text>
                                    </View>
                            </View>
                        </Animatable.View>
                    </TouchableOpacity>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                maxToRenderPerBatch={10}
                initialNumToRender={6}
                />
            </SafeAreaView>
    );
};

const Stack = createNativeStackNavigator();


const GetListManga = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={ListManga} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Details" component={DetailManga} options={{
                headerShown: true,
                headerBlurEffect: true
            }}
            />
        </Stack.Navigator>
    );
}


export default GetListManga;
const styles = StyleSheet.create({
    
    container: {
        padding: 10,
        marginTop: 0,
        flex: 1,
        width: screenWidth,
        height: screenHeight,
        backgroundColor: '#ebebeb'
    },
    itemRow: {
        margin: 2,
        justifyContent: 'center',
        alignContent: 'center',
        minHeight: 300,
        marginBottom: 16,
        marginEnd: 12
    },
    item: {
        width: (screenWidth)/numColumn - 20,
        flex: 1,
        borderRadius: 12,
        backgroundColor: '#F8F8F8',
        
    },
    itemImageThumbnail: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 12
    },
    itemImage: {
        width: '100%',
        height: 225,
        alignItems: 'center',
        justifyContent:'flex-start'
    },
    itemText: {
        
        padding: 5,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    itemTextTitle: {
        justifyContent:'flex-end',
        fontSize: 16,
        fontWeight: '300',
    },
    loader: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});