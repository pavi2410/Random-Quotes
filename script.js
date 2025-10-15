import { div, button, a } from "https://esm.sh/organic-ui@0.3.0/components"
import { state } from "https://esm.sh/organic-ui@0.3.0/reactivity"
import { render } from "https://esm.sh/organic-ui@0.3.0/renderer"

const themes = [
  {
    bgClass: 'is-primary',
    buttonClass: 'is-light',
    color: '#009e6c',
    invert: true
  },
  {
    bgClass: 'is-info',
    buttonClass: 'is-light',
    color: '#04a6d7',
    invert: true
  },
  {
    bgClass: 'is-success',
    buttonClass: 'is-light',
    color: '#12af2f',
    invert: true
  },
  {
    bgClass: 'is-warning',
    buttonClass: 'is-dark',
    color: '#ffaf24',
    invert: false
  },
  {
    bgClass: 'is-danger',
    buttonClass: 'is-light',
    color: '#ff0561',
    invert: true
  },
  {
    bgClass: 'is-light',
    buttonClass: 'is-dark',
    color: '#dfd8d9',
    invert: false
  },
  {
    bgClass: 'is-dark',
    buttonClass: 'is-light',
    color: '#1f191a',
    invert: false
  }
]

let themeIndex = 0
function getNextTheme() {
  const nextTheme = themes[themeIndex]
  themeIndex = (themeIndex + 1) % themes.length
  return nextTheme
}

function getTweetUrl(text, hashtags = ['quotes']) {
  const textWithAttribution = text + "\n\nSent from Random Quote Machine"
  return `https://twitter.com/intent/tweet?text=${encodeURI(textWithAttribution)}&hashtags=${hashtags.join(',')}` 
}

function RandomQuoteMachine() {
  const [quoteState, setQuoteState] = state({
    quote: "Loading...",
    author: "@pavi2410",
    theme: getNextTheme()
  })
  const [loading, setLoading] = state(false)

  async function loadQuote() {
    setLoading(true)
    try {
      const res = await fetch('https://quoteslate.vercel.app/api/quotes/random')
      const data = await res.json()
      setQuoteState({
        quote: data.quote,
        author: data.author,
        theme: getNextTheme()
      })
    } catch (error) {
      console.error('Failed to fetch quote:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load initial quote
  loadQuote()

  return div({
    className: () => `hero is-bold is-fullheight ${quoteState().theme.bgClass}`,
    id: 'theme',
    children: [
      div({
        className: 'hero-body',
        children: [
          div({
            className: 'container',
            children: [
              // Quote title
              div({
                className: 'title',
                id: 'quote',
                text: () => quoteState().quote
              }),
              // Author subtitle
              div({
                className: 'subtitle',
                id: 'author',
                text: () => quoteState().author
              }),
              // Buttons
              div({
                className: 'buttons is-right',
                children: [
                  // Next button
                  button({
                    className: () => `button is-outlined ${loading() ? 'is-loading' : ''} ${quoteState().theme.buttonClass}`,
                    id: 'next',
                    text: () => 'Next',
                    onClick: loadQuote
                  }),
                  // Share button
                  a({
                    className: () => `button is-outlined ${quoteState().theme.invert ? 'is-inverted' : ''}`,
                    id: 'share',
                    href: () => getTweetUrl(`"${quoteState().quote}" - ${quoteState().author}`),
                    target: '_blank',
                    rel: 'noopener',
                    text: () => 'Share'
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  })
}

// Mount to DOM
const root = document.getElementById("app")
render(() => [RandomQuoteMachine()], root)