const audioContext = new (window.AudioContext || window.webkitAudioContext)()

let oscillator

const wave = document.querySelector('#waveType')

const charDuration = document.querySelector('#charDuration')
const charDelay = document.querySelector('#delay')
const durationVal = document.querySelector('#durationVal')
const delayVal = document.querySelector('#delayVal')

charDuration.addEventListener('input', ({ target }) => {
    durationVal.textContent = target.value
})

charDelay.addEventListener('input', ({ target }) => {
    delayVal.textContent = target.value
})

const lowFreq = document.querySelector('#downFreq')
const highFreq = document.querySelector('#upFreq')
const highVal = document.querySelector('#upVal')
const lowVal = document.querySelector('#downVal')

lowFreq.addEventListener('input', ({ target }) => {
    lowVal.textContent = target.value
})
highFreq.addEventListener('input', ({ target }) => {
    highVal.textContent = target.value
})

const playArray = arr => {
    let t = 0.0
    oscillator.frequency.value = 600
    oscillator.start()
    for (a in arr) {
        if (arr[a] == true) {
            oscillator.stop(audioContext.currentTime + t)
            oscillator.frequency.setValueAtTime(highFreq.value, audioContext.currentTime + t)
            // oscillator.start()
        } else if (arr[a] == false) {
            oscillator.stop(audioContext.currentTime + t)
            oscillator.frequency.setValueAtTime(lowFreq.value, audioContext.currentTime + t)
        }
        else {
            oscillator.stop(audioContext.currentTime + t)
            oscillator.frequency.setValueAtTime(0, audioContext.currentTime + t)
            t += parseFloat(charDelay.value)
        }
        t += parseFloat(charDuration.value)
    }
}


// playArray([true, false, true, false, true, false])

const encode = code => {
    return code.split('').reduce((prev, cur) => {
        // console.log(prev)
        return prev.concat(codes[cur.toUpperCase()], null)
    }, [])
}

const codes = {
    'A': [false, true],
    'B': [true, false, false, false],
    'C': [true, false, true, false],
    'D': [true, false, false],
    'E': [false],
    'F': [false, false, true, false],
    'G': [true, true, false],
    'H': [false, false, false, false],
    'I': [false, false],
    'J': [false, true, true, true],
    'K': [true, false, true],
    'L': [false, true, false, false],
    'M': [true, true],
    'N': [true, false],
    'O': [true, true, true],
    'P': [false, true, true, false],
    'Q': [true, true, false, true],
    'R': [false, true, false],
    'S': [false, false, false],
    'T': [true],
    'U': [false, false, true],
    'V': [false, false, false, true],
    'W': [false, true, true],
    'X': [true, false, false, true],
    'Y': [true, false, true, true],
    'Z': [true, true, false, false],
    '1': [false, true, true, true, true],
    '2': [false, false, true, true, true],
    '3': [false, false, false, true, true],
    '4': [false, false, false, false, true],
    '5': [false, false, false, false, false],
    '6': [true, false, false, false, false],
    '7': [true, true, false, false, false],
    '8': [true, true, true, false, false],
    '9': [true, true, true, true, false],
    '0': [true, true, true, true, true],
    ' ': []
}

// encode('SOS')
const output = document.querySelector('span#output')
output.addEventListener('click', ({ target, clientX, clientY }) => {
    if (target.textContent) {
        navigator.clipboard.writeText(target.textContent)
        displayInfo("copied")
        info.style.left = clientX + "px"
        info.style.top = clientY + "px"
    }
})

const input = document.querySelector('#inputText')

document.querySelector('button').addEventListener('click', e => {
    oscillator = audioContext.createOscillator()
    oscillator.type = wave.value
    oscillator.connect(audioContext.destination)
    oscillator.onended = () => {
        oscillator.disconnect()
    }

    const code = encode(input.value)
    output.textContent = code.map(c => c == true ? '-' : c == false ? '.' : ' ').join('')
    playArray(code)
})

const info = document.querySelector('span#info')

document.querySelector('span#output').addEventListener('mousemove', ({ clientX: x, clientY: y }) => {
    info.style.left = x + "px"
    info.style.top = y + "px"
})

function displayInfo(text) {
    info.style.display = "inline"
    info.textContent = text
    setTimeout(() => {
        info.textContent = ""
        info.style.display = "none"
    }, 2000)
}



