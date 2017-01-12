export default {
  create(field, data) {
    let storedData = this.read(field) ? this.read(field) : []
    storedData.push(data)
    localStorage.setItem(field, JSON.stringify(storedData))
  },
  read(field) {
    return JSON.parse(localStorage.getItem(field) ? localStorage.getItem(field) : false)
  }
}
