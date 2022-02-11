const Master = require('../models/Master');

// login
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const { MASTER_LEVEL } = require('../config/token');

const generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

const generateToken = (params = {}) => jwt.sign(params, authConfig.secret, {
  expiresIn: 86400, //um dia
});
//login

module.exports = {
  async index(req, res) {
    if (req.level === MASTER_LEVEL) {

      try {
        const master = await Master.findAll();
        if (master.length == 0)
          return res.status(404).json({ msg: 'Master empty' });
        
        else {
          for (let i = 0; i < master.length; i++) {
            master[i].password = undefined;
          }

          return res.status(200).json({ master });
    }
      } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Validation fails' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });
  },

  async indexById(req, res) {
    if (req.level === MASTER_LEVEL) {
      const { masterId } = req.params;

      if (!masterId || masterId == null || masterId == undefined)
        return res.status(400).json({ msg: 'master is invalid' });

      try {
        const master = await Master.findByPk(masterId);
        if (!master)
          return res.status(404).json({ msg: 'Master not found' })

        master.password = undefined;
        return res.status(200).json({ master });

      } catch (error) {
        return res.status(500).json({ msg: 'Validation fails' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });
  },

  async store(req, res) {
    const { email, password } = req.body;

    if (!email || email == null || email == undefined)
      return res.status(400).json({ msg: 'Email is invalid' });
    if (!password || password == null || password == undefined)
      return res.status(400).json({ msg: 'Password is invalid' });

    try {
      const masterVerify = await Master.findOne({ where: { email: email } });
      if (masterVerify) {
        return res.status(409).json({ msg: 'Já existe um master cadastrado com este email' });
      }

      const hash = generateHash(password);
      const master = await Master.create({ email, password: hash });
      master.password = undefined;

      return res.status(200).json({ master, token: generateToken({ id: master.id, level: 'master' }) });

    } catch (error) {
      return res.status(500).json({ msg: 'Erro desconhecido' });
    }
  },

  async delete(req, res) {
    if (req.level === MASTER_LEVEL) {
      const { masterId } = req.params;

      if (!masterId || masterId == null || masterId == undefined)
        return res.status(400).json({ msg: 'Master is invalid' });
      try {
        const master = await Master.findByPk(masterId);

        if (!master) {
          return res.status(404).json({ msg: 'Master not found' });
        }
        await master.destroy();
        return res.status(200).json({ msg: 'Master Deletado com Sucesso' });

      } catch (error) {
        return res.status(500).json({ msg: 'Validation fails' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });
  },

  async update(req, res) {
    if (req.level === MASTER_LEVEL) {

      const { masterId } = req.body;
      const { email, password } = req.body;

      if (!masterId || masterId == null || masterId == undefined)
        return res.status(400).json({ msg: 'Master is invalid' });
      if (!email || email == null || email == undefined)
        return res.status(400).json({ msg: 'Email is invalid' });
      if (!password || password == null || password == undefined)
        return res.status(400).json({ msg: 'Password is invalid' });

      try {
        const master = await Master.findByPk(masterId);

        if (!master) {
          return res.status(404).json({ msg: 'master not found' });
        }

        const hash = generateHash(password);
        await master.update({
          email: email,
          password: hash,
        });
        master.password = undefined;

        return res.status(200).json(master);

      } catch (error) {
        return res.status(500).json({ msg: 'Validation fails' });
      }
    } else return res.status(401).json({ msg: 'Token Invalid' });
  },
};