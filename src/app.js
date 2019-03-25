"use strict";

const { App } = require("jovo-framework");
const { Alexa } = require("jovo-platform-alexa");
const { JovoDebugger } = require("jovo-plugin-debugger");
const { FileDb } = require("jovo-db-filedb");

const app = new App();

app.use(new Alexa(), new JovoDebugger(), new FileDb());

app.setHandler({
	LAUNCH() {
		return this.toIntent("Start");
	},

	Start() {
		let speech =
			"puedes preguntarme que hace un hechizo o pedirme que te diga un hechizo aleatorio.";
		this.ask("Bienvenido a la enciclopedia de hechizos de Harry Potter, " + speech, speech);
	},

	TellSpell() {
		let json = require("./hechizos.json");
		let spell = json.filter(spell => spell.title == this.$inputs.spell.value);
		if (spell.length) {
			spell = spell[0];
			this.tell(spell.title + ": " + spell.description);
		} else {
			this.toIntent("Unhandled");
		}
	},

	RandomSpell() {
		let json = require("./hechizos.json");
		let rand = random(0, json.length - 1);
		let spell = json[rand];
		this.tell(spell.title + ": " + spell.description);
	},

	GoodBye() {
		this.tell("Hasta pronto.");
	},

	Unhandled() {
		this.tell("No se cual es ese hechizo, lo buscaré y lo añadiré a la enciclopedia.");
	}
});

module.exports.app = app;

function random(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
