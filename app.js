const sentenceElement = document.getElementById('sentence');
const selectionElement = document.getElementById('selection');
const selectionBox = document.getElementById('selectionBox');
const hammer = new Hammer(selectionElement);

let sentence = '';
const dictionary = ['I', 'me', 'you', 'nurse', 'doctor', 'mum', 'dad', 'is', 'are', 'do', 'bed', 'tissue', 'mouth', 'head', 'leg', 'foot', 'arm', 'neck', 'eye', 'left', 'right', 'hurt', 'pain', 'itch', 'toilet', 'nose', 'can', 'my', 'drink', 'juice', 'food', 'feels', 'cold', 'in', 'hot', 'want', 'need', 'a', 'please', 'hand', 'finger', 'thirsty', 'hungry', 'chocolate', 'phone', 'charger', 'teddy', 'Cheddar', 'chest', 'wet', 'hair', 'brush', 'teeth'];
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

hammer.on('swiperight', function () {
        const boxRect = selectionBox.getBoundingClientRect();
        const elements = document.elementsFromPoint(boxRect.x+5, boxRect.y+5);
        if(elements[1].dataset.trimBefore) sentence = sentence.trim();
        sentence += elements[1].dataset.trueVal || elements[1].textContent;
        if(!elements[1].dataset.trimAfter) sentence += ' ';
        renderSentence();
});

hammer.on('swipeleft', function () {
        if (sentence.length > 1) {
                sentence = sentence.slice(0, sentence.trim().lastIndexOf(' ')+1);
                renderSentence();
        }
});

renderSentence();
renderSelectionDictionary();
