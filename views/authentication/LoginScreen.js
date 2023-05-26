import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { useState } from "react";
import { firebaseConfig } from "../../config/firebase";
import { login } from "../../redux/action/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { getTask } from "../../redux/action/TaskAction";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authReducer);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleLogin = async () => {
    dispatch(login(email, password))
    dispatch(getTask(authState.email))
    setTimeout(() => {
      navigation.navigate('Tabs')
    }, 2000)
  };
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
                Sign in to your Account
              </Text>
              <Text style={{ color: "white", fontWeight: "400", fontSize: 20 }}>
                Sign in to your Account
              </Text>
            </View>
          </View>
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <View style={{ width: "80%", height: "80%" }}>
              <View style={{ width: "100%", height: "50%", marginBottom: 15 }}>
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
                  onChangeText={(text) => setEmail(text)}
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
                    onChangeText={(text) => setPassword(text)}
                  />
                  <AntDesign
                    name="eyeo"
                    size={20}
                    color="black"
                    style={{ position: "absolute", right: 10 }}
                  />
                </View>
                <View style={{ alignItems: "flex-end", marginBottom: 15 }}>
                  <Text style={{ color: "#C0E862", fontWeight: "600" }}>
                    Forgot Password?
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: 40,
                    borderRadius: 15,
                    backgroundColor: "#C0E862",
                    marginBottom: 15,
                  }}
                  onPress={handleLogin}
                >
                  <Text style={{ fontSize: 18, fontWeight: "600" }}>Login</Text>
                </TouchableOpacity>
              </View>

              <View style={{ width: "100%", height: "30%", marginBottom: 15 }}>
                <View style={{ alignItems: "center", marginTop: 10 }}>
                  <Text style={{}}>Or Login with</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    width: "100%",
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity>
                    <Text>Google</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text>Facebook</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <Text>Don't have an account?</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Register");
                  }}
                >
                  <Text
                    style={{
                      marginLeft: 5,
                      color: "#C0E862",
                      fontWeight: "600",
                    }}
                  >
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
