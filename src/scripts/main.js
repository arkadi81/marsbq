var model ={
	init: function() {
		console.log('Model initialized');
	}
};

var helper = {

};

var view = {
	init: function() {
		console.log('View initialized');
	}
};

//app object used to initialize application
var app = {
	init: function() {
		model.init();
		view.init();
	}
};

app.init();
