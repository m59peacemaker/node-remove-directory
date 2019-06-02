const path = require('path')
const { readdir, rmdir, stat, unlink }  = require('fs')
const { promisify } = require('util')
const readdirAsync = promisify(readdir)
const unlinkAsync = promisify(unlink)
const rmdirAsync = promisify(rmdir)
const statAsync = promisify(stat)

const removeDirectory = async directoryPath => {
	const entries = await readdirAsync(directoryPath)
	await Promise.all(entries.map(async name => {
		const entryPath = path.join(directoryPath, name)
		const entry = await statAsync(entryPath)
		return entry.isDirectory() ? removeDirectory(entryPath) : unlinkAsync(entryPath)
	}))
	return rmdirAsync(directoryPath)
}

module.exports = removeDirectory
