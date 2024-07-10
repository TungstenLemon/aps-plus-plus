const fs = require('fs');

function requireCachePurge(directory) {
    let folder = fs.readdirSync(directory);
    for (let filename of folder) {
        let filepath = directory + `/${filename}`;
        let isDirectory = fs.statSync(filepath).isDirectory();
        if (isDirectory) {
            requireCachePurge(filepath);
        }

        if (!filename.endsWith('.js')) continue;
        
        delete require.cache[filepath];
    }
}

let lastReloadTime = 1;
const validCommands = ['**reload definitions', '**reload defs', '**redefs'];
Events.on('chatMessage', ({ message, socket, preventDefault }) => {
	let perms = socket.permissions;
    // No perms restriction
    if (!perms || !perms.administrator) return;

    // Valid command checker
    if (!validCommands.includes(message)) return;
    
    // Prevent message from sending
    preventDefault();

    // Rate limiter for anti-lag
    let time = Date.now();
    let sinceLastReload = time - lastReloadTime;
    if (sinceLastReload < 5000) {
        socket.talk('m', Config.MESSAGE_DISPLAY_TIME, `Wait ${Math.floor((5000 - sinceLastReload) / 100) / 10} seconds and try again.`);
        return;
    }
    
    // Reload the definitions folder ---
    lastReloadTime = time;

    // Remove function so all for(let x in arr) loops work
    delete Array.prototype.remove;

    // Purge Class
    Class = {};

    // Purge all cache entries of every file in ../definitions
    let splitterKey = __dirname.includes('\\') ? '\\' : '/';
    let dir = __dirname.split(splitterKey);
    dir.splice(dir.length - 1, 1);
    dir = dir.join(splitterKey)
    requireCachePurge(dir);

    // Load all definitions
    require('../combined.js');

    // Put the removal function back
    Array.prototype.remove = function (index) {
        if (index === this.length - 1) return this.pop();
        let r = this[index];
        this[index] = this.pop();
        return r;
    };

    // Redefine all tanks and bosses
    for (let entity of entities) {
        if (entity.type != 'tank' && entity.type != 'miniboss') continue;

        let entityDefs = JSON.parse(JSON.stringify(entity.defs));
        entity.upgrades = [];
        entity.define(entityDefs);
        entity.destroyAllChildren();
        entity.skill.update();
        entity.syncTurrets();
        entity.refreshBodyAttributes();
    }

    // Tell the command sender
    socket.talk('m', Config.MESSAGE_DISPLAY_TIME, "Successfully reloaded all definitions.")
});

console.log('[defsReloadCommand.js] Loaded hot definitions reloader.');