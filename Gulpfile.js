var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	coffee = require('gulp-coffee'),
	imagemin = require('gulp-imagemin'),
	svgstore = require('gulp-svgstore'),
	svgmin = require('gulp-svgmin'),
	concat = require('gulp-concat'),
	argv = require('yargs').argv,
	git = require('gulp-git'),
	watch = require('gulp-watch'),
	runSequence = require('run-sequence'),
	plumber = require('gulp-plumber'),
	chalk = require('chalk')
	devRemoteName = 'dev',
	prodRemoteName = 'production'
	paths = {
		coffee: ['./src/coffee/**/*.coffee', './node_modules/marketing-site-assets/coffee/**/*.coffee'],
		vendor: ['./src/vendor/**/*.js', './node_modules/marketing-site-assets/vendor/**/*.js'],
		svgs:   ['./src/svgs/**/*.svg', './node_modules/marketing-site-assets/svgs/**/*.svg'],
		imgs:   ['./src/imgs/**/*', './node_modules/marketing-site-assets/imgs/**/*'],
		sass:   ['./src/sass/**/*.sass']
	},
	onError = function(err){
		console.log(chalk.red(err.message));
	}

gulp.task('sass', function(){
	return gulp.src(paths.sass)
		.pipe(plumber({errorHandler: onError}))
		.pipe(sass({
			includePaths: require('marketing-site-assets').includePaths,
			outputStyle: 'compressed'
			}).on('error', sass.logError))
		.pipe(gulp.dest('./public/styles'))
});


gulp.task('coffee', function(){
	return gulp.src(paths.coffee)
		.pipe(coffee()
			.on('error', gutil.log))
		.pipe(gulp.dest('./public/js'));
});

gulp.task('imagemin', function(){
	return gulp.src(paths.imgs)
		.pipe(imagemin())
		.pipe(gulp.dest('./public/imgs'));
});

gulp.task('svgstore', function(){
	return gulp.src(paths.svgs)
		.pipe(svgstore())
		.pipe(gulp.dest('./public/svgs'));
});

gulp.task('vendor', function(){
	return gulp.src(paths.vendor)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function(){
	watch(paths.sass, function(event){
		gulp.start('sass');
	});
	watch(paths.coffee, function(event){
		gulp.start('coffee');
	});
	watch(paths.svgs, function(event){
		gulp.start('svgstore');
	});
	watch(paths.imgs, function(event){
		gulp.start('imagemin');
	});
	watch(paths.vendor, function(event){
		gulp.start('vendor');
	});
});

gulp.task('default', ['watch'])

gulp.task('build', ['sass', 'coffee', 'imagemin', 'svgstore', 'vendor']);

gulp.task('push_prod', function(){
	git.push(prodRemoteName, 'master', function(err){
		if (err) throw err;
	});
});

gulp.task('push_dev', function(){
	git.push(devRemoteName, 'master', {args: ' -f'}, function(err){
		if (err) throw err;
	});
});

gulp.task('deploy', function(){
	if(argv.production){
		runSequence('build', 'push_prod');
	} else {
		runSequence('build', 'push_dev');
	}
});