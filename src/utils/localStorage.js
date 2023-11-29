const DataBaseId = 'DataBaseId'

export function getDataBaseId() {
  return localStorage.getItem(DataBaseId)
}

export function setDataBaseId(id) {
  return localStorage.setItem(DataBaseId, id)
}
