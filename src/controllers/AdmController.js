const Adm = require('../models/Adm');
const Cidade = require('../models/Cidade');

// login
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const {  ADMIN_LEVEL, MASTER_LEVEL } = require('../config/token');

const generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

const generateToken = (params = {}) => jwt.sign(params, authConfig.secret, {
  expiresIn: 86400, //um dia
});
//login

module.exports = {
  async index(req, res) {
    if (req.level === ADMIN_LEVEL || req.level === MASTER_LEVEL) {

      try {
        const adm = await Adm.findAll({
          include: { association: 'cidade' },
        });
        if (adm.length == 0)
          return res.status(404).json({ msg: 'Adm empty' });
        
        else {
          for (let i = 0; i < adm.length; i++) {
            adm[i].password = undefined;
          }

          return res.status(200).json({ adm });
    }
      } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Validation fails' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });
  },

  async indexById(req, res) {
    if (req.level === ADMIN_LEVEL || req.level === MASTER_LEVEL) {

      const { admId } = req.params;

      if (!admId || admId == null || admId == undefined)
        return res.status(400).json({ msg: 'Adm is invalid' });

      try {
        const adm = await Adm.findByPk(admId, {
          include: { association: 'cidade' },
        });
        if (!adm)
          return res.status(404).json({ msg: 'Adm not found' })

        adm.password = undefined;
        return res.status(200).json({ adm });

      } catch (error) {
        return res.status(500).json({ msg: 'Validation fails' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });
  },

  async store(req, res) {
    if (req.level === ADMIN_LEVEL || req.level === MASTER_LEVEL) {
      const { codigo_ibge, email, password } = req.body;

      if (!codigo_ibge || codigo_ibge == null || codigo_ibge == undefined)
        return res.status(400).json({ msg: 'codigo_ibge is invalid' });
      if (!email || email == null || email == undefined)
        return res.status(400).json({ msg: 'Email is invalid' });
      if (!password || password == null || password == undefined)
        return res.status(400).json({ msg: 'Password is invalid' });

      try {
        const admVerify = await Adm.findOne({ where: { email: email } });
        if (admVerify) {
          return res.status(409).json({ msg: 'Já existe um adm cadastrado com este email' });
        }
        const cidadeVerify = await Cidade.findOne({ where: { codigo_ibge: codigo_ibge } });
        if (!cidadeVerify) {
          return res.status(409).json({ msg: 'Não existe uma cidade com este codigo ibge' });
        }

        const hash = generateHash(password);
        const adm = await Adm.create({ codigo_ibge, email, password: hash });
        adm.password = undefined;

        return res.status(200).json({ adm, token: generateToken({ id: adm.id, level: 'adm' }) });

      } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Erro desconhecido' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });

  },

  async delete(req, res) {
    if (req.level === ADMIN_LEVEL || req.level === MASTER_LEVEL) {
      const { admId } = req.params;

      if (!admId || admId == null || admId == undefined)
        return res.status(400).json({ msg: 'Adm is invalid' });
      try {
        const adm = await Adm.findByPk(admId);

        if (!adm) {
          return res.status(404).json({ msg: 'Adm not found' });
        }
        await adm.destroy();
        return res.status(200).json({ msg: 'Adm Deletado com Sucesso' });

      } catch (error) {
        return res.status(500).json({ msg: 'Validation fails' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });
  },

  async update(req, res) {
    if (req.level === ADMIN_LEVEL || req.level === MASTER_LEVEL) {

      const { admId } = req.body;
      const { codigo_ibge, email, password } = req.body;

      if (!admId || admId == null || admId == undefined)
        return res.status(400).json({ msg: 'admId is invalid' });
      if (!codigo_ibge || codigo_ibge == null || codigo_ibge == undefined)
        return res.status(400).json({ msg: 'codigo_ibge is invalid' });
      if (!email || email == null || email == undefined)
        return res.status(400).json({ msg: 'Email is invalid' });
      if (!password || password == null || password == undefined)
        return res.status(400).json({ msg: 'Password is invalid' });

      try {
        const adm = await Adm.findByPk(admId);

        if (!adm) {
          return res.status(404).json({ msg: 'adm not found' });
        }
        const hash = generateHash(password);
        await adm.update({
          codigo_ibge: codigo_ibge,
          email: email,
          password: hash,
        });

        adm.password = undefined;
        return res.status(200).json(adm);

      } catch (error) {
        return res.status(500).json({ msg: 'Validation fails' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });
  },
};