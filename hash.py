# ============================================================
# DESAFIO: ENCONTRANDO DUAS PALAVRAS COM O MESMO HASH
# ============================================================
# Função de hash baseada na soma dos valores ASCII dos caracteres.
# Duas palavras diferentes podem gerar o mesmo valor.
# ============================================================

import os


# ------------------------------------------------------------
# CORES DO TERMINAL
# ------------------------------------------------------------

AZUL = "\033[94m"
AZUL_ESCURO = "\033[34m"
CIANO = "\033[96m"
BRANCO = "\033[97m"
VERDE = "\033[92m"
VERMELHO = "\033[91m"
RESET = "\033[0m"


# ------------------------------------------------------------
# FUNÇÃO DE HASH
# ------------------------------------------------------------

def calcula_hash(senha):
    """
    Calcula o hash somando o valor ASCII de cada caractere.
    """
    valor = 0

    for letra in senha:
        valor = valor + ord(letra)

    return valor


# ------------------------------------------------------------
# FUNÇÃO PARA ENCONTRAR UMA COLISÃO
# ------------------------------------------------------------

def encontrar_colisao(palavras):
    """
    Procura duas palavras diferentes que tenham o mesmo hash.
    """

    hashes = {}

    for palavra in palavras:
        valor_hash = calcula_hash(palavra)

        # Verifica se esse hash já apareceu
        if valor_hash in hashes:

            # Garante que as palavras sejam diferentes
            if hashes[valor_hash] != palavra:
                return hashes[valor_hash], palavra, valor_hash

        else:
            hashes[valor_hash] = palavra

    return None


# ------------------------------------------------------------
# LISTA DE PALAVRAS PARA TESTE
# ------------------------------------------------------------

palavras = [
    "ola",
    "alo",
    "sol",
    "los",
    "amor",
    "roma",
    "casa",
    "saca",
    "teste",
    "estet",
    "python",
    "typhon"
]


# ------------------------------------------------------------
# LIMPA A TELA
# ------------------------------------------------------------

os.system("cls" if os.name == "nt" else "clear")


# ------------------------------------------------------------
# CABEÇALHO
# ------------------------------------------------------------

print(AZUL + "=" * 60 + RESET)
print(AZUL + "        DESAFIO DE HASH - COLISÃO DE VALORES" + RESET)
print(AZUL + "=" * 60 + RESET)

print()
print(CIANO + "Função utilizada:" + RESET)
print(BRANCO + "calcula_hash(senha) = soma dos valores ASCII" + RESET)

print()
print(AZUL + "-" * 60 + RESET)


# ------------------------------------------------------------
# MOSTRA OS HASHES DAS PALAVRAS
# ------------------------------------------------------------

print(CIANO + "\nHashes calculados:\n" + RESET)

for palavra in palavras:
    resultado = calcula_hash(palavra)

    print(
        f"{AZUL}{palavra:<15}{RESET}"
        f" -> hash: {BRANCO}{resultado}{RESET}"
    )


# ------------------------------------------------------------
# PROCURA UMA COLISÃO
# ------------------------------------------------------------

colisao = encontrar_colisao(palavras)


print()
print(AZUL + "-" * 60 + RESET)


if colisao:

    palavra1, palavra2, valor_hash = colisao

    print(VERDE + "\nCOLISÃO ENCONTRADA!\n" + RESET)

    print(f"{BRANCO}Palavra 1:{RESET} {CIANO}{palavra1}{RESET}")
    print(f"{BRANCO}Palavra 2:{RESET} {CIANO}{palavra2}{RESET}")

    print()
    print(
        f"{BRANCO}Hash de '{palavra1}':{RESET} "
        f"{AZUL}{calcula_hash(palavra1)}{RESET}"
    )

    print(
        f"{BRANCO}Hash de '{palavra2}':{RESET} "
        f"{AZUL}{calcula_hash(palavra2)}{RESET}"
    )

    print()
    print(
        VERDE
        + f"As duas palavras possuem o mesmo hash: {valor_hash}"
        + RESET
    )

else:

    print(
        VERMELHO
        + "\nNenhuma colisão foi encontrada."
        + RESET
    )


# ------------------------------------------------------------
# FINAL
# ------------------------------------------------------------

print()
print(AZUL + "=" * 60 + RESET)
print(CIANO + "Desafio concluído!" + RESET)
print(AZUL + "=" * 60 + RESET)
