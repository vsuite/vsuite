import path from "path"
import gulp from "gulp"
import eslint from "gulp-eslint"
import babel from "gulp-babel"
import uglify from "gulp-uglify"
import concat from "gulp-concat"
import cssnano from "gulp-cssnano"
import sourcemap from "gulp-sourcemaps"
import postcss from "gulp-postcss"
import cssnext from "postcss-cssnext"
import rename from "gulp-rename"


// 文件名称
const FILENAME = "wibi"
const srcPath = path.resolve(__dirname, "./src")
const distPath = path.resolve(__dirname, "./dist")
const docPath = path.resolve(__dirname, "./doc")
// const testPath = path.resolve(__dirname, "./test")
// const examplesPath = path.resolve(__dirname, "./examples")
const paths = {
  // pug files
  page: {
    entry: [],
    all: [],
  },
  // sass files
  style: {
    entry: [],
    all: [],
  },
  // es6 files
  script: {
    entry: [],
    src: [],
    test: [],
  },
  font: [],
  image: [],
  "static": [],
}

// src代码进行书写规范检测
gulp.task("lint", () => gulp.src(paths.script.src)
  .
)

// test代码进行书写规范检测
gulp.task("lint:test", () => gulp.src())

// 对JS 代码进行编译，放在doc目录下
gulp.task("js", () => gulp.src(paths.script.entry)
  .pipe(sourcemap.init())
  .pipe(babel())
  .pipe(sourcemap.write("."))
  .pipe(gulp.dest(path.resolve(docPath, "js")))
)

// 对JS 编译压缩处理
gulp.task("js:pro", () => gulp.src(paths.script.entry)
  .pipe(sourcemap.init())
  .pipe(babel())
  .pipe(concat(`${FILENAME}.min.js`))
  .pipe(uglify())
  .pipe(sourcemap.write("."))
  .pipe(gulp.dest(docPath))
)

// 对css 进行处理
gulp.task("css:pro", () => gulp.src(`${SRC_PATH.CSS}/**/*.css`)
  .pipe(postcss([
    cssnext({
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
  .pipe(concat(`${FILENAME}.css`))
  .pipe(sourcemap.init())
  // 压缩css
  .pipe(cssnano())
  .pipe(sourcemap.write("."))
  .pipe(gulp.dest(`${distPath}/css`))
)

// 默认
// -------------------------------------------
// 检测css，js，编译css和js的每个文件。
// -------------------------------------------
gulp.task("default")

// 开发
// --------------------------------------------
// 除了default功能外，需要监听他们变化。监听img，font变化。
// --------------------------------------------
gulp.task("dev")


// 生产
// --------------------------------------------
// 会检测js代码规范，通过测试，之后进行sass, js, pug等
// 文件代码编译，并压缩等
// --------------------------------------------
gulp.task("pro")

// 测试
// --------------------------------------------
// 监听js文件变化，实时进行重新测试
// --------------------------------------------
gulp.task("test")

// // 示例
// // --------------------------------------------
// // 运行 项目示例
// // --------------------------------------------
// gulp.task("examples")

// 清理
// --------------------------------------------
// 清理 项目文件
// --------------------------------------------
gulp.task("clean")
