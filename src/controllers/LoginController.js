const Adm = require('../models/Adm');
const Master = require('../models/Master');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const validPassword = (password, hash) => bcrypt.compareSync(password, hash);
const generateToken = (params = {}) => jwt.sign(params, authConfig.secret, {
  expiresIn: 8000, //um dia
});


module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || email == null || email == undefined)
      return res.status(400).json({ msg: 'Email is invalid' });

    if (!password || password == null || password == undefined)
      return res.status(400).json({ msg: 'Password is invalid' });

    try {
      let master = await Master.findOne({ where: { email: email } });
      if (master) {
        master = master.dataValues;

        let ok = validPassword(password, master.password);
        if (!ok)
          return res.status(500).json({ msg: 'Senha ou email incorreta' });

        master.password = undefined;
        return res.status(200).json({ master,  token: generateToken({ id: master.id, level: 'master' }) });
      }
      else {
        let adm = await Adm.findOne({ where: { email: email } });
        if (adm) {
          adm = adm.dataValues;
  
          let ok = validPassword(password, adm.password);
          if (!ok)
            return res.status(500).json({ msg: 'Senha ou email incorreta' });
  
          adm.password = undefined;
          return res.status(200).json({ adm,  token: generateToken({ id: adm.id, level: 'adm' }) });
        }
         else return res.status(500).json({ msg: 'Não possui cadastro' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Validation fails' });
    }
  },
}




