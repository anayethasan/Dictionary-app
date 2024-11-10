const wrapper = document.querySelector(".wrapper"),
search_Input = wrapper.querySelector("input"),
info_Text = wrapper.querySelector(".text-info");

function fetchApi(word)
{
    info_Text.style.color = "#7c7c7c";
    info_Text.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(res => res.json()).then(result => console.log(result));
}

search_Input.addEventListener("keyup", e =>{
    if(e.key == "Enter" && e.target.value)
    {
        fetchApi(e.target.value);
    }
});