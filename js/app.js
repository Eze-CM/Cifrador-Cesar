// 
const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z']

const cipher = document.getElementById('cipher')
const originInput = document.getElementById('origin-input')
const result = document.getElementById('result')
const range = document.getElementById('range')

// Logic

const shiftMessage = () => {
    const wordArray = [...originInput.value.toUpperCase()]
    printChar(0, wordArray)
}


const printChar = (currentLetterIndex, wordArray) => {
    if(currentLetterIndex >= wordArray.length) return;      // Se detiene cuando se haya procesado todo el wordArray

    originInput.value = originInput.value.substring(1)

    const spanChar = document.createElement("span");
    result.appendChild(spanChar);

    animateChar(spanChar)
        .then( () => {
            const unmodChar = wordArray[currentLetterIndex];
            spanChar.innerHTML = alphabet.includes(unmodChar) ? 
                alphabet[(alphabet.indexOf(unmodChar) + parseInt(range.value)) % alphabet.length] : 
                unmodChar
            printChar(currentLetterIndex + 1, wordArray);
        });
}


const animateChar = spanChar => {
    let letterChanges = 0

    return new Promise(resolve => {
        const interval = setInterval(() => {
            spanChar.innerHTML = alphabet[Math.floor(Math.random() * alphabet.length)];
            letterChanges++;

            if(letterChanges >= 3) {
                clearInterval(interval);
                resolve();
            }
        }, 50);
    });
}

const empty = result => {
    if (result.innerHTML === '') {
        const enterMessage = document.createElement("span");
        enterMessage.textContent = "Y presione Enter para traducir...";
        result.appendChild(enterMessage);
    }
}


const submit = e => {
    e.preventDefault();
    
    if (originInput.value === '') {                         // Si el campo está vacío, muestra un mensaje de error
        alert("Por favor, ingrese un texto para cifrar.");
    } else {                                                // Si no está vacío, realizar el cifrado
        result.innerHTML = '';
        shiftMessage();
    }
}

empty(result)
cipher.onsubmit = submit;
