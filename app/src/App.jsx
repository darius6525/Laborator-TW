import { useState, useEffect } from 'react'
import { getDestinatii, postDestinatie, patchVizitat } from './api/destinatii.js'
import { getNevizitate, totalZile } from './utils/destinatii.js'
import PanouStatistici from './components/PanouStatistici.jsx'

import Rezumat from './components/Rezumat.jsx'
import FormularDestinatie from './components/FormularDestinatie.jsx'
import ListaDestinatii from './components/ListaDestinatii.jsx'
import Cautare from './components/Cautare.jsx'

import './App.css'

export default function App() {
  const [destinatii, setDestinatii] = useState([])
  const [incarcare, setIncarcare] = useState(true)
  const [eroare, setEroare] = useState(null)
  const [seTrimite, setSeTrimite] = useState(false)
  const [cautare, setCautare] = useState('')

  // 1. Încărcarea datelor de la server la pornire
  useEffect(() => {
    async function incarcaDate() {
      try {
        const data = await getDestinatii()
        setDestinatii(data)
      } catch (err) {
        setEroare(err.message)
      } finally {
        setIncarcare(false)
      }
    }
    incarcaDate()
  }, [])

  // 2. Marcarea vizitat pe server (PATCH)
  async function handleToggle(id) {
    const destinatieCurenta = destinatii.find((d) => d.id === id)
    if (!destinatieCurenta) return
    const nouVizitat = !destinatieCurenta.vizitat

    try {
      const dataActualizata = await patchVizitat(id, nouVizitat)
      setDestinatii((curent) =>
        curent.map((d) => (d.id === id ? dataActualizata : d))
      )
    } catch (err) {
      console.error("Eroare la actualizare:", err.message)
    }
  }

  // 3. Adăugarea unei destinații noi pe server (POST)
  async function handleAdd(nouaDestinatie) {
    setSeTrimite(true)
    try {
      const destinatieSalvata = await postDestinatie(nouaDestinatie)
      setDestinatii((curent) => [...curent, destinatieSalvata])
    } catch (err) {
      console.error("Eroare la adăugare:", err.message)
    } finally {
      setSeTrimite(false)
    }
  }

  // 4. Filtrarea listei pentru căutare
  const textCautare = cautare.trim().toLowerCase()
  const afisate = destinatii.filter(
    (d) =>
      d.oras.toLowerCase().includes(textCautare) ||
      d.tara.toLowerCase().includes(textCautare)
  )

  // Rezumatul se calculează întotdeauna din lista completă de pe server, nu din cea filtrată
  const total = destinatii.length
  const nevizitate = getNevizitate(destinatii).length
  const zile = totalZile(getNevizitate(destinatii))

  return (
    <main>
      <h1>City Explorer</h1>

      {/* Stările de încărcare și eroare */}
      {incarcare && <p className="stare">Se încarcă destinațiile...</p>}
      {eroare && <p className="stare eroare">Nu am putut încărca datele: {eroare}</p>}

      {!incarcare && !eroare && (
        <>
          <Rezumat total={total} nevizitate={nevizitate} zile={zile} />
          <FormularDestinatie onAdd={handleAdd} seTrimite={seTrimite} />
          
          {/* Panoul de statistici */}
          <PanouStatistici />

          <Cautare valoare={cautare} onChange={setCautare} />

          {/* Randarea condiționată pentru lista goală sau rezultate negăsite */}
          {destinatii.length === 0 ? (
            <p className="gol">
              Nu există nicio destinație. Adaugă prima din formular.
            </p>
          ) : afisate.length === 0 ? (
            <p className="gol">Niciun rezultat pentru „{cautare}”.</p>
          ) : (
            <ListaDestinatii destinatii={afisate} onToggle={handleToggle} />
          )}
        </>
      )}
    </main>
  )
}