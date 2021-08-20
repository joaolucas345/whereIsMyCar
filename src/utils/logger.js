const consoler = console

module.exports = {
    log:(message) => {
        consoler.log(message ,"logged from fake consoles")
    }
}