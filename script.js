async function search() {
  const result = document.querySelector('.result');
  let html = ''
  try{
  const word = document.getElementById("input").value;
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  if(response.status === 200){
    const data = await response.json();
    html = `
      <h4><b>Word:</b> ${data[0].word}</h4>
      <p><b>Definition:</b> ${data[0].meanings[0].definitions[0].definition}</p>
      <p><b>Part of speech:</b> ${data[0].meanings[0].partOfSpeech}</p>
    `
    console.log(data[0].phonetics.length);
    if(data[0].phonetics.length === 1){
      html += `<p><b>Phonetic:</b> ${data[0].phonetics[0].text}</p>`
    } else if(data[0].phonetics.length !== 0){
      html += `<p><b>Phonetic:</b> ${data[0].phonetics[1].text}</p>`
    }
    result.innerHTML = html;
  }  else{
      alert('Please enter a valid English word')
    }
  } catch(err){
    alert('Please check your internet connection and try again')
  }
}

document.getElementById("search").addEventListener("click", (e)=>{
  e.preventDefault()
  search()
});