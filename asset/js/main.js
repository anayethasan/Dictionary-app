const wrapper = document.querySelector(".wrapper"),
search_Input = wrapper.querySelector("input"),
synonyms = wrapper.querySelector(".synonyms .list"),
info_Text = wrapper.querySelector(".text-info"),
removeIcon = wrapper.querySelector(".search span"),
volume = wrapper.querySelector(".word i");
let audio;

function data(result, word){
   if(result.title){
    info_Text.innerHTML = `Searching the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
   }else{
    console.log(result);
    wrapper.classList.add("active");
    let definations = result[0].meanings[0].definitions[0],
    phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;


    // let's pass the particular response data to a particular html element

    document.querySelector(".word p").innerHTML = result[0].word;
    document.querySelector(".word span").innerHTML = phonetics;
    document.querySelector(".meaning span").innerHTML = definations.definition;
    document.querySelector(".example span").innerHTML = definations.example;
    audio = new Audio(result[0].phonetics[0].audio);
    // if(definations.synonyms[0] == undefined)
    // {
    //     synonyms.parentElement.style.display = "none";
    // }else{
    //     synonyms.parentElement.style.display = "block";

    //     synonyms.innerHTML = "";
    //     for (let i = 0; i < 6; i++) {
    //         let tag = `<span>${definations.synonyms[i]},</span>`;
    //         synonyms.insertAdjacentHTML("beforeend", tag);
    //     }
    // }

    synonyms.innerHTML = "";
        for (let i = 0; i < 6; i++) {
            let tag = `<span>${definations.synonyms[i]},</span>`;
            synonyms.insertAdjacentHTML("beforeend", tag);
        }

   }
}

function fetchApi(word)
{
    info_Text.style.color = "#7c7c7c";
    info_Text.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(res => res.json()).then(result => data(result, word));
}

search_Input.addEventListener("keyup", e =>{
    if(e.key == "Enter" && e.target.value)
    {
        fetchApi(e.target.value);
    }
});

volume.addEventListener("click", ()=>{
    volume.style.color = "#4D59FB";
    audio.play();
    setTimeout(() =>{
        volume.style.color = "#999";
    }, 800);
});

removeIcon.addEventListener("click", ()=>{
    search_Input.value = "";
    search_Input.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "#9A9A9A";
    infoText.innerHTML = "Type any existing word and press enter to get meaning, example, synonyms, etc.";
});
/* ==================================================== */
