import {
  Text,
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";

import * as Clipboard from "expo-clipboard";
import { useStorage } from "../../hooks/useStorage"

export function ModalPassword({
  onCloseModal,
  password,
}: {
  onCloseModal: () => void;
  password: string;
}) {
  const { saveItem } = useStorage();
  async function handleCopyPassword() {
    await Clipboard.setStringAsync(password);
    await saveItem("@pass", password)
    alert("Senha salva com sucesso!");
    onCloseModal();
  }
  return (
    <View style={styles.container}>
      <View style={styles.backgoundModal} onTouchStart={onCloseModal}></View>
      <View style={styles.modalArea}>
        <Text style={styles.text}>Senha gerada</Text>
        <Pressable
          style={styles.innerPassword}
          onLongPress={handleCopyPassword}
        >
          <Text style={styles.passwordText}>{password}</Text>
        </Pressable>
        <View style={styles.buttonArea}>
          <TouchableOpacity onPress={onCloseModal} style={styles.button}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleCopyPassword}>
            <Text style={styles.saveButtonText}>Salvar Senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(24,24,24,0.6)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  backgoundModal: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },

  modalArea: {
    backgroundColor: "white",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 24,
    borderRadius: 8,
    gap: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  innerPassword: {
    backgroundColor: "black",
    width: "90%",
    padding: 14,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  passwordText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonArea: {
    display: "flex",
    flexDirection: "row",
    gap: 60,
  },
  button: {
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSave: {
    backgroundColor: "rgba(0,0,255,0.7)",
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: "bold",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
