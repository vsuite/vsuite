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
// const testPath = path.resolve(__dirname, "./test")
// const examplesPath = path.resolve(__dirname, "./examples")
const SRC_PATH = {
  FONT: path.resolve(srcPath, "./font"),
  JS: path.resolve(srcPath, "./js"),
  CSS: path.resolve(srcPath, "./css"),
}

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

// 编译
// --------------------------------------------
// 除了default功能外，需要合并并压缩css,js代码。需过测试
// --------------------------------------------
// 对JS 进行处理
gulp.task("js:pro", () => gulp.src(`${SRC_PATH.JS}/**/*.js`)
  .pipe(eslint())
  .pipe(eslint.failAfterError())
  .pipe(babel())
  .pipe(concat(`${FILENAME}.js`))
  .pipe(gulp.dest(`${distPath}/js`))
  .pipe(sourcemap.init())
  .pipe(uglify())
  .pipe(rename(`${FILENAME}.min.js`))
  .pipe(sourcemap.write("."))
  .pipe(gulp.dest(`${distPath}/js`))
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


gulp.task("pro")

// 测试
// --------------------------------------------
// 监听js文件变化，实时进行重新测试
// --------------------------------------------
gulp.task("test")

// 示例
// --------------------------------------------
// 运行 项目示例
// --------------------------------------------
gulp.task("examples")

// 清理
// --------------------------------------------
// 清理 项目文件
// --------------------------------------------
gulp.task("clean")
