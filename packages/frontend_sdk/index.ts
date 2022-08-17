/**
 * @license
 * Released under MIT license
 */

const ele = document.getElementById('__monitor')
const key = ele?.getAttribute('key')
const url = cleanUrl(ele?.getAttribute('report') || 'http://120.79.27.173:2336/')

function cleanUrl(url) {
	if (url.endsWith('/')) {
		url.substring(0, url.length - 1)
	}
	return url
}

// 捕获 js 异常 (Error 以及语法错误)
window.onerror = (msg, url, row, col, error) => {
	console.log('JS 异常')
	console.log('Error message', msg)
	console.log('Error url', url)
	console.log('Error position', `${row}:${col}`)
	console.log(error)
	fetch(`${url}exception`, {
		method: 'POST',

	})
}

// 捕获资源加载错误，由于也会捕获到 window,onerror 的异常，需要过滤 js 异常
window.addEventListener(
	'error',
	e => {
		if (isJsError(e)) {
			return
		}
		console.log('资源加载错误', e)
	},
	true,
)

function isJsError(e) {
	const target = e.target || e.srcElement
	const isElementTarget =
		target instanceof HTMLScriptElement ||
		target instanceof HTMLLinkElement ||
		target instanceof HTMLImageElement
	return !isElementTarget || e instanceof ErrorEvent
}

// 未捕获 promise 异常
window.addEventListener('unhandledrejection', e => {
	console.log('未捕获 promise 异常', e)
})

// 改写原生 fetch 并捕获接口请求异常
const originFetch = window.fetch
window.fetch = function (...args) {
	if (!originFetch) {
		return
	}
	return originFetch.apply(this, args).catch(err => {
		console.log('fetch 异常', err)
	})
}

window.onload = () => {
	console.log('onload', performance.now())
	const datas = performance.getEntriesByType('paint')

	const fp = datas.find(e => e.name == 'first-paint')
	const fcp = datas.find(e => e.name == 'first-contentful-paint')
	console.log(
		`FP: ${performance.now() - fp.startTime}  FCP: ${performance.now() - fcp.startTime
		}`,
	)
}

window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded', performance.now())
})

new PerformanceObserver(entries => {
	for (const entry of entries.getEntries()) {
		console.log('LCP:', entry.startTime, entry)
	}
}).observe({ type: 'largest-contentful-paint', buffered: true })

const time = { total: 0, last: 0 }

document.addEventListener('visibilitychange', function () {
	if (document.visibilityState === 'visible') {
		time.last = performance.now()
	} else {
		time.total += performance.now() - time.last
		time.last = performance.now()
	}
})

window.addEventListener('unload', function () {
	navigator.sendBeacon(url, JSON.stringify({ msg: 'aaaa' }))
})
