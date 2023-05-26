import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import OnProgressTask from "./OnProgressTask";
import CompletedTask from "./CompletedTask";
import AddTaskModal from "./AddTaskModal";
import { useDispatch, useSelector } from "react-redux";
import ProgressTaskDetails from "./ProgressTaskDetails";
import CompletedTaskDetails from "./CompletedTaskDetails";
import {
  addTask,
  deleteCompletedTask,
  updateProgressTask,
} from "../../../redux/action/TaskAction";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function TodoScreen({navigation}) {
  const [showModalAddTask, setShowModalAddTask] = useState(false);
  const [showModalProgressTask, setShowModalProgressTask] = useState(false);
  const [showModalCompletedTask, setShowModalCompletedTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.authReducer);
  const taskState = useSelector((state) => state.taskReducer);

  const add = (title, description, datetime) => {
    dispatch(addTask(title, description, datetime.toString(), authState.email));

    Keyboard.dismiss();
    setShowModalAddTask(false);
  };

  const update = () => {
    dispatch(updateProgressTask(selectedTask.id));
    setShowModalProgressTask(false);
  };

  const deleteTask = () => {
    dispatch(deleteCompletedTask(selectedTask.id));
    setShowModalCompletedTask(false);
  };

  const handleOnProgressTaskClick = (task) => {
    setSelectedTask(task);
    setShowModalProgressTask(true);
  };

  const handleOnCompletedTaskClick = (task) => {
    setSelectedTask(task);
    setShowModalCompletedTask(true);
  };

  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#24344E",
        }}
      >
        <View
          style={{
            alignItems: "flex-end",
            justifyContent: "center",
            width: "85%",
            height: "10%",
          }}
        >
          <AntDesign name="calendar" size={26} color="white" />
        </View>
        <View style={{ width: "85%", height: "38%", justifyContent: "center" }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
              On Progress({taskState.tasks.filter(task => task.completed === false).length})
            </Text>
            <Text style={{ color: "white", fontSize: 18 }}>View More</Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{
              width: (screenWidth * taskState.tasks.length * 2) / 3,
              height: 180,
              marginTop: 10,
            }}
          >
            {taskState.tasks.map(
              (task, id) =>
                !task.completed && (
                  <TouchableOpacity
                    key={id}
                    style={{
                      backgroundColor: "#CBBED7",
                      marginRight: 10,
                      borderRadius: 15,
                      padding: 10,
                    }}
                    onPress={() => handleOnProgressTaskClick(task)}
                  >
                    <OnProgressTask
                      title={task.title}
                      datetime={task.datetime}
                      desc={task.description}
                    />
                  </TouchableOpacity>
                )
            )}
          </ScrollView>
        </View>
        <View
          style={{
            width: "85%",
            height: "38%",
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
              Completed
            </Text>
            <Text style={{ color: "white", fontSize: 18 }}>View More</Text>
          </View>
          <ScrollView
            contentContainerStyle={{
              height: (screenHeight * taskState.tasks.length * 1) / 3,
              width: "100%",
              marginTop: 10,
            }}
          >
            {taskState.tasks.map(
              (task, id) =>
                task.completed && (
                  <TouchableOpacity
                    key={id}
                    onPress={() => handleOnCompletedTaskClick(task)}
                  >
                    <CompletedTask
                      title={task.title}
                      datetime={task.datetime}
                      desc={task.description}
                    />
                  </TouchableOpacity>
                )
            )}
          </ScrollView>
        </View>
        <View
          style={{
            width: "85%",
            height: "8%",
            marginTop: 18,
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 10,
              backgroundColor: "#C6EAA7",
              alignItems: "center",
            }}
            onPress={() => setShowModalAddTask(true)}
          >
            <View
              style={{
                height: "100%",
                width: "50%",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <AntDesign name="plus" size={22} color="black" />
              <Text style={{ fontWeight: "600" }}>Create New</Text>
            </View>
          </TouchableOpacity>
          <AddTaskModal
            addTask={add}
            showModal={showModalAddTask}
            setShowModal={setShowModalAddTask}
          />
          <ProgressTaskDetails
            updateProgressTask={update}
            showModal={showModalProgressTask}
            setShowModal={setShowModalProgressTask}
            task={selectedTask}
          />
          <CompletedTaskDetails
            deleteCompletedTask={deleteTask}
            showModal={showModalCompletedTask}
            setShowModal={setShowModalCompletedTask}
            task={selectedTask}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
