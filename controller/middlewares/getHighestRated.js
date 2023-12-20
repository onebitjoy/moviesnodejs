export function getHighestRated(req, res, next) {
  req.query.limit = '10'
  req.query.sort = '-rating'

  next()
}