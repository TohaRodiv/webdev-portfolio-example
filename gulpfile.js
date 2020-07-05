const {task, dest, src, watch, parallel} = require ("gulp"),
pug 		= require ("gulp-pug"),
sass 		= require ("gulp-sass"),
include 	= require ("gulp-include"),
imagemin 	= require ("gulp-imagemin")



const psrc = "src/"
const dsrc = "dist/"

const source = {
	pug: psrc 	+ "pug/*.pug",
	sass: psrc 	+ "sass/*.+(scss|sass)",
	js: psrc 	+ "js/*.js",
	img: psrc 	+ "images/*",
	
	inc_sass: `${psrc}sass/inc/*.+(scss|sass)`,
	inc_pug: `${psrc}pug/inc/*.pug`,
	inc_js: `${psrc}js/inc/*.js`,
	
	scriptJs: `${psrc}js/script.js`
}

const dist = {
	html: dsrc,
	css: dsrc 	+ "css",
	js: dsrc 	+ "js",
	img: dsrc 	+ "img"
}








function includes_js (opt = {}) {
	src (source.scriptJs)
	.pipe ( include().on ("error", console.log) )
	.pipe ( dest(dist.js) )
}


function compile_pug (opt = {}) {
	 src (source.pug)
	.pipe ( pug(opt).on ("error", console.log) )
	.pipe ( dest (dist.html) )
}


function compile_sass (opt = {}) {
	src (source.sass)
	.pipe ( sass(opt).on ("error", console.log) )
	.pipe ( dest (dist.css) )
}


function compressImages (opt = {}) {
	src (source.img)
	.pipe (imagemin (opt).on ("error", console.log))
	.pipe ( dest (dist.img) )
}



function only_compile (obj = {}) {
	includes_js ( obj.incJs || {} )
	compile_pug ( obj.pug || {} )
	compile_sass (obj.sass || {})
	compressImages ( obj.imagemin || {} )
}


function pwatch (obj) {
	watch ([source.sass, source.inc_sass], async ev => { compile_sass ( obj.sass || {} ) })
	watch ([source.pug, source.inc_pug], async ev => { compile_pug ( obj.pug || {} )})
	watch ([source.js, source.inc_js], async ev => { includes_js ( obj.incJs || {} ) })
	watch (source.img, async ev => { compressImages ( obj.incJs || {} ) })
}




 function main (mode = false) {
	 // Mode false - only compile, mode true - watch
	 
	 // Options sass, pug and more plugins
	 const opt = {
		 pug: {pretty: "\t"}
	}

	mode ? pwatch (opt) : only_compile (opt)
}



task ("include-js", async ev => {
	includes_js ()
})

task ("imagemin", async ev => {
	compressImages ()
})



task ("compile", async ev => {
	main (false)
})

task ("default", async ev => {
	main (true)
} )





















/**
 * Wrap gulp streams into fail-safe function for better error reporting
 * Usage:
 * gulp.task('less', wrapPipe(function(success, error) {
 *   return gulp.src('less/*.less')
 *      .pipe(less().on('error', error))
 *      .pipe(gulp.dest('app/css'));
 * }));
 */
function wrapPipe(taskFn) {
  return function(done) {
    var onSuccess = function() {
      done();
    };
    var onError = function(err) {
      done(err);
    }
    var outStream = taskFn(onSuccess, onError);
    if(outStream && typeof outStream.on === 'function') {
      outStream.on('end', onSuccess);
    }
  }
}


