var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var SerialPort = require("serialport");
var StringDecoder = require('string_decoder').StringDecoder;

var routes = require('./routes/index');
var users = require('./routes/users');
var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : ''
});
var port = new SerialPort('/dev/ttyACM1', {
	baudRate: 9600
});
var port1 = new SerialPort('/dev/rfcomm1', {
	baudRate: 9600
});
var port2 = new SerialPort('/dev/rfcomm2', {
	baudRate: 9600
});
var line = ''
var line1 = ''
var line2 = ''
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
var pageCheck = 0;
////login
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var sess;
app.use(session({secret : 'ssshhhhh', resave:true, saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var sensor_value = '';
var sensor_value1 = '';
var sensor_value2 = '';
port.on('data', function(data){
	var decoder = new StringDecoder('utf8');
	var textData = decoder.write(data);
	line += textData
	var li = line.split("\n");
	if(li.length>1){
		sensor_value = li[li.length-2]
		line = ''
	}
})
port1.on('data', function(data){
	var decoder1 = new StringDecoder('utf8');
	var textData1 = decoder1.write(data)
	line1 += textData1
	var li1 = line1.split('\n')
	if(li1.length>1){
		sensor_value1 = li1[0]
		line1 = ''
	}
})
port2.on('data', function(data){
	var decoder2 = new StringDecoder('utf8');
	var textData2 = decoder2.write(data);
	line2 += textData2
	var li2 = line2.split('\n');
	if(li2.length>1){
		sensor_value2 = li2[0]
		line2 = ''
	}
});
app.get('/sensor', function(request, response){
	response.send(sensor_value);
});
app.get('/sensor1', function(request, response){
	response.send(sensor_value1);
});
app.get('/sensor2', function(request, response){
	response.send(sensor_value2);
});
app.get('/led', function(req, res, next){
  if(sess==null){
    res.redirect('/login')
  }
  res.render('led', {title: '제어(관수/환기)'});
});

app.post('/login_register',function(request,response){
  pool.getConnection(function(err, connection) {
    connection.query("SELECT * FROM login WHERE name='"+request.body.name+"';", function(err, data) {
      response.send(data);
      connection.release();
    });
  });
});
app.post('/login',function(request,response){
  sess=request.session; //세션을 설정
  sess.name = request.body.name;
  console.log("/login : "+sess.name);
  response.end('done');
});

app.get('/admin',function(request,response){
  sess=request.session;
  console.log("/admin : "+sess.name);
  if(sess.name){
    response.redirect('/led');
  }else{
    response.write('<h1>Please login first</h1>');
    response.end('<a href="/login">Login</a>');
  }
});

app.get('/session',function(request,response){
  sess=[request.session.name, pageCheck];
  console.log("/session : "+sess[0]);
  response.send(sess);
  response.end();
});

app.get('/logout',function(request,response){
  console.log("before : " + sess.name);
  sess = null;
  request.session.destroy(function(err){
    if(err){
      console.log(err);
    }else{
      response.redirect('/led');
    }
  });
});
app.get('/led/:switch', function(req, res, next){
  console.log(sess);
  if(sess==null){
	res.redirect('/login');	
  }else{
//	if(sess.name==undefined){
//		res.redirect('/login');
//  	}else{
    		function setLED(flag) {
      			var fs = require('fs');
      			fs.open('/dev/ttyACM0','a', 666, function(e, fd) {
        		fs.write(fd, flag ? '1' : '0', null, null, null, function() {
         			fs.close(fd, function() { });
        		});
      		});
//	}
    }
    var onoff = req.params.switch;
    if(onoff == 'on') setLED(0);
    if(onoff == 'off') setLED(1);
    res.render('led', { title: 'Solenoid Control : ' + req.params.switch });
  }
  
});
app.post('/solarstatus', function(request, response){
	function setSolar(flag){
		var fs = require('fs');
		fs.open('/dev/rfcomm0', 'a', 666, function(e, fd){
			if(flag==0){
				fs.write(fd, '0', null, null, null, function(){
					fs.close(fd, function(){});
				});
			}
			if(flag==1){
				fs.write(fd, '1', null, null, null, function(){
					fs.close(fd, function(){});
				});
			}
			if(flag==2){
				fs.write(fd, '2', null, null, null, function(){
					fs.close(fd, function(){});
				});
			}
		});
	}
	var switchs = request.body.switchs;
	if(switchs=='off'){
		setSolar(0);
		response.redirect('/');
	}
	if(switchs=='on'){
		setSolar(1);
		response.redirect('/');
	}
	if(switchs=='auto'){
		setSolar(2);
		response.redirect('/');
	}
});
app.post('/onoff', function(request, response) {
	function setLED(flag){
		var fs = require('fs');
		fs.open('/dev/ttyACM0', 'a', 666, function(e, fd) {
			fs.write(fd, flag ? '1' : '0', null, null, null, function () {
				fs.close(fd, function() { });
			});
		});
	}
	var d = new Date()
	var time = d.getFullYear() + '.'+(d.getMonth()+1)+'.'+d.getDate()+'.'+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
	var switchs = request.body.switchs;
	var st_time;
	if(switchs=='on'){
		pool.getConnection(function(err, connection){
			connection.query('insert into on_off_time (time, status) values("'+time+'", "'+switchs+'");', function(err, data){
				connection.release();
			})
		})
	 	setLED(0);
		st_time = setTimeout(function(){
			setLED(1);
			pool.getConnection(function(err, connection){
				var stop_time = new Date()
				var time2 = stop_time.getFullYear()+'.'+(stop_time.getMonth()+1)+'.'+stop_time.getDate()+'.'+stop_time.getHours()+':'+stop_time.getMinutes()+':'+stop_time.getSeconds();
				connection.query('insert into on_off_time (time, status) values("'+time2+'", "off");', function(err, data){
				connection.release();
				})
			})
		}, 1800000)	
		response.redirect('/led');
			

	}
	if(switchs=='off'){
		pool.getConnection(function(err, connection){
			connection.query('insert into on_off_time (time, status) values("'+time+'", "'+switchs+'");', function(err, data){
				connection.release();
			})
		})
	 	setLED(1);
		response.redirect('/led')
	}
	
});
app.get('/record', function(request, response){
	pool.getConnection(function(err, connection){
		connection.query('SELECT * from on_off_time order by id desc', function(err, data){
			response.send(data);
			connection.release();
		})
	})
})
//////login end
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
