var sys = require('sys'),
	colors = require('colors'),
	xmpp = require('node-xmpp'),
	Client = require('../lib/xmpp-client').Client,
	conf = require('./conf').conf;
	
exports.testVersion = function(test) {
	test.expect(1);
	var a = new Client(conf.a, function() {
		//sys.debug(this.jid.toString().blue);
		var b = new Client(conf.b, function() {
			//sys.debug(this.jid.toString().blue);
			a.getVersion(b.jid, function(version) {
				sys.debug(JSON.stringify(version).yellow);
				test.equals('node-xmpp-client',version.name, 'same client');
				test.done();
			},
			function(iq) {
				sys.error(iq.toString().red);
				test.done();
			});
		});
	});
};

exports.testLast = function(test) {
	test.expect(1);
	var a = new Client(conf.a, function() {
		//sys.debug(this.jid.toString().blue);
		var b = new Client(conf.b, function() {
			a.getLast(a.jid, function(version) {
				sys.debug(version);
				test.ok(version > 0, 'last');
				test.done();
			});
		});
	});
};