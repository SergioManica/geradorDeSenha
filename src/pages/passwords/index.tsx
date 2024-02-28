import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useStorage } from "../../hooks/useStorage";
import { PasswordItem } from "./components/passwordItem";

export function Passwords() {
  const [listPassword, setListPasswords] = useState([]);
  const focused = useIsFocused();
  const { getItem, removeItem } = useStorage();
  useEffect(() => {
    async function loadPasswords() {
      const passwords = await getItem("@pass");
      setListPasswords(passwords);
    }
    loadPasswords();
  }, [focused]);

  function handleDeletePassword(item) {
    Alert.alert(
      "Excluir senha",
      "Voce tem certeza que deseja excluir a senha?",
      [
        { text: "Cancelar" },
        {
          text: "Confirmar",
          onPress: async () => {
            const password = await removeItem("@pass", item);
            setListPasswords(password);
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas senhas</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          data={listPassword}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <PasswordItem
              data={item}
              removePassword={() => {
                handleDeletePassword(item);
              }}
            />
          )}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#392de9",
    paddingTop: 58,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
  },

  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },

  content: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
});
