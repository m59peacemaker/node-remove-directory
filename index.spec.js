const { test } = require('zora')
const fs = require('fs')
const path = require('path')
const removeDirectory = require('./')

test('removes a typical non-empty directory', async t => {
	const dir = `/tmp/foo/bar/baz`
	await fs.promises.mkdir(dir, { recursive: true })
	await fs.promises.writeFile(path.join(dir, 'qux.txt'), 'qux contents')
	await removeDirectory(dir)
	try {
		await fs.promises.access(dir)
		t.fail('dir exists - was not removed')
	} catch (error) {
		t.equal(error.code, 'ENOENT')
	}
})
