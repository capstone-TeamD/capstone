import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Login from "../Login";
import Signup from "../Signup";
import WelcomeScreen from "../WelcomeScreen";

const SwitchNavigator = createSwitchNavigator(
  {
    WelcomeScreen: {
      screen: WelcomeScreen,
    },
    Login: {
      screen: Login,
    },
    Signup: {
      screen: Signup,
    },
  },
  {
    initialRouteName: "WelcomeScreen",
  }
);

export default createAppContainer(SwitchNavigator);
