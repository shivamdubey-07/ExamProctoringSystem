const { app, BrowserWindow, ipcMain } = require('electron');





ipcMain.on('open-lockdown-browser', (event, arg) => {
    // Add code here to open the lockdown browser window
    // For example, you can create a new BrowserWindow with the desired properties
    const lockdownWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    lockdownWindow.loadURL('http://localhost:3000/paper'); 

    event.reply('lockdown-browser-opened', 'success'); // Send a reply back to the renderer process
});
  

