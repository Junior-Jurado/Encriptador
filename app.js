document.addEventListener('DOMContentLoaded', (evento) => {
    const areaDeTexto = document.getElementById('textoUsuario');
    areaDeTexto.addEventListener('focus', function() {
        if (this.value === 'Ingrese el texto aquí') {
            this.value = '';
        }
    });

    areaDeTexto.addEventListener('blur', function() {
        if (this.value === '') {
            this.value = 'Ingrese el texto aquí';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const areaDeTexto = document.getElementById('textoUsuario');
    const notaTexto = document.querySelector('.presentacion__input__submit__nota p');
    const notaLogo = document.querySelector('.presentacion__input__submit__nota__logo');

    areaDeTexto.addEventListener('input', function() {
        if (this.value.trim() === '') {
            notaTexto.textContent = 'Solo letras minúsculas y sin acentos';
            notaTexto.style.color = '#0A3871'; 
            notaLogo.src = './assets/Importante.png'; 
            document.querySelector('.presentacion__output').style.display = 'block';
            document.querySelector('.presentacion__output__info__titulo').style.display = 'block';
            document.querySelector('.presentacion__output__info__texto').style.display = 'block';
            document.querySelector('.presentacion__output__info__resultado').style.display = 'none';

        } else {
            if (validarPalabras(this.value)) {
                notaTexto.style.color = '#006400';
                notaTexto.textContent = 'El texto ingresado es válido';
                notaLogo.src = './assets/checkmark.png';
            } else {
                notaTexto.style.color = 'red';
                notaTexto.textContent = 'Introduzca solo letras minúsculas, sin acentos ni caracteres especiales';
                notaLogo.src = './assets/xmark.png';
            }
        }
    });
});


function obtenerPalabras(numero) {
    let palabras = document.getElementById('textoUsuario').value;
    bandera = validarPalabras(palabras)
    if (bandera && numero == 0) {
        palabrasEncriptadas = encriptarPalabras(palabras);
        document.querySelector('.presentacion__output__info__resultado').textContent = palabrasEncriptadas;
        document.getElementById('textoUsuario').value = palabrasEncriptadas;
        document.querySelector('.presentacion__output__imagen').style.display = 'none';
        document.querySelector('.presentacion__output__info__titulo').style.display = 'none';
        document.querySelector('.presentacion__output__info__texto').style.display = 'none';
    } else if (bandera && numero == 1) {
        palabrasDesencriptadas = desencriptarPalabras(palabras);
        document.querySelector('.presentacion__output__info__resultado').textContent = palabrasDesencriptadas;
        document.getElementById('textoUsuario').value = palabrasDesencriptadas;
    }
    
}

function validarPalabras(texto) {
    const regex = /^[a-z\s]+$/;
    return regex.test(texto);
}

function encriptarPalabras(texto) {
    let textoEncriptado = '';
    for (let i = 0; i < texto.length; i++) {
        let letra = texto[i];
        switch (letra) {
            case 'a':
                textoEncriptado += "ai"
                break;

            case 'e':
                textoEncriptado += "enter"
                break;

            case 'i':
                textoEncriptado += "imes"
                break;

            case 'o':
                textoEncriptado += "ober"
                break;
                
            case 'u':
                textoEncriptado += "ufat"
                break;
        
            default:
                textoEncriptado += letra;
                break;
        }
        
    }
    return textoEncriptado;
    
}

function desencriptarPalabras(texto) {
    const palabrasClave = ["ai", "enter", "imes", "ober", "ufat"];
    const reglasReemplazo = {
        "ai": "a",
        "enter": "e",
        "imes": "i",
        "ober": "o",
        "ufat": "u"
    };

    for (let palabra of palabrasClave) {
        let posicion = texto.indexOf(palabra);
        while (posicion !== -1) {
            texto = texto.slice(0, posicion) + reglasReemplazo[palabra] + texto.slice(posicion + palabra.length);
            posicion = texto.indexOf(palabra, posicion + reglasReemplazo[palabra].length);
        }
    }

    return texto;
}

function asignarTextoAElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}
