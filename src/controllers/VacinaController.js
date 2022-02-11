const Morador = require('../models/Morador');
const Vacina = require('../models/Vacina');

const { ADMIN_LEVEL, MASTER_LEVEL } = require('../config/token');

module.exports = {
  async index(req, res) {
    if (req.level === ADMIN_LEVEL || req.level === MASTER_LEVEL) {
      try {
        const vacina = await Vacina.findAll();
        if (vacina.length == 0)
          return res.status(404).json({ msg: 'Vacina empty' });
        
        else return res.status(200).json({ vacina });
      } catch (error) {
        return res.status(500).json({ msg: 'Validation fails' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });
  },

  async indexById(req, res) {
    if (req.level === ADMIN_LEVEL || req.level === MASTER_LEVEL) {
      const { vacinaId } = req.params;

      if (!vacinaId || vacinaId == null || vacinaId == undefined)
        return res.status(400).json({ msg: 'vacina is invalid' });

      try {
        const vacina = await Vacina.findByPk(vacinaId);
        if (!vacina)
          return res.status(404).json({ msg: 'Vacina not found' })

        return res.status(200).json({ vacina });

      } catch (error) {
        return res.status(500).json({ msg: 'Validation fails' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });
  },

  async store(req, res) {
    if (req.level === ADMIN_LEVEL || req.level === MASTER_LEVEL) {
      const { cpf, is_vacinado, numero_vacinas, primeira_dose, segunda_dose, terceira_dose} = req.body;

      if (!cpf || cpf == null || cpf == undefined)
        return res.status(400).json({ msg: 'cpf is invalid' });
      if (!is_vacinado || is_vacinado == null || is_vacinado == undefined)
        return res.status(400).json({ msg: 'is_vacinado is invalid' });
      if (!numero_vacinas || numero_vacinas == null || numero_vacinas == undefined)
        return res.status(400).json({ msg: 'numero_vacinas is invalid' });
      if (!primeira_dose || primeira_dose == null || primeira_dose == undefined)
        return res.status(400).json({ msg: 'primeira_dose is invalid' });
      if (!segunda_dose || segunda_dose == null || segunda_dose == undefined)
        return res.status(400).json({ msg: 'segunda_dose is invalid' });
      if (!terceira_dose || terceira_dose == null || terceira_dose == undefined)
        return res.status(400).json({ msg: 'terceira_dose is invalid' });

      try {
        const morador = await Morador.findByPk(cpf);
        if (!morador)
          return res.status(404).json({ msg: 'Morador not found' });

        const vacina = await Vacina.create({ cpf, is_vacinado, numero_vacinas, primeira_dose, segunda_dose, terceira_dose });

        return res.status(200).json({ vacina });

      } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Erro desconhecido' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });
  },

  async delete(req, res) {
    if (req.level === ADMIN_LEVEL || req.level === MASTER_LEVEL) {
      const { vacinaId } = req.params;

      if (!vacinaId || vacinaId == null || vacinaId == undefined)
        return res.status(400).json({ msg: 'vacina is invalid' });
      try {
        const vacina = await Vacina.findByPk(vacinaId);

        if (!vacina) {
          return res.status(404).json({ msg: 'Vacina not found' });
        }
        await vacina.destroy();
        return res.status(200).json({ msg: 'Vacina Deletada com Sucesso' });

      } catch (error) {
        return res.status(500).json({ msg: 'Validation fails' });
      }
  } else return res.status(401).json({ msg: 'Token Invalid' });
  },

  async update(req, res) {
    if (req.level === ADMIN_LEVEL || req.level === MASTER_LEVEL) {
      const { vacinaId } = req.body;
      const { cpf, is_vacinado, numero_vacinas, primeira_dose, segunda_dose, terceira_dose } = req.body;

    if (!vacinaId || vacinaId == null || vacinaId == undefined)
      return res.status(400).json({ msg: 'vacinaId is invalid' });
    if (!cpf || cpf == null || cpf == undefined)
      return res.status(400).json({ msg: 'cpf is invalid' });
    if (!is_vacinado || is_vacinado == null || is_vacinado == undefined)
      return res.status(400).json({ msg: 'is_vacinado is invalid' });
    if (!numero_vacinas || numero_vacinas == null || numero_vacinas == undefined)
      return res.status(400).json({ msg: 'numero_vacinas is invalid' });
    if (!primeira_dose || primeira_dose == null || primeira_dose == undefined)
      return res.status(400).json({ msg: 'primeira_dose is invalid' });
    if (!segunda_dose || segunda_dose == null || segunda_dose == undefined)
      return res.status(400).json({ msg: 'segunda_dose is invalid' });
    if (!terceira_dose || terceira_dose == null || terceira_dose == undefined)
    return res.status(400).json({ msg: 'terceira_dose is invalid' });

      try {
        const vacina = await Vacina.findByPk(vacinaId);
        if (!vacina) {
          return res.status(404).json({ msg: 'vacina not found' });
        }

        await vacina.update({
          cpf: cpf,  
          primeira_dose: primeira_dose, 
          segunda_dose: segunda_dose, 
          terceira_dose: terceira_dose
        });

        return res.status(200).json(vacina);

      } catch (error) {
        return res.status(500).json({ msg: 'Validation fails' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });
  },
};