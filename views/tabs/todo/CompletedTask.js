import moment from "moment";
import { View, Text } from "react-native";

export default function CompletedTask({ title, datetime, desc }) {
  return (
    <View
      style={{
        backgroundColor: "#2AC9E8",
        marginBottom: 8,
        borderRadius: 10,
        padding: 8,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        {title}
      </Text>
      <Text style={{ fontSize: 15, fontWeight: "400" }}>{desc}</Text>
      <Text style={{ fontSize: 15, marginBottom: 10 }}>
        {moment(new Date(datetime)).format("MMMM Do YYYY, h:mm a")}
      </Text>
    </View>
  );
}
