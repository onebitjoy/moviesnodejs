import cluster from "cluster"
import os from "os"

if (cluster.isPrimary) {
  for (let i = 0; i <= os.cpus().length; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker: ${worker.process.pid} died. Restarting...`)
    cluster.fork()
  })

  cluster.on('listening', (worker, address) => {
    console.log(
      `Worker(${worker.process.pid}) listening on ${address.port}`
    )
  })

} else {
  await import("./app.js").catch((error) => console.log(error))
}