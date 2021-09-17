import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Dimensions, StyleSheet, Text, Image, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ListChapter from "../components/detailmanga/GetListChapter";


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const DetailManga = ({route, navigation}) => {


    const [data, setData] = useState(false);
    const { url, title } = route.params;
    let info = {};
    useEffect(() => {
        const cheerio = require('cheerio');
        fetch(url)
        .then(res => res.text())
        .then(data => {
            const $ = cheerio.load(data);
            const title = $('h1.title-detail').text();
            let genres = [];
            $('.list-info .kind p a')
            .map((index, item) => {
                genres.push(item.childNodes[0].data);
            });
            const status = $('.list-info .status .col-xs-8').text();
            const author = $('.list-info .author .col-xs-8').text();
            const img_thumb = $('.detail-info .row .col-image img')[0].attribs.src;
            const summary = $('.detail-content').text().replace('Nội dung','').trim();
            let chapter_list = [];
            $('.list-chapter nav ul li .chapter a')
            .map((index, item) => {
                chapter_list.push({
                    chapter_name: item.children[0].data,
                    chapter_url: item.attribs.href
                });
            });
            // console.log(chapter_list);
            setData({
                image: img_thumb,
                title: title,
                genres: genres,
                status: status,
                author: author,
                summary: summary,
                list_chapter: chapter_list
            })
        });
    }, []);

    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.detail_image}>
                    <Image style={styles.image_thumbnail}
                    source={{ uri: data.image }}
                    />
                </View>
                <View style={styles.detail_info}>

                <Text style={styles.title}>{ data.title }</Text>
                <FlatList 
                data={data.genres}
                numColumns={3}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity style={styles.genres}>
                            <Text style={styles.genres_text}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item.toString()}
                />
                <Text style={styles.text}><MaterialCommunityIcons name="pencil" size={25} /> Tác giả: { data.author }</Text>
                <Text style={styles.text}><MaterialCommunityIcons name="rss" size={25} /> Tình trạng: { data.status }</Text>
                <Text style={styles.text}><MaterialCommunityIcons name="calendar-text" size={25} /> Giới thiệu:</Text>
                <Text style={styles.text}>{ data.summary }</Text>
                <ListChapter list_chapter={data.list_chapter} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default DetailManga;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 0,
        flex: 1,
        width: screenWidth,
        height: screenHeight,
        backgroundColor: '#fff'
    },
    detail_image: {
        padding: 8,
        height: screenHeight/2.5,
        backgroundColor: '#fff',
        margin: 4,
        alignItems: 'center',
        display: 'flex'
    },
    image_thumbnail: {
        width: '50%',
        backgroundColor: '#fff',
        height: '100%',
        resizeMode: 'none',
        borderRadius: 8,
        resizeMode: 'cover',
    },
    detail_info: {
        minHeight: 250,
        padding: 8,
        margin: 8,
        marginTop: 0,
        paddingTop: 0
    },
    title: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 20
    },
    genres: {
        borderWidth: 1,
        padding: 4,
        borderColor:'#f18121',
        height: 40,
        alignItems:'center',
        backgroundColor:'#fff',
        justifyContent:'center',
        margin: 4,
        borderRadius: 8
    },
    genres_text: {
        color:'#f18121'
    },
    size_vector: {
        width: 10,
        height: 10
    },
    text: {
        padding: 4,
        fontSize: 16
    }
});