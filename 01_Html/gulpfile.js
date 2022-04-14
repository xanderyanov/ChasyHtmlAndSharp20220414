"use strict";

var gulp = require("gulp");
var pug = require("gulp-pug");
var del = require("del");
var imagemin = require("gulp-imagemin");
var pngquant = require("imagemin-pngquant");
var concat = require("gulp-concat");
var concatCss = require("gulp-concat-css");
var sourcemaps = require("gulp-sourcemaps");
var plumber = require("gulp-plumber");
var rigger = require("gulp-rigger");
var uglify = require("gulp-uglify");
var path = require("path");
var plumber = require("gulp-plumber");
var data = require("gulp-data");
var fs = require("fs");
var rename = require("gulp-rename");
var less = require("gulp-less");
// var path = require("path");

gulp.task("pug", function () {
	return gulp
		.src("src/*.pug")
		.pipe(
			data(function (file) {
				return JSON.parse(fs.readFileSync("src/assets/data/data.json"));
			})
		)
		.pipe(
			pug({
				pretty: true,
			})
		)
		.pipe(gulp.dest("build"));
});

// gulp.task("css", function () {
// 	return gulp
// 		.src("src/assets/css/apps.css")
// 		.pipe(sourcemaps.init())
// 		.pipe(postcss([postcssImport()]))
// 		.pipe(sourcemaps.write("."))
// 		.pipe(gulp.dest("build/assets/css/"));
// 	// .pipe(rename("apps-x1.css"))
// 	// .pipe(gulp.dest("build/assets/css/"));
// });

// символическая ссылка с папки в основном проекте
gulp.task("css", function () {
	return gulp
		.src("src/assets/less/btl/btl.less")
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("build/btlassets/css/"));
});

// эту папку надо самостоятельно копировать в корень диска, на котором проект - и не придется менять пути, например в файле fonts.less указывающем на путь к icomoon (иначе сделать нельзя)
gulp.task("btlassets", function () {
	return gulp.src("btlassets/**/*.*").pipe(gulp.dest("build/btlassets"));
});

var vendorsCssFiles = [
	"src/assets/vendors/sweetalert.css",
	"src/assets/vendors/nouislider.min.css",
	"src/assets/vendors/swiper-bundle.min.css",
	"src/assets/vendors/fancybox4/ui/dist/fancybox.css",
	"src/assets/libs/bootstrap5/dist/css/bootstrap.min.css",
	"src/assets/libs/bootstrap-icons.css",
];

gulp.task("vendorsCss", function () {
	return (
		gulp
			.src(vendorsCssFiles, { base: "btlassets/css" })
			// .pipe(rigger()) //Прогоним через rigger

			.pipe(sourcemaps.init()) //Инициализируем sourcemap
			.pipe(concatCss("vendors.css"))
			.pipe(sourcemaps.write("."))
			.pipe(gulp.dest("build/btlassets/css"))
	);
});

// gulp.task("css-x1", function () {
// 	return gulp
// 		.src("src/assets/css/apps.css")
// 		.pipe(rename("apps-x1.css"))
// 		.pipe(sourcemaps.init())
// 		.pipe(postcss([postcssImport()]))
// 		.pipe(sourcemaps.write("."))
// 		.pipe(gulp.dest("build/assets/css/"));
// });

// gulp.task("wysiwyg-css", function () {
// 	return gulp
// 		.src("src/assets/css/wysiwyg.css")
// 		.pipe(sourcemaps.init())
// 		.pipe(postcss([postcssImport()]))
// 		.pipe(sourcemaps.write("."))
// 		.pipe(gulp.dest("build/assets/css/"));
// });

gulp.task("image", function () {
	return (
		gulp
			.src("src/assets/img/**/*.*") //Выберем наши картинки
			// .pipe(
			// 	imagemin({
			// 		//Сожмем их
			// 		progressive: true,
			// 		svgoPlugins: [{ removeViewBox: false }],
			// 		use: [pngquant()],
			// 		// interlaced: true,
			// 	})
			// )
			.pipe(gulp.dest("build/btlassets/img"))
	);
});

var vendorsJsFiles = [
	"src/assets/vendors/jquery.min.js",
	// "src/assets/vendors/bootstrap.min.js",
	"src/assets/libs/bootstrap5/dist/js/bootstrap.min.js",
	// "src/assets/vendors/jquery.fancybox.min.js",
	"src/assets/vendors/fancybox4/ui/dist/fancybox.umd.js",
	"src/assets/vendors/jquery.maskedinput.js",
	"src/assets/vendors/nouislider.min.js",
	"src/assets/vendors/sweetalert.min.js",
	"src/assets/vendors/swiper-bundle.min.js",
];

gulp.task("vendorsJs", function () {
	return (
		gulp
			.src(vendorsJsFiles, { base: "btlassets/js" })
			// .pipe(rigger()) //Прогоним через rigger
			.pipe(plumber())
			.pipe(sourcemaps.init()) //Инициализируем sourcemap
			.pipe(concat("vendors.js"))
			.pipe(uglify()) //Сожмем наш js
			.pipe(sourcemaps.write("."))
			.pipe(gulp.dest("build/btlassets/js"))
	);
});

var myjsfiles = [
	"src/assets/js/btl/__globalVar.js",
	"src/assets/js/btl/__actions.js",
	"src/assets/js/btl/__bottomAdaptiveMenu.js",
	"src/assets/js/btl/__callBack.js",
	"src/assets/js/btl/__comments.js",
	"src/assets/js/btl/__eCart.js",
	"src/assets/js/btl/__eCartOrderProcess.js",
	"src/assets/js/btl/__efilter.js",
	"src/assets/js/btl/__eSearch.js",
	"src/assets/js/btl/__eShopCabinet.js",
	"src/assets/js/btl/__form.js",
	"src/assets/js/btl/__jsFilter.js",
	"src/assets/js/btl/__specialist.js",
	"src/assets/js/btl/__index.js",
	"src/assets/js/btl/__price.js",
	"src/assets/js/btl/__layout.js",
	"src/assets/js/btl/__catalogPage.js",
	"src/assets/js/btl/__procedure.js",
	"src/assets/js/btl/__btlGoods.js",
	"src/assets/js/btl/__portfolio.js",
	"src/assets/js/btl/__resize.js",
];

gulp.task("myJs", function () {
	return (
		gulp
			// .src("src/assets/js/**/*.js*")
			// .src("src/assets/js/main.js")
			.src(myjsfiles, { base: "btlassets/js" })
			.pipe(plumber())
			.pipe(sourcemaps.init()) //Инициализируем sourcemap
			.pipe(concat("main.js")) // в какой файл объединить
			// .pipe(uglify()) //Сожмем наш js
			.pipe(sourcemaps.write("."))
			.pipe(gulp.dest("build/btlassets/js"))
	);
});

gulp.task("fonts", function () {
	return gulp.src("src/assets/fonts/**/*.*").pipe(gulp.dest("build/btlassets/fonts"));
});

gulp.task("icomoon", function () {
	return gulp.src("src/assets/icomoon/**/*.*").pipe(gulp.dest("build/btlassets/icomoon"));
});

gulp.task("video", function () {
	return gulp.src("src/assets/video/**/*.*").pipe(gulp.dest("build/btlassets/video"));
});

gulp.task("clean", function () {
	return del("build");
});

gulp.task(
	"build",
	gulp.series(
		"clean",
		gulp.parallel("css", "vendorsCss", "pug", "image", "vendorsJs", "myJs", "fonts", "icomoon", "video")
	)
);

gulp.task("watch", function () {
	gulp.watch("src/assets/less/btl/*.less*", gulp.series("css")).on("uplink", function (filepath) {
		remember.forget("css", path.resolve(filepath));
		delete cached.caches.styles[path.resolve(filepath)];
	});
	gulp.watch("src/assets/img/**/*.*", gulp.series("image")).on("uplink", function (filepath) {
		remember.forget("image", path.resolve(filepath));
		delete cached.caches.image[path.resolve(filepath)];
	});
	gulp.watch("src/assets/js/btl/*.js*", gulp.series("myJs")).on("uplink", function (filepath) {
		remember.forget("myJs", path.resolve(filepath));
		delete cached.caches.myJs[path.resolve(filepath)];
	});
	gulp.watch("src/**/*.pug", gulp.series("pug"));
});

gulp.task("dev", gulp.series("build", "watch"));
