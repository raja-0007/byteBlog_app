import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SafeAreaWrapper = ({ children }) => {
  return (
    <SafeAreaView edges={['top']} style={[styles.container, { paddingTop: StatusBar.currentHeight || 0 }]}>
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
