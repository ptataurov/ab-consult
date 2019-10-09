import './section-4.scss'
import './_imports/import'

import Inputmask from 'inputmask'
import regeneratorRuntime from 'regenerator-runtime'

import {
    show as fadeShow,
    hide as fadeHide
} from '../../../assets/js/fadeFuncs'

window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.section-4__form')
    const phoneInput = form.querySelector('.section-4__input')
    const formAlert = form.querySelector('.section-4__input-alert')

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

    form.addEventListener('submit', async event => {
        event.preventDefault()

        //timeoutToggleClass(formAlert, 'section-4__input-alert--show')

        try {
            const response = await fetch(
                '/consult/ajax/form/', {
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
                formAlert.classList.add('section-4__input-alert--error')

                timeoutToggleClass(
                    formAlert,
                    'section-4__input-alert--show',
                    errorMsg
                )
            } else {
                formAlert.classList.remove('section-4__input-alert--error')
                timeoutToggleClass(formAlert, 'section-4__input-alert--show')
            }
        } catch (e) {
            console.log(e)
        }
    })
})
