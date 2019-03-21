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
			"para consultar un hechizo dí por ejemplo: que hace expecto patronum, para escuchar un hechizo aleatorio dí: dime un hechizo.";
		this.ask("Bienvenido a la skill de hechizos de Harry Potter, " + speech, speech);
	},

	TellSpell() {
		let json = require("./hechizos.json");
		let spell = json.filter(spell => spell.title == this.$inputs.spell.value);
		spell = spell[0];
		this.ask(spell.title + ": " + spell.description, "Para consultar un hechizo dí por ejemplo: que hace expecto patronum, para escuchar un hechizo aleatorio dí: dime un hechizo.");
	},

	RandomSpell() {
		let json = require("./hechizos.json");
		let rand = random(0, json.length - 1);
		let spell = json[rand];
		this.ask(spell.title + ": " + spell.description, "Para consultar un hechizo dí por ejemplo: que hace expecto patronum, para escuchar un hechizo aleatorio dí: dime un hechizo.");
	},

	GoodBye() {
		this.tell(
			"Adiós joven mago, y recuerda: Son nuestras elecciones las que muestran lo que somos, mucho más que nuestras habilidades."
		);
	},

	Unhandled() {
		let speech =
			"para consultar un hechizo dí por ejemplo: que hace expecto patronum, para escuchar un hechizo aleatorio dí: dime un hechizo.";
		this.ask("Vaya, no se cual es ese hechizo, " + speech, speech);
	}
});

module.exports.app = app;

function random(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
