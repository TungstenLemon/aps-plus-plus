// An addon is guaranteed to run only after all groups are loaded.
// This is helpful, if your group relies on all other definitions already being loaded.
// Addons that are dependant on other addons should be named something like
// "[PARENT ADDON NAME]-[EXTENSION NAME].js", to make sure that it would run after that addon ran.

const { combineStats, makeDeco } = require('../facilitators.js');
const { base } = require('../constants.js');
const g = require('../gunvals.js');
const _v = 2; // 1 | 2
const body = {
    SPEED: base.SPEED * 0.2,
    HEALTH: base.HEALTH * 15,
	SHIELD: base.SHIELD * 8,
	REGEN: base.REGEN * 8,
    FOV: base.FOV * 1.5,
	RESIST: base.RESIST * 4,
	DENSITY: base.DENSITY * 4,
};
const new_body = {
    HEALTH: base.HEALTH * 10,
	SHIELD: base.SHIELD * 5,
	REGEN: base.REGEN * 5,
    FOV: base.FOV * 1.5,
	RESIST: base.RESIST * 4,
	DENSITY: base.DENSITY * 4,
};

let makeAbility = (label, color) => {
    return {
        PARENT: ["genericTank"],
        LABEL: label + " Ability",
        FACING_TYPE: "autospin",
        ALPHA: 0,
        CAN_BE_ON_LEADERBOARD: false,
        ACCEPTS_SCORE: false,
        DRAW_HEALTH: false,
        HITS_OWN_TYPE: "never",
        ARENA_CLOSER: true,
        HAS_NO_RECOIL: true,
        BODY: {
            HEALTH: 1e100,
            SHIELD: 1e100,
            REGEN: 1e100,
        },
        GUNS: (() => {
            let e = [],
                angle = 360 / 30;
            for (let i = 0; i < 30; i++) {
                e.push({
                    POSITION: [0, 6.5, 1, -50 + -Math.random(), 0, angle * i, Math.random()],
                    PROPERTIES: {
                        TYPE: ["bullet", {
                            DIE_AT_LOW_SPEED: true,
                            MOTION_TYPE: "slow",
							COLOR: color,
                        }],
                        ALPHA: 1,
                        AUTOFIRE: true,
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload])
                    }
                })
            }        
            return e;
        })(),
    };
}

class io_ability extends IO {
    constructor(body, opts = {}) {
        super(body);
        this.ability = {
            timer: 0,
            used: 0,
        };
        this.mode = opts.type;
        this.logged = [];
        this.ids = [];
        this.turrets = [];
        this.active = false;
        this.check = 0;
    }
    log() {
        this.logged = [];
        for (let i = 0; i < entities.length; i++) {
            let e = entities[i];
            if (
                util.getDistance(this.body, e) < this.limit &&
                !e.skipLife &&
                (e.type == "tank" || e.type == "miniboss" || e.type == "food") &&
                e.master.id != this.body.id &&
                e.settings.hitsOwnType != "pushOnlyTeam" &&
                e.alpha != 0
            ) {
				switch (this.mode) {
                    case "capture":
                        if (e.type != "food") this.logged.push(e);
                        break;
                    case "heal":
                        if (e.team == this.body.team) this.logged.push(e);
                        break;
                    case "damage":
                        if (e.team != this.body.team) this.logged.push(e);
                        break;
                }
            }
        }
        // For attack
        let log = this.logged;
        let _cap = this.mode == "capture" ? 1 : 8;
        this.logged = [];
        while (log.length && _cap) {
            let near = nearest(log, {
                x: this.body.x,
                y: this.body.y
            });
            this.logged.push(near);
            log.splice(log.indexOf(near), 1);
            _cap--;
        }
    }
    checkSave() {
        for (let i = 0; i < this.logged.length; i++) {
            if (this.ids.indexOf(this.logged[i].id) == -1) return 1;
        }
        return 0;
    }
    loop() {
        if (this.ability.used == 2) this.log();
        if (this.checkSave()) {
            this.destroyTurrets();
            this.logged.forEach(log => {
                let o = new Entity(log, this.body);
                switch (this.mode) {
                    case "capture":
                        o.define(Class.noorooAbility);
                        break;
                    case "heal":
                        o.define(Class.tikkiAbility);
                        break;
                    case "damage":
                        o.define(Class.plaggAbility);
                        break;
                }
				o.logged = log;
                o.SIZE = log.SIZE * 1.2;
				o.define({ LEVEL: log.level });
                this.turrets.push(o);
            });
            this.ids = [];
            for (let i = 0; i < this.logged.length; i++) this.ids.push(this.logged[i].id);
        }
        for (let i = 0; i < this.turrets.length; i++) {
            let e = this.turrets[i];
            e.x = e.logged.x;
            e.y = e.logged.y;
        }
    }
    destroyTurrets() {
        for (let i = 0; i < this.turrets.length; i++) this.turrets[i].destroy();
        this.turrets = [];
    }
    do() {
        for (let i = 0; i < this.logged.length; i++) {
            let e = this.logged[i];
            switch (this.mode) {
                case "heal":
                    e.shield.amount = e.shield.max;
                    e.health.amount = e.health.max;
                    break;
                case "damage":
                    if (e.health.amount < e.health.max * 0.2) e.kill();
                    else {
                        e.health.amount *= 0.1;
                        e.shield.amount *= 0.1;
                    }
                    break;
                case "capture":
					e.controllers = [
						new ioTypes.nearestDifferentMaster(e),
						new ioTypes.wanderAroundMap(e, { immitatePlayerMovement: true, lookAtGoal: true }),
						new ioTypes.mapTargetToGoal(e),
					];
					if (e.socket) e.socket.talk("s");
                    e.define({
                        LEVEL: c.LEVEL_CAP,
                        TEAM: this.body.team
                    });
                    e.skill.set(e.skill.caps);
                    e.color = this.body.color;
					e.on("dead", () => {
						if (e.socket) e.socket.talk("s");
					});
                    break;
            }
        }
    }
    activate() {
        this.check++;
        if (this.check > 2000 / room.cycleSpeed && this.active) {
            this.ability.used++;
            switch (this.ability.used) {
                case 1:
                    this.logged = [this.body];
                    break;
                case 3:
                    this.ability.used = 0;
                    this.active = false;
                    this.ability.timer = 1 * 60000 / room.cycleSpeed;
                    this.do();
                    this.destroyTurrets();
                    break;
            }
            this.check = 0;
        }
    }
    think(input) {
        this.limit = this.body.realSize * 25;
        if (input.alt && !this.active) this.active = true;
        if (this.ability.timer < 1) this.activate();
        this.loop();
        if (this.ability.timer) this.ability.timer--;
    }
}

module.exports = ({ Class }) => {

	ioTypes = {
        ...ioTypes,
        ability: io_ability,
    };

    Class.kwamiBase = {
        PARENT: ["genericTank"],
        BODY: _v == 1 ? body : new_body,
        SHAPE: 0,
        SIZE: 50,
        LEVEL: 200,
        EXTRA_SKILL: 60,
        SKILL_CAP: [14, 14, 14, 14, 14, 14, 14, 14, 14, 14],
    };

	Class.plaggAbility = makeAbility("plagg", 9);
	Class.plagg = {
		PARENT: ["kwamiBase"],
		LABEL: "Plagg",
		CONTROLLERS: [["ability", { type: "damage" }]],
		COLOR: 11,
		TURRETS: [
			{
				POSITION: [18, 0, 0, 0, 360, 1],
				TYPE: makeDeco(0, 9),
			}
		],
		GUNS: (() => {
			let e = [];
			for (let t = 0; t < 5; t++) {
				let d = (360 / 5) * (t + 1);
				for (let v = 0; v < 2; v++) {
					e.push({
						POSITION: [10, 5, 1, 5, v == 1 ? -2.5 : 2.5, d, 0],
						PROPERTIES: {
							SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.doublereload, g.slow]),
							COLOR: 9,
							TYPE: ["bullet", { COLOR: 11 }],
						},
					});
				}
			}
			return e;
		})(),
	};

	Class.tikkiAbility = makeAbility("tikki", 5);
	Class.tikki = {
		PARENT: ["kwamiBase"],
		LABEL: "Tikki",
		CONTROLLERS: [["ability", { type: "heal" }]],
		COLOR: 12,
		TURRETS: [
			{
				POSITION: [4, 0, 0, 0, 360, 1],
				TYPE: makeDeco(0, 9),
			},
			{
				POSITION: [4, -4.5, -4.5, 0, 360, 1],
				TYPE: makeDeco(0, 9),
			},
			{
				POSITION: [4, -4.5, 4.5, 0, 360, 1],
				TYPE: makeDeco(0, 9),
			},
			{
				POSITION: [4, 4.5, -4.5, 0, 360, 1],
				TYPE: makeDeco(0, 9),
			},
			{
				POSITION: [4, 4.5, 4.5, 0, 360, 1],
				TYPE: makeDeco(0, 9),
			},
		],
		GUNS: (() => {
			let e = [];
			for (let t = 0; t < 5; t++) {
				let d = (360 / 5) * (t + 1);
				for (let v = 0; v < 2; v++) {
					let O = {
						POSITION: [10, 5, 1, 5, v == 1 ? -2.5 : 2.5, d, 0],
						PROPERTIES: {
							SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.doublereload, g.slow]),
							COLOR: 9,
							TYPE: ["bullet", { COLOR: 12 }],
						},
					};
					e.push(O);
				}
			}
			return e;
		})(),
	};

	Class.noorooAbility = makeAbility("nooroo", 4);
	Class.nooroo = {
		PARENT: ["kwamiBase"],
		LABEL: "Nooroo",
		CONTROLLERS: [["ability", { type: "capture" }]],
		COLOR: 4,
		TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 360, 1],
				TYPE: makeDeco(0, 7),
			},
		],
		GUNS: (() => {
			let e = [];
			for (let t = 0; t < 5; t++) {
				let d = (360 / 5) * (t + 1);
				for (let v = 0; v < 2; v++) {
					e.push({
						POSITION: [10, 5, 1, 5, v == 1 ? -2.5 : 2.5, d, 0],
						PROPERTIES: {
							SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.doublereload, g.slow]),
							COLOR: 9,
							TYPE: ["bullet", { COLOR: 4 }],
						},
					});
				}
			}
			return e;
		})(),
	};

	Class.developer.UPGRADES_TIER_0.push("plagg");
	Class.developer.UPGRADES_TIER_0.push("tikki");
	Class.developer.UPGRADES_TIER_0.push("nooroo");
};