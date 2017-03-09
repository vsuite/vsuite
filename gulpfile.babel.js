import path from 'path'
import gulp from 'gulp'
import eslint from 'gulp-eslint'
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import cssnano from 'gulp-cssnano'
import sourcemap from 'gulp-sourcemaps'
import postcss from 'gulp-postcss'
import cssnext from 'postcss-cssnext'
import autoprefixer from 'autoprefixer'


const SRC = path.parse(__dirname, './assets')
const DIST = path.parse(__dirname, './dist')
const PATH = {
  FONT: path.resolve(SRC, './font'),
  JS: path.resolve(SRC, './js'),
  CSS: path.resolve(SRC, './css')
}

// 对JS 进行处理
gulp.task('javascript', () => {
  return gulp.src(`${PATH.JS}/**/*.js`)
             .pipe(eslint())
             .pipe(eslint.failAfterError())
             .pipe(sourcemap.init())
             .pipe(babel())
             .pipe(concat('wibi.js'))
             .pipe(sourcemap.write('.'))
             .pipe(gulp.dest(`${DIST}/js`))
})

// 对css 进行处理
gulp.task('cssnano', () => {
  return gulp.src(`${PATH.CSS}/**/*.css`)
             .pipe(sourcemap.init())
             .pipe(postcss([
               autoprefixer({
                 browsers: [
                   'Chrome >= 35',
                   'Firefox >= 38',
                   'Edge >= 12',
                   'Explorer >= 10',
                   'iOS >= 8',
                   'Safari >= 8',
                   'Android 2.3',
                   'Android >= 4',
                   'Opera >= 12'
                 ]
               }),
               cssnext()
             ]))
             .pipe(sourcemap.write('.'))
             .pipe(gulp.dest(`${DIST}/css`))
})

// 默认
// -------------------------------------------
// 检测css，js，编译css和js的每个文件。
// -------------------------------------------
gulp.task('default')

// 开发
// --------------------------------------------
// 除了default功能外，需要监听他们变化。监听img，font变化。
// --------------------------------------------
gulp.task('dev')

// 编译
// --------------------------------------------
// 除了default功能外，需要合并并压缩css,js代码。需过测试
// --------------------------------------------
gulp.task('pro')

// 测试
// --------------------------------------------
// 监听js文件变化，实时进行重新测试
// --------------------------------------------
gulp.task('test')
