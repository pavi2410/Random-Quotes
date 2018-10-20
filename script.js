var currentTheme = {}


function load() {
  fetch('https://talaikis.com/api/quotes/random/')
    .then(res => res.json())
    .then(json => {
      document.getElementById('next').classList.add('is-loading')
      process(json)
    })
}

function process(json) {
  const {
    quote,
    author,
    cat: category
  } = json

  document.getElementById('quote').textContent = quote
  document.getElementById('author').textContent = author

  // hide loading
  document.getElementById('next').classList.remove('is-loading')

  changeTheme()

  document.getElementById('share').setAttribute(
    'href',
    `https://twitter.com/intent/tweet?text=${encodeURI(
      `"${quote}" - ${author}`
    )}&hashtags=quotes,${category}`
  )
}

function changeTheme() {

  let theme = document.getElementById('theme'),
    nextBtn = document.getElementById('next'),
    shareBtn = document.getElementById('share'),
    themeColor = document.querySelector("meta[name=theme-color]")

  // remove old theme classes
  theme.classList.remove(currentTheme["bgClass"])
  nextBtn.classList.remove(currentTheme["buttonClass"])
  shareBtn.classList.remove('is-inverted')

  // get random theme
  currentTheme = themes[Math.floor(Math.random() * themes.length)]

  // add new theme classes
  themeColor.setAttribute("content", currentTheme["color"]) 
  theme.classList.add(currentTheme["bgClass"])
  nextBtn.classList.add(currentTheme["buttonClass"])
  if (currentTheme["invert"]) shareBtn.classList.add('is-inverted')
}
