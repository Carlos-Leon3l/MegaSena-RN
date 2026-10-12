import React, { createContext, useState, useContext } from "react"

const GameContext = createContext()

export const GameProvider = ({ children }) => {
    const [quantidadeNumeros, setQuantidadeNumeros] = useState(6)
    const [numerosEscolhidos, setNumerosEscolhidos] = useState([7, 13, 24, 35, 42, 59])
    const [surpresinha, setSurpresinha] = useState(false)
    const [teimosinha, setTeimosinha] = useState(false)
    const [concursosTeimosinha, setConcursosTeimosinha] = useState(2)
    const [numeroBilhete, setNumeroBilhete] = useState("MS-749102")
    const [numerosSorteados, setNumerosSorteados] = useState([6, 14, 28, 35, 42, 57])

    const gerarAleatorios = (qtd) => {
        const numeros = new Set()
        while (numeros.size < qtd) {
            const num = Math.floor(Math.random() * 60) + 1
            numeros.add(num)
        }
        return Array.from(numeros).sort((a, b) => a - b)
    }

    const ativarSurpresinha = (ativo) => {
        setSurpresinha(ativo)
        if (ativo) {
            const novosNumeros = gerarAleatorios(quantidadeNumeros)
            setNumerosEscolhidos(novosNumeros)
        }
    }

    const alterarQuantidadeNumeros = (qtd) => {
        setQuantidadeNumeros(qtd)
        if (numerosEscolhidos.length > qtd) {
            setNumerosEscolhidos(numerosEscolhidos.slice(0, qtd))
        } else if (surpresinha) {
            setNumerosEscolhidos(gerarAleatorios(qtd))
        }
    }

    const toggleNumero = (num) => {
        if (surpresinha) {
            setSurpresinha(false)
        }
        if (numerosEscolhidos.includes(num)) {
            setNumerosEscolhidos(numerosEscolhidos.filter((n) => n !== num))
        } else {
            if (numerosEscolhidos.length < quantidadeNumeros) {
                setNumerosEscolhidos([...numerosEscolhidos, num].sort((a, b) => a - b))
            }
        }
    }

    const confirmarAposta = () => {
        const randomCode = Math.floor(100000 + Math.random() * 900000)
        setNumeroBilhete(`MS-${randomCode}`)
        const sorteio = gerarAleatorios(6)
        setNumerosSorteados(sorteio)
    }

    const realizarSorteio = () => {
        const sorteio = gerarAleatorios(6)
        setNumerosSorteados(sorteio)
        return sorteio
    }

    const reiniciarJogo = () => {
        setQuantidadeNumeros(6)
        setNumerosEscolhidos([7, 13, 24, 35, 42, 59])
        setSurpresinha(false)
        setTeimosinha(false)
        setConcursosTeimosinha(2)
        const sorteio = gerarAleatorios(6)
        setNumerosSorteados(sorteio)
        const randomCode = Math.floor(100000 + Math.random() * 900000)
        setNumeroBilhete(`MS-${randomCode}`)
    }

    return (
        <GameContext.Provider
            value={{
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
                numeroBilhete,
                confirmarAposta,
                numerosSorteados,
                realizarSorteio,
                reiniciarJogo,
            }}
        >
            {children}
        </GameContext.Provider>
    )
}

export const useGame = () => useContext(GameContext)
