const Cidade = require('../models/Cidade');

const { MASTER_LEVEL } = require('../config/token');

module.exports = {
  async index(req, res) {
      try {
        const cidade = await Cidade.findAll();
        if (cidade.length == 0)
          return res.status(404).json({ msg: 'cidade empty' });
        
        else return res.status(200).json({ cidade });
      } catch (error) {
        return res.status(500).json({ msg: 'Validation fails' });
      }
  },

  async indexById(req, res) {
      const { codigo_ibge } = req.params;

      if (!codigo_ibge || codigo_ibge == null || codigo_ibge == undefined)
        return res.status(400).json({ msg: 'cidade is invalid' });

      try {
        const cidade = await Cidade.findByPk(codigo_ibge);
        if (!cidade)
          return res.status(404).json({ msg: 'cidade not found' })

        return res.status(200).json({ cidade });

      } catch (error) {
        return res.status(500).json({ msg: 'Validation fails' });
      }
  },

  async store(req, res) {
    if (req.level === MASTER_LEVEL) {
      const { codigo_ibge, cep, nome, total_casos, total_obitos, total_vacinados, populacao_estimada} = req.body;

      if (!codigo_ibge || codigo_ibge == null || codigo_ibge == undefined)
        return res.status(400).json({ msg: 'codigo_ibge is invalid' });
      if (!cep || cep == null || cep == undefined)
        return res.status(400).json({ msg: 'Cep is invalid' });
      if (!nome || nome == null || nome == undefined)
        return res.status(400).json({ msg: 'nome is invalid' });
      if (!total_casos || total_casos == null || total_casos == undefined)
        return res.status(400).json({ msg: 'total_casos is invalid' });
      if (!total_obitos || total_obitos == null || total_obitos == undefined)
        return res.status(400).json({ msg: 'total_obitos is invalid' });
      if (!total_vacinados || total_vacinados == null || total_vacinados == undefined)
        return res.status(400).json({ msg: 'total_vacinados is invalid' });
      if (!populacao_estimada || populacao_estimada == null || populacao_estimada == undefined)
        return res.status(400).json({ msg: 'populacao_estimada is invalid' });

      try {
        const cidadeVerify = await Cidade.findByPk(codigo_ibge);
        if (cidadeVerify)
          return res.status(404).json({ msg: 'Cidade já cadastrada' });

        const cidade = await Cidade.create({ codigo_ibge, cep, nome, total_casos, total_obitos, total_vacinados, populacao_estimada });

        return res.status(200).json({ cidade });

      } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Erro desconhecido' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });
  },

  async delete(req, res) {
    if (req.level === MASTER_LEVEL) {
      const { codigo_ibge } = req.params;

      if (!codigo_ibge || codigo_ibge == null || codigo_ibge == undefined)
        return res.status(400).json({ msg: 'codigo_ibge is invalid' });
      try {
        const cidade = await Cidade.findByPk(codigo_ibge);

        if (!cidade) {
          return res.status(404).json({ msg: 'cidade not found' });
        }
        await cidade.destroy();
        return res.status(200).json({ msg: 'Cidade deletada com Sucesso' });

      } catch (error) {
        return res.status(500).json({ msg: 'Validation fails' });
      }
  } else return res.status(401).json({ msg: 'Token Invalid' });
  },

  async update(req, res) {
    if (req.level === MASTER_LEVEL) {
      const { codigo_ibge } = req.body;
      const { cep, nome, total_casos, total_obitos, total_vacinados, populacao_estimada } = req.body;

      if (!codigo_ibge || codigo_ibge == null || codigo_ibge == undefined)
        return res.status(400).json({ msg: 'codigo_ibge is invalid' });
      if (!cep || cep == null || cep == undefined)
        return res.status(400).json({ msg: 'Cep is invalid' });
      if (!nome || nome == null || nome == undefined)
        return res.status(400).json({ msg: 'nome is invalid' });
      if (!total_casos || total_casos == null || total_casos == undefined)
        return res.status(400).json({ msg: 'total_casos is invalid' });
      if (!total_obitos || total_obitos == null || total_obitos == undefined)
        return res.status(400).json({ msg: 'total_obitos is invalid' });
      if (!total_vacinados || total_vacinados == null || total_vacinados == undefined)
        return res.status(400).json({ msg: 'total_vacinados is invalid' });
      if (!populacao_estimada || populacao_estimada == null || populacao_estimada == undefined)
        return res.status(400).json({ msg: 'populacao_estimada is invalid' });

      try {
        const cidade = await Cidade.findByPk(codigo_ibge);
        if (!cidade) {
          return res.status(404).json({ msg: 'Cidade not found' });
        }

        await cidade.update({
          cep: cep, 
          nome: nome, 
          total_casos: total_casos, 
          total_obitos: total_obitos, 
          total_vacinados: total_vacinados, 
          populacao_estimada: populacao_estimada
        });

        return res.status(200).json(cidade);

      } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Validation fails' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });
  },
};
