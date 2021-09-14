import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";


const DetailManga = ({route, navigation}) => {


    const [data, setData] = useState(false);
    const { url, title } = route.params;

    useEffect(() => {
        const cheerio = require('cheerio');
        fetch(url)
        .then(res => res.text())
        .then(data => {
            const $ = cheerio.load(data);
            const title = $('h1.title-detail').text();
            const detail = $('#ctl00_divCenter #item-detail .detail-info .row');
            const img_thumb = $('.detail-info .row .col-image img')[0].attribs.src;
            console.log(img_thumb);
        });
    });

    
    return (
        data && 
        <View>
            <Text>Detail manga {url}</Text>
        </View>
    );
}

export default DetailManga;

// const styles = StyleSheet.create({

// });