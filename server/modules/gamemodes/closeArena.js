let loop;
function close() {
    sockets.broadcast("Closing!");
    clearInterval(loop);
    setTimeout(process.exit, 1000);
}

function closeArena() {
    if (arenaClosed) return;
    sockets.broadcast("Arena closed: No players may join!");
    global.arenaClosed = true;
    for (let i = 0; i < entities.length; i++) {
        if (entities[i].isBot) {
            entities[i].kill();
        }
    }
    for (let i = 0; i < 15; i++) {
        let angle = ((Math.PI * 2) / 15) * i;
        let o = new Entity({
            x: room.width / 2 + (room.width / 1.5) * Math.cos(angle),
            y: room.width / 2 + (room.width / 1.5) * Math.sin(angle),
        });
        o.define(Class.arenaCloser);
        o.team = TEAM_ENEMIES;
    }
    let ticks = 0;
    loop = setInterval(() => {
        ticks++;
        if (ticks >= 200) return close();
        let alive = false;
        for (let i = 0; i < entities.length; i++) {
            let instance = entities[i];
            if (
                instance.isMothership || instance.isPlayer ||
                (instance.isDominator && instance.team !== TEAM_ENEMIES)
            ) {
                alive = true;
            }
        }
        if (!alive) close();
    }, 500);
}

module.exports = { closeArena };