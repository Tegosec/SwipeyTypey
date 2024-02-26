const sentenceElement = document.getElementById('sentence');
const selectionElement = document.getElementById('selection');
const hammer = new Hammer(selectionElement);

let sentence = '';
const words = ['SwipeyTypey', 'is', 'was', 'why', 'You', 'I', 'want', 'have', 'love', 'water', 'food', 'sleep', 'thanks', 'good', 'bad', 'nice', 'rubbish'];

let wordIndex = 0;
let blockGesture = false;
let blockDelay = 40;

function renderSentence() {
    sentenceElement.textContent = sentence;
    }

function renderSelection() {
	selectionElement.innerHTML = '';
        words.forEach((word, index) => {
        const wordBtn = document.createElement('button');
	if(wordIndex == index) {
		word = '-> ' + word;
	}
	wordBtn.textContent = word;
	wordBtn.classList.add('btn', 'mb', 'w-full');
	wordBtn.addEventListener('click', () => {
		sentence += word + ' ';
		renderSentence();
	});
	selectionElement.appendChild(wordBtn);
	});
}
hammer.on('pandown', function() {
	if(!blockGesture) {
		if (wordIndex != 0) {
			wordIndex--;
        	} else {
	        	wordIndex = words.length-1;
		}
			renderSelection();
			blockGesture = true;
		        setTimeout(function(){
				blockGesture = false;
	        	}, blockDelay);
		}
});

hammer.on('panup', function() {
    if(!blockGesture) {
	    if (wordIndex != words.length-1) {
		    wordIndex++;
	    } else {
	    	wordIndex = 0;
    	}
    		renderSelection();
	     	blockGesture = true;
	    	setTimeout(function(){
		    	blockGesture = false;
		 
			}, blockDelay);
	}
});

hammer.on('swiperight', function() {
	if (words.length > 0) {
        	const word = words[wordIndex]
		sentence += word + ' ';
                renderSentence();
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
