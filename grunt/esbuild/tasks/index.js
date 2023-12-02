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
        console.error(chalk.red('No file was found on the src path.'))

        return done(false)
      }

      let esbuildOptions = Object.assign(
        {
          entryPoints: this.files[0].src,
          write: true,
        },
        DEFAULT_OPTIONS,
        this.options(),
      )

      try {
        await esbuild.build(esbuildOptions)

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