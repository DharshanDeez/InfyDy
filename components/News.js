import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import Constants from 'expo-constants';

const NewsComponent = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [newsData, setNewsData] = useState([]);
    const API_KEY = Constants.manifest.extra.NEWS_API_KEY
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(
                `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${API_KEY}`
            );
            const json = await response.json();
            const articles = json.articles;
            setNewsData(articles);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength - 3) + '...';
        }
        return text;
    };

    const handlePostPress = (url) => {
        Linking.openURL(url);
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>

            <FlatList
                data={newsData}
                keyExtractor={(item) => item.title}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContentContainer}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePostPress(item.url)}>
                        <View style={styles.cardContainer}>
                            <Text style={styles.title}>{truncateText(item.title, 35)}</Text>
                            <Text style={styles.description}>{truncateText(item.description, 60)}</Text>
                            {item.urlToImage && <Image source={{ uri: item.urlToImage }} style={styles.image} />}
                        </View>
                    </TouchableOpacity>
                )}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        paddingTop: 80,
        paddingBottom: 20,
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    flatListContentContainer: {
        paddingHorizontal: 10,
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 1,
        width: '90%',
        maxWidth: 400,
        minHeight: 250,
        overflow: 'hidden',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#888',
    },
    image: {
        width: '100%',
        aspectRatio: 16 / 9,
        resizeMode: 'cover',
        borderRadius: 10,
        marginTop: 10,
    },
});

export default NewsComponent;
