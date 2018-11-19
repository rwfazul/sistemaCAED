var express = require('express');
var router = express.Router();

var firestore = require('../../services/firestore-api/firestore');

const colSolicitacoes = 'caed-solicitacoes';

// GET: /api/solicitacoes
router
	.get('/', function (req, res) {
		firestore.getAllDocs(colSolicitacoes, function (docs, err) {
			if (err) res.status(500).send(err);
			else res.status(200).json(docs);
		});
	})
	.get('/externalEvents', function (req, res) {
		var filter = ['agendado', '==', false];
		firestore.getDocsWithFilter(colSolicitacoes, filter, function (docs, err) {
			if (err) res.status(500).send(err);
			else res.status(200).json(docs);
		});
	})
	.get('/pagination/:page', function (req, res) {
		var filter = ['agendado', '==', false];
		firestore.getDocsPagination(colSolicitacoes, "timestamp", filter, req.params['page'], function (docs, err) {
			if (err) res.status(500).send(err);
			else res.status(200).json(docs);
		});
	});

router.route('/:id')
	.delete(function (req, res) {
		firestore.deleteDoc(colSolicitacoes, req.params.id, function (docId, err) {
			if (err) res.status(500).send(err);
			else res.status(200).json(docId);
		});
	})
	.put(function (req, res) {
		var doc = {
			agendado: req.body['agendado'] == "true" ? true : false,
		};
		firestore.updateDoc(colSolicitacoes, req.params.id, doc, function (docId, err) {
			if (err) res.status(500).send(err);
			else res.status(200).json(docId);
		});
	})

module.exports = router;