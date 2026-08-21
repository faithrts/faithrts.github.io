let words_container = {}

async function initPoemWords() {
    try {
        const response = await fetch('../poem_generator/poem_words.json');
        const data = await response.json();

        words_container = data
        // creates dictionary of key:list[str]
        for (let key in data){
            let words_string = data[key]
            words_container[key] = splitOnComma(words_string)
        }
        console.log(words_container)
    }
    catch(error) {
        console.error('Error loading poem words:', error);
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function displayLine(line, last_line = false) {
    line = titleCase(line)

    var poem = document.getElementById("poem-div")
    var new_line = document.createElement("p")

    if(last_line) {
        new_line.style.paddingLeft = "1em";
    }

    new_line.appendChild(document.createTextNode(line))
    poem.appendChild(new_line)

    await sleep(2000);
}


async function addEmptyLine() {
    var poem = document.getElementById("poem-div")
    var new_empty_line = document.createElement("br")

    poem.appendChild(new_empty_line)

    await sleep(2000);
}


async function generatePoem() {
    await initPoemWords()

    displayLine(openingLine())
    displayLine(parallelismLine())

    for (let i = 0; i < choiceFromList([1, 1, 1, 2]); i++) {
        displayLine(questionLine())
    }

    addEmptyLine()

    for (let i = 0; i < choiceFromList([1, 1, 1, 1, 1, 1, 2, 3]); i++) {
        displayLine(twoWordLine())
    }

    displayLine(fourWordLine())

    addEmptyLine()

    displayLine(emDashLine())

    addEmptyLine()
}

// 

function splitOnComma(string) {
    return string.split(",")
}

function choiceFromList(list) {
    let list_length = list.length
    return list[Math.floor(Math.random() * list_length)]
}

function titleCase(string) {
    var first_letter = string[0].toUpperCase()
    var rest_of_line = string.slice(1)
    return `${first_letter}${rest_of_line}`
}

function getWordFromList(wordlist_name) {
    if ((wordlist = getWordList(wordlist_name))) {
        return choiceFromList(wordlist)
    }
    else {
        return ""
    }
}

function getWordList(name) {
    if (name in words_container) {
        return words_container[name]
    }
    return []
}

//

// [verb] [direction] towards/at/: [adj] [noun]
function openingLine() {
    let verb = getWordFromList("see_verbs")
    let direction = getWordFromList("directions")
    let adj = getWordFromList("sky_adjs")
    let noun = getWordFromList("abstract_nouns")
    let t = choiceFromList([" towards", " at", ":"])

    return `${verb} ${direction}${t} ${adj} ${noun}s`
}

// [gerund] [noun]s; [gerund] [noun]s
function parallelismLine() {
    let gerund = getWordFromList("gerunds")
    let noun = getWordFromList("blue_nouns")

    if (choiceFromList([0, 1])) {
        let gerund_2 = getWordFromList("gerunds")
        let noun_2 = getWordFromList("blue_nouns")
        if (choiceFromList([0, 1])) {
            noun = `${noun}s`
            noun_2 = `${noun_2}s`
        }
        return `${gerund} ${noun}, ${gerund_2} ${noun_2}`
    }
    else {
        return `${gerund} ${noun}s`
    }
}

// [q] do [adj] [noun]s [verb] / [are you sure] [noun]s [verb]s
function questionLine() {
    let adj = getWordFromList("earth_adjs")
    let noun = getWordFromList("blue_nouns")
    let verb = getWordFromList("q_verbs")

    if (choiceFromList([0, 1])) {
        let q = getWordFromList("q_alt")
        return `${q} ${noun}s ${verb}?`
    }
    else {
        let q = getWordFromList("q")
        return `${q} do ${adj} ${noun}s ${verb}?`
    }
}

// [noun]s [verb] / [time]: [noun]
function twoWordLine() {
    let noun = getWordFromList("abstract_nouns")
    if (choiceFromList([0, 1])) {
        return `${noun}s ${verb}`
    }
    else {
        let time = getWordFromList("time_words")
        return `${time}: ${noun}`
    }
}

// [noun]s [verb] the [place] / the [noun] [verb]s [adverb]
function fourWordLine() {
    let verb = getWordFromList("do_verbs")

    if (choiceFromList([0, 1])) {
        let noun = getWordFromList("abstract_nouns")
        let place = getWordFromList("place_nouns")
        return `${noun}s ${verb} the ${place}`
    }
    else {
        let noun = getWordFromList("blue_nouns")
        let adverb = getWordFromList("adverbs")
        return `The ${noun} ${verb}s ${adverb}`
    }
}

// [verb] the [adj] [noun] from [gerund] / [verb] the [adj] [gerund] [noun]
function emDashLine() {
    let adj = getWordFromList("sky_adjs")
    let noun = getWordFromList("abstract_nouns")
    let gerund = getWordFromList("gerunds")

    if (choiceFromList([0, 1, 1, 1, 1, 1])) {
        let verb = getWordFromList("imperative_verbs_stop")
        return `${verb} the ${adj} ${noun} from ${gerund} --`
    }
    else {
        let verb = getWordFromList("imperative_verbs_start")
        return `${verb} the ${adj} ${gerund} ${noun} --`
    }
}