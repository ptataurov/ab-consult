import './section-3.scss'
import './_imports/import'

import {
	show as fadeShow,
	hide as fadeHide
} from '../../../assets/js/fadeFuncs'

window.addEventListener('DOMContentLoaded', () => {
	const tabsSection = document.querySelector('.section-3__tabs')
	const imgContainer = tabsSection.querySelector('.section-3__img-container')
	const imgs = imgContainer.querySelectorAll('.section-3__img')

	const textContainer = tabsSection.querySelector(
		'.section-3__tab-text-container'
	)

	const toggleClass = (targetNode, className) => {
		const showNode = tabsSection.querySelector(`.${className}`)

		if (showNode !== targetNode) {
			showNode.classList.remove(className)
			targetNode.classList.add(className)
		}
	}

	const timeoutToggleClass = (
		targetNode,
		className,
		fadeInClass,
		fadeOutClass
	) => {
		const showNode = tabsSection.querySelector(`.${className}`)

		if (showNode !== targetNode) {
			fadeHide(showNode, fadeInClass, fadeOutClass)

			setTimeout(() => {
				showNode.classList.remove(className)
				fadeShow(targetNode, fadeInClass, fadeOutClass)
				targetNode.classList.add(className)
			}, 200)
		}
	}

	const tabs = tabsSection.querySelectorAll('.section-3__tab')

	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			const targetIdx = tab.dataset.target
			const targetImg = imgs[targetIdx]
			const targetText = textContainer.querySelectorAll('.section-3__tab-text')[
				targetIdx
			]

			toggleClass(tab, 'section-3__tab--active')

			timeoutToggleClass(
				targetImg,
				'section-3__img--show',
				'fade-in-left',
				'fade-out-left'
			)

			timeoutToggleClass(
				targetText,
				'section-3__tab-text--show',
				'scale-in',
				'scale-out'
			)
		})
	})
})
