import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config/firebase";
import { Alert } from "react-native";
import { LOGIN } from "../reducer/AuthReducer";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const login = (email, password) => async (dispatch) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({
            type: LOGIN,
            email: email,
            password: password,
          })
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('Incorrect username or password');
      });
  } catch (error) {}
};
