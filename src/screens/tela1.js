import React from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import Estilo from "../styles/Estilo"

export default ({ navigation }) => {
    return (
        <View style={Estilo.container}>
            <ScrollView contentContainerStyle={Estilo.scroll} showsVerticalScrollIndicator={false}>
                <View style={Estilo.header}>
                    <Text style={Estilo.title}>Orientações do Jogo</Text>
                    <Text style={Estilo.subtitle}>Regras oficiais e modalidades de aposta</Text>
                </View>

                <View style={Estilo.card}>
                    <Text style={Estilo.cardTitle}>Como Funciona</Text>
                    <Text style={Estilo.cardText}>
                        O volante da Mega-Sena contém 60 números de 01 a 60.
                    </Text>
                    <Text style={Estilo.cardText}>
                        Você pode escolher entre 6 e 20 números no mesmo volante.
                    </Text>
                    <Text style={Estilo.cardText}>
                        São sorteados 6 números a cada concurso oficial.
                    </Text>
                </View>

                <View style={Estilo.card}>
                    <Text style={Estilo.cardTitle}>Modalidades de Jogo</Text>
                    <View style={Estilo.infoRow}>
                        <Text style={Estilo.infoLabel}>Surpresinha</Text>
                        <Text style={Estilo.infoValue}>Escolha aleatória</Text>
                    </View>
                    <Text style={[Estilo.cardText, { marginTop: 6 }]}>
                        O sistema preenche automaticamente os números da aposta de forma aleatória por você.
                    </Text>

                    <View style={[Estilo.infoRow, { marginTop: 10 }]}>
                        <Text style={Estilo.infoLabel}>Teimosinha</Text>
                        <Text style={Estilo.infoValue}>2, 4 ou 8 concursos</Text>
                    </View>
                    <Text style={[Estilo.cardText, { marginTop: 6 }]}>
                        Permite manter e concorrer com a mesma aposta em sorteios consecutivos.
                    </Text>
                </View>

                <View style={Estilo.card}>
                    <Text style={Estilo.cardTitle}>Premiação</Text>
                    <View style={Estilo.prizeItem}>
                        <Text style={Estilo.prizeTitle}>Sena</Text>
                        <Text style={Estilo.prizeHits}>6 acertos (Prêmio Máximo)</Text>
                    </View>
                    <View style={Estilo.prizeItem}>
                        <Text style={Estilo.prizeTitle}>Quina</Text>
                        <Text style={Estilo.prizeHits}>5 acertos</Text>
                    </View>
                    <View style={Estilo.prizeItem}>
                        <Text style={Estilo.prizeTitle}>Quadra</Text>
                        <Text style={Estilo.prizeHits}>4 acertos</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={Estilo.button}
                    onPress={() => navigation.navigate("Tela2")}
                    activeOpacity={0.8}
                >
                    <Text style={Estilo.buttonText}>Avançar para Aposta</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
