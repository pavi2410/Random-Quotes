const themes = [
  {
    'bgClass': 'is-primary',
    'buttonClass': 'is-light',
    'color': '#009e6c',
    'invert': true
  },
  {
    'bgClass': 'is-info',
    'buttonClass': 'is-light',
    'color': '#04a6d7',
    'invert': true
  },
  {
    'bgClass': 'is-success',
    'buttonClass': 'is-light',
    'color': '#12af2f',
    'invert': true
  },
  {
    'bgClass': 'is-warning',
    'buttonClass': 'is-dark',
    'color': '#ffaf24',
    'invert': false
  },
  {
    'bgClass': 'is-danger',
    'buttonClass': 'is-light',
    'color': '#ff0561',
    'invert': true
  },
  {
    'bgClass': 'is-light',
    'buttonClass': 'is-dark',
    'color': '#dfd8d9',
    'invert': false
  },
  {
    'bgClass': 'is-dark',
    'buttonClass': 'is-light',
    'color': '#1f191a',
    'invert': false
  }
]

let currentTheme = {}

async function load() {
  document.getElementById('next').classList.add('is-loading')
  let res = await fetch('https://api.quotable.io/random')
  process(await res.json())
  updateTheme()
  document.getElementById('next').classList.remove('is-loading')
}

function process({ content: quote, author }) {
  document.getElementById('quote').textContent = quote
  document.getElementById('author').textContent = author
  document.getElementById('share').setAttribute('href', getTweetUrl(`"${quote}" - ${author}`))
}

function updateTheme() {
  let theme = document.getElementById('theme'),
    nextBtn = document.getElementById('next'),
    shareBtn = document.getElementById('share'),
    themeColor = document.querySelector('meta[name=theme-color]'),
    githubCorner = document.querySelector('.github-corner > svg')

  // remove old theme classes
  theme.classList.remove(currentTheme['bgClass'])
  nextBtn.classList.remove(currentTheme['buttonClass'])
  shareBtn.classList.remove('is-inverted')

  // get random theme
  currentTheme = getRandomTheme()

  // add new theme classes
  themeColor.setAttribute('content', currentTheme['color'])
  theme.classList.add(currentTheme['bgClass'])
  nextBtn.classList.add(currentTheme['buttonClass'])
  if (currentTheme['invert']) shareBtn.classList.add('is-inverted')
  githubCorner.style.fill = '#fff'
  githubCorner.style.color = currentTheme['color']
}

function getTweetUrl(text, hashtags = ['quotes']) {
  return `https://twitter.com/intent/tweet?text=${encodeURI(text)}&hashtags=${hashtags.join(',')}`
}

function getRandomTheme() {
  let newtheme = themes[Math.floor(Math.random() * themes.length)]
  if (newTheme === currentTheme) {
    return getRandomTheme()
  }
  return newTheme
}
