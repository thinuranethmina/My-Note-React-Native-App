import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Loading from "./loading";
import { useState } from "react";
import { main_url } from "./urls";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function SigninUi({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("mobile", mobile);
      // const data = await AsyncStorage.getItem("mobile");
    } catch (error) {
      console.log(error);
    }
  };

  const signin = () => {
    setIsLoading(true);
    const f = new FormData();
    f.append("m", mobile);
    f.append("p", password);

    fetch(main_url + "signIn.php", {
      method: "POST",
      body: f,
    })
      .then((r) => r.text())
      .then((r) => {
        if (r == "Success") {
          storeData();
          Alert.alert("Success", r);
          navigation.navigate("Home");
        } else {
          Alert.alert("Warning", r);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontFamily: "DancingScript", fontSize: 70 }}>
        My Notes
      </Text>
      <Image
        style={styles.img1}
        source={require("../assets/images/signin.jpg")}
      />
      <Text style={styles.title1}>SIGN IN</Text>
      <View style={styles.box1}>
        {/* <Text style={styles.text1}>Mobile number</Text> */}
        <TextInput
          style={styles.input1}
          placeholder="Mobile Number"
          keyboardType="number-pad"
          value={mobile}
          onChangeText={setMobile}
        />
      </View>
      <View style={styles.box1}>
        {/* <Text style={styles.text1}>Password</Text> */}
        <TextInput
          style={styles.input1}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.box1}>
        <TouchableOpacity
          style={styles.btn1}
          onPress={() => {
            signin();
          }}
        >
          <Text style={styles.btnText1}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box2}>
        <Text>I don't have an account</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.text2}>Create New Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title1: {
    fontFamily: "Poppins-BoldItalic",
    fontSize: 22,
    color: "black",
  },
  box1: {
    width: "100%",
    marginBottom: 20,
  },
  text1: {
    marginLeft: 20,
    fontSize: 16,
  },
  input1: {
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    padding: 8,
    paddingStart: 20,
    borderRadius: 6,
  },
  btn1: {
    alignItems: "center",
    borderRadius: 6,
    padding: 8,
    backgroundColor: "#43505e",
  },
  btnText1: {
    fontSize: 20,
    color: "white",
    fontFamily: "Poppins-Medium",
  },
  box2: {
    alignItems: "center",
  },
  text2: {
    color: "blue",
  },
  img1: {
    width: 200,
    height: 200,
  },
});
