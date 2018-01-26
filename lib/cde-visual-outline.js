
const path = require('path')
const { AutoLanguageClient } = require('atom-languageclient')
const { registerConfigOnChangeHandlers } = require('./cde-visual-util')
const { showWelcomeNotification } = require('./welcome_first_notice')

class ReactXMLClient extends AutoLanguageClient {
  constructor() {
    super()
    registerConfigOnChangeHandlers()
    showWelcomeNotification()

  }
  getGrammarScopes () {
    return  [ 'source.ts', 'source.tsx', 'source.js', 'source.js.jsx' ]
  }

  getLanguageName () { return 'JS' }
  getServerName () { return 'VSCODE-HTML-LANG-SERVER' }
  getConnectionType() { return 'stdio' } // ipc, socket, stdio

  startServerProcess () {
    return super.spawnChildNode([
      path.resolve(path.join(
        __dirname,
        '../node_modules/vscode-html-languageserver-bin/htmlServerMain'
      )),
      '--stdio',
    ]) // --node-ipc, stdio, socket={number}
  }

  preInitialization (connection) {
    connection.onCustom('$/partialResult', () => {}) // Suppress partialResult until the language server honours 'streaming' detection
  }
}

module.exports = new ReactXMLClient()
