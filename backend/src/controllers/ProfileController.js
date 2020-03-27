const database = require("../database");

class ProfileController {
    async index(req, res) {
		const { page = 1 } = req.query;

        const ong_id = req.headers.authorization;

        const [count] = await database('incidents')
            .where('ong_id', ong_id)
            .count();
        
        const incidents = await database('incidents')
            .where('ong_id', ong_id)
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
			.offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name', 
				'ongs.whatsapp', 
				'ongs.city', 
				'ongs.uf'
            ]);

        if (!incidents || incidents === null) {
            return res.status(404).json({ message: 'Incidents not found!' });
        }

        return res.json(incidents);
    }
}

module.exports = new ProfileController();