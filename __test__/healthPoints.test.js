const { expect } = require('@jest/globals')
const healthPoints = require('./healthPoints')

test('Expect Result to be 100 - argument passed as number', () => {
    expect(healthPoints(10)).toBe(90)
})