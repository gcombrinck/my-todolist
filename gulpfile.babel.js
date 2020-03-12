import gulp from 'gulp';
import mocha from 'gulp-mocha';

gulp.task('regression-testing', () => gulp.src([
    "./tests/regression.test.js",

])
    .pipe(mocha({
        reporter: 'mochawesome',
        timeout: 1200000,
        exit: true,
        allowEmpty: true,
        require: '@babel/register',
        reportTitle: 'Regression Test Report',
        reporterOptions: {
            reportDir: './reports/',
            reportPageTitle: 'Regression Test Report',
            reportTitle: `Entersekt Interview Tests`,
            reportFilename: `regression-report`,
            overwrite: true,
            quiet: true,
        },
    })));