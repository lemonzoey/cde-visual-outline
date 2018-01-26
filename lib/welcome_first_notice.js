
const path =require('path')
const fs = require('fs')

const IFSHOW = path.join(__dirname, '..', 'IFSHOW')

const generateWelcomeMsg = () => {
  return `## Welcome to cde-visual-outline\n\nQuick start for cde-visual-outline:\n${[
    'Open a React file from the Project',
    'Dispatch command `Outline View: Toggle`',
    'To avoid conflicts, disable the ide-typescript plug-in when using this plug-in',
  ].map((str, i) => `${i}. ${str}\n`).join('')
}\nHappy Using Lenovo CDE : )`
}

const generateWarnMsg = () => {
  return `## Welcome to cde-visual-outline\n\nPlease install following requirements:\n${[
    '[`atom-ide-ui`](https://atom.io/packages/atom-ide-ui)',
  ].map((str, i) => `${i}. ${str}\n`).join('')
  }\nso that cde-visual-outline can work properly`
}

const settingsButton = [
  {
    text: ' Open Settings Page',
    onDidClick: () => {
      atom.commands.dispatch(
        atom.views.getView(atom.workspace.getActivePane()),
        'settings-view:install-packages-and-themes'
      )
    },
    className: 'btn btn-success btn-lg icon-tools',
  },
]

const showWelcomeNotification = () => {
  try {
    fs.accessSync(IFSHOW)
  } catch (err) {
    if (atom.packages.isPackageLoaded('atom-ide-ui')) {
      atom.notifications.addSuccess(
        generateWelcomeMsg(),
        {
          dismissable: true,
          icon: 'thumbsup',
        }
      )
      fs.closeSync(fs.openSync(IFSHOW, 'w'))
    } else {
      atom.notifications.addWarning(
        generateWarnMsg(),
        {
          buttons: settingsButton,
          dismissable: true,
          icon: 'info',
        }
      )
    }
  }
}


module.exports = {
  showWelcomeNotification,
}
