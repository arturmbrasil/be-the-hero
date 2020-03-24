const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const incidents = await connection('incidents').select('*');
    return res.json(incidents);
  },

  async create(req, res) {
    const { title, description, value } = req.body;
    const ngo_id = req.headers.authorization;

    const [id] = await connection('incidents').insert({
      title, 
      description, 
      value,
      ngo_id,
    });

    return res.json({ id });
  },

  async delete(req, res) {
    const { id } = req.params;
    const ngo_id = req.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ngo_id')
      .first();

    if (!incident) {
      return res.status(400).json({error: 'Incident does not exist.'});
    }

    if (incident.ngo_id !== ngo_id) {
      return res.status(401).json({error: 'Operation not permitted.'});
    }

    await connection('incidents').where('id', id).delete();

      return res.status(204).send();
  },
};