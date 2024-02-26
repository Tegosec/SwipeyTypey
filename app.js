const sentenceElement = document.getElementById('sentence');
const selectionElement = document.getElementById('selection');
const hammer = new Hammer(selectionElement);

let sentence = '';
const words = ['Hello', 'World', 'This', 'is', 'SwipeyTypey'];

function renderSentence() {
    sentenceElement.textContent = sentence;
    }

    function renderSelection() {
        selectionElement.innerHTML = '';
            words.forEach(word => {
                    const wordBtn = document.createElement('button');
                            wordBtn.textContent = word;
                                    wordBtn.classList.add('btn', 'mr-2', 'mb-2');
                                            selectionElement.appendChild(wordBtn);
                                                });
                                                }

                                                hammer.on('swiperight', function() {
                                                    if (words.length > 0) {
                                                            const word = words.pop();
                                                                    sentence += word + ' ';
                                                                            renderSentence();
                                                                                    renderSelection();
                                                                                        }
                                                                                        });

                                                                                        hammer.on('swipeleft', function() {
                                                                                            if (sentence.trim() !== '') {
                                                                                                    const lastWord = sentence.trim().split(' ').pop();
                                                                                                            sentence = sentence.replace(lastWord + ' ', '');
                                                                                                                    renderSentence();
                                                                                                                        }
                                                                                                                        });

                                                                                                                        renderSentence();
                                                                                                                        renderSelection();
