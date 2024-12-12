import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

const SafeAreaWrapper = ({ children }) => {
  return (
    <SafeAreaView style={[styles.container, { paddingTop: StatusBar.currentHeight || 0 }]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SafeAreaWrapper;
