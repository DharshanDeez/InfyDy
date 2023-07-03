import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from "./components/Header"
import News from "./components/News"


export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <News />
    </View>
  );
}

const styles = StyleSheet.create({

});
