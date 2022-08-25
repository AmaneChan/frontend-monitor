import { describe, expect, it } from 'vitest'
import { processDuration } from '../src/utils/utils.js'

describe('processDuration', () => {
	it('Test 1', () => {
		expect(processDuration(59)).toBe('59s')
	})

	it('Test 2', () => {
		expect(processDuration(60)).toBe('1m')
	})

	it('Test 3', () => {
		expect(processDuration(61)).toBe('1m1s')
	})

	it('Test 4', () => {
		expect(processDuration(3599)).toBe('59m59s')
	})

	it('Test 5', () => {
		expect(processDuration(3600)).toBe('1h')
	})

	it('Test 6', () => {
		expect(processDuration(3601)).toBe('1h1s')
	})

	it('Test 7', () => {
		expect(processDuration(3660)).toBe('1h1m')
	})

	it('Test 8', () => {
		expect(processDuration(3661)).toBe('1h1m1s')
	})
})
