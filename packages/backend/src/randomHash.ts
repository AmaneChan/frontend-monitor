function hashCode(str: string) {
	var h = 0
	var len = str.length
	var t = 2147483648
	for (var i = 0; i < len; i++) {
		h = 31 * h + str.charCodeAt(i)
		if (h > 2147483647) h %= t
	}
	return h
}
function randomWord(randomFlag: boolean, min: number, max: number) {
	let str = '',
		range = min,
		arr = [
			'0',
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			'A',
			'B',
			'C',
			'D',
			'E',
			'F',
			'G',
			'H',
			'I',
			'J',
			'K',
			'L',
			'M',
			'N',
			'O',
			'P',
			'Q',
			'R',
			'S',
			'T',
			'U',
			'V',
			'W',
			'X',
			'Y',
			'Z',
		]
	// 随机产生
	if (randomFlag) {
		range = Math.round(Math.random() * (max - min)) + min
	}
	for (var i = 0; i < range; i++) {
		let pos = Math.round(Math.random() * (arr.length - 1))
		str += arr[pos]
	}
	return str
}
function gethashcode() {
	let timestamp = new Date().valueOf()
	let myRandom = randomWord(true, 1, 255)
	let hashcode = hashCode(myRandom + timestamp.toString())
	return hashcode
}

export default gethashcode
