"use strict"

const
  esbuild = require('esbuild'),
  chalk = require('chalk').default

const DEFAULT_OPTIONS = {
  bundle: false,
  logLevel: 'silent',
}

module.exports = function (grunt) {
  grunt.task.registerMultiTask('esbuild', 'Convert and optimize scripts using Esbuild.',
    async function () {
      let done = this.async()

      if (this.files[0].src.length == 0) {
        return done()
      }

      let inputOptions = this.options()
      let isWatchMode = inputOptions.watchMode ?? false
      delete inputOptions.watchMode

      let esbuildOptions = Object.assign(
        {
          entryPoints: this.files[0].src,
          write: true,
        },
        DEFAULT_OPTIONS,
        inputOptions,
      )

      try {
        if (!isWatchMode) {
          await esbuild.build(esbuildOptions)
        }
        else {
          let buildProcess = await esbuild.context(esbuildOptions)

          await buildProcess.watch()
          console.log(chalk.bgGreen('\nWatch mode is active!'))
        }

        console.log(
          chalk.green('The task ')
          + this.nameArgs
          + chalk.green(' was complied.')
        )

        return done(true)
      }
      catch (error) {
        console.log(chalk.red.bold(error.message))
        console.log(error.stack)

        done(false)
      }
    }
  )
}