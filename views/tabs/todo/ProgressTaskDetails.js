import {
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function ProgressTaskDetails({
  showModal,
  setShowModal,
  updateProgressTask,
  task,
}) {
  const handleUpdate = () => {
    updateProgressTask();
  };

  return (
    <Modal
      visible={showModal}
      presentationStyle="pageSheet"
      animationType="slide"
      onRequestClose={() => setShowModal(false)}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ alignItems: "center", backgroundColor: "#24344E" }}>
          <View
            style={{
              alignItems: "center",
              width: "85%",
              height: "20%",
              paddingTop: 45,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
              New Task Todo
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-evenly",
              width: "85%",
              height: "20%",
            }}
          >
            <Text style={{ fontWeight: "600", color: "white" }}>
              Title Task
            </Text>
            <TextInput
              value={task.title}
              style={{
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "gray",
                backgroundColor: "#EFF3F4",
              }}
            />
          </View>
          <View
            style={{
              justifyContent: "space-evenly",
              width: "85%",
              height: "20%",
            }}
          >
            <Text style={{ fontWeight: "600", color: "white" }}>
              Description
            </Text>
            <TextInput
              defaultValue={task.description}
              multiline
              style={{
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "gray",
                backgroundColor: "#EFF3F4",
              }}
            />
          </View>
          <View style={{ flexDirection: "row", width: "85%", height: "20%" }}>
            <View style={{ width: "50%", height: "100%" }}>
              <Text style={{ fontWeight: "600", color: "white" }}>Time</Text>
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date(task.datetime)}
                mode="datetime"
                display="compact"
                themeVariant="dark"
                style={{ padding: 15 }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "85%",
              height: "20%",
            }}
          >
            <View style={{ width: "40%", height: "100%" }}>
              <TouchableOpacity
                onPress={handleUpdate}
                style={{
                  alignItems: "center",
                  padding: 10,
                  backgroundColor: "#C6EAA7",
                  borderRadius: 15,
                }}
              >
                <Text style={{ fontWeight: "600", fontSize: 16 }}>Finish</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
