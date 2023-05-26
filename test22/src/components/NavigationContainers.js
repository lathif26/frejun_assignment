import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TableListScreen from "../pages/TableListScreen";
import TableDetailsScreen from "../pages/TableDetailsScreen";

const Stack = createStackNavigator();

const NavigationContainers = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TableList">
        <Stack.Screen name="TableList" component={TableListScreen} />
        <Stack.Screen name="TableDetails" component={TableDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationContainers;
