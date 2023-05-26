import generateUUID from "../../helper/GenerateUUID";
import { firebase } from "../../config/firebase";
import { Alert } from "react-native";
import { ADD_TASK, DELETE_COMPLETED_TASK, GET_TASK, UPDATE_PROGRESS_TASK } from "../reducer/TaskReducer";

const todoRef = firebase.firestore().collection("todos");

export const getTask = email => async dispatch => {
  const query = todoRef.where('userEmail', '==', email);
  const docSnapshots = await query.get();
  const tasks = [];

  docSnapshots.forEach(docSnapshot => {
    tasks.push({...docSnapshot.data(), id: docSnapshot.id})
  })

  dispatch({
    type: GET_TASK,
    tasks
  })
};

export const addTask = (title, description, datetime, email) => async dispatch => {
    const data = {
      id: generateUUID(),
      title,
      description,
      datetime,
      completed: false,
      userEmail: email,
    };
    await todoRef
      .add(data)
      .then(() => {
        dispatch({
          type: ADD_TASK,
          task: data,
        });
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Something went wrong");
      });
  };

export const updateProgressTask = (id) => async (dispatch) => {
  const query = todoRef.where('id', '==', id);
  const docs = await query.get();
  
  docs.forEach(doc => {
    doc.ref.update({
      completed: true
    })
    .then(() => {
      dispatch({
        type: UPDATE_PROGRESS_TASK,
        id
      })
    })
    .catch(err => {
      console.log(err)
    })
  })
};

export const deleteCompletedTask = (id) => async (dispatch) => {
  const query = todoRef.where('id', '==', id);
  const docs = await query.get();

  docs.forEach(doc => {
    doc.ref.delete()
    .then(() => {
      dispatch({
        type: DELETE_COMPLETED_TASK,
        id
      })
    })
  })
}
