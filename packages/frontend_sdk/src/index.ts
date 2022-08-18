export {}

const ele = document.getElementById('__monitor')
if (!ele) {
	throw new Error('Cannot get #__monitor script tag')
}
const key = ele.getAttribute('key')
if (!key) {
	throw new Error('Cannot get key from monitor script tag')
}
const attr = ele.getAttribute('report')
if (!attr) {
	throw new Error('Cannot get report address from monitor script tag')
}
const url = cleanUrl(attr)

function cleanUrl(url: string) {
	if (url.endsWith('/')) {
		url.substring(0, url.length - 1)
	}
	return url
}

enum Exception {
	JavaScript = 1,
	Resource,
	Fetch,
	Promise,
}

enum PerformanceType {
	FP = 1,
	FCP,
	DOMReady,
	DNS,
	DOMComplete,
	DOMInteractive,
	LCP,
}

function report(url: string, datas: Record<string, string>) {
	fetch(`${url}`, {
		method: 'POST',
		body: new URLSearchParams(datas),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}

// 捕获 js 异常 (Error 以及语法错误)
window.onerror = (msg, url, row, col, error) => {
	// console.log('JS 异常')
	// console.log('Error message', msg)
	// console.log('Error url', url)
	// console.log('Error position', `${row}:${col}`)
	// console.log(error)
	report('/exception', {
		key,
		type: Exception.JavaScript.toString(),
		msg: typeof msg === 'string' ? msg : msg.type,
		position: `${location.href} - ${row}:${col}`,
	})
}

// 捕获资源加载错误，由于也会捕获到 window,onerror 的异常，需要过滤 js 异常
window.addEventListener(
	'error',
	(e: any) => {
		if (isJsError(e)) {
			return
		}
		// console.log('资源加载错误', e)
		let position = e.target.src
		if (!position) {
			const node = e.path[0] as HTMLElement
			const names: string[] = node.getAttributeNames()
			const tag: string = node.tagName.toLowerCase()
			position = tag
			names.forEach(name => position += ` ${name}="${node.getAttribute(name)}"`)
			position = `${location.href}: <${position}>`
		} else {
			position = `${location.href}: ${position}`
		}
		report('/exception', {
			key,
			type: Exception.Resource.toString(),
			msg: '资源加载错误',
			position,
		})
	},
	true,
)

function isJsError(e: any) {
	const target = e.target || e.srcElement
	const isElementTarget =
		target instanceof HTMLScriptElement ||
		target instanceof HTMLLinkElement ||
		target instanceof HTMLImageElement
	return !isElementTarget || e instanceof ErrorEvent
}

// 未捕获 promise 异常
window.addEventListener('unhandledrejection', (e) => {
	// console.log('未捕获 promise 异常', e)
	report('/exception', {
		key,
		type: Exception.Promise.toString(),
		msg: JSON.stringify(e.reason),
		position: location.href,
	})
})

// 改写原生 fetch 并捕获接口请求异常
const originFetch = window.fetch
window.fetch = function (...args) {
	if (!originFetch) {
		return
	}
	return originFetch.apply(this, args).catch((e) => {
		// console.log('fetch 异常', e)
		report('/exception', {
			key,
			type: Exception.Fetch.toString(),
			msg: e.stack,
			position: location.href,
		})
	})
}

window.onload = () => {
	// console.log('onload', performance.now())
	const datas = performance.getEntriesByType('paint')

	const fp = datas.find(e => e.name === 'first-paint')
	const fcp = datas.find(e => e.name === 'first-contentful-paint')
	// console.log(
	// 	`FP: ${performance.now() - fp!.startTime}  FCP: ${performance.now() - fcp!.startTime
	// 	}`,
	// )
	report('/perf', {
		key,
		type: PerformanceType.FP.toString(),
		from: location.href,
		value: (performance.now() - fp!.startTime).toString(),
	})
	report('/perf', {
		key,
		type: PerformanceType.FCP.toString(),
		from: location.href,
		value: (performance.now() - fcp!.startTime).toString(),
	})
}

window.addEventListener('DOMContentLoaded', () => {
	// console.log('DOMContentLoaded', performance.now())
	report('/perf', {
		key,
		type: PerformanceType.DOMReady.toString(),
		from: location.href,
		value: performance.now().toString(),
	})
})

new PerformanceObserver((entries, observer) => {
	for (const entry of entries.getEntries()) {
		// console.log('LCP:', entry.startTime, entry)
		report('/perf', {
			key,
			type: PerformanceType.LCP.toString(),
			from: location.href,
			value: entry.startTime.toString(),
		})
	}
	observer.disconnect()
}).observe({ type: 'largest-contentful-paint', buffered: true })

new PerformanceObserver((entries, observer) => {
	const { domInteractive: domi, fetchStart: fs, domComplete: domc, domContentLoadedEventStart: doms } = performance.timing
	// console.log('交互', domi - fs)
	// console.log('DOMComplete', domc - doms)
	if (domi && fs && domc && doms) {
		observer.disconnect()
		report('/perf', {
			key,
			type: PerformanceType.DOMInteractive.toString(),
			from: location.href,
			value: (domi - fs).toString(),
		})
		observer.disconnect()
		report('/perf', {
			key,
			type: PerformanceType.DOMComplete.toString(),
			from: location.href,
			value: (domc - doms).toString(),
		})
	}
}).observe({ type: 'paint', buffered: true })

const time = { total: 0, last: 0 }

document.addEventListener('visibilitychange', () => {
	if (document.visibilityState === 'visible') {
		time.last = performance.now()
	} else {
		resetTime()
	}
})

function resetTime() {
	time.total += performance.now() - time.last
	time.last = performance.now()
}

window.addEventListener('unload', () => {
	navigator.sendBeacon(url, JSON.stringify({ msg: 'aaaa' }))
	resetTime()
	report('/behavior/stay', {
		key,
		from: location.href,
		duration: time.total.toString(),
	})
})

report('/behavior/visit', {
	key,
	from: location.href,
})
