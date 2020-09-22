$('#btnCalc').click(() => {
    let text = $('#inputText').val()
    let words = getWords(text)
    let wc = getWordCounts(words)
    let wcArr = sortWordCounts(wc)
    generateChart(wcArr)
    console.log(wcArr)
})

function getWords(inputText){
    let text = $('#inputText').val();
    let chars = inputText.split('')
    let newChars = [];
    chars.forEach((c) => {
        switch(c){
            case `.`: return;
            case `,`: return;
            case `"`: return;
            case `?`: return;
            case `-`: return;
            case `'`: return;
            case `!`: return;
            case `_`: return;
            case `;`: return;
            case `:`: return;
            case '\n': newChars.push(' '); break;
            case '  ': newChars.push(' '); break;
            case '   ': newChars.push(' '); break;
            default:
                newChars.push(c.toLowerCase())
        }
    })
    let newText = newChars.join('')
    words = newText.split(' ')
    
    return words
}

function getWordCounts(words){
    let wordCounts = {}
    words.forEach((w) => {
        if(wordCounts[w]) wordCounts[w] += 1;
        else wordCounts[w] = 1;
    })
    return wordCounts;
} 

function sortWordCounts(wordCounts){
    let wcArr = []
    Object.keys(wordCounts).forEach((w) => {
        if(w == "") return;
        wcArr.push({
            word: w,
            count: wordCounts[w]
        })
    })
    return wcArr.sort((a, b) => b.count - a.count).slice(0, 70)
}

function generateChart(wcArr){
    let ctx = document.getElementById("cnvWcChart").getContext('2d')
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: wcArr.map((wc) => wc.word),
            datasets: [
                {
                    data: wcArr.map((wc) => wc.count),
                    borderColor: 'red'
                }
            ]
        }
    })
}