const fs = require('fs').process;

const isAccessible = (path) => fs.access (path)
.then(() => true)
.catch(() => false)

const setupFolder = async (path) => {
    const folderExist = await isAccessible(path)
    if(!folderExist) {
        try {
            await fs.mkdir(path)
        } catch (error) {
            console.log('No permissions!')
            process.exit(code: 1)
        }
    }
}

module.exports = {setupFolder}