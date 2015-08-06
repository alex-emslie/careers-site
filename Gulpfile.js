var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	coffee = require('gulp-coffee'),
	imagemin = require('gulp-imagemin'),
	svgstore = require('gulp-svgstore'),
	svgmin = require('gulp-svgmin'),
	concat = require('gulp-concat'),
	paths = {
		coffee: ['./src/coffee/**/*.coffee', './node_modules/marketing-site-assets/coffee/**/*.coffee'],
		vendor: ['./src/vendor/**/*.js', './node_modules/marketing-site-assets/vendor/**/*.js'],
		svgs:   ['./src/svgs/**/*.svg', './node_modules/marketing-site-assets/svgs/**/*.svg'],
		imgs:   ['./src/imgs/**/*', './node_modules/marketing-site-assets/imgs/**/*'],
		sass:   ['./src/sass/**/*.sass']
	}

gulp.task('sass', function(){
	return gulp.src(paths.sass)
		.pipe(sass({
			includePaths: require('marketing-site-assets').includePaths
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
	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.coffee, ['coffee', 'vendor']);
	gulp.watch(paths.svgs, ['svgstore']);
	gulp.watch(paths.imgs, ['imagemin']);
	gulp.watch(paths.vendor, ['vendor']);
})