const output = document.querySelector('.presentacion__output');
const resultado = document.querySelector('.presentacion__output__resultado');

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
            output.style.display = 'flex';
            resultado.style.display = 'none';

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
        resultado.style.display = 'flex';
        document.querySelector('.presentacion__output__resultado__texto').textContent  = palabrasEncriptadas;
        output.style.display = 'none';
    } else if (bandera && numero == 1) {
        palabrasDesencriptadas = desencriptarPalabras(palabras);
        resultado.style.display = 'flex';
        document.querySelector('.presentacion__output__resultado__texto').textContent = palabrasDesencriptadas;
        output.style.display = 'none';
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

function copiarTexto() {
    const copy = document.querySelector('.presentacion__output__resultado__texto');

    // Verificación de que el elemento existe y tiene texto
    if (copy) {
        // Obtener el texto dentro del elemento
        const texto = copy.textContent.trim();

        // Intentar copiar el texto al portapapeles
        navigator.clipboard.writeText(texto)
            .then(() => {
                console.log('Texto copiado al portapapeles: ' + texto);
                const botonCopiar = document.querySelector('.presentacion__output__resultado__button');
                botonCopiar.textContent = 'Copiado';
                botonCopiar.style.backgroundColor = 'var(--color-cuaternario)';
                botonCopiar.style.color = 'white';

                // Después de 1 segundo, volver el texto y color original del botón
                setTimeout(() => {
                    botonCopiar.textContent = 'Copiar';
                    botonCopiar.style.backgroundColor = 'transparent';
                    botonCopiar.style.color = 'var(--color-secundario)';
                    botonCopiar.style.border = '2px solid var(--color-secundario)';
                }, 1000);
            })
            .catch(err => {
                console.error('Error al intentar copiar el texto: ', err);
            });
    } else {
        console.error('No se encontró ningún elemento con la clase especificada.');
    }
}