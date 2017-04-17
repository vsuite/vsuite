import path from "path"
import gulp from "gulp"
import eslint from "gulp-eslint"
import babel from "gulp-babel"
import uglify from "gulp-uglify"
import stylus from "gulp-stylus"
import postcss from "gulp-postcss"
import cssnano from "gulp-cssnano"
import concat from "gulp-concat"
import sourcemap from "gulp-sourcemaps"
import autoprefixer from "autoprefixer"
import pug from "gulp-pug"
import imagemin from "gulp-imagemin"
import BrowserSync from "browser-sync"
import del from "del"
import pkg from "./package.json"

const browserSync = BrowserSync.create()
const SECOND = 1000
// 文件名称
const FILENAME = "wibi"
const srcPath = path.resolve(__dirname, "./src")
const distPath = path.resolve(__dirname, "./dist")
const docPath = path.resolve(__dirname, "./doc")
const testPath = path.resolve(__dirname, "./test")
// const examplesPath = path.resolve(__dirname, "./examples")
const paths = {
  // pug files
  page: {
    entry: [
      path.resolve(srcPath, "page/*.pug"),
    ],
    all: [
      path.resolve(srcPath, "page/**/*.pug"),
    ],
  },
  // sass files
  style: {
    entry: [
      path.resolve(srcPath, "style/*.styl"),
      path.resolve(srcPath, "style/themes/*.styl"),
    ],
    all: [
      path.resolve(srcPath, "style/**/*.styl"),
    ],
  },
  // es6 files
  script: {
    entry: [
      path.resolve(srcPath, "script/index.js"),
    ],
    src: [
      path.resolve(srcPath, "script/**/*.js"),
    ],
    test: [
      path.resolve(testPath, "**/*.js"),
    ],
  },
  font: [
    path.resolve(srcPath, "font/*"),
  ],
  image: [
    path.resolve(srcPath, "image/*"),
  ],
  "static": [
    path.resolve(srcPath, "static/*"),
  ],
}

// src代码进行书写规范检测
gulp.task("lint", () => gulp.src(paths.script.src)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
)

// test代码进行书写规范检测
gulp.task("lint:test", () => gulp.src(paths.script.test)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
)

// 对JS 代码进行编译，放在doc目录下
gulp.task("js", () => gulp.src(paths.script.entry)
  .pipe(sourcemap.init())
  .pipe(babel())
  .pipe(sourcemap.write("."))
  .pipe(gulp.dest(path.resolve(docPath, "js")))
  .pipe(browserSync.stream())
)

// 对JS 编译压缩处理
gulp.task("js:pro", () => gulp.src(paths.script.entry)
  .pipe(sourcemap.init())
  .pipe(babel())
  .pipe(concat(`${FILENAME}.min.js`))
  .pipe(uglify())
  .pipe(sourcemap.write("."))
  .pipe(gulp.dest(distPath))
)

// 对stylus 进行编译
gulp.task("css", () => gulp.src(paths.style.entry)
  .pipe(sourcemap.init())
  .pipe(stylus())
  .pipe(postcss([
    autoprefixer({
      browsers: [
        "Chrome >= 35",
        "Firefox >= 38",
        "Edge >= 12",
        "Explorer >= 10",
        "iOS >= 8",
        "Safari >= 8",
        "Android 2.3",
        "Android >= 4",
        "Opera >= 12",
      ],
    }),
  ]))
  .pipe(sourcemap.write("."))
  .pipe(gulp.dest(path.resolve(docPath, "css")))
  .pipe(browserSync.stream())
)

// 对stylus 进行编译，并压缩
gulp.task("css:pro", () => gulp.src(paths.style.entry)
  .pipe(sourcemap.init())
  .pipe(stylus())
  .pipe(postcss([
    autoprefixer({
      browsers: [
        "Chrome >= 35",
        "Firefox >= 38",
        "Edge >= 12",
        "Explorer >= 10",
        "iOS >= 8",
        "Safari >= 8",
        "Android 2.3",
        "Android >= 4",
        "Opera >= 12",
      ],
    }),
  ]))
  .pipe(cssnano())
  .pipe(sourcemap.write("."))
  .pipe(gulp.dest(distPath))
)

// 对pug 文件进行处理
gulp.task("html", () => gulp.src(paths.page.entry)
  .pipe(sourcemap.init())
  .pipe(pug({
    locals: {
      time: Date.now(),
      version: pkg.version,
      build: Math.floor(Date.now() / SECOND),
    },
  }))
  .pipe(sourcemap.write("."))
  .pipe(gulp.dest(docPath))
  .pipe(browserSync.stream())
)

// 图片
gulp.task("img", () => gulp.src(paths.image)
  .pipe(imagemin())
  .pipe(gulp.dest(path.resolve(docPath, "img")))
  .pipe(browserSync.stream())
)

// 字体
gulp.task("font", () => gulp.src(paths.font)
  .pipe(gulp.dest(path.resolve(docPath, "font")))
)

// 静态文件
gulp.task("static", () => gulp.src(paths.font)
  .pipe(gulp.dest(docPath))
)

// browser-sync
gulp.task("browser-sync", () => {
  browserSync.init({ server: { baseDir: docPath } })

  gulp.watch(paths.script.src, gulp.parallel("js"))
  gulp.watch(paths.style.all, gulp.parallel("css"))
  gulp.watch(paths.page.all, gulp.parallel("html"))
  gulp.watch(paths.image, gulp.parallel("img"))
  gulp.watch(paths.font).on("change", browserSync.reload)
  gulp.watch(paths.static).on("change", browserSync.reload)
})

// 清理
// --------------------------------------------
// 清理 项目文件
// --------------------------------------------
gulp.task("clean", (cb) => {
  del.sync([distPath])
  cb()
})

// 清除测试
gulp.task("clean:test", (cb) => {
  del.sync([path.resolve(__dirname, "coverage")])
  cb()
})

// 开发
// --------------------------------------------
// 除了default功能外，需要监听他们变化。监听img，font变化。
// --------------------------------------------
gulp.task("dev", gulp.series(gulp.parallel("html", "css", "js", "img", "font", "static"), "browser-sync"))

// 生产
// --------------------------------------------
// 会检测js代码规范，通过测试，之后进行sass, js, pug等
// 文件代码编译，并压缩等
// --------------------------------------------
gulp.task("pro", gulp.series("clean", gulp.parallel("css:pro", "js:pro")))

// 默认
// -------------------------------------------
// 检测css，js，编译css和js的每个文件。
// -------------------------------------------
gulp.task("default", gulp.parallel("dev"))
