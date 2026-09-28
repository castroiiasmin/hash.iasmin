/* =========================================================
   FUNÇÃO DE HASH
========================================================= */

function calculaHash(senha) {

    let valor = 0;

    for (let letra of senha) {
        valor = valor + letra.charCodeAt(0);
    }

    return valor;
}


/* =========================================================
   CALCULAR HASH DE UMA PALAVRA
========================================================= */

function calcularHash() {

    const campo = document.getElementById("palavra");

    const palavra = campo.value.trim();

    const resultado = document.getElementById("resultado");

    const valorHash = document.getElementById("valorHash");

    const asciiList = document.getElementById("asciiList");


    // Verifica se o usuário digitou pelo menos duas letras
    if (palavra.length < 2) {

        alert(
            "Digite uma palavra com pelo menos duas letras."
        );

        campo.focus();

        return;
    }


    // Calcula o hash
    const hash = calculaHash(palavra);


    // Mostra o resultado
    valorHash.textContent = hash;


    // Limpa a lista anterior
    asciiList.innerHTML = "";


    // Mostra cada caractere e seu valor ASCII
    for (let letra of palavra) {

        const codigo = letra.charCodeAt(0);

        const item = document.createElement("div");

        item.className = "ascii-item";

        item.innerHTML = `
            <span>
                Caractere:
                <strong class="ascii-character">
                    ${escapeHTML(letra)}
                </strong>
            </span>

            <span>
                ASCII:
                <strong>
                    ${codigo}
                </strong>
            </span>
        `;

        asciiList.appendChild(item);
    }


    // Exibe a caixa de resultado
    resultado.classList.remove("hidden");


    // Pequeno efeito visual
    resultado.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}


/* =========================================================
   ENCONTRAR COLISÃO
========================================================= */

function encontrarColisao() {

    /*
        Como a função simplesmente soma os valores ASCII,
        palavras com as mesmas letras em ordens diferentes
        produzem o mesmo resultado.

        Exemplos:
        "ola" = 111 + 108 + 97
        "alo" = 97 + 108 + 111

        Portanto:
        hash("ola") = hash("alo")
    */


    const palavras = [

        "ola",
        "alo",

        "amor",
        "roma",

        "casa",
        "saca",

        "sol",
        "los",

        "mar",
        "ram",

        "pato",
        "tapo",

        "gato",
        "toga",

        "vida",
        "davi",

        "mesa",
        "sema",

        "bola",
        "alob"
    ];


    const hashes = {};


    for (let palavra of palavras) {

        const hash = calculaHash(palavra);


        // Verifica se o hash já apareceu
        if (hashes[hash]) {

            const palavraAnterior = hashes[hash];


            // Garante que sejam palavras diferentes
            if (palavraAnterior !== palavra) {

                mostrarColisao(
                    palavraAnterior,
                    palavra,
                    hash
                );

                return;
            }
        }


        // Guarda a palavra e seu hash
        hashes[hash] = palavra;
    }


    alert(
        "Nenhuma colisão foi encontrada."
    );
}


/* =========================================================
   MOSTRAR RESULTADO DA COLISÃO
========================================================= */

function mostrarColisao(
    palavra1,
    palavra2,
    hash
) {

    const resultado =
        document.getElementById("colisao");

    const campoPalavra1 =
        document.getElementById("palavra1");

    const campoPalavra2 =
        document.getElementById("palavra2");

    const campoHash1 =
        document.getElementById("hash1");

    const campoHash2 =
        document.getElementById("hash2");

    const campoHashColisao =
        document.getElementById("hashColisao");


    campoPalavra1.textContent = palavra1;

    campoPalavra2.textContent = palavra2;

    campoHash1.textContent =
        calculaHash(palavra1);

    campoHash2.textContent =
        calculaHash(palavra2);

    campoHashColisao.textContent =
        hash;


    resultado.classList.remove("hidden");


    resultado.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


/* =========================================================
   PERMITIR ENTER NO CAMPO
========================================================= */

document
    .getElementById("palavra")
    .addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                calcularHash();
            }
        }
    );


/* =========================================================
   PROTEÇÃO SIMPLES PARA TEXTO INSERIDO NO HTML
========================================================= */

function escapeHTML(texto) {

    return texto
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
