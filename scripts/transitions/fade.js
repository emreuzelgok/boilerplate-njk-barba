const fade = {

    in (element, duration = 250) {
        return new Promise(((resolve) => {
            element.style.opacity = 0
            element.style.transitionProperty = 'opacity'
            element.style.transitionDuration = `${duration}ms`;
            element.style.opacity = 1
            window.setTimeout(() => {
                element.style.removeProperty('opacity')
                element.style.removeProperty('transition-duration')
                element.style.removeProperty('transition-property')
                resolve()
            }, duration)
        }))
    },
    out(element, duration = 250) {
        return new Promise(((resolve) => {
            element.style.opacity = 1
            element.style.transitionProperty = 'opacity'
            element.style.transitionDuration = `${duration}ms`;
            element.style.opacity = 0
            window.setTimeout(() => {
                element.style.removeProperty('opacity')
                element.style.removeProperty('transition-duration')
                element.style.removeProperty('transition-property')
                resolve()
            }, duration)
        }))
    },

}

export default fade