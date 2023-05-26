import {
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";

export default function AddTaskModal({ showModal, setShowModal, addTask }) {
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setDate(new Date(currentDate));
  };

  const handleCreate = () => {
    addTask(title, description, date);
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
              style={{
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "gray",
                backgroundColor: "#EFF3F4",
              }}
              onChangeText={(text) => setTitle(text)}
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
              onChangeText={(text) => setDescription(text)}
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
                value={new Date()}
                mode="datetime"
                display="compact"
                onChange={onChangeDate}
                themeVariant="dark"
                style={{ padding: 15 }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "85%",
              height: "20%",
            }}
          >
            <View style={{ width: "40%", height: "100%" }}>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  padding: 10,
                  backgroundColor: "#C6EAA7",
                  borderRadius: 15,
                }}
              >
                <Text style={{ fontWeight: "600", fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "40%", height: "100%" }}>
              <TouchableOpacity
                onPress={handleCreate}
                style={{
                  alignItems: "center",
                  padding: 10,
                  backgroundColor: "#C6EAA7",
                  borderRadius: 15,
                }}
              >
                <Text style={{ fontWeight: "600", fontSize: 16 }}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
