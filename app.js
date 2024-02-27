const sentenceElement = document.getElementById('sentence');
const selectionElement = document.getElementById('selection');
const selectionBox = document.getElementById('selectionBox');
const hContainer = new Hammer(document.getElementById('selectionContainer'));
const hSentence = new Hammer(sentenceElement);
const hSelection = new Hammer(selectionElement);

let sentence = '';
let insertHistory = [];
const dictionary = ['I', 'me', 'you', 'nurse', 'doctor', 'mum', 'dad', 'is', 'are', 'do', 'bed', 'tissue', 'mouth', 'head', 'leg', 'foot', 'arm', 'neck', 'eye', 'left', 'right', 'hurt', 'pain', 'itch', 'toilet', 'nose', 'can', 'my', 'drink', 'juice', 'food', 'feels', 'cold', 'in', 'hot', 'want', 'need', 'a', 'please', 'hand', 'finger', 'thirsty', 'hungry', 'chocolate', 'phone', 'charger', 'teddy', 'Cheddar', 'chest', 'wet', 'hair', 'brush', 'teeth', 'ask', 'tell', 'speak', 'to', 'the'];
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const punctuation = [['Space',' '],['Full Stop', '.'],['Comma', ','],['Apostraphe', '\''],['Exclamation Mark', '!'],['Question Mark', '?'], ['Pound Sign', '£']];

function renderSentence() {
        sentenceElement.textContent = sentence;
}

function renderSelectionDictionary() {
        selectionElement.innerHTML = '';
        dictionary.sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'})).forEach(word => {
                const wordBtn = document.createElement('li');
                wordBtn.textContent = word;
                selectionElement.appendChild(wordBtn);
        });
        punctuation.forEach(renderSelectionPunctuation);
}

function renderSelectionAlphabet() {
        selectionElement.innerHTML = '';
        alphabet.forEach(letter => {
                const wordBtn = document.createElement('li');
                wordBtn.textContent = letter;
                wordBtn.dataset.trimAfter = true;
                selectionElement.appendChild(wordBtn);
        });
        punctuation.forEach(renderSelectionPunctuation);
}

function renderSelectionPunctuation(symbol, index) {
        const wordBtn = document.createElement('li');
        wordBtn.textContent = '(' + symbol[0] + ')';
        wordBtn.dataset.trueVal = symbol[1];
        if(index < 6) 
                wordBtn.dataset.trimBefore = true; // Remove spacing preceding this punctuation mark
        if(index === 3 || index === 6) 
                wordBtn.dataset.trimAfter = true; // Remove spacing following this punctuation mark
        selectionElement.appendChild(wordBtn);
}

//hSelection.on('swiperight', insertSelection);
hContainer.on('swiperight', insertSelection);
hSentence.on('swiperight', copyToClipboard);
//hSelection.on('swipeleft', undo);
hContainer.on('swipeleft', undo);


function insertSelection() {
        const boxRect = selectionBox.getBoundingClientRect();
        const elements = document.elementsFromPoint(boxRect.x+5, boxRect.y+5);
        if(elements[1].dataset.trimBefore) sentence = sentence.trim();
        insertHistory.push(sentence.length);
        sentence += elements[1].dataset.trueVal || elements[1].textContent;
        if(!elements[1].dataset.trimAfter) sentence += ' ';
        renderSentence();
}

function undo() {
        if (insertHistory.length) {
                sentence = sentence.slice(0, insertHistory.pop());
                renderSentence();
        }
}

function copyToClipboard() {
        navigator.clipboard.writeText(sentence);
        sentenceElement.classList.add('clipped');
        window.setTimeout(() => {sentenceElement.classList.remove('clipped');}, 300);
}

renderSentence();
renderSelectionDictionary();
