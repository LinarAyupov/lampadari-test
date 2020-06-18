$(function () {
	$('.bg-slider').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: false,
		pauseOnFocus: false,
		pauseOnHover: false,
		dots: true,
	});

	$('.aside-btn').on('click',function (){
		$('.aside-items').toggleClass('active-aside')
		$('.aside-btn__img').toggleClass('aside-btn__active')
	})

})

// Modal window --------------------------------------
const lampadari = {}

const modalOptions = {
	title:'Some title',
	content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
	Molestias dolor omnis dolorum, laudantium ad dolorem sit impedit, 
	incidunt alias inventore temporibus error accusamus eius veritatis
	 a repellat deserunt voluptatum tempore.`,
	width: '400px',
	footerButtons: [
		{ text: 'Ok', type: 'ok', handler(){
			modal.close()
		}},
		{ text: 'Cancel', type: 'cancel', handler(){
			modal.close()
		}},
	]

}

Element.prototype.appendAfter = function(element){
	element.parentNode.insertBefore(this, element.nextSibling);
};

function __creatModalFooter(buttons = []) {
	if (buttons.length === 0) {
		return document.createElement('div')
	}
	const footerWrap = document.createElement('div')
	footerWrap.classList.add('modal-footer')

	buttons.forEach(btn => {
		const $btn = document.createElement('button')
		$btn.classList.add('modal-btn', `${btn.type}`)
		$btn.textContent = btn.text
		$btn.onclick = btn.handler

		footerWrap.appendChild($btn)
	})

	return footerWrap
}

function __createModal(options) {
	const DEFAULT_WIDTH = '600px'
	const modal = document.createElement('div')
	modal.classList.add('modal')
	modal.insertAdjacentHTML('afterbegin', `
		<div class="modal-overlay" data-close="true">
		<div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
		<div class="modal-header">
		<span class="modal-title">${options.title|| 'Default title'}</span>
		${options.closabel ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
		</div>
		<div class="modal-body" data-content>
		<p class="modal-body__text">${options.content || ''}<p>
		</div>
		</div>
		</div>
		`)
	const footer = __creatModalFooter(options.footerButtons)
	footer.appendAfter(modal.querySelector('[data-content]'))

	return modal
}

lampadari.modal = function(options) {
	const $modal = __createModal(options)
	let closing = false
	let destroyed = false

	const modalMetods= {
		open() {
				document.body.appendChild($modal)
			setTimeout(() =>{
				if (destroyed){
				return ''
			}
			!closing && $modal.classList.add('open')
		}, 200)
			
		},
		close() {
			closing = true
			$modal.classList.remove('open')
			$modal.classList.add('hide')
			setTimeout(()=> {
				$modal.classList.remove('hide')
				closing = false
				document.body.removeChild($modal)
			}, 200)
		},		
		setContent(html) {
			$modal.querySelector('[data-content]').innerHTML = html
		}

	}


	document.addEventListener('click', (event) =>{
		if (event.target.dataset.open) {
			modal.open()
		}
	})
	$modal.addEventListener('click', (event) => {
		if (event.target.dataset.close) {
			modal.close()
		}
	})


	return modalMetods


}

modal = lampadari.modal(modalOptions)