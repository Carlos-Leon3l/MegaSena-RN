import React from "react"
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native"
import { Slider, Switch } from "@rneui/themed"
import Estilo from "../styles/Estilo"
import { useGame } from "../context/GameContext"

export default ({ navigation }) => {
    const {
        quantidadeNumeros,
        alterarQuantidadeNumeros,
        numerosEscolhidos,
        toggleNumero,
        surpresinha,
        ativarSurpresinha,
        teimosinha,
        setTeimosinha,
        concursosTeimosinha,
        setConcursosTeimosinha,
        confirmarAposta,
    } = useGame()

    const handleConfirmar = () => {
        if (numerosEscolhidos.length < quantidadeNumeros) {
            Alert.alert(
                "Aposta Incompleta",
                `Você definiu ${quantidadeNumeros} números para a aposta, mas selecionou ${numerosEscolhidos.length}. Complete a seleção ou ative a Surpresinha.`
            )
            return
        }
        confirmarAposta()
        navigation.navigate("Tela3")
    }

    const todosNumeros = Array.from({ length: 60 }, (_, i) => i + 1)

    return (
        <View style={Estilo.container}>
            <ScrollView contentContainerStyle={Estilo.scroll} showsVerticalScrollIndicator={false}>
                <View style={Estilo.header}>
                    <Text style={Estilo.title}>Aposta e Opções</Text>
                    <Text style={Estilo.subtitle}>Selecione as dezenas ou ative a surpresinha</Text>
                </View>

                <View style={Estilo.card}>
                    <Text style={Estilo.cardTitle}>Configuração da Aposta</Text>

                    <View style={Estilo.infoRow}>
                        <Text style={Estilo.infoLabel}>Quantidade de Dezenas</Text>
                        <Text style={Estilo.infoValue}>{quantidadeNumeros} números</Text>
                    </View>
                    <Slider
                        value={quantidadeNumeros}
                        onValueChange={(val) => alterarQuantidadeNumeros(Math.round(val))}
                        minimumValue={6}
                        maximumValue={20}
                        step={1}
                        style={Estilo.slider}
                        thumbStyle={Estilo.sliderThumb}
                        trackStyle={Estilo.sliderTrack}
                        minimumTrackTintColor="#10B981"
                        maximumTrackTintColor="#E2E8F0"
                    />

                    <View style={Estilo.infoRow}>
                        <Text style={Estilo.infoLabel}>Surpresinha</Text>
                        <Switch
                            value={surpresinha}
                            onValueChange={ativarSurpresinha}
                            color="#10B981"
                        />
                    </View>

                    <View style={[Estilo.infoRow, { borderBottomWidth: teimosinha ? 1 : 0 }]}>
                        <Text style={Estilo.infoLabel}>Teimosinha</Text>
                        <Switch
                            value={teimosinha}
                            onValueChange={setTeimosinha}
                            color="#10B981"
                        />
                    </View>

                    {teimosinha && (
                        <View style={{ marginTop: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={Estilo.infoLabel}>Concursos Consecutivos</Text>
                            <View style={{ flexDirection: "row", gap: 8 }}>
                                {[2, 4, 8].map((qtd) => (
                                    <TouchableOpacity
                                        key={qtd}
                                        onPress={() => setConcursosTeimosinha(qtd)}
                                        style={{
                                            backgroundColor: concursosTeimosinha === qtd ? "#10B981" : "#F1F5F9",
                                            paddingVertical: 6,
                                            paddingHorizontal: 12,
                                            borderRadius: 8,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: concursosTeimosinha === qtd ? "#FFFFFF" : "#475569",
                                                fontWeight: "600",
                                                fontSize: 13,
                                            }}
                                        >
                                            {qtd}x
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}
                </View>

                <View style={Estilo.card}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <Text style={Estilo.cardTitle}>Volante (01 a 60)</Text>
                        <Text style={{ color: "#059669", fontWeight: "700", fontSize: 14 }}>
                            {numerosEscolhidos.length} de {quantidadeNumeros}
                        </Text>
                    </View>

                    <View style={Estilo.grid}>
                        {todosNumeros.map((num) => {
                            const isSelected = numerosEscolhidos.includes(num)
                            return (
                                <TouchableOpacity
                                    key={num}
                                    style={[Estilo.ball, isSelected && Estilo.ballSelected]}
                                    onPress={() => toggleNumero(num)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[Estilo.ballText, isSelected && Estilo.ballTextSelected]}>
                                        {num < 10 ? `0${num}` : num}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>

                <TouchableOpacity
                    style={Estilo.button}
                    onPress={handleConfirmar}
                    activeOpacity={0.8}
                >
                    <Text style={Estilo.buttonText}>Confirmar e Realizar Sorteio</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={Estilo.buttonOutline}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.8}
                >
                    <Text style={Estilo.buttonOutlineText}>Voltar para Orientações</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
