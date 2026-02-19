// Polyfill for WritableStream
if (typeof WritableStream === 'undefined') {
	globalThis.WritableStream = require('stream/web').WritableStream
}

// Polyfill for ReadableStream
if (typeof ReadableStream === 'undefined') {
	globalThis.ReadableStream = require('stream/web').ReadableStream
}

// Polyfill for TextEncoder
if (typeof TextEncoder === 'undefined') {
	globalThis.TextEncoder = require('util').TextEncoder
}

// Polyfill for TextDecoder
if (typeof TextDecoder === 'undefined') {
	globalThis.TextDecoder = require('util').TextDecoder
}

// Polyfill for FormData
if (typeof FormData === 'undefined') {
	globalThis.FormData = require('form-data')
}

// Polyfill for URLSearchParams
if (typeof URLSearchParams === 'undefined') {
	globalThis.URLSearchParams = require('url').URLSearchParams
}

// Polyfill for URL
if (typeof URL === 'undefined') {
	globalThis.URL = require('url').URL
}
