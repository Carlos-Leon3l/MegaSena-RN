import React, { useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import Estilo from "../styles/Estilo"
import { useGame } from "../context/GameContext"

export default ({ navigation }) => {
    const {
        numerosEscolhidos,
        numeroBilhete,
        teimosinha,
        concursosTeimosinha,
        surpresinha,
        numerosSorteados,
        realizarSorteio,
    } = useGame()

    useEffect(() => {
        if (numerosSorteados.length === 0) {
            realizarSorteio()
        }
    }, [])

    return (
        <View style={Estilo.container}>
            <ScrollView contentContainerStyle={Estilo.scroll} showsVerticalScrollIndicator={false}>
                <View style={Estilo.header}>
                    <Text style={Estilo.title}>Sorteio do Jogo</Text>
                    <Text style={Estilo.subtitle}>Resultado da extração oficial</Text>
                </View>

                <View style={Estilo.ticketCard}>
                    <Text style={Estilo.ticketLabel}>Comprovante de Aposta</Text>
                    <Text style={Estilo.ticketNumber}>{numeroBilhete}</Text>
                    <Text style={Estilo.ticketDetails}>
                        {numerosEscolhidos.length} dezenas registradas {surpresinha ? "• Surpresinha" : ""}
                    </Text>
                    {teimosinha && (
                        <Text style={[Estilo.ticketDetails, { marginTop: 4, fontWeight: "600" }]}>
                            Teimosinha ativa para {concursosTeimosinha} concursos
                        </Text>
                    )}
                </View>

                <View style={Estilo.card}>
                    <Text style={Estilo.cardTitle}>Sua Aposta Registrada</Text>
                    <View style={Estilo.ballsRow}>
                        {numerosEscolhidos.map((num) => (
                            <View key={num} style={[Estilo.ball, Estilo.ballSelected]}>
                                <Text style={Estilo.ballTextSelected}>
                                    {num < 10 ? `0${num}` : num}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={Estilo.card}>
                    <Text style={Estilo.cardTitle}>Dezenas Sorteadas</Text>
                    <View style={Estilo.ballsRow}>
                        {numerosSorteados.map((num) => (
                            <View key={num} style={Estilo.drawnBall}>
                                <Text style={Estilo.drawnBallText}>
                                    {num < 10 ? `0${num}` : num}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={[Estilo.buttonOutline, { marginTop: 14 }]}
                        onPress={realizarSorteio}
                        activeOpacity={0.8}
                    >
                        <Text style={Estilo.buttonOutlineText}>Sortear Novamente</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={Estilo.button}
                    onPress={() => navigation.navigate("Tela4")}
                    activeOpacity={0.8}
                >
                    <Text style={Estilo.buttonText}>Conferir Resultado</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={Estilo.buttonOutline}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.8}
                >
                    <Text style={Estilo.buttonOutlineText}>Voltar para Aposta</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
