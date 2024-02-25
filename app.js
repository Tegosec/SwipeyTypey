const sentenceElement = document.getElementById('sentence');
const selectionElement = document.getElementById('selection');
const addWordBtn = document.getElementById('addWordBtn');
const deleteWordBtn = document.getElementById('deleteWordBtn');

// Initialize Hammer.js for swipe gestures
const hammer = new Hammer(document.body);
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

// Handle swipe right event
hammer.on('swiperight', function() {
    // Functionality to add word from selection to sentence
});

// Handle swipe left event
hammer.on('swipeleft', function() {
    // Functionality to delete word from sentence
});

// Initial render
renderSentence();
renderSelection();
