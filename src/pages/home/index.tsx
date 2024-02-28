import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ModalPassword } from "../../components/modal";

export function Home() {
  const [size, setSize] = useState(10);
  const [passwordValue, setPasswordValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  let charSet = "abcdefghijklmnopqrsuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

  function generatePassword() {
    let password = "";
    for (let index = 0, n = charSet.length; index < size; index++) {
      password += charSet[Math.floor(Math.random() * n)];
    }
    setPasswordValue(password);
    setModalVisible(true);
  }

  return (
    <LinearGradient colors={["white", "blue"]} style={styles.container}>
      <Image source={require("../../assets/logo.png")} />
      <Text style={styles.text}>{size} caracteres</Text>
      <View style={styles.area}>
        <Slider
          minimumValue={6}
          maximumValue={20}
          maximumTrackTintColor="red"
          minimumTrackTintColor="black"
          thumbTintColor="blue"
          value={size}
          onValueChange={(value) => {
            setSize(Math.round(value));
          }}
        ></Slider>
      </View>
      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Gerar Senha</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <ModalPassword
          password={passwordValue}
          onCloseModal={() => {
            setModalVisible(false);
          }}
        />
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
  },

  area: {
    backgroundColor: "white",
    width: "80%",
    marginTop: 20,
    padding: 8,
    borderRadius: 5,
  },

  buttonText: {
    fontSize: 20,
    color: "blue",
  },

  button: {
    marginTop: 20,
    width: "80%",
    display: "flex",
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
});
