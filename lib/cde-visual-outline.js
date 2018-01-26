
const path = require('path')
const { AutoLanguageClient } = require('atom-languageclient')
const { registerConfigOnChangeHandlers } = require('./cde-visual-util')
const { showWelcomeNotification } = require('./welcome_first_notice')

class ReactJSXClient extends AutoLanguageClient {
  constructor() {
    super()
    registerConfigOnChangeHandlers()
    showWelcomeNotification()

  }
  // getGrammarScopes () {
  //   const {
  //     additionalGrammars,
  //     gohtmlSupport,
  //     mustacheSupport,
  //   } = atom.config.get('ide-html')
  //   return ['text.html.basic']
  //     .concat(gohtmlSupport ? 'text.html.gohtml' : [])
  //     .concat(mustacheSupport ? 'text.html.mustache' : [])
  //     .concat(additionalGrammars || [])
  //
  //     return  [ 'source.ts', 'source.tsx', 'source.js', 'source.js.jsx' ]
  // }
  getGrammarScopes () {
    const {
      additionalGrammars,
      gohtmlSupport,
      mustacheSupport,
    } = atom.config.get('cde-visual-outline')
    return  [ 'source.ts', 'source.tsx', 'source.js', 'source.js.jsx' ]
      .concat(gohtmlSupport ? 'text.html.gohtml' : [])
      .concat(mustacheSupport ? 'text.html.mustache' : [])
      .concat(additionalGrammars || [])
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

module.exports = new ReactJSXClient()
