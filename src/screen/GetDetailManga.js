import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Dimensions, StyleSheet, Text, Image } from "react-native";

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
                summary: summary
            })
        });
    }, []);

    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.detail_image}>
                <Image style={styles.image_thumbnail}
                source={{ uri: data.image }}
                />
            </View>
            <View style={styles.detail_info}>
               <Text style={styles.title}>{ data.title }</Text>
               <Text style={styles.genres}></Text>
            </View>
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
        backgroundColor: 'red',
        padding: 8,
        margin: 8,
        marginTop: 0,
        paddingTop: 0
    },
    title: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 20
    }
});