import './header.scss'
import './_imports/import'

import { show as fadeShow } from '../../../assets/js/fadeFuncs'

window.addEventListener('DOMContentLoaded', () => {
    const headerBtn = document.querySelector('.header__btn')
    const darkBg = document.querySelector('.dark-bg')
    const modal = document.querySelector('.modal-feedback')

    headerBtn.addEventListener('click', () => {
        fadeShow(darkBg, 'fade-in', 'fade-out')
        fadeShow(modal, 'fade-in', 'fade-out')

        darkBg.classList.add('dark-bg--show')
        modal.classList.add('modal-feedback--show')
    })
})
