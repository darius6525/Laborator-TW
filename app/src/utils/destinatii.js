export const destinatii = [
  { id: '1', oras: 'Lisabona', tara: 'Portugalia', zile: 4, vizitat: false },
  { id: '2', oras: 'Cluj-Napoca', tara: 'România', zile: 2, vizitat: true },
  { id: '3', oras: 'Porto', tara: 'Portugalia', zile: 3, vizitat: false },
  { id: '4', oras: 'Brașov', tara: 'România', zile: 2, vizitat: true },
  { id: '5', oras: 'Kyoto', tara: 'Japonia', zile: 6, vizitat: false },
  { id: '6', oras: 'Tokyo', tara: 'Japonia', zile: 5, vizitat: false },
]

//1 b)

export function getOrase(list) {
  return list.map((item) => item.oras)
}

export function getNevizitate(list) {
  return list.filter((item) => !item.vizitat)
}

export function totalZile(list) {
  return list.reduce((acc, item) => acc + item.zile, 0)
}

export function formatDestinatie({ oras, tara, zile, vizitat }) {
  const status = vizitat ? '[x]' : '[ ]'
  return `${status} ${oras}, ${tara} (${zile} zile)`
}

export function numarPeTara(list) {
  return list.reduce((acc, item) => {
    acc[item.tara] = (acc[item.tara] || 0) + 1
    return acc
  }, {})
}

export function sortDupaZile(list) {
  return [...list].sort((a, b) => b.zile - a.zile)
}

// 2)
export function marcheazaVizitat(list, id) {
  return list.map((item) =>
    item.id === id ? { ...item, vizitat: !item.vizitat } : item
  )
}

export function adaugaDestinatie(list, d) {
  return [...list, d]
}

export function stergeDestinatie(list, id) {
  return list.filter((item) => item.id !== id)
}
