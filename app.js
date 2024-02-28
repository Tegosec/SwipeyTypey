const sentenceElement = document.getElementById('sentence');
const selectionElement = document.getElementById('selection');
const selectionBox = document.getElementById('selectionBox');
const hContainer = new Hammer(document.getElementById('selectionContainer'));
const hSentence = new Hammer(sentenceElement);
const hSelection = new Hammer(selectionElement);

let sentence = '', insertHistory = [], dictionarySelect;
const dictionary = ['I', 'me', 'you', 'nurse', 'doctor', 'mum', 'dad', 'is', 'are', 'do', 'bed', 'tissue', 'mouth', 'head', 'leg', 'foot', 'arm', 'neck', 'eye', 'left', 'right', 'hurt', 'pain', 'itch', 'toilet', 'nose', 'can', 'my', 'drink', 'juice', 'food', 'feels', 'cold', 'in', 'hot', 'want', 'need', 'a', 'please', 'hand', 'finger', 'thirsty', 'hungry', 'chocolate', 'phone', 'charger', 'teddy', 'Cheddar', 'chest', 'wet', 'hair', 'brush', 'teeth', 'ask', 'tell', 'speak', 'to', 'the', 'yes', 'no', 'what', 'when', 'where', 'how', 'who', 'why', 'pain', 'painkillers', 'painful', 'here', 'there', 'think', 'thought', 'can\'t', 'don\'t', 'uncomfortable', 'not', 'sleep', 'light', 'dark', 'on', 'off', 'ear', 'both', 'neither', 'they', 'tummy', 'fine', 'okay', 'good', 'bad', 'tingle', 'all', 'hope', 'hear', 'see', 'from', 'doing', 'come', 'coming', 'again', 'soon', 'thanks', 'thank', 'hello', 'goodbye', 'hi', 'hey', 'too', 'friend', 'cough', 'sneeze', 'vomit', 'sick', 'will', 'well', 'unwell', 'joints', 'blood', 'shave', 'dry'];
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const punctuation = [['Space',' '],['Full Stop', '.'],['Comma', ','],['Apostraphe', '\''],['Exclamation Mark', '!'],['Question Mark', '?'], ['Pound Sign', '£']];

function renderSentence() {
        sentenceElement.textContent = sentence;
}

function renderSelectionDictionary() {
        if(!dictionarySelect) {
                selectionElement.innerHTML = '';
                dictionary.sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'})).forEach(word => {
                        const wordBtn = document.createElement('li');
                        wordBtn.textContent = word;
                        selectionElement.appendChild(wordBtn);
                });
                punctuation.forEach(renderSelectionPunctuation);
                dictionarySelect = true;
                selectionElement.scrollTo(0,0);
        }
}

function renderSelectionAlphabet() {
        if (dictionarySelect) {
                selectionElement.innerHTML = '';
                alphabet.forEach(letter => {
                        const wordBtn = document.createElement('li');
                        wordBtn.textContent = letter;
                        selectionElement.appendChild(wordBtn);
                });
                punctuation.forEach(renderSelectionPunctuation);
                dictionarySelect = false;
                selectionElement.scrollTo(0,0);
        }
}

function renderSelectionPunctuation(symbol, index) {
        const wordBtn = document.createElement('li');
        wordBtn.textContent = '(' + symbol[0] + ')';
        wordBtn.dataset.trueVal = symbol[1];
        if(index < 6) // All except (Pound)
                wordBtn.dataset.trimBefore = true; // Remove spacing preceding this punctuation mark
        if(index !== 0 && index !== 3 && index !== 6) // (Space), (Apostraphe), (Pound)
                wordBtn.dataset.spaceAfter = true; // Add spacing following this punctuation mark
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

        //Check that a list item has been properly targetted
        if(elements[1].tagName === 'LI') {

                // Should there be a space?? Make sure there is / isn't
                if(elements[1].dataset.trimBefore) {
                        sentence = sentence.trim();
                } else if (dictionarySelect && sentence.charAt(sentence.length-1) !== ' ') {
                        sentence += ' ';
                }

                // Should we capitalise?
                let toInsert = elements[1].dataset.trueVal || elements[1].textContent, punct;
                if(insertHistory.length === 0 || (punct = sentence.charAt(sentence.length-2)) === '.' || punct === '!' || punct === '?') {
                        toInsert = toInsert.charAt(0).toUpperCase() + toInsert.slice(1);
                }

                // Maintain insertion list for undo functionality
                insertHistory.push(sentence.length);

                // Add selection
                sentence += toInsert;

                // Insert space if required
                if(elements[1].dataset.spaceAfter) sentence += ' ';

                renderSentence();
        }
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