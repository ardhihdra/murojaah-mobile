import { NavigationContainer } from "@react-navigation/native";
import LoginNavigator from "./navigator/LoginNavigator";
import BottomTabs from "./navigator/BottomTabs";
import { useContext } from "react";
import { AuthContext } from "store/auth-context";

export default function Router({}) {
  const { token } = useContext(AuthContext)

  const isAuthenticated = !!token
  return (
    <NavigationContainer>
    {
      isAuthenticated ?
        <BottomTabs />
        :
        <LoginNavigator />
    }
    </NavigationContainer>
  )
}