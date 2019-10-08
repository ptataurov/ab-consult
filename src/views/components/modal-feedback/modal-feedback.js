import './modal-feedback.scss'
import './_imports/import'
import Inputmask from 'inputmask'
import regeneratorRuntime from 'regenerator-runtime'

import {
    show as fadeShow,
    hide as fadeHide
} from '../../../assets/js/fadeFuncs'

window.addEventListener('DOMContentLoaded', () => {
    const darkBg = document.querySelector('.dark-bg')
    const modal = document.querySelector('.modal-feedback')
    const btnClose = modal.querySelector('.modal-feedback__btn-close')
    const form = modal.querySelector('.modal-feedback__form')
    const phoneInput = modal.querySelector('#phone')

    const formAlert = modal.querySelector('.modal-feedback__alert-msg')

    const timeoutToggleClass = (
        targetNode,
        className,
        msg = 'Форма успешно отправлена, скоро мы с Вами свяжемся!'
    ) => {
        const showNode = form.querySelector(`.${className}`)

        const isShowNode = !!showNode

        if (isShowNode) {
            fadeHide(showNode, 'scale-in-alert', 'scale-out-alert')
        }

        setTimeout(() => {
            isShowNode && showNode.classList.remove(className)
            formAlert.textContent = msg
            fadeShow(targetNode, 'scale-in-alert', 'scale-out-alert')
            targetNode.classList.add(className)
        }, 200)
    }

    Inputmask({ mask: '+7 (999) 999-9999' }).mask(phoneInput)
    btnClose.addEventListener('click', () => {
        fadeHide(darkBg, 'fade-in', 'fade-out')
        fadeHide(modal, 'fade-in', 'fade-out')

        setTimeout(() => {
            darkBg.classList.remove('dark-bg--show')
            modal.classList.remove('modal-feedback--show')
        }, 200)
    })

    form.addEventListener('submit', async event => {
        event.preventDefault()

        timeoutToggleClass(formAlert, 'modal-feedback__alert-msg--show')

        try {            
            const response = await fetch(
                '/consalt/ajax/form/', {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                    },
                    body: JSON.stringify(Object.fromEntries(new FormData(form)))
                }
            )

            const { errorMsg } = await response.json()

            if (errorMsg) {
                formAlert.classList.add('modal-feedback__alert-msg--error')

                timeoutToggleClass(
                    formAlert,
                    'section-4__input-alert--show',
                    errorMsg
                )
            } else {
                formAlert.classList.remove('modal-feedback__alert-msg--error')
                timeoutToggleClass(formAlert, 'modal-feedback__alert-msg--show')
            }
        } catch (e) {
            console.log(e)
        }
    })
})
