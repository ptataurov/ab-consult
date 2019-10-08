const show = (node, classNameIn, classNameOut) => {
    node.classList.remove(classNameOut)
    node.classList.add(classNameIn)
}

const hide = (node, classNameIn, classNameOut) => {
    node.classList.remove(classNameIn)
    node.classList.add(classNameOut)
}

export { show, hide }
