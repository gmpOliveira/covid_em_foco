const express = require('express');

const AdmController = require('./controllers/AdmController');
const BoletimController = require('./controllers/BoletimController');
const CidadeController = require('./controllers/CidadeController');
const MasterController = require('./controllers/MasterController');
const MoradorController = require('./controllers/MoradorController');
const VacinaController = require('./controllers/VacinaController');
const LoginController = require('./controllers/LoginController');

const auth = require('./middlewares/auth');

const routes = express.Router();

//Login
routes.post('/login', LoginController.login);

//Adm
routes.get('/adm/index/:admId', auth, AdmController.indexById);
routes.get('/adm/index/', auth, AdmController.index);
routes.post('/adm/', auth, AdmController.store);
routes.put('/adm/update', auth, AdmController.update);
routes.delete('/adm/delete/:admId', auth, AdmController.delete);

//Boletim
routes.get('/boletim/index/:boletimId', BoletimController.indexById);
routes.get('/boletim/index/date/:data_boletim', BoletimController.indexByDate);
routes.post('/boletim/', auth, BoletimController.store);
routes.put('/boletim/update', auth, BoletimController.update);
routes.delete('/boletim/delete/:boletimId', auth, BoletimController.delete);

//Cidade
routes.get('/cidade/index/:codigo_ibge', CidadeController.indexById);
routes.get('/cidade/index/', CidadeController.index);
routes.post('/cidade/', auth, CidadeController.store);
routes.put('/cidade/update', auth, CidadeController.update);
routes.delete('/cidade/delete/:codigo_ibge', auth, CidadeController.delete);

//Master
routes.get('/master/index/:masterId', auth, MasterController.indexById);
routes.get('/master/index/', auth, MasterController.index);
routes.post('/master/', MasterController.store);
routes.put('/master/update', auth, MasterController.update);
routes.delete('/master/delete/:masterId', auth, MasterController.delete);

//Morador
routes.get('/morador/index/:cpf', auth, MoradorController.indexById);
routes.get('/morador/index/', auth, MoradorController.index);
routes.post('/morador/', auth, MoradorController.store);
routes.put('/morador/update', auth, MoradorController.update);
routes.delete('/morador/delete/:cpf', auth, MoradorController.delete);

//Vacina
routes.get('/vacina/index/:vacinaId', auth, VacinaController.indexById);
routes.get('/vacina/index/', auth, VacinaController.index);
routes.post('/vacina/', auth, VacinaController.store);
routes.put('/vacina/update', auth, VacinaController.update);
routes.delete('/vacina/delete/:vacinaId', auth, VacinaController.delete);

module.exports = routes;
