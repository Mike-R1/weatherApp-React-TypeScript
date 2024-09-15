import { useState } from "react";
import { countries } from "../../data/countries";
import styles from './WeatherForm.module.css'
import { SearchType } from "../../types";
import Alert from "../AlertMessage/Alert";

export type WeatherFormProps = {
  fetchWeather: (search: SearchType) => Promise<void>
}

export default function WeatherForm({ fetchWeather }: WeatherFormProps) {


  const [search, setSearch] = useState<SearchType>({

    city: '',
    country: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {

    setSearch({
      ...search,
      [e.target.name]: [e.target.value]
    })

  }

  const [alert, setAlert] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Object.values(search).includes('')) {
      setAlert('Todos los campos son obligatorios')
      return
    }

    fetchWeather(search)

  }


  return (

    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      {alert && <Alert>{alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor="city">Ciudad</label>
        <input
          type="text"
          name="city"
          id="city"
          placeholder="Ciudad"
          value={search.city}
          onChange={handleChange}
        />

      </div>


      <div className={styles.field}>

        <label htmlFor="country">Pais</label>
        <select
          id="country"
          key={search.country}
          onChange={handleChange}
          name="country"
        >

          <option value="">Seleccione un Pais</option>
          {countries.map(country => (

            <option
              value={country.code}
              key={country.code}

            >
              {country.name}
            </option>
          ))}
        </select>

      </div>

      <input type="submit"
        value="Consultar clima"
        className={styles.submit}

      />



    </form>


  )
}
