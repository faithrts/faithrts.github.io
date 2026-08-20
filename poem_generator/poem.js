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


function displayLine(line, last_line = false) {
    line = titleCase(line)

    var poem = document.getElementById("poem-div")
    var new_line = document.createElement("p")

    if(last_line) {
        new_line.style.paddingLeft = "1em";
    }

    new_line.appendChild(document.createTextNode(line))
    poem.appendChild(new_line)
}


async function generatePoem() {
    await initPoemWords()
    line_count = 0

    displayLine(openingLine())
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
