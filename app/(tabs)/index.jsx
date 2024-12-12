import { Image, StyleSheet, Platform, Text, View, SafeAreaView, StatusBar } from 'react-native';
import HomePage from '@/components/home components/HomePage'
import SafeAreaWrapper from '@/components/Layout wrappers/SafeAreaWrapper'
export default function HomeScreen() {
  // console.log('staus ar', parseInt(StatusBar.currentHeight))
  return (
    // <SafeAreaView style={styles.container} className={`pt-[${parseInt(StatusBar.currentHeight)}]`}>
      <SafeAreaWrapper>
        <HomePage />
      </SafeAreaWrapper>
    // </SafeAreaView>


  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: parseInt(StatusBar.currentHeight)
  },

});
