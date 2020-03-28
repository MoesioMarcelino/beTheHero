const generateUniqueId = require("../utils/generateUniqueId");
const database = require("../database");

class OngController {
	async create(req, res) {
		const { name, email, whatsapp, city, uf } = req.body;

		const id = generateUniqueId();

		await database('ongs').insert({
			id,
			name,
			email,
			whatsapp,
			city,
			uf,
		});

		return res.json({ id });
	};

	async index(req, res) {
		const ongs = await database('ongs').select('*');

		if (!ongs) {
			return res.status(404).json({ message: 'Ongs not found!' });
		}

		return res.json(ongs);
	}
}

module.exports = new OngController();