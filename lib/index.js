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
      const info = stats.toString({ chunkModules: false, colors: useColors() })
      if (stats.hasErrors()) {
        done(info)
        return
      }
      console.log(info)
      compiler.outputFileSystem.readdirSync(config.output.path).forEach(file => {
        const filePath = path.join(config.output.path, file)
        const key = path.relative(metalsmith.destination(), filePath)
        files[key] = {
          contents: compiler.outputFileSystem.readFileSync(filePath)
        }
      })
      return done()
    })
  }
}

function useColors () {
  return tty.isatty(1 /* stdout */)
}
