var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var minifyCss = require('gulp-minify-css');
// source maps allows source to point to originial
// non minified css, makes debugging much easier
var sourcemaps = require('gulp-sourcemaps');
// js minifier
var uglify = require('gulp-uglify');
// img minifier
var imageMin = require('gulp-imagemin');

gulp.task('images', function() {
	gulp.src(['src/img/**/*'])
		.pipe(imageMin())
		.pipe(gulp.dest('dist/img'))
		.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	gulp.src(['src/scripts/main.js']) // source
		.pipe(sourcemaps.init()) // for easier debuggin
		.pipe(uglify()) // minify js
		.pipe(sourcemaps.write()) // sub unminified code for debugging
		.pipe(gulp.dest('dist/scripts')) // set dest
		.pipe(browserSync.stream()); // refresh browser
});

gulp.task('styles', function() {
	gulp.src(['src/styles/**/*.css'])
		.pipe(sourcemaps.init())
		.pipe(minifyCss())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/styles'))
		.pipe(browserSync.stream());
		// on change of css file, minify it, dump 
		//minified version in dist dir and sync
});

gulp.task('default', function() {
	/* console.log ('Your first gulp task has run!'); */
	browserSync.init({
		server: './'
	});
	//gulp.watch('src/**/*', browserSync.reload);
	// on change of css watch styles and activate styles task
	gulp.watch('src/styles/**/*.css', ['styles']);
	gulp.watch('src/img/**/*', ['images']);
	gulp.watch('src/scripts/**/*.js', ['scripts']);
	gulp.watch('*.html', browserSync.reload);
});