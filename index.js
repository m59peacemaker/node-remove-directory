const fs = require('fs')
const path = require('path')

const removeDirectory = async directoryPath => {
	const entries = await fs.promises.readdir(directoryPath, { withFileTypes: true })
	await Promise.all(entries.map(entry => {
		const entryPath = path.join(directoryPath, entry.name)
		return entry.isDirectory() ? removeDirectory(entryPath) : fs.promises.unlink(entryPath)
	}))
	return fs.promises.rmdir(directoryPath)
}

module.exports = removeDirectory
