import React from "react"
import { View, Text, SafeAreaView } from "react-native"
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { GameProvider } from "./src/context/GameContext"
import Estilo from "./src/styles/Estilo"
import Tela1 from "./src/screens/tela1"
import Tela2 from "./src/screens/tela2"
import Tela3 from "./src/screens/tela3"
import Tela4 from "./src/screens/tela4"

const Stack = createNativeStackNavigator()

export default () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <View style={Estilo.appHeader}>
                <Text style={Estilo.appHeaderTitle}>MEGA-SENA</Text>
                <Text style={Estilo.appHeaderSubtitle}>SISTEMA DE APOSTAS</Text>
            </View>
            <GameProvider>
                <NavigationIndependentTree>
                    <NavigationContainer>
                        <Stack.Navigator
                            screenOptions={{
                                headerShown: false,
                                animation: "slide_from_right",
                            }}
                        >
                            <Stack.Screen name="Tela1" component={Tela1} />
                            <Stack.Screen name="Tela2" component={Tela2} />
                            <Stack.Screen name="Tela3" component={Tela3} />
                            <Stack.Screen name="Tela4" component={Tela4} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </NavigationIndependentTree>
            </GameProvider>
        </SafeAreaView>
    )
}
