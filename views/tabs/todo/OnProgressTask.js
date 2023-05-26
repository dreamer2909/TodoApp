import moment from "moment";
import { View, Text } from "react-native";

export default function OnProgressTask({ title, datetime, desc }) {
  return (
    <View>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "600",
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        {title}
      </Text>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        {moment(new Date(datetime)).format('MMMM Do YYYY, h:mm:ss a')}
      </Text>
      <Text style={{ fontSize: 15, fontWeight: "400" }}>{desc}</Text>
    </View>
  );
}
