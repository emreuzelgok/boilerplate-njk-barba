import barba from '@barba/core'

window.barba = barba

const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1

if (isChrome) {
  window.console.log.apply(console, [
    '\n %c Crafted with ♥ by Leo Seyers %c %c %c https://studio-scale.com/ %c %c \n',
    'color: #fff; background: #335491; padding:5px 0;',
    'background:#242424; padding:5px 0;',
    'background: #242424; padding:5px 0;',
    'color:#fff; background: #242424; padding:5px 0;',
    'background: #242424; padding:5px 0;',
    'color:#e43333; background: #242424; padding:5px 0;',
  ])
} else {
  window.console.log('Made with love ♥ Leo Seyers - https://studio-scale.com/')
}
