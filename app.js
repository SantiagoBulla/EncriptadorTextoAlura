let letraE = "enter";
let letraI = "imes";
let letraA = "ai";
let letraO = "ober";
let letraU = "ufat";

let regex = /^[a-zA-Z\s]*$/;
let errorFormato = '¡Texto no valido! \nEl texto contiene letras mayúsculas o acentos especiales, por favor ingrese palabras en minúsculas y sin acentos.';
let letrasEquivalentes = {
    "enter": "e",
    "imes": "i",
    "ai": "a",
    "ober": "o",
    "ufat": "u"
};

function validarTexto(texto) {
    return texto.toLowerCase() === texto && regex.test(texto.toLowerCase());
}

function encriptarTexto(texto) {
    let fraseEncriptada = [];
    texto.split('').map(letra => {
        switch (letra) {
            case 'a':
                fraseEncriptada.push(letraA);
                break;
            case 'e':
                fraseEncriptada.push(letraE);
                break;
            case 'i':
                fraseEncriptada.push(letraI);
                break;
            case 'o':
                fraseEncriptada.push(letraO);
                break;
            case 'u':
                fraseEncriptada.push(letraU);
                break;
            default:
                fraseEncriptada.push(letra);
                break;
        }
    });
    return fraseEncriptada.join('');
}

function desencriptarTexto(texto) {
    let textoDesencriptado = texto;
    for (let llave in letrasEquivalentes) {
        // Utilizamos una expresión regular global (/g) para reemplazar todas las coincidencias
        let regex = new RegExp(llave, "g");
        textoDesencriptado = textoDesencriptado.replace(regex, letrasEquivalentes[llave]);
    }
    return textoDesencriptado;
}

function validarTextoDesencriptar(texto) {
    let textoValidoParaDesencriptar = false;
    if (texto.includes(letraA) || texto.includes(letraE) || texto.includes(letraI) || texto.includes(letraO) || texto.includes(letraU)) {
        textoValidoParaDesencriptar = true;
    }
    return textoValidoParaDesencriptar;
}

function encriptar() {
    let textoIngresado = document.getElementById('user-text').value;
    let textoValido = validarTexto(textoIngresado);
    let textoEncriptado = validarTextoDesencriptar(textoIngresado);
    if (!textoEncriptado) {
        if (textoValido) {
            // Oculta el div con la clase "noText"
            document.querySelector('.noText').style.display = 'none';
            // Muestra el div con la clase "text" y el button copy
            document.querySelector('.text').style.display = 'block';

            let textEncriptado = encriptarTexto(textoIngresado);
            document.querySelector('.text').innerHTML = `<p class='visualization-text'>` + textEncriptado + '</p>';
            document.getElementById('button-copy').style.display = 'block';
        } else {
            alert(errorFormato);
        }
    } else {
        alert('¡Texto no valido! \nEl texto ya se encuentra encriptado, por favor intente con un texto no encriptado');
    }

}

function desencriptar() {
    let textoIngresado = document.getElementById('user-text').value;
    if (validarTexto(textoIngresado)) {
        if (validarTextoDesencriptar(textoIngresado)) {
            // Oculta el div con la clase "noText"
            document.querySelector('.noText').style.display = 'none';
            // Muestra el div con la clase "text" y el button copy
            document.querySelector('.text').style.display = 'block';

            let textDesencriptado = desencriptarTexto(textoIngresado);
            document.querySelector('.text').innerHTML = '<p>' + textDesencriptado + '</p>';
            document.getElementById('button-copy').style.display = 'block';
        } else {
            alert('¡Texto no valido! \nEl Texto no se encuentra encriptado');
        }
    } else {
        alert(errorFormato);
    }
}

function copiarTexto() {
    let textoParaCopiar = document.querySelector('.visualization-text').innerText;
    navigator.clipboard.writeText(textoParaCopiar)
        .then(() => {
            alert('Texto copiado con éxito');
        })
        .catch(err => {
            alert('Error al copiar texto al portapapeles: ', err);
        });
}