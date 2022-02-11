const Boletim = require('../models/Boletim');
const Cidade = require('../models/Cidade');

const { MASTER_LEVEL } = require('../config/token');

module.exports = {
  async indexByDate(req, res) {
    const { data_boletim } = req.params;
    if (!data_boletim || data_boletim == null || data_boletim == undefined)
      return res.status(400).json({ msg: 'data_boletim is invalid' });

      try {
        const boletim = await Boletim.findAll({ where: {data_boletim: data_boletim}});
        if (boletim.length == 0)
          return res.status(404).json({ msg: 'Boletim empty' });
        
        else return res.status(200).json({ boletim });
      } catch (error) {
        return res.status(500).json({ msg: 'Validation fails' });
      }
  },
  //get geral por data

  async indexById(req, res) { //data como parametro
    const { boletimId } = req.params;

    if (!boletimId || boletimId == null || boletimId == undefined)
      return res.status(400).json({ msg: 'boletim is invalid' });

    try {
      const boletim = await Boletim.findByPk(boletimId, {
        include: { association: 'cidade' },
      });
      if (!boletim)
        return res.status(404).json({ msg: 'Boletim not found' })

      return res.status(200).json({ boletim });

    } catch (error) {
      return res.status(500).json({ msg: 'Validation fails' });
    }
  },

  async store(req, res) {
    if (req.level === MASTER_LEVEL) {
      const { codigo_ibge, cep , data_boletim, confirmados_diarios, obitos_diarios, vacinados_diarios, status_diario} = req.body;

      if (!codigo_ibge || codigo_ibge == null || codigo_ibge == undefined)
        return res.status(400).json({ msg: 'codigo_ibge is invalid' });
      if (!cep || cep == null || cep == undefined)
        return res.status(400).json({ msg: 'cep is invalid' });
      if (!data_boletim || data_boletim == null || data_boletim == undefined)
        return res.status(400).json({ msg: 'data_boletim is invalid' });
      if (!confirmados_diarios || confirmados_diarios == null || confirmados_diarios == undefined)
      return res.status(400).json({ msg: 'confirmados_diarios is invalid' });
      if (!obitos_diarios || obitos_diarios == null || obitos_diarios == undefined)
      return res.status(400).json({ msg: 'obitos_diarios is invalid' });
      if (!vacinados_diarios || vacinados_diarios == null || vacinados_diarios == undefined)
      return res.status(400).json({ msg: 'vacinados_diarios is invalid' });
      if (!status_diario || status_diario == null || status_diario == undefined)
      return res.status(400).json({ msg: 'status_diario is invalid' });

      try {
        const cidade = await Cidade.findByPk(codigo_ibge);
        if (!cidade)
          return res.status(404).json({ msg: 'Cidade not found' });

        const boletim = await Boletim.create({ codigo_ibge, cep , data_boletim, confirmados_diarios, obitos_diarios, vacinados_diarios, status_diario });

        return res.status(200).json({ boletim });

      } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Erro desconhecido' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });
  },

  async delete(req, res) {
    if (req.level === MASTER_LEVEL) {
      const { boletimId } = req.params;

      if (!boletimId || boletimId == null || boletimId == undefined)
        return res.status(400).json({ msg: 'Boletim is invalid' });
      try {
        const boletim = await Boletim.findByPk(boletimId);

        if (!boletim) {
          return res.status(404).json({ msg: 'Boletim not found' });
        }
        await boletim.destroy();
        return res.status(200).json({ msg: 'Boletim Deletado com Sucesso' });

      } catch (error) {
        return res.status(500).json({ msg: 'Validation fails' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });
  },

  async update(req, res) {
    if (req.level === MASTER_LEVEL) {
      const { boletimId } = req.body;
      const { codigo_ibge, cep , data_boletim, confirmados_diarios, obitos_diarios, vacinados_diarios, status_diario } = req.body;

      if (!boletimId || boletimId == null || boletimId == undefined)
        return res.status(400).json({ msg: 'Boletim is invalid' });
      if (!codigo_ibge || codigo_ibge == null || codigo_ibge == undefined)
        return res.status(400).json({ msg: 'codigo_ibge is invalid' });
      if (!cep || cep == null || cep == undefined)
        return res.status(400).json({ msg: 'Cep is invalid' });
      if (!data_boletim || data_boletim == null || data_boletim == undefined)
        return res.status(400).json({ msg: 'data_boletim is invalid' });
      if (!confirmados_diarios || confirmados_diarios == null || confirmados_diarios == undefined)
      return res.status(400).json({ msg: 'confirmados_diarios is invalid' });
      if (!obitos_diarios || obitos_diarios == null || obitos_diarios == undefined)
      return res.status(400).json({ msg: 'obitos_diarios is invalid' });
      if (!vacinados_diarios || vacinados_diarios == null || vacinados_diarios == undefined)
      return res.status(400).json({ msg: 'vacinados_diarios is invalid' });
      if (!status_diario || status_diario == null || status_diario == undefined)
      return res.status(400).json({ msg: 'status_diario is invalid' });

      try {
        const boletim = await Boletim.findByPk(boletimId);

        if (!boletim) {
          return res.status(404).json({ msg: 'Boletim not found' });
        }

        await boletim.update({
          codigo_ibge: codigo_ibge,
          cep: cep, 
          data_boletim: data_boletim, 
          confirmados_diarios: confirmados_diarios, 
          obitos_diarios: obitos_diarios, 
          vacinados_diarios: vacinados_diarios, 
          status_diario: status_diario
        });

        return res.status(200).json(boletim);

      } catch (error) {
        return res.status(500).json({ msg: 'Validation fails' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });
  },
};