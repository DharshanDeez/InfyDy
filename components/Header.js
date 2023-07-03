import React from 'react';
import { StyleSheet, View, Image, SafeAreaView } from 'react-native';

export default function Header() {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/INFYDY-removebg-preview.png')}
                        resizeMode="contain"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    navbar: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 80,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        paddingLeft: 10,
        paddingTop: 30
    },
    logo: {
        width: 100,
        height: 40,
    },
});