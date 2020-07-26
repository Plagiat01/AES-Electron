const { app, BrowserWindow, Menu } = require('electron')

function createMainWindow () {
    // Cree la fenetre du navigateur.
    let main = new BrowserWindow({
        width: 1100,
        height: 600,
        frame: true,
        show: true,
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