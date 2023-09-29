const { combineStats, addAura, makeAuto } = require('../facilitators.js');
const { gunCalcNames, smshskl, base } = require('../constants.js');
const g = require('../gunvals.js');
const ensureIsClass = (Class, str) => {
    if ("object" == typeof str) {
        return str;
    }
    if (str in Class) {
        return Class[str];
    }
    throw Error(`Definition ${str} is attempted to be gotten but does not exist!`);
};
const eggnoughtBody = {
    SPEED: base.SPEED * 0.8,
    HEALTH: base.HEALTH * 1.75,
	SHIELD: base.SHIELD * 1.5,
	REGEN: base.REGEN * 1.5,
    FOV: base.FOV * 1.1,
	RESIST: base.RESIST * 1.5,
	DENSITY: base.DENSITY * 1.5,
};
const squarenoughtBody = {
    SPEED: base.SPEED * 0.675,
    HEALTH: base.HEALTH * 2.5,
	SHIELD: base.SHIELD * 2,
	REGEN: base.REGEN * 2,
    FOV: base.FOV * 1.15,
	RESIST: base.RESIST * 2,
	DENSITY: base.DENSITY * 2,
};
const trinoughtBody = {
    SPEED: base.SPEED * 0.55,
    HEALTH: base.HEALTH * 3.5,
	SHIELD: base.SHIELD * 2.5,
	REGEN: base.REGEN * 2.5,
    FOV: base.FOV * 1.15,
	RESIST: base.RESIST * 2.5,
	DENSITY: base.DENSITY * 2.5,
};
const pentanoughtBody = {
    SPEED: base.SPEED * 0.425,
    HEALTH: base.HEALTH * 4.25,
	SHIELD: base.SHIELD * 3,
	REGEN: base.REGEN * 3,
    FOV: base.FOV * 1.2,
	RESIST: base.RESIST * 3,
	DENSITY: base.DENSITY * 3,
};
const hexnoughtBody = {
    SPEED: base.SPEED * 0.3,
    HEALTH: base.HEALTH * 5,
	SHIELD: base.SHIELD * 3.5,
	REGEN: base.REGEN * 3.5,
    FOV: base.FOV * 1.2,
	RESIST: base.RESIST * 3.5,
	DENSITY: base.DENSITY * 3.5,
};

module.exports = ({ Class }) => {
	// Comment out the line below to enable this addon, uncomment it to disable this addon.

	// Misc
	Class.genericEggnought = {
		PARENT: ["genericTank"],
		BODY: eggnoughtBody,
	    SHAPE: 0,
	    COLOR: 6,
	    SIZE: 12.5,
		DANGER: 8,
	    SKILL_CAP: Array(10).fill(smshskl),
	}
	Class.genericSquarenought = {
		PARENT: ["genericTank"],
		BODY: squarenoughtBody,
	    SHAPE: 4,
	    COLOR: 13,
	    SIZE: 15,
		DANGER: 9,
	    SKILL_CAP: Array(10).fill(smshskl),
	}
	Class.genericTrinought = {
		PARENT: ["genericTank"],
		BODY: trinoughtBody,
	    SHAPE: 3.5,
	    COLOR: 2,
	    SIZE: 20,
		DANGER: 10,
	    SKILL_CAP: Array(10).fill(smshskl),
	}
	Class.genericPentanought = {
		PARENT: ["genericTank"],
		BODY: pentanoughtBody,
	    SHAPE: 5.5,
	    COLOR: 14,
	    SIZE: 25,
		DANGER: 11,
	    SKILL_CAP: Array(10).fill(smshskl),
	}
	Class.genericHexnought = {
		PARENT: ["genericTank"],
		BODY: hexnoughtBody,
	    SHAPE: 6,
	    COLOR: 0,
	    SIZE: 30,
		DANGER: 12,
	    SKILL_CAP: Array(10).fill(smshskl),
	}

	Class.spamAutoTurret = {
		PARENT: ["autoTankGun"],
		INDEPENDENT: true,
		GUNS: [
			{
				POSITION: [21, 10, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.auto]),
					TYPE: "bullet",
				},
			},
		],
	}
	Class.supermissile = {
		PARENT: ["bullet"],
		LABEL: "Missile",
		INDEPENDENT: true,
		BODY: {
			RANGE: 120,
		},
		GUNS: [
			{
				POSITION: [14, 6, 1, 0, -2, 130, 0],
				PROPERTIES: {
					AUTOFIRE: true,
					SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
					TYPE: ["bullet", {PERSISTS_AFTER_DEATH: true}],
					STAT_CALCULATOR: gunCalcNames.thruster,
				},
			},
			{
				POSITION: [14, 6, 1, 0, 2, 230, 0],
				PROPERTIES: {
					AUTOFIRE: true,
					SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
					TYPE: ["bullet", {PERSISTS_AFTER_DEATH: true}],
					STAT_CALCULATOR: gunCalcNames.thruster,
				},
			},
			{
				POSITION: [14, 6, 1, 0, 0, 0, 0.2],
				PROPERTIES: {
					AUTOFIRE: true,
					SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.morespeed, g.morespeed]),
					TYPE: ["bullet", {PERSISTS_AFTER_DEATH: true}],
				},
			},
		],
	};
	Class.betadrone = {
		PARENT: ["drone"],
		TURRETS: [
			{
				POSITION: [10, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {COLOR: -1}],
			},
		]
	}

	// T0
	Class.dread_APSofficialdreadv2 = {
		PARENT: ["genericEggnought"],
	    LABEL: "Dreadnought",
		LEVEL: 90,
		EXTRA_SKILL: 18,
		REROOT_UPGRADE_TREE: true,
	}

	// T1 Weapons
	Class.sword_APSofficialdreadv2 = {
	    PARENT: ["genericEggnought"],
	    LABEL: "Sword",
	    GUNS: [],
	}
	for (let i = 0; i < 2; i++) {
		Class.sword_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [21, 7.5, 1, 0, 0, 180*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, {reload: 0.85}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.pacifier_APSofficialdreadv2 = {
	    PARENT: ["genericEggnought"],
	    LABEL: "Pacifier",
	    GUNS: [],
	}
	for (let i = 0; i < 2; i++) {
		Class.pacifier_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [15, 8.5, 1, 0, 0, 180*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, {reload: 0.8}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.peacekeeper_APSofficialdreadv2 = {
	    PARENT: ["genericEggnought"],
	    LABEL: "Peacekeeper",
	    GUNS: [],
	}
	for (let i = 0; i < 2; i++) {
		Class.peacekeeper_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [17, 9, 1, 0, 0, 180*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, {reload: 1.2, damage: 1.5}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.invader_APSofficialdreadv2 = {
	    PARENT: ["genericEggnought"],
	    LABEL: "Invader",
	    GUNS: [],
	}
	for (let i = 0; i < 2; i++) {
		Class.invader_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [5, 9.5, 1.2, 8, 0, 180*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, {reload: 0.85}]),
					TYPE: "drone",
					MAX_CHILDREN: 4,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
		)
	}
	Class.centaur_APSofficialdreadv2 = {
	    PARENT: ["genericEggnought"],
	    LABEL: "Centaur",
	    GUNS: [],
	}
	for (let i = 0; i < 2; i++) {
		Class.centaur_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [13, 8, 1, 0, 0, 180*i, 0],
			},
			{
				POSITION: [4, 8, 1.5, 13, 0, 180*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, {health: 2}]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
		)
	}

	// T1 Bodies
	Class.byte_APSofficialdreadv2 = makeAuto({
	    PARENT: ["genericEggnought"],
	    TURRETS: [
			{
				POSITION: [15.5, 0, 0, 0, 0, 1],
				TYPE: 'egg',
			},
		],
	}, "Byte", {angle: 0});
	Class.atmosphereAura_APSofficialdreadv2 = addAura();
	Class.atmosphere_APSofficialdreadv2 = {
	    PARENT: ["genericEggnought"],
	    LABEL: "Atmosphere",
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 0, 0, 1],
				TYPE: 'egg',
			},
			{
				POSITION: [11, 0, 0, 0, 360, 1],
				TYPE: 'atmosphereAura_APSofficialdreadv2',
			},
		],
	}
	Class.juggernaut_APSofficialdreadv2 = {
	    PARENT: ["genericEggnought"],
	    LABEL: "Juggernaut",
		BODY: {
			HEALTH: 1.6,
			SHIELD: 1.6,
			REGEN: 1.5,
			SPEED: 0.8,
		},
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 0, 0, 1],
				TYPE: 'egg',
			},
			{
				POSITION: [24, 0, 0, 0, 0, 0],
				TYPE: ['egg', {COLOR: 9}]
			},
		],
	}

	// T2 Weapons
	Class.sabre_APSofficialdreadv2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Sabre",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.sabre_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [25, 6, 1, 0, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.assass, {reload: 0.85}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [5, 6, -1.7, 7, 0, 90*i, 0],
			},
		)
	}
	Class.gladius_APSofficialdreadv2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Gladius",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.gladius_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [18, 8.5, 1, 0, 0, 90*i, 0],
			},
			{
				POSITION: [21, 5.5, 1, 0, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, {health: 1.3}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.mediator_APSofficialdreadv2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Mediator",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.mediator_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [15, 7, 1, 0, 4.25, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.twin, {reload: 0.85}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [15, 7, 1, 0, -4.25, 90*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.twin, {reload: 0.85}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.negotiator_APSofficialdreadv2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Negotiator",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.negotiator_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [9, 8, 1.4, 6, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, {size: 0.8, health: 1.3}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.enforcer_APSofficialdreadv2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Enforcer",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.enforcer_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [17, 9, 1, 0, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, {reload: 0.9}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.executor_APSofficialdreadv2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Executor",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.executor_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [11, 6, 1, 8, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.halfspeed, {reload: 0.8}]),
					TYPE: "missile",
					STAT_CALCULATOR: gunCalcNames.sustained,
				},
			},
			{
				POSITION: [17, 9, 1, 0, 0, 90*i, 0],	
			},
		)
	}
	Class.inquisitor_APSofficialdreadv2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Inquisitor",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.inquisitor_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [5, 11, 1.1, 8, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, {size: 1.5, reload: 0.6}]),
					TYPE: "drone",
					MAX_CHILDREN: 3,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
		)
	}
	Class.assailantMinion_APSofficialdreadv2 = {
		PARENT: ["minion"],
		BODY: {
			SPEED: 0.5,
		},
		SHAPE: 4,
	    COLOR: 13,
		GUNS: []
	}
	for (let i = 0; i < 4; i++) {
		Class.assailantMinion_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [15, 7.5, 1, 0, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.assass, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
		)
	}
	Class.assailant_APSofficialdreadv2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Assailant",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.assailant_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [5, 11, 1, 10.5, 0, 90*i, 0],
			},
			{
				POSITION: [1.5, 12, 1, 15.5, 0, 90*i, 0],
				PROPERTIES: {
					MAX_CHILDREN: 4,
					SHOOT_SETTINGS: combineStats([g.factory, {size: 0.9, reload: 0.5}]),
					TYPE: "assailantMinion_APSofficialdreadv2",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					MAX_CHILDREN: 2,
				},
			},
			{
				POSITION: [12.2, 12, 1, 0, 0, 90*i, 0],
			},
		)
	}
	Class.daemon_APSofficialdreadv2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Daemon",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.daemon_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [11.5, 4.5, 1, 0, 4.5, 90*i, 0],
			},
			{
				POSITION: [2, 4.5, 1.6, 11.5, 4.5, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.twin, {health: 2}]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [11.5, 4.5, 1, 0, -4.5, 90*i, 0],
			},
			{
				POSITION: [2, 4.5, 1.6, 11.5, -4.5, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.twin, {health: 2}]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
		)
	}
	Class.minotaur_APSofficialdreadv2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Minotaur",
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.minotaur_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [13, 7, 1, 0, 0, 90*i, 0],
			},
			{
				POSITION: [4, 7, 1.6, 13, 0, 90*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, {health: 2}]),
					TYPE: "unsetTrap",
				},
			},
		)
	}

	// T2 Bodies
	Class.automation_APSofficialdreadv2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Automation",
	    TURRETS: [
			{
				POSITION: [11, 0, 0, 0, 0, 1],
				TYPE: ["square", {TURRET_FACES_CLIENT: true}],
			},
		],
	}
	for (let i = 0; i < 4; i++) {
		Class.automation_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [4, 9, 0, 90*i+45, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.kilobyteTurret_APSofficialdreadv2 = {
		PARENT: ["autoTankGun"],
		INDEPENDENT: true,
		GUNS: [
			{
				POSITION: [26, 10, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.assass, g.auto, {health: 1.2, speed: 0.8}]),
					TYPE: "bullet",
				},
			},
		],
	}
	Class.kilobyte_APSofficialdreadv2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Kilobyte",
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 0, 1],
				TYPE: ["square", {TURRET_FACES_CLIENT: true}],
			},
			{
				POSITION: [10, 0, 0, 0, 360, 1],
				TYPE: "kilobyteTurret_APSofficialdreadv2",
			},
		],
	}
	Class.coronaAura_APSofficialdreadv2 = addAura(1.5, 0.8);
	Class.corona_APSofficialdreadv2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Corona",
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 0, 0, 1],
				TYPE: ["square", {TURRET_FACES_CLIENT: true}],
			},
			{
				POSITION: [12, 0, 0, 0, 360, 1],
				TYPE: "coronaAura_APSofficialdreadv2",
			},
		],
	}
	Class.thermosphereAura_APSofficialdreadv2 = addAura(-1, 1.5);
	Class.thermosphere_APSofficialdreadv2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Thermosphere",
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 0, 0, 1],
				TYPE: ["square", {TURRET_FACES_CLIENT: true}],
			},
			{
				POSITION: [12, 0, 0, 0, 360, 1],
				TYPE: "thermosphereAura_APSofficialdreadv2",
			},
		],
	}
	Class.jumbo_APSofficialdreadv2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Jumbo",
	    BODY: {
			HEALTH: 2.4,
			SHIELD: 2.4,
			REGEN: 2,
			SPEED: 0.65,
		},
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 0, 0, 1],
				TYPE: ['square', {TURRET_FACES_CLIENT: true}]
			},
			{
				POSITION: [24, 0, 0, 0, 0, 0],
				TYPE: ['square', {COLOR: 9, TURRET_FACES_CLIENT: true}]
			},
		],
	}
	Class.colossalTop_APSofficialdreadv2 = {
	    PARENT: ["genericSquarenought"],
	    GUNS: [],
	}
	for (let i = 0; i < 4; i++) {
		Class.colossalTop_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [4, 17.5, 0.001, 9, 0, 90*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.colossal_APSofficialdreadv2 = {
	    PARENT: ["genericSquarenought"],
	    LABEL: "Colossal",
		BODY: {
			SPEED: 1.75,
			HEALTH: 0.65,
		},
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 0, 0, 1],
				TYPE: ['colossalTop_APSofficialdreadv2', {TURRET_FACES_CLIENT: true}]
			},
		],
	}
	for (let i = 0; i < 4; i++) {
		Class.colossal_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [4, 17.5, 0.001, 9, 0, 90*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}

	// T3 Weapons
	Class.bayonet_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Bayonet",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.bayonet_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [28, 7.5, 1, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.assass, g.assass, {reload: 0.8}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [5, 7.5, -1.7, 7, 0, 120*i, 0],
			},
		)
	}
	Class.blade_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Blade",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.blade_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [17, 1, 1, 0, 7, 120*i, 0],
			},
			{
				POSITION: [17, 1, 1, 0, -7, 120*i, 0],
			},
			{
				POSITION: [18, 6, 1, 0, 3.5, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin, {speed: 0.8, health: 1.5}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [18, 6, 1, 0, -3.5, 120*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin, {speed: 0.8, health: 1.5}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.mitigator_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Mitigator",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.mitigator_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [13.5, 8, 1, 0, 5, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, {reload: 0.85}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [13.5, 8, 1, 0, -5, 120*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, {reload: 0.85}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.appeaser_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Appeaser",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.appeaser_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [7, 10, 1.4, 6, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, {size: 0.8}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [7, 9.5, 1.3, 8, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, {size: 0.8, reload: 0.95}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.suppressor_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Suppressor",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.suppressor_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [17, 11, 1, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, {reload: 0.85}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.inhibitor_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Inhibitor",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.inhibitor_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [10, 14, -0.5, 7, 0, 120*i, 0],
			},
			{
				POSITION: [15, 15, 1, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.halfspeed, {reload: 0.8}]),
					TYPE: "supermissile",
					STAT_CALCULATOR: gunCalcNames.sustained,
				},
			},
		)
	}
	Class.infiltrator_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Infiltrator",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.infiltrator_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [5, 6, 1.4, 6, 5.5, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, {size: 1.5, reload: 0.6}]),
					TYPE: "drone",
					MAX_CHILDREN: 2,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
			{
				POSITION: [5, 6, 1.4, 6, -5.5, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, {size: 1.5, reload: 0.6}]),
					TYPE: "drone",
					MAX_CHILDREN: 2,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
			{
				POSITION: [5, 6, 1.4, 8, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, g.pound, {size: 2, reload: 0.4}]),
					TYPE: "betadrone",
					MAX_CHILDREN: 2,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
		)
	}
	Class.aggressorMinion_APSofficialdreadv2 = {
		PARENT: ["minion"],
		SHAPE: 3.5,
		COLOR: 2,
		BODY: {
			SPEED: 0.8,
		},
		GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.aggressorMinion_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [15, 8.5, 1, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.bitlessspeed, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
		)
	}
	Class.aggressor_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Aggressor",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.aggressor_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [5, 12, 1, 10.5, 0, 120*i, 0],
			},
			{
				POSITION: [1.5, 13, 1, 15.5, 0, 120*i, 0],
				PROPERTIES: {
					MAX_CHILDREN: 4,
					SHOOT_SETTINGS: combineStats([g.factory, {size: 0.9, reload: 0.5}]),
					TYPE: "aggressorMinion_APSofficialdreadv2",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					MAX_CHILDREN: 2,
				},
			},
			{
				POSITION: [12.2, 13, 1, 0, 0, 120*i, 0],
			},
		)
	}
	Class.hydra_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Hydra",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.hydra_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [6, 3.5, 1, 4, 8, 120*i, 0],
			},
			{
				POSITION: [2, 3.5, 1.8, 10, 8, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pound, g.fast]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [6, 3.5, 1, 4, -8, 120*i, 0],
			},
			{
				POSITION: [2, 3.5, 1.8, 10, -8, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pound, g.fast]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [12, 5, 1, 0, 0, 120*i, 0],
			},
			{
				POSITION: [2, 5, 1.6, 12, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.twin, g.pound, g.fast]),
					TYPE: "unsetTrap",
				},
			},
		)
	}
	Class.beelzebub_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Beelzebub",
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.beelzebub_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [13, 10, 1, 0, 0, 120*i, 0],
			},
			{
				POSITION: [4, 10, 1.6, 13, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.pound, g.morespeed, {health: 2}]),
					TYPE: "unsetTrap",
				},
			},
		)
	}

	// T3 Bodies
	Class.mechanism_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Mechanism",
	    TURRETS: [
			{
				POSITION: [11, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {TURRET_FACES_CLIENT: true}],
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.mechanism_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.5, 6.2, 0, 120*i, 180, 1],
				TYPE: "spamAutoTurret",
			},
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.trinoughtBigAura = addAura(2, 1.5);
	Class.fusion_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Fusion",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {TURRET_FACES_CLIENT: true}],
			},
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "trinoughtBigAura",
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.fusion_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.binary_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Binary",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {TURRET_FACES_CLIENT: true}],
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.binary_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.binary_APSofficialdreadv2.TURRETS.push(
		{
			POSITION: [10, 0, 0, 0, 360, 1],
			TYPE: "kilobyteTurret_APSofficialdreadv2",
		},
	)
	Class.trinoughtBigHealAura = addAura(-1.5, 1.5);
	Class.exosphere_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Exosphere",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {TURRET_FACES_CLIENT: true}],
			},
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "trinoughtBigHealAura",
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.exosphere_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.5, 10.5, 0, 120*i+60, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.megabyteTurret_APSofficialdreadv2 = {
		PARENT: ["autoTankGun"],
		INDEPENDENT: true,
		GUNS: [
			{
				POSITION: [24, 13, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pound, g.auto, {health: 1.2, speed: 0.8}]),
					TYPE: "bullet",
				},
			},
		],
	}
	Class.megabyte_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Megabyte",
	    TURRETS: [
			{
				POSITION: [16, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {TURRET_FACES_CLIENT: true}],
			},
			{
				POSITION: [12, 0, 0, 0, 360, 1],
				TYPE: "megabyteTurret_APSofficialdreadv2",
			},
		],
	}
	Class.trinoughtSmallAura = addAura(1, 2, 0.15);
	Class.trojan_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Trojan",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {TURRET_FACES_CLIENT: true}],
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.trojan_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.5, 11, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallAura",
			},
		)
	}
	Class.trojan_APSofficialdreadv2.TURRETS.push(
		{
			POSITION: [10, 0, 0, 0, 360, 1],
			TYPE: "kilobyteTurret_APSofficialdreadv2",
		},
	)
	Class.trinoughtSmallHealAura = addAura(-2/3, 2, 0.15);
	Class.hardware_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Hardware",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {TURRET_FACES_CLIENT: true}],
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.hardware_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.5, 11, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallHealAura",
			},
		)
	}
	Class.hardware_APSofficialdreadv2.TURRETS.push(
		{
			POSITION: [10, 0, 0, 0, 360, 1],
			TYPE: "kilobyteTurret_APSofficialdreadv2",
		},
	)
	Class.chromosphere_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Chromosphere",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {TURRET_FACES_CLIENT: true}],
			},
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "trinoughtBigAura",
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.chromosphere_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.5, 11, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallAura",
			},
		)
	}
	Class.mesosphere_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Mesosphere",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {TURRET_FACES_CLIENT: true}],
			},
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "trinoughtBigHealAura",
			},
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.mesosphere_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.5, 11, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallHealAura",
			},
		)
	}
	Class.goliath_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Goliath",
	    BODY: {
			HEALTH: 3.2,
			SHIELD: 3.2,
			REGEN: 2.5,
			SPEED: 0.5,
		},
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 180, 0, 1],
				TYPE: ['triangle', {COLOR: 9, TURRET_FACES_CLIENT: true}]
			},
			{
				POSITION: [24, 0, 0, 180, 0, 0],
				TYPE: ['triangle', {COLOR: 9, TURRET_FACES_CLIENT: true}]
			},
		],
	}
	Class.planet_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Planet",
		BODY: {
			HEALTH: 2.4,
			SHIELD: 2.4,
			REGEN: 2,
			SPEED: 0.65,
		},
	    TURRETS: [
			{
				POSITION: [24, 0, 0, 180, 0, 0],
				TYPE: ['triangle', {COLOR: 9, TURRET_FACES_CLIENT: true}]
			},
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {TURRET_FACES_CLIENT: true}],
			}
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.planet_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.5, 11, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallAura",
			},
		)
	}
	Class.moon_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Moon",
		BODY: {
			HEALTH: 2.4,
			SHIELD: 2.4,
			REGEN: 2,
			SPEED: 0.65,
		},
	    TURRETS: [
			{
				POSITION: [24, 0, 0, 180, 0, 0],
				TYPE: ['triangle', {COLOR: 9, TURRET_FACES_CLIENT: true}]
			},
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {TURRET_FACES_CLIENT: true}],
			}
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.moon_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.5, 11, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallHealAura",
			},
		)
	}
	Class.titanTop_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    GUNS: [],
	}
	for (let i = 0; i < 3; i++) {
		Class.titanTop_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [5, 26, 0.001, 8, 0, 120*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.titan_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Titan",
		BODY: {
			SPEED: 2.15,
			HEALTH: 0.5,
		},
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [11, 0, 0, 0, 0, 1],
				TYPE: ["titanTop_APSofficialdreadv2", {TURRET_FACES_CLIENT: true}]
			}
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.titan_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [5, 26, 0.001, 8, 0, 120*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.siren_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Siren",
		BODY: {
			SPEED: 1.75,
			HEALTH: 0.65,
		},
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {TURRET_FACES_CLIENT: true}],
			}
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.siren_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [5, 26, 0.001, 8, 0, 120*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
		Class.siren_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.5, 11, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallAura",
			},
		)
	}
	Class.harpy_APSofficialdreadv2 = {
	    PARENT: ["genericTrinought"],
	    LABEL: "Harpy",
		BODY: {
			SPEED: 1.75,
			HEALTH: 0.65,
		},
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["triangle", {TURRET_FACES_CLIENT: true}],
			}
		],
	}
	for (let i = 0; i < 3; i++) {
		Class.harpy_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [5, 26, 0.001, 8, 0, 120*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
		Class.harpy_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.5, 11, 0, 120*i+60, 360, 1],
				TYPE: "trinoughtSmallHealAura",
			},
		)
	}

	// T4 Weapons
	Class.javelin_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Javelin",
	    GUNS: [],
	}
  	for (let i = 0; i < 5; i++) {
		Class.javelin_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [30, 7.5, 1, 0, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.assass, g.assass, g.assass, {reload: 0.8}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [5, 7.5, -1.5, 7, 0, 72*i, 0],
			},
		)
	}
	Class.rapier_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Rapier",
	    GUNS: [],
	}
  	for (let i = 0; i < 5; i++) {
		Class.rapier_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [15.5, 1, 1, 0, 6, 72*i, 0],
			},
			{
				POSITION: [15.5, 1, 1, 0, -6, 72*i, 0],
			},
			{
				POSITION: [17, 5, 1, 0, 3, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, {speed: 0.8, health: 1.5}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [17, 5, 1, 0, -3, 72*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, {speed: 0.8, health: 1.5}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.diplomat_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Diplomat",
	    GUNS: [],
	}
  	for (let i = 0; i < 5; i++) {
		Class.diplomat_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [13, 7, 1, 0, 3, 72*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.spam, g.spam, {size: 0.85}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [13, 7, 1, 0, -3, 72*i, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.spam, g.spam, {size: 0.85}]),
					TYPE: "bullet",
				},
			},
      {
				POSITION: [15, 7, 1, 0, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.spam, g.spam, {size: 0.85}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.arbitrator_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Arbitrator",
	    GUNS: [],
	}
  	for (let i = 0; i < 5; i++) {
		Class.arbitrator_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [7, 10, 1.4, 5.5, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.spam, g.spam, {size: 0.7, reload: 1.2}]),
					TYPE: "bullet",
				},
			},
			{
				POSITION: [7, 9.5, 1.33, 7.5, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.spam, g.spam, {size: 0.7, reload: 1.125}]),
					TYPE: "bullet",
				},
			},
      {
				POSITION: [7, 7.5, 1.2, 9.5, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.spam, g.spam, {size: 0.7, reload: 1.05}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.retardant_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Retardant",
	    GUNS: [],
	}
  	for (let i = 0; i < 5; i++) {
		Class.retardant_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [16, 11, 1, 0, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, {reload: 0.9, health: 1.1}]),
					TYPE: "bullet",
				},
			},
		)
	}
	Class.tyrant_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Tyrant",
	    GUNS: [],
	}
  	for (let i = 0; i < 5; i++) {
		Class.tyrant_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [10, 10, -0.5, 6, 0, 72*i, 0],
			},
			{
				POSITION: [14.5, 11, 1, 0, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.destroy, g.arty, g.skim, g.halfspeed, {reload: 0.8}]),
					TYPE: "supermissile",
					STAT_CALCULATOR: gunCalcNames.sustained,
				},
			},
		)
	}
	Class.raider_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Raider",
	    GUNS: [],
	}
	for (let i = 0; i < 5; i++) {
		Class.raider_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [4, 5, 2.1, 7.5, 3, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, g.over, {size: 1.5, reload: 0.6}]),
					TYPE: ["drone", {COLOR: 5}],
					MAX_CHILDREN: 2,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
			{
				POSITION: [4, 5, 2.1, 7.5, -3, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, g.over, {size: 1.5, reload: 0.6}]),
					TYPE: ["drone", {COLOR: 5}],
					MAX_CHILDREN: 2,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
			{
				POSITION: [5, 6, 1.4, 8.5, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.over, g.over, g.over, g.pound, {size: 2, reload: 0.4}]),
					TYPE: ["betadrone", {COLOR: 5}],
					MAX_CHILDREN: 2,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					STAT_CALCULATOR: gunCalcNames.drone,
					WAIT_TO_CYCLE: true,
				},
			},
		)
	}
	Class.gladiatorGenericMinion_APSofficialdreadv2 = {
	    PARENT: ["minion"],
		BODY: {
			SPEED: 1,
		},
		SHAPE: 3.5,
	    COLOR: 5,
		GUNS: [],
	}
	Class.gladiatorTritankMinion_APSofficialdreadv2 = {
	    PARENT: ["gladiatorGenericMinion_APSofficialdreadv2"],
		GUNS: [],
	}
	Class.gladiatorTritrapMinion_APSofficialdreadv2 = {
	    PARENT: ["gladiatorGenericMinion_APSofficialdreadv2"],
		GUNS: [],
	}
	Class.gladiatorTriswarmMinion_APSofficialdreadv2 = {
	    PARENT: ["gladiatorGenericMinion_APSofficialdreadv2"],
		GUNS: [],
	}
	Class.gladiatorAutoMinion_APSofficialdreadv2 = makeAuto({
	    PARENT: ["gladiatorGenericMinion_APSofficialdreadv2"],
	}, "Minion", {size: 12, angle: 0});
	Class.gladiatorAuraMinionAura_APSofficialdreadv2 = addAura(1, 1.2);
	Class.gladiatorAuraMinion_APSofficialdreadv2 = {
	    PARENT: ["gladiatorGenericMinion_APSofficialdreadv2"],
		TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 360, 1],
				TYPE: "gladiatorAuraMinionAura_APSofficialdreadv2",
			}
		]
	}
	for (let i = 0; i < 3; i++) {
		Class.gladiatorTritankMinion_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [15, 8.5, 1, 0, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.slow, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: ["bullet", {COLOR: 5}],
				},
			},
		);
		Class.gladiatorTritrapMinion_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [13, 7, 1, 0, 0, 120*i, 0],
			},
			{
				POSITION: [3, 7, 1.7, 13, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.flank, g.minion]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
		);
		Class.gladiatorTriswarmMinion_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [7, 8.5, -1.5, 7, 0, 120*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.swarm, {size: 1.6, range: 0.5}]),
					TYPE: ["swarm", {COLOR: 5}],
					STAT_CALCULATOR: gunCalcNames.swarm,
				},
			},
		);
	}
	Class.gladiator_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Gladiator",
	    GUNS: [],
	}
	for (let i = 0; i < 5; i++) {
		Class.gladiator_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [4.5, 12, 1, 10, 0, 72*i, 0],
			},
			{
				POSITION: [1.5, 13, 1, 14.5, 0, 72*i, 0],
				PROPERTIES: {
					MAX_CHILDREN: 4,
					SHOOT_SETTINGS: combineStats([g.factory, {size: 0.9, reload: 0.5}]),
					TYPE: "minion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
					MAX_CHILDREN: 2,
				},
			},
			{
				POSITION: [11.75, 13, 1, 0, 0, 72*i, 0],
			},
		)
	}
	Class.gladiator_APSofficialdreadv2.GUNS[1].PROPERTIES.TYPE = "gladiatorTritankMinion_APSofficialdreadv2";
	Class.gladiator_APSofficialdreadv2.GUNS[4].PROPERTIES.TYPE = "gladiatorTritrapMinion_APSofficialdreadv2";
	Class.gladiator_APSofficialdreadv2.GUNS[7].PROPERTIES.TYPE = "gladiatorTriswarmMinion_APSofficialdreadv2";
	Class.gladiator_APSofficialdreadv2.GUNS[10].PROPERTIES.TYPE = "gladiatorAutoMinion_APSofficialdreadv2";
	Class.gladiator_APSofficialdreadv2.GUNS[13].PROPERTIES.TYPE = "gladiatorAuraMinion_APSofficialdreadv2";
	Class.cerberus_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Cerberus",
	    GUNS: [],
	}
	for (let i = 0; i < 5; i++) {
		Class.cerberus_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [11.5, 3.5, 1, 0, 2.5, 72*i+10, 0],
			},
			{
				POSITION: [2, 3.5, 1.8, 11.5, 2.5, 72*i+10, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pound, g.fast]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [11.5, 3.5, 1, 0, -2.5, 72*i-10, 0],
			},
			{
				POSITION: [2, 3.5, 1.8, 11.5, -2.5, 72*i-10, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.pound, g.fast]),
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [14, 5, 1, 0, 0, 72*i, 0],
			},
			{
				POSITION: [2, 5, 1.75, 14, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.twin, g.pound, g.fast]),
					TYPE: "unsetTrap",
				},
			},
		)
	}
	Class.lucifer_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Lucifer",
	    GUNS: [],
	}
	for (let i = 0; i < 5; i++) {
		Class.lucifer_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [13, 10, 1, 0, 0, 72*i, 0],
			},
			{
				POSITION: [3.5, 10, 1.55, 13, 0, 72*i, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.pound, g.morespeed, {health: 2}]),
					TYPE: "unsetTrap",
				},
			},
		)
	}

	// T4 Bodies
	Class.skynet_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Skynet",
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {TURRET_FACES_CLIENT: true}],
			}
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.skynet_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.25, 4.5, 0, 72*i, 180, 1],
				TYPE: "spamAutoTurret",
			},
			 {
				POSITION: [3.25, 8, 0, 72*i+36, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.pentanoughtBigAura = addAura(2.5, 1.5);
	Class.supernova_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Supernova",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {TURRET_FACES_CLIENT: true}],
			},
			{
				POSITION: [9, 0, 0, 0, 360, 1],
				TYPE: "pentanoughtBigAura",
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.supernova_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.25, 9, 0, 72*i+36, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.cipher_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Cipher",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {TURRET_FACES_CLIENT: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.cipher_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.25, 9, 0, 72*i+36, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.cipher_APSofficialdreadv2.TURRETS.push(
		{
			POSITION: [11.5, 0, 0, 0, 360, 1],
			TYPE: "megabyteTurret_APSofficialdreadv2",
		},
	)
	Class.pentanoughtBigHealAura = addAura(-2, 1.5);
	Class.interstellar_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Interstellar",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {TURRET_FACES_CLIENT: true}],
			},
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "pentanoughtBigHealAura",
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.interstellar_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.25, 9, 0, 72*i+36, 180, 1],
				TYPE: "spamAutoTurret",
			},
		)
	}
	Class.gigabyteTurret_APSofficialdreadv2 = {
		PARENT: ["autoTankGun"],
		INDEPENDENT: true,
		GUNS: [
			{
				POSITION: [24, 13, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.auto, {speed: 1.1, health: 0.8}]),
					TYPE: "bullet",
				},
			},
		],
	}
	Class.gigabyte_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Gigabyte",
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {TURRET_FACES_CLIENT: true}],
			},
			{
				POSITION: [13.5, 0, 0, 0, 360, 1],
				TYPE: "gigabyteTurret_APSofficialdreadv2",
			},
		],
	}
	Class.malware_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Malware",
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {TURRET_FACES_CLIENT: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.malware_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.5, 8.75, 0, 72*i+36, 360, 1],
				TYPE: "trinoughtSmallAura",
			},
		)
	}
	Class.malware_APSofficialdreadv2.TURRETS.push(
		{
			POSITION: [12, 0, 0, 0, 360, 1],
			TYPE: "megabyteTurret_APSofficialdreadv2",
		},
	)
	Class.software_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Software",
	    TURRETS: [
			{
				POSITION: [14, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {TURRET_FACES_CLIENT: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.software_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.5, 8.75, 0, 72*i+36, 360, 1],
				TYPE: "trinoughtSmallHealAura",
			},
		)
	}
	Class.software_APSofficialdreadv2.TURRETS.push(
		{
			POSITION: [12, 0, 0, 0, 360, 1],
			TYPE: "megabyteTurret_APSofficialdreadv2",
		},
	)
	Class.photosphereSmallAura_APSofficialdreadv2 = addAura(1, 2, 0.15);
	Class.photosphereBigAura_APSofficialdreadv2 = addAura(1.5, 4);
	Class.photosphere_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Photosphere",
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {TURRET_FACES_CLIENT: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.photosphere_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.5, 8.75, 0, 72*i+36, 360, 1],
				TYPE: "photosphereSmallAura_APSofficialdreadv2",
			},
		)
	}
	for (let i = 0; i < 5; i++) {
		Class.photosphere_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3, 4, 0, 72*i, 360, 1],
				TYPE: "photosphereBigAura_APSofficialdreadv2",
			},
		)
	}
	Class.stratosphere_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Stratosphere",
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {TURRET_FACES_CLIENT: true}],
			},
			{
				POSITION: [9.5, 0, 0, 0, 360, 1],
				TYPE: "pentanoughtBigHealAura",
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.stratosphere_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.5, 8.75, 0, 72*i+36, 360, 1],
				TYPE: "trinoughtSmallHealAura",
			},
		)
	}
	Class.behemoth_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Behemoth",
		BODY: {
			HEALTH: 4,
			SHIELD: 4,
			REGEN: 2.5,
			SPEED: 0.4,
		},
	    TURRETS: [
			{
				POSITION: [15, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {COLOR: 9, TURRET_FACES_CLIENT: true}],
			},
			{
				POSITION: [24, 0, 0, 180, 0, 0],
				TYPE: ["pentagon", {COLOR: 9, TURRET_FACES_CLIENT: true}],
			},
		],
	}
	Class.astronomic_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Astronomic",
		BODY: {
			HEALTH: 3.2,
			SHIELD: 3.2,
			REGEN: 2.5,
			SPEED: 0.5,
		},
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {TURRET_FACES_CLIENT: true}],
			},
			{
				POSITION: [24, 0, 0, 180, 0, 0],
				TYPE: ["pentagon", {COLOR: 9,TURRET_FACES_CLIENT: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.astronomic_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.5, 8.75, 0, 72*i+36, 360, 1],
				TYPE: "trinoughtSmallAura",
			},
		)
	}
	Class.grandiose_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Grandiose",
		BODY: {
			HEALTH: 3.2,
			SHIELD: 3.2,
			REGEN: 2.5,
			SPEED: 0.5,
		},
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {TURRET_FACES_CLIENT: true}],
			},
			{
				POSITION: [24, 0, 0, 180, 0, 0],
				TYPE: ["pentagon", {COLOR: 9,TURRET_FACES_CLIENT: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.grandiose_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.5, 8.75, 0, 72*i+36, 360, 1],
				TYPE: "trinoughtSmallHealAura",
			},
		)
	}
	Class.leviathanTop_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Leviathan",
		TURRET_FACES_CLIENT: true,
	    GUNS: [],
	}
	for (let i = 0; i < 5; i++) {
		Class.leviathanTop_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [6, 13.5, 0.001, 9, 0, 72*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.leviathan_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Leviathan",
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [12, 0, 0, 0, 0, 1],
				TYPE: "leviathanTop_APSofficialdreadv2"
			}
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.leviathan_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [6.5, 16, 0.001, 9, 0, 72*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
	}
	Class.valrayvn_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Valrayvn",
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {TURRET_FACES_CLIENT: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.valrayvn_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [6.5, 16, 0.001, 9, 0, 72*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
		Class.valrayvn_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.5, 8.75, 0, 72*i+36, 360, 1],
				TYPE: "trinoughtSmallAura",
			},
		)
	}
	Class.pegasus_APSofficialdreadv2 = {
	    PARENT: ["genericPentanought"],
	    LABEL: "Pegasus",
		GUNS: [],
	    TURRETS: [
			{
				POSITION: [13, 0, 0, 180, 0, 1],
				TYPE: ["pentagon", {TURRET_FACES_CLIENT: true}],
			},
		],
	}
	for (let i = 0; i < 5; i++) {
		Class.pegasus_APSofficialdreadv2.GUNS.push(
			{
				POSITION: [6.5, 16, 0.001, 9, 0, 72*i, 0],
				PROPERTIES: {COLOR: 9},
			},
		)
		Class.pegasus_APSofficialdreadv2.TURRETS.push(
			{
				POSITION: [3.5, 8.75, 0, 72*i+36, 360, 1],
				TYPE: "trinoughtSmallHealAura",
			},
		)
	}

	Class.developer.UPGRADES_TIER_0.push("dread_APSofficialdreadv2");
		Class.dread_APSofficialdreadv2.UPGRADES_TIER_1 = ["sword_APSofficialdreadv2", "pacifier_APSofficialdreadv2", "peacekeeper_APSofficialdreadv2", "invader_APSofficialdreadv2", "centaur_APSofficialdreadv2"];

			Class.sword_APSofficialdreadv2.UPGRADES_TIER_M1 = ["sabre_APSofficialdreadv2", "gladius_APSofficialdreadv2"];
				Class.sabre_APSofficialdreadv2.UPGRADES_TIER_M1 = ["bayonet_APSofficialdreadv2"];
					Class.bayonet_APSofficialdreadv2.UPGRADES_TIER_M1 = ["javelin_APSofficialdreadv2"];
				Class.gladius_APSofficialdreadv2.UPGRADES_TIER_M1 = ["blade_APSofficialdreadv2"];
					Class.blade_APSofficialdreadv2.UPGRADES_TIER_M1 = ["rapier_APSofficialdreadv2"];

			Class.pacifier_APSofficialdreadv2.UPGRADES_TIER_M1 = ["mediator_APSofficialdreadv2", "negotiator_APSofficialdreadv2"];
				Class.mediator_APSofficialdreadv2.UPGRADES_TIER_M1 = ["mitigator_APSofficialdreadv2"];
					Class.mitigator_APSofficialdreadv2.UPGRADES_TIER_M1 = ["diplomat_APSofficialdreadv2"];
				Class.negotiator_APSofficialdreadv2.UPGRADES_TIER_M1 = ["appeaser_APSofficialdreadv2"];
					Class.appeaser_APSofficialdreadv2.UPGRADES_TIER_M1 = ["arbitrator_APSofficialdreadv2"];

			Class.peacekeeper_APSofficialdreadv2.UPGRADES_TIER_M1 = ["enforcer_APSofficialdreadv2", "executor_APSofficialdreadv2"];
				Class.enforcer_APSofficialdreadv2.UPGRADES_TIER_M1 = ["suppressor_APSofficialdreadv2"];
					Class.suppressor_APSofficialdreadv2.UPGRADES_TIER_M1 = ["retardant_APSofficialdreadv2"];
				Class.executor_APSofficialdreadv2.UPGRADES_TIER_M1 = ["inhibitor_APSofficialdreadv2"];
					Class.inhibitor_APSofficialdreadv2.UPGRADES_TIER_M1 = ["tyrant_APSofficialdreadv2"];

			Class.invader_APSofficialdreadv2.UPGRADES_TIER_M1 = ["inquisitor_APSofficialdreadv2", "assailant_APSofficialdreadv2"];
				Class.inquisitor_APSofficialdreadv2.UPGRADES_TIER_M1 = ["infiltrator_APSofficialdreadv2"];
					Class.infiltrator_APSofficialdreadv2.UPGRADES_TIER_M1 = ["raider_APSofficialdreadv2"];
				Class.assailant_APSofficialdreadv2.UPGRADES_TIER_M1 = ["aggressor_APSofficialdreadv2"];
					Class.aggressor_APSofficialdreadv2.UPGRADES_TIER_M1 = ["gladiator_APSofficialdreadv2"];

			Class.centaur_APSofficialdreadv2.UPGRADES_TIER_M1 = ["daemon_APSofficialdreadv2", "minotaur_APSofficialdreadv2"];
				Class.daemon_APSofficialdreadv2.UPGRADES_TIER_M1 = ["hydra_APSofficialdreadv2"];
					Class.hydra_APSofficialdreadv2.UPGRADES_TIER_M1 = ["cerberus_APSofficialdreadv2"];
				Class.minotaur_APSofficialdreadv2.UPGRADES_TIER_M1 = ["beelzebub_APSofficialdreadv2"];
					Class.beelzebub_APSofficialdreadv2.UPGRADES_TIER_M1 = ["lucifer_APSofficialdreadv2"];

			Class.byte_APSofficialdreadv2.UPGRADES_TIER_M1 = ["automation_APSofficialdreadv2", "kilobyte_APSofficialdreadv2"];

				Class.automation_APSofficialdreadv2.UPGRADES_TIER_M1 = ["mechanism_APSofficialdreadv2", "fusion_APSofficialdreadv2", "binary_APSofficialdreadv2", "exosphere_APSofficialdreadv2"];
					Class.mechanism_APSofficialdreadv2.UPGRADES_TIER_M1 = ["skynet_APSofficialdreadv2"];
					Class.fusion_APSofficialdreadv2.UPGRADES_TIER_M1 = ["supernova_APSofficialdreadv2"];
					Class.binary_APSofficialdreadv2.UPGRADES_TIER_M1 = ["cipher_APSofficialdreadv2"];
					Class.exosphere_APSofficialdreadv2.UPGRADES_TIER_M1 = ["interstellar_APSofficialdreadv2"];

				Class.kilobyte_APSofficialdreadv2.UPGRADES_TIER_M1 = ["megabyte_APSofficialdreadv2", "binary_APSofficialdreadv2", "trojan_APSofficialdreadv2", "hardware_APSofficialdreadv2"];
					Class.megabyte_APSofficialdreadv2.UPGRADES_TIER_M1 = ["gigabyte_APSofficialdreadv2"];
					// Class.binary_APSofficialdreadv2.UPGRADES_TIER_M1 = ["cipher_APSofficialdreadv2"];
					Class.trojan_APSofficialdreadv2.UPGRADES_TIER_M1 = ["malware_APSofficialdreadv2"];
					Class.hardware_APSofficialdreadv2.UPGRADES_TIER_M1 = ["software_APSofficialdreadv2"];

			Class.atmosphere_APSofficialdreadv2.UPGRADES_TIER_M1 = ["corona_APSofficialdreadv2", "thermosphere_APSofficialdreadv2"];

				Class.corona_APSofficialdreadv2.UPGRADES_TIER_M1 = ["chromosphere_APSofficialdreadv2", "fusion_APSofficialdreadv2", "trojan_APSofficialdreadv2", "planet_APSofficialdreadv2"];
					Class.chromosphere_APSofficialdreadv2.UPGRADES_TIER_M1 = ["photosphere_APSofficialdreadv2"];
					// Class.fusion_APSofficialdreadv2.UPGRADES_TIER_M1 = ["supernova_APSofficialdreadv2"];
					// Class.trojan_APSofficialdreadv2.UPGRADES_TIER_M1 = ["malware_APSofficialdreadv2"];
					Class.planet_APSofficialdreadv2.UPGRADES_TIER_M1 = ["astronomic_APSofficialdreadv2"];

				Class.thermosphere_APSofficialdreadv2.UPGRADES_TIER_M1 = ["mesosphere_APSofficialdreadv2", "exosphere_APSofficialdreadv2", "hardware_APSofficialdreadv2", "moon_APSofficialdreadv2"];
					Class.mesosphere_APSofficialdreadv2.UPGRADES_TIER_M1 = ["stratosphere_APSofficialdreadv2"];
					// Class.exosphere_APSofficialdreadv2.UPGRADES_TIER_M1 = ["interstellar_APSofficialdreadv2"];
					// Class.hardware_APSofficialdreadv2.UPGRADES_TIER_M1 = ["software_APSofficialdreadv2"];
					Class.moon_APSofficialdreadv2.UPGRADES_TIER_M1 = ["grandiose_APSofficialdreadv2"];

			Class.juggernaut_APSofficialdreadv2.UPGRADES_TIER_M1 = ["jumbo_APSofficialdreadv2", "colossal_APSofficialdreadv2"];

				Class.jumbo_APSofficialdreadv2.UPGRADES_TIER_M1 = ["goliath_APSofficialdreadv2", "planet_APSofficialdreadv2", "moon_APSofficialdreadv2"];
					Class.goliath_APSofficialdreadv2.UPGRADES_TIER_M1 = ["behemoth_APSofficialdreadv2"];
					// Class.planet_APSofficialdreadv2.UPGRADES_TIER_M1 = ["astronomic_APSofficialdreadv2"];
					// Class.moon_APSofficialdreadv2.UPGRADES_TIER_M1 = ["grandiose_APSofficialdreadv2"];

				Class.colossal_APSofficialdreadv2.UPGRADES_TIER_M1 = ["titan_APSofficialdreadv2", "siren_APSofficialdreadv2", "harpy_APSofficialdreadv2"];
					Class.titan_APSofficialdreadv2.UPGRADES_TIER_M1 = ["leviathan_APSofficialdreadv2"];
					Class.siren_APSofficialdreadv2.UPGRADES_TIER_M1 = ["valrayvn_APSofficialdreadv2"];
					Class.harpy_APSofficialdreadv2.UPGRADES_TIER_M1 = ["pegasus_APSofficialdreadv2"];

	// Merge function
	let mergedDreads = [];

	function mergeDreadv2(weapon, body) {
		let className = weapon.split("_")[0] + body;

		weapon = ensureIsClass(Class, weapon);
		body = ensureIsClass(Class, body);

		let PARENT = ensureIsClass(Class, weapon.PARENT[0]),
			BODY = JSON.parse(JSON.stringify(PARENT.BODY)),
			GUNS = [],
			TURRETS = [],
			LABEL = weapon.LABEL + "-" + body.LABEL,
			UPGRADES_TIER_0 = [];
		
		// Guns
		if (body.GUNS) GUNS.push(...body.GUNS);
		if (weapon.GUNS) GUNS.push(...weapon.GUNS);
		
		// Turrets
		TURRETS.push(...body.TURRETS);
		
		// Body stat modification
		if (weapon.BODY) for (let m in weapon.BODY) BODY[m] *= weapon.BODY[m];
		if (body.BODY) for (let m in body.BODY) BODY[m] *= body.BODY[m];

		// Upgrades
		for (let w in weapon.UPGRADES_TIER_M1) {
			for (let b in body.UPGRADES_TIER_M1) {
				let weaponName = weapon.UPGRADES_TIER_M1[w],
					bodyName = body.UPGRADES_TIER_M1[b];

				if (!mergedDreads.includes(weaponName + bodyName))
					mergeDreadv2(weaponName, bodyName);
				
				UPGRADES_TIER_0.push(weaponName.split("_")[0] + bodyName);
			}
		}

		// Can he build it? Yes he can!
		Class[className] = {
			PARENT, BODY, LABEL, GUNS, TURRETS, UPGRADES_TIER_0,
		};
	}

	// Initiate build for all dread paths and do upgrades for all eggnoughts
	const eggnoughtWeapons = Class.dread_APSofficialdreadv2.UPGRADES_TIER_1;
	const eggnoughtBodies = ["byte_APSofficialdreadv2", "atmosphere_APSofficialdreadv2", "juggernaut_APSofficialdreadv2"];
	for (let w in eggnoughtWeapons) {
		let weaponName = eggnoughtWeapons[w];
		Class[weaponName].UPGRADES_TIER_1 = [];
		for (let b in eggnoughtBodies) {
			let bodyName = eggnoughtBodies[b];
			mergeDreadv2(weaponName, bodyName);
			Class[weaponName].UPGRADES_TIER_1.push(weaponName.split("_")[0] + bodyName);
		}
	}

	const hexDreadNames = {
		Javelin: {
			Javelin: 'Javelin',
			Rapier: 'Lance',
			Diplomat: 'Envoy',
			Arbitrator: 'Cutlass',
			Retardant: 'Rebel',
			Tyrant: 'Autocrat',
			Raider: 'Pirate',
			Gladiator: 'Pillager',
			Cerberus: 'Argonaut',
			Lucifer: 'Kitsune',
		},
		Rapier: {
			Rapier: 'Rapier',
			Diplomat: 'Emissary',
			Arbitrator: 'Umpire',
			Retardant: 'Impeder',
			Tyrant: 'Oppressor',
			Raider: 'Bandit',
			Gladiator: 'Bruiser',
			Cerberus: 'Cyclops',
			Lucifer: 'Damocles',
		},
		Diplomat: {
			Diplomat: 'Diplomat',
			Arbitrator: 'Moderator',
			Retardant: 'Insurgent',
			Tyrant: 'Dictator',
			Raider: 'Marauder',
			Gladiator: 'Champion',
			Cerberus: 'Orion',
			Lucifer: 'Manticore',
		},
		Arbitrator: {
			Arbitrator: 'Arbitrator',
			Retardant: 'Extinguisher',
			Tyrant: 'Shogun',
			Raider: 'Buccaneer',
			Gladiator: 'Warrior',
			Cerberus: 'Gorgon',
			Lucifer: 'Keres',
		},
		Retardant: {
			Retardant: 'Retardant',
			Tyrant: 'Anarchist',
			Raider: 'Freebooter',
			Gladiator: 'Combatant',
			Cerberus: 'Gigantes',
			Lucifer: 'Demogorgon',
		},
		Tyrant: {
			Tyrant: 'Tyrant',
			Raider: 'Corsair',
			Gladiator: 'Amazon',
			Cerberus: 'Ouroboros',
			Lucifer: 'Raiju',
		},
		Raider: {
			Raider: 'Raider',
			Gladiator: 'Filibuster',
			Cerberus: 'Wyvern',
			Lucifer: 'Kraken',
		},
		Gladiator: {
			Gladiator: 'Gladiator',
			Cerberus: 'Ogre',
			Lucifer: 'Wendigo',
		},
		Cerberus: {
			Cerberus: 'Cerberus',
			Lucifer: 'Oni',
		},
		Lucifer: {
			Lucifer: 'Lucifer',
		},
	};

	/* Hexnought merge testers:
	Raider-Gladiator-Behemoth (Filibuster-Behemoth)
	Diplomat-Rapier-Supernova (Emissary-Supernova)
	*/
	const hexnoughtScaleFactor = 0.9;
	function mergeHexnoughtV2(weapon1, weapon2, body) {
		weapon1 = ensureIsClass(Class, weapon1);
		weapon2 = ensureIsClass(Class, weapon2);
		body = ensureIsClass(Class, body);

		let PARENT = Class.genericHexnought,
			BODY = JSON.parse(JSON.stringify(PARENT.BODY)),
			GUNS = [],
			gunsOnOneSide = [],
			weapon2GunsOnOneSide = [],
			TURRETS = [],
			bodyLabel = body.LABEL,
			weaponName = hexDreadNames[weapon1.LABEL][weapon2.LABEL] ?? hexDreadNames[weapon2.LABEL][weapon1.LABEL],
			LABEL = weaponName + "-" + bodyLabel,
			className = weaponName.toLowerCase() + bodyLabel.toLowerCase() + "_APSofficialdreadv2";

		// Guns ----------------------
		if (body.GUNS) gunsOnOneSide.push(...JSON.parse(JSON.stringify(body.GUNS.slice(0, body.GUNS.length / 5))));
		if (weapon1.GUNS) gunsOnOneSide.push(...JSON.parse(JSON.stringify(weapon1.GUNS.slice(0, weapon1.GUNS.length / 5))));
		if (weapon2.GUNS) weapon2GunsOnOneSide = JSON.parse(JSON.stringify(weapon2.GUNS.slice(0, weapon2.GUNS.length / 5)));

		for (let g in weapon2GunsOnOneSide) weapon2GunsOnOneSide[g].POSITION[5] += 60;
		gunsOnOneSide.push(...weapon2GunsOnOneSide)

		// Scale to fit size constraints
		for (let g in gunsOnOneSide) {
			gunsOnOneSide[g].POSITION[1] *= hexnoughtScaleFactor ** 2;
			gunsOnOneSide[g].POSITION[4] *= hexnoughtScaleFactor ** 2;
		}

		for (let i = 0; i < 3; i++) {
			for (let g in gunsOnOneSide) {
				let gun = JSON.parse(JSON.stringify(gunsOnOneSide[g]));
				gun.POSITION[5] += 120 * i;
				GUNS.push(gun);
			}
		};
		
		// Turrets --------------------
		let turretRingLoopLength = Math.floor(body.TURRETS.length / 5);
    	let turret = body.TURRETS[0];

		// First turret
		TURRETS.push(
			{
				POSITION: [turret.POSITION[0] / hexnoughtScaleFactor ** 0.5, 0, 0, 0, 0, 1],
				TYPE: ['hexagon', {TURRET_FACES_CLIENT: true}],
			}
		);
  
    	// Turrets besides the first
		for (let t = 1; t < body.TURRETS.length; t++) {
			turret = body.TURRETS[t];
			if (turret.POSITION[1]) {
				for (let i = 0; i < 6; i++) {
					for (let j = 0; j < turretRingLoopLength; j++) {
						turret = body.TURRETS[t*turretRingLoopLength+j];
						TURRETS.push(
							{
								POSITION: [turret.POSITION[0] * hexnoughtScaleFactor ** 0.5, turret.POSITION[1] * hexnoughtScaleFactor ** 0.5, turret.POSITION[2], turret.POSITION[3] / 6 * 5 + 60 * i, turret.POSITION[4], turret.POSITION[5]],
								TYPE: turret.TYPE,
							}
						)
					}
				}
				t += 5 * turretRingLoopLength - 1;
			} else {
				TURRETS.push(
					{
						POSITION: [turret.POSITION[0], 0, 0, turret.POSITION[3], turret.POSITION[4], turret.POSITION[5]],
						TYPE: turret.TYPE,
					}
				) 
      		}
		}
		
		// Body stat modification
		if (weapon1.BODY) for (let m in weapon1.BODY) BODY[m] *= weapon1.BODY[m];
		if (weapon2.BODY) for (let m in weapon2.BODY) BODY[m] *= weapon2.BODY[m];
		if (body.BODY) for (let m in body.BODY) BODY[m] *= body.BODY[m];

		// Smash it together
		Class[className] = {
			PARENT, BODY, LABEL, GUNS, TURRETS,
		};
		Class.dread_APSofficialdreadv2.UPGRADES_TIER_1.push(className);
	}

	mergeHexnoughtV2("raider_APSofficialdreadv2", "gladiator_APSofficialdreadv2", "skynet_APSofficialdreadv2");
	mergeHexnoughtV2("diplomat_APSofficialdreadv2", "rapier_APSofficialdreadv2", "supernova_APSofficialdreadv2");
	mergeHexnoughtV2("arbitrator_APSofficialdreadv2", "cerberus_APSofficialdreadv2", "supernova_APSofficialdreadv2");
};
