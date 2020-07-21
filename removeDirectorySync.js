const path = require('path')
const { readdirSync, rmdirSync, statSync, unlinkSync }  = require('fs')

const removeDirectory = async directoryPath => {
	const entries = await readdirSync(directoryPath)
	await Promise.all(entries.map(async name => {
		const entryPath = path.join(directoryPath, name)
		const entry = await statSync(entryPath)
		return entry.isDirectory() ? removeDirectory(entryPath) : unlinkSync(entryPath)
	}))
	return rmdirSync(directoryPath)
}

module.exports = removeDirectory
