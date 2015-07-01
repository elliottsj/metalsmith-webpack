import MemoryFileSystem from 'memory-fs'
import tty from 'tty'
import path from 'path'
import webpack from 'webpack'

export default function plugin (config) {
  const compiler = webpack(config)
  compiler.outputFileSystem = new MemoryFileSystem()
  return function (files, metalsmith, done) {
    compiler.run((err, stats) => {
      if (err) {
        done(err)
        return
      }
      const info = stats.toString({
        chunkModules: false,
        colors: isStdoutATTY()  // Output colors iff stdout has a controlling terminal
      })
      if (stats.hasErrors()) {
        done(info)
        return
      }
      console.log(info)
      /*
       * Webpack requires the output path `config.output.path` to be an *absolute* path,
       * but metalsmith `files` expects keys that are file paths relative to metalsmith's
       * build directory.
       *
       * Read webpack's output files and assign them relative paths in metalsmith's `files`
       */
      compiler.outputFileSystem.readdirSync(config.output.path).forEach(filename => {
        const filePath = path.join(config.output.path, filename)
        const key = path.relative(metalsmith.destination(), filePath)
        files[key] = {
          contents: compiler.outputFileSystem.readFileSync(filePath)
        }
      })
      return done()
    })
  }
}

function isStdoutATTY () {
  return tty.isatty(1 /* stdout */)
}
