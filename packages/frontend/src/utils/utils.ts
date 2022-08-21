export function processDuration(duration: number) {
	duration = Number(duration.toFixed(0))
	let h = 0
	let m = 0
	let s = duration
	while (s >= 60) {
		m += Math.floor(s / 60)
		s %= 60
	}
	while (m >= 60) {
		h += Math.floor(m / 60)
		m %= 60
	}
	let str = ''
	if (h > 0) {
		str += `${h}h`
	}
	if (m > 0) {
		str += `${m}m`
	}
	if (s > 0) {
		str += `${s}s`
	}
	return str
}

export function calcDelta(oldValue: number, newValue: number) {
	return Number(((newValue - oldValue) / oldValue * 100).toFixed(1))
}
