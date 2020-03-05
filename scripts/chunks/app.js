// import fade from '~/utils/transitions'
import fade from '../utils/transitions'

const { barba } = window

const chunkLoad = (chunkName) => new Promise((resolve, reject) => {
  const script = document.createElement('script')
  script.src = `${window.location.origin}/scripts/${chunkName}.js`
  script.async = true
  script.defer = true
  script.onload = resolve
  script.onerror = reject
  script.onabort = reject
  document.head.appendChild(script)
})

const injectJS = (element) => {
  let chunks = element.getAttribute('data-chunks')
  if (!chunks) return false
  chunks = chunks.split(',')
  for (let i = 0; i < chunks.length; i++) {
    chunkLoad(chunks[i])
  }
  return true
}

const onLoad = () => {
  injectJS(document.querySelector('main'))
}

document.addEventListener('DOMContentLoaded', () => {
  onLoad()
  barba.init({
    debug: true,
    transitions: [{
      sync: false,
      leave: ({
        current,
      }) => fade.out(current.container),
      enter: ({
        next,
      }) => fade.in(next.container),
      after: ({
        next,
      }) => injectJS(next.container),
    },
    ],
  })
})
