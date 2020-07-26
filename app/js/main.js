const { app, BrowserWindow, Menu } = require('electron')

function createMainWindow () {
    // Cree la fenetre du navigateur.
    let main = new BrowserWindow({
        width: 950,
        height: 600,
        frame: true,
        show: true,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true
        }
    });

    main.loadFile('app/html/index.html');

    return main;
}

app.on('ready', function (){
    main_win = createMainWindow();
});