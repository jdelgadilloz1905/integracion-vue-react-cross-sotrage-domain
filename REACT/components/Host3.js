/** @format */

import React, { Component } from 'react'

class Host3 extends Component {
	componentDidMount() {
		//lista blanca de las URL que va aceptar el dominio para reibir las variables del otro dominio
		var whitelist = ['localhost:3000', 'localhost', '^.*.domain.com']

		function verifyOrigin(origin) {
			var domain = origin.replace(/^https?:\/\/|:\d{1,4}$/g, '').toLowerCase(),
				i = 0,
				len = whitelist.length

			while (i < len) {
				if (domain.match(new RegExp(whitelist[i]))) {
					return true
				}
				i++
			}

			return false
		}

		function handleRequest(event) {
			//console.info("eventos", event);
			if (verifyOrigin(event.origin)) {
				var request = JSON.parse(event.data)
				var storage = request.storage

				if (request.type === 'get') {
					var value = window[storage].getItem(request.key)
					event.source.postMessage(
						JSON.stringify({
							id: request.id,
							key: request.key,
							value: value,
						}),
						event.origin
					)
				} else if (request.type === 'set') {
					window[storage].setItem(request.key, request.value)
				} else if (request.type === 'remove') {
					window[storage].removeItem(request.key)
				}
			}
		}

		if (window.addEventListener) {
			//console.info(window.addEventListener);

			window.addEventListener('message', handleRequest, false)
		} else if (window.attachEvent) {
			window.attachEvent('onmessage', handleRequest)
		}
	}

	render() {
		return <div>Tercer componente</div>
	}
}

export default Host3
