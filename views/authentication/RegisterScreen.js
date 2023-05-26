import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)

    const handleRegister = () => {
        if (!email || !password) {
            Alert.alert('Email and password are required fields')
            return
        }

        if (password !== confirmPassword) {
            Alert.alert("Password and confirm password doesn't match")
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user
            console.log(user)
        })
        .catch(err => {
            Alert.alert(err.message)
        })
    }

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ width: "100%", height: "100%" }}>
          <View
            style={{
              alignItems: "center",
              width: "100%",
              height: "40%",
              backgroundColor: "#1E2E3D",
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", left: 20, top: 20 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={26} color="white" />
            </TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                width: "80%",
                height: "100%",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "600",
                  fontSize: 50,
                  marginBottom: 15,
                }}
              >
                Register
              </Text>
              <Text style={{ color: "white", fontWeight: "400", fontSize: 20 }}>
                Create your account
              </Text>
            </View>
          </View>
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <View style={{ width: "80%", height: "80%" }}>
              <View style={{ width: "100%", height: "50%", marginBottom: 15 }}>
                <TextInput
                  placeholder="Name"
                  style={{
                    borderColor: "gray",
                    width: "100%",
                    padding: 10,
                    height: 40,
                    borderWidth: 1,
                    borderRadius: 15,
                    marginBottom: 15,
                  }}
                />
                <TextInput
                  placeholder="Email"
                  style={{
                    borderColor: "gray",
                    width: "100%",
                    padding: 10,
                    height: 40,
                    borderWidth: 1,
                    borderRadius: 15,
                    marginBottom: 15,
                  }}
                  onChangeText={text => setEmail(text)}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 15,
                  }}
                >
                  <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    style={{
                      borderColor: "gray",
                      width: "100%",
                      padding: 10,
                      height: 40,
                      borderWidth: 1,
                      borderRadius: 15,
                    }}
                    onChangeText={text => setPassword(text)}
                  />
                  <AntDesign
                    name="eyeo"
                    size={20}
                    color="black"
                    style={{ position: "absolute", right: 10 }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 35,
                  }}
                >
                  <TextInput
                    placeholder="Confirm password"
                    secureTextEntry={true}
                    style={{
                      borderColor: "gray",
                      width: "100%",
                      padding: 10,
                      height: 40,
                      borderWidth: 1,
                      borderRadius: 15,
                    }}
                    onChangeText={(text) => setConfirmPassword(text)}
                  />
                  <AntDesign
                    name="eyeo"
                    size={20}
                    color="black"
                    style={{ position: "absolute", right: 10 }}
                  />
                </View>

                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: 40,
                    borderRadius: 15,
                    backgroundColor: "#C0E862",
                  }}
                  onPress={handleRegister}
                >
                  <Text style={{ fontSize: 18, fontWeight: "600" }}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
