const path = require('path')
const { readdir, rmdir, stat, unlink }  = require('fs').promises

const removeDirectory = async directoryPath => {
	const entries = await readdir(directoryPath)
	await Promise.all(entries.map(async name => {
		const entryPath = path.join(directoryPath, name)
		const entry = await stat(entryPath)
		return entry.isDirectory() ? removeDirectory(entryPath) : unlink(entryPath)
	}))
	return rmdir(directoryPath)
}

module.exports = removeDirectory
