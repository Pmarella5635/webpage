const wordInput = document.getElementById('wordInput');
const submitButton = document.getElementById('submitButton');
const meaningsList = document.getElementById('meaningsList');

submitButton.addEventListener('click', function() {
    fetchMeanings(wordInput.value);
});

function fetchMeanings(word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => response.json())
        .then(data => {
            meaningsList.innerHTML = '';
            if (data.length > 0) {
                let meaningsHTML = '';
                data.forEach(entry => {
                    entry.meanings.forEach(meaning => {
                        meaning.definitions.forEach(definition => {
                            meaningsHTML += `<li><strong>${meaning.partOfSpeech}</strong> - ${definition.definition}</li>`;
                        });
                    });
                });
                meaningsList.innerHTML = `<ol>${meaningsHTML}</ol>`;
            } else {
                meaningsList.innerHTML = '<p>No meanings found for this word.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            meaningsList.innerHTML = '<p>Failed to fetch meanings. Please try again later.</p>';
        });
}
