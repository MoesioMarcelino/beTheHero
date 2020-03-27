const database = require("../database");

class SessionController {
    async create(req, res) {
        const { id } = req.body;

        const ong = await database('ongs')
            .where('id', id)
            .select('name')
            .first();

        console.log(ong);

        if (!ong) {
            return res.status(400).json({ message: 'No ONG found with this ID'})
        }

        return res.json(ong);
    }
}

module.exports = new SessionController();