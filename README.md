# @m59/remove-directory

Simple function that can remove a non-empty directory.

```js
const { removeDirectory, removeDirectorySync } = require('@m59/remove-directory')

removeDirectorySync('/tmp/o')

;(async () => {
	await removeDirectory('/tmp/ani')
})()
```
