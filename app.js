const sentenceElement = document.getElementById('sentence');
const selectionElement = document.getElementById('selection');
const addWordBtn = document.getElementById('addWordBtn');
const deleteWordBtn = document.getElementById('deleteWordBtn');

let sentence = '';

// Sample words for selection
const words = ['Hello', 'World', 'This', 'is', 'SwipeyTypey'];

// Render sentence
function renderSentence() {
    sentenceElement.textContent = sentence;
}

// Render selection
function renderSelection() {
    selectionElement.innerHTML = '';
    words.forEach(word => {
        const wordBtn = document.createElement('button');
        wordBtn.textContent = word;
        wordBtn.classList.add('btn', 'mr-2', 'mb-2');
        wordBtn.addEventListener('click', () => {
            sentence += word + ' ';
            renderSentence();
        });
        selectionElement.appendChild(wordBtn);
    });
}

// Add word to sentence
addWordBtn.addEventListener('click', () => {
    // Functionality to add word from selection to sentence
});

// Delete word from sentence
deleteWordBtn.addEventListener('click', () => {
    // Functionality to delete word from sentence
});

// Initial render
renderSentence();
renderSelection();
