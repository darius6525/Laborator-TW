import { useState } from 'react'

function valideaza(valori) {
  const erori = {}
  
  if (valori.oras.trim().length < 2) {
    erori.oras = "Oraşul are cel puțin două caractere."
  }
  if (!valori.tara.trim()) {
    erori.tara = "Tara este obligatorie."
  }
  
  const zileNumar = Number(valori.zile)
  if (!valori.zile || Number.isNaN(zileNumar) || zileNumar < 1 || zileNumar > 30) {
    erori.zile = "Numărul de zile este între 1 şi 30."
  }
  
  return erori
}

export default function FormularDestinatie({ onAdd, seTrimite }) {
  const [valori, setValori] = useState({ oras: '', tara: '', zile: '' })
  const [erori, setErori] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setValori((curent) => ({ ...curent, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    
    const rezultateErori = valideaza(valori)
    setErori(rezultateErori)

    // Dacă există erori, oprim trimiterea
    if (Object.keys(rezultateErori).length > 0) {
      return
    }

    onAdd({
      oras: valori.oras.trim(),
      tara: valori.tara.trim(),
      zile: Number(valori.zile),
      vizitat: false,
    })

    // Golim formularul și erorile după trimiterea cu succes
    setValori({ oras: '', tara: '', zile: '' })
    setErori({})
  }

  return (
    <form className="formular" onSubmit={handleSubmit} noValidate>
      <div className="camp">
        <input
          type="text"
          name="oras"
          placeholder="Oraş"
          value={valori.oras}
          onChange={handleChange}
          className={erori.oras ? 'invalid' : ''}
        />
        {erori.oras && <p className="eroare-camp">{erori.oras}</p>}
      </div>

      <div className="camp">
        <input
          type="text"
          name="tara"
          placeholder="Țară"
          value={valori.tara}
          onChange={handleChange}
          className={erori.tara ? 'invalid' : ''}
        />
        {erori.tara && <p className="eroare-camp">{erori.tara}</p>}
      </div>

      <div className="camp">
        <input
          type="number"
          name="zile"
          placeholder="Zile"
          value={valori.zile}
          onChange={handleChange}
          className={erori.zile ? 'invalid' : ''}
        />
        {erori.zile && <p className="eroare-camp">{erori.zile}</p>}
      </div>

      <button type="submit" disabled={seTrimite}>
        {seTrimite ? 'Se trimite...' : 'Adaugă'}
      </button>
    </form>
  )
}