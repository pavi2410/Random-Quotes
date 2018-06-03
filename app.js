var themes = [
    // bg color, next button color, share button inverted
    ["is-primary", "is-light", true],
    ["is-info", "is-light", true],
    ["is-success", "is-light", true],
    ["is-warning", "is-dark", false],
    ["is-danger", "is-light", true],
    ["is-light", "is-dark", false],
    ["is-dark", "is-light", false]
];

var currentTheme = [];

function loadRandomQuote() {
    let theme = document.getElementById("theme"),
        nextBtn = document.getElementById("next"),
        shareBtn = document.getElementById("share");

    // show loading
    nextBtn.classList.add("is-loading");

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // hide loading
            nextBtn.classList.remove("is-loading");

            const {
                quote,
                author,
                cat: category
            } = JSON.parse(this.responseText);
            document.getElementById("quote").innerText = quote;
            document.getElementById("author").innerText = author;

            // remove old theme classes
            theme.classList.remove(currentTheme[0]);
            nextBtn.classList.remove(currentTheme[1]);
            shareBtn.classList.remove("is-inverted");

            currentTheme = themes[Math.floor(Math.random() * themes.length)];

            // add new theme classes
            theme.classList.add(currentTheme[0]);
            nextBtn.classList.add(currentTheme[1]);
            if (currentTheme[2]) shareBtn.classList.add("is-inverted");

            shareBtn.setAttribute(
                "href",
                `https://twitter.com/intent/tweet?text=${encodeURI(
          `"${quote}" - ${author}`
        )}&hashtags=quotes,${category}`
            );
        }
    };
    xhr.open("GET", "https://talaikis.com/api/quotes/random/", true);
    xhr.send();
}

window.onload = loadRandomQuote;
