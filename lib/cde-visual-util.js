const registerConfigOnChangeHandlers = () => {
  atom.config.onDidChange('cde-visual-outline.additionalGrammars', () =>
    promptUserReloadAtom('Reload `cde-visual-outline` to apply additional grammars')
  )
  atom.config.onDidChange('cde-visual-outline.jspSupport', () => promptUserReloadAtom() )
  atom.config.onDidChange('cde-visual-outline.jsSupport', () => promptUserReloadAtom() )
  atom.config.onDidChange('cde-visual-outline.mustacheSupport', () => promptUserReloadAtom() )
}

const promptUserReloadAtom = (msg = 'Reload `cde-visual-outline` to apply changes') => {
  const buttons = [{
    text: 'Reload',
    onDidClick: () => atom.reload(),
  }]
  atom.notifications.addInfo(
    msg,
    {
      buttons,
      dismissable: true,
    }
  )
}

module.exports = {
  registerConfigOnChangeHandlers,
  promptUserReloadAtom,
}
