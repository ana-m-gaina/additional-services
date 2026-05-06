module.exports = (srv) => {
  srv.on('ping', () => 'OK — CDM AS Tracker is running')
}
