import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { parse } from "node-html-parser";
import WebView from "react-native-webview";

const listTab = [
  {
    status: "Tuổi trẻ",
  },
  {
    status: "Thanh niên",
  },
  {
    status: "VNExpress",
  },
];
export default function ReadingScreen({ navigation }) {
  const [status, setStatus] = useState("Tuổi trẻ");
  const [news, setNews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      let response = null;
      switch (status) {
        case "Tuổi trẻ":
          response = await fetch("https://tuoitre.vn");
          break;
        case "Thanh niên":
          response = await fetch("https://thanhnien.vn");
          break;
        case "VNExpress":
          response = await fetch("https://vnexpress.net");
          break;
        default:
          response = await fetch("https://tuoitre.vn");
      }
      const html = (await response.text()).toString();
      const parsed = parse(html);

      if (status === "Tuổi trẻ") {
        const result = [];
        const linkElements = parsed.querySelectorAll(
          ".box-category-link-title"
        );
        for (let i = 0; i < linkElements.length; i++) {
          result.push({
            title: linkElements[i].textContent,
            link: "https://tuoitre.vn" + linkElements[i].getAttribute("href"),
          });
        }

        setNews(result);
      }

      if (status === "Thanh niên") {
        const result = [];
        const linkElements = parsed.querySelectorAll(
          ".box-category-link-with-avatar"
        );
        for (let i = 0; i < linkElements.length; i++) {
          if (
            linkElements[i].getAttribute("title") &&
            linkElements[i].getAttribute("title") !== "title"
          )
            result.push({
              title: linkElements[i].getAttribute("title"),
              link:
                "https://thanhnien.vn" + linkElements[i].getAttribute("href"),
            });
        }

        setNews(result);
      }

      if (status === "VNExpress") {
        const result = [];
        const h3Elements = parsed.querySelectorAll(".title-news");
        for (let i = 0; i < h3Elements.length; i++) {
          const linkElements = h3Elements[i].getElementsByTagName("a");
          for (let j = 0; j < linkElements.length; j++) {
            result.push({
              title: linkElements[j].getAttribute("title"),
              link: linkElements[j].getAttribute("href"),
            });
          }
        }

        setNews(result);
      }
    }

    fetchData();
  }, [status]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listTab}>
        {listTab.map((e) => (
          <TouchableOpacity
            style={[styles.btnTab, status === e.status && styles.btnTabActive]}
            onPress={() => setStatus(e.status)}
          >
            <Text style={styles.textTab}>{e.status}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView>
        {news.map((newTitle, id) => (
          <TouchableOpacity
            onPress={() => {
              setShowModal(true);
              setUrl(newTitle.link);
            }}
            key={id}
            style={{
              marginVertical: 5,
              borderBottomWidth: 1,
              borderBottomColor: "#68b6ef",
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#68b6ef" }}
            >
              {newTitle.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal
        visible={showModal}
        presentationStyle="pageSheet"
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <WebView source={{ uri: url }} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#24344E",
    justifyContent: "center",
    padding: 20,
  },
  listTab: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
  },
  btnTab: {
    width: "30%",
    flexDirection: "row",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
  },
  textTab: {
    fontSize: 16,
    color: '#68b6ef'
  },
  btnTabActive: {
    backgroundColor: "#C0E862",
  },
});
