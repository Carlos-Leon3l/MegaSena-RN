import React from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import Estilo from "../styles/Estilo"
import { useGame } from "../context/GameContext"

export default ({ navigation }) => {
    const {
        numerosEscolhidos,
        numerosSorteados,
        numeroBilhete,
        reiniciarJogo,
    } = useGame()

    const acertos = numerosEscolhidos.filter((n) => numerosSorteados.includes(n))
    const qtdAcertos = acertos.length

    const obterInfoPremiacao = () => {
        if (qtdAcertos === 6) {
            return {
                badge: "SENA",
                titulo: "Parabéns! Prêmio Máximo!",
                mensagem: "Você acertou todas as 6 dezenas sorteadas da Mega-Sena.",
            }
        }
        if (qtdAcertos === 5) {
            return {
                badge: "QUINA",
                titulo: "Excelente! Aposta Premiada!",
                mensagem: "Você acertou 5 dezenas e conquistou a premiação da Quina.",
            }
        }
        if (qtdAcertos === 4) {
            return {
                badge: "QUADRA",
                titulo: "Aposta Premiada!",
                mensagem: "Você acertou 4 dezenas e garantiu a premiação da Quadra.",
            }
        }
        return {
            badge: "NÃO PREMIADO",
            titulo: "Não foi dessa vez!",
            mensagem: `Você acertou ${qtdAcertos} ${qtdAcertos === 1 ? "dezena" : "dezenas"}. Tente novamente no próximo sorteio.`,
        }
    }

    const premiacao = obterInfoPremiacao()

    const handleNovoJogo = () => {
        reiniciarJogo()
        navigation.navigate("Tela2")
    }

    const handleVoltarInicio = () => {
        reiniciarJogo()
        navigation.navigate("Tela1")
    }

    return (
        <View style={Estilo.container}>
            <ScrollView contentContainerStyle={Estilo.scroll} showsVerticalScrollIndicator={false}>
                <View style={Estilo.header}>
                    <Text style={Estilo.title}>Resultado da Aposta</Text>
                    <Text style={Estilo.subtitle}>Bilhete {numeroBilhete}</Text>
                </View>

                <View style={Estilo.resultCard}>
                    <View style={Estilo.resultBadge}>
                        <Text style={Estilo.resultBadgeText}>{premiacao.badge}</Text>
                    </View>
                    <Text style={Estilo.resultTitle}>{premiacao.titulo}</Text>
                    <Text style={Estilo.resultText}>{premiacao.mensagem}</Text>
                </View>

                <View style={Estilo.card}>
                    <Text style={Estilo.cardTitle}>Dezenas Sorteadas</Text>
                    <View style={Estilo.ballsRow}>
                        {numerosSorteados.map((num) => {
                            const acertou = acertos.includes(num)
                            return (
                                <View
                                    key={num}
                                    style={[Estilo.drawnBall, acertou && Estilo.hitBall]}
                                >
                                    <Text style={[Estilo.drawnBallText, acertou && Estilo.hitBallText]}>
                                        {num < 10 ? `0${num}` : num}
                                    </Text>
                                </View>
                            )
                        })}
                    </View>
                </View>

                <View style={Estilo.card}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <Text style={Estilo.cardTitle}>Sua Aposta</Text>
                        <Text style={{ color: "#059669", fontWeight: "700" }}>
                            {qtdAcertos} {qtdAcertos === 1 ? "acerto" : "acertos"}
                        </Text>
                    </View>

                    <View style={Estilo.ballsRow}>
                        {numerosEscolhidos.map((num) => {
                            const acertou = acertos.includes(num)
                            return (
                                <View
                                    key={num}
                                    style={[
                                        Estilo.ball,
                                        Estilo.ballSelected,
                                        acertou && Estilo.hitBall,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            Estilo.ballTextSelected,
                                            acertou && Estilo.hitBallText,
                                        ]}
                                    >
                                        {num < 10 ? `0${num}` : num}
                                    </Text>
                                </View>
                            )
                        })}
                    </View>
                </View>

                <TouchableOpacity
                    style={Estilo.button}
                    onPress={handleNovoJogo}
                    activeOpacity={0.8}
                >
                    <Text style={Estilo.buttonText}>Fazer Novo Jogo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={Estilo.buttonOutline}
                    onPress={handleVoltarInicio}
                    activeOpacity={0.8}
                >
                    <Text style={Estilo.buttonOutlineText}>Voltar para o Início</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
