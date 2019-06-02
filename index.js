const path = require('path')
const { readdir, unlink, rmdir }  = require('fs')
const { promisify } = require('util')
const readdirAsync = promisify(readdir)
const unlinkAsync = promisify(unlink)
const rmdirAsync = promisify(rmdir)

const removeDirectory = async directoryPath => {
	const entries = await readdirAsync(directoryPath, { withFileTypes: true })
	await Promise.all(entries.map(entry => {
		const entryPath = path.join(directoryPath, entry.name)
		return entry.isDirectory() ? removeDirectory(entryPath) : unlinkAsync(entryPath)
	}))
	return rmdirAsync(directoryPath)
}

module.exports = removeDirectory
