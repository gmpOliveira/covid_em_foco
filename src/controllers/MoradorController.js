const Morador = require('../models/Morador');
const Cidade = require('../models/Cidade');

const { ADMIN_LEVEL, MASTER_LEVEL } = require('../config/token');

module.exports = {
  async index(req, res) {
    if (req.level === ADMIN_LEVEL || req.level === MASTER_LEVEL) {
      try {
        const morador = await Morador.findAll();
        if (morador.length == 0)
          return res.status(404).json({ msg: 'Morador empty' });
        
        else return res.status(200).json({ morador });
      } catch (error) {
        return res.status(500).json({ msg: 'Validation fails' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });
  },

  async indexById(req, res) {
    if (req.level === ADMIN_LEVEL || req.level === MASTER_LEVEL) {
      const { cpf } = req.params;

      if (!cpf || cpf == null || cpf == undefined)
        return res.status(400).json({ msg: 'Morador is invalid' });

      try {
        const morador = await Morador.findByPk(cpf, {
          include: { association: 'cidade' },
        });
        if (!morador)
          return res.status(404).json({ msg: 'Morador not found' })

        return res.status(200).json({ morador });

      } catch (error) {
        return res.status(500).json({ msg: 'Validation fails' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });
  },

  async store(req, res) {
    if (req.level === ADMIN_LEVEL || req.level === MASTER_LEVEL) {
      const { cpf, nome, codigo_ibge, data_nascimento, is_obito} = req.body;

      if (!cpf || cpf == null || cpf == undefined)
        return res.status(400).json({ msg: 'cpf is invalid' });
      if (!codigo_ibge || codigo_ibge == null || codigo_ibge == undefined)
        return res.status(400).json({ msg: 'Name is invalid' });
      if (!nome || nome == null || nome == undefined)
        return res.status(400).json({ msg: 'nome is invalid' });
      if (!data_nascimento || data_nascimento == null || data_nascimento == undefined)
        return res.status(400).json({ msg: 'data_nascimento is invalid' });
      if (!is_obito || is_obito == null || is_obito == undefined)
      return res.status(400).json({ msg: 'is_obito is invalid' });

      try {
        const cidade = await Cidade.findByPk(codigo_ibge);
        if (!cidade)
          return res.status(404).json({ msg: 'Cidade not found' });
        const moradorVerify = await Morador.findByPk(cpf);
          if (moradorVerify)
            return res.status(404).json({ msg: 'Morador já cadastrado not found' });

        const morador = await Morador.create({ cpf, nome, codigo_ibge, data_nascimento, is_obito });

        return res.status(200).json({ morador });

      } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Erro desconhecido' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });
  },

  async delete(req, res) {
    if (req.level === ADMIN_LEVEL || req.level === MASTER_LEVEL) {
      const { cpf } = req.params;

      if (!cpf || cpf == null || cpf == undefined)
        return res.status(400).json({ msg: 'morador is invalid' });
      try {
        const morador = await Morador.findByPk(cpf);

        if (!morador) {
          return res.status(404).json({ msg: 'Morador not found' });
        }
        await morador.destroy();
        return res.status(200).json({ msg: 'Morador Deletado com Sucesso' });

      } catch (error) {
        return res.status(500).json({ msg: 'Validation fails' });
      }
  } else return res.status(401).json({ msg: 'Token Invalid' });
  },

  async update(req, res) {
    if (req.level === ADMIN_LEVEL || req.level === MASTER_LEVEL) {
      const { cpf } = req.body;
      const { nome, codigo_ibge, data_nascimento, is_obito } = req.body;
    
    if (!cpf || cpf == null || cpf == undefined)
      return res.status(400).json({ msg: 'cpf is invalid' });
    if (!codigo_ibge || codigo_ibge == null || codigo_ibge == undefined)
      return res.status(400).json({ msg: 'Name is invalid' });
    if (!nome || nome == null || nome == undefined)
      return res.status(400).json({ msg: 'nome is invalid' });
    if (!data_nascimento || data_nascimento == null || data_nascimento == undefined)
      return res.status(400).json({ msg: 'data_nascimento is invalid' });
    if (!is_obito || is_obito == null || is_obito == undefined)
     return res.status(400).json({ msg: 'is_obito is invalid' });

      try {
        const morador = await Morador.findByPk(cpf);

        if (!morador) {
          return res.status(404).json({ msg: 'morador not found' });
        }

        await morador.update({
          cpf: cpf, 
          nome: nome, 
          codigo_ibge: codigo_ibge, 
          data_nascimento: data_nascimento,  
          is_obito: is_obito
        });

        return res.status(200).json(morador);

      } catch (error) {
        return res.status(500).json({ msg: 'Validation fails' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });
  },
};