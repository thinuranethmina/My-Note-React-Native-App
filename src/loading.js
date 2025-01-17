import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loading = () => {
  const ui = (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={"#43505e"} />
    </View>
  );
  return ui;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Loading;
