import { Pressable, View, Text, StyleSheet, Button, Touchable } from "react-native";
import React from "react";
import { useState } from "react";

export function PasswordItem({ data, removePassword }) {
    const [ changePassword, setChangePassword] = useState('')

  return (
    <Pressable onLongPress={removePassword} style={styles.container}>
      <Text style={styles.text}>{data}</Text>
      <Pressable onPress={()=>{
        setChangePassword
      }}></Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0e0e0e",
    padding: 14,
    width: "100%",
    marginBottom: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
  },
});
