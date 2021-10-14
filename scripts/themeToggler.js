let prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
let theme
let radioButtons = [...document.querySelectorAll("input[name='theme'")]

if(prefersDarkScheme.matches) {
    theme = "theme-1"
    document.querySelector("#theme-1").checked = true
}
   
else {
    theme = "theme-2"
    document.querySelector("#theme-2").checked = true
}
document.body.className = theme
localStorage.setItem("theme", theme)

function toggle() {
    radioButtons.forEach(radioButton => {
        if(radioButton.checked) {
            theme = radioButton.value;
        }
    })
    document.body.className = theme;

}

radioButtons.forEach(radioButton => {
    radioButton.addEventListener("input", toggle)
})
