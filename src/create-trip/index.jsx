import { useState } from "react"
import { Input } from "../components/ui/input"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"

function CreateTrip() {
  const [place, setPlace] = useState();
  return (
    <div className="text-left">
      <h2 className="font-bold text-3xl">Cuentanos sobre tus preferencias de viaje!</h2>
      <p className="mt-3 text-gray-500 text-xl">Simplemente proporcione alguna información básica y nuestro planificador de viaje generará un itinerario personalizado según sus preferencias.</p>

      <div className="flex flex-col gap-12">
        <div className="mt-5">
          <h2 className="text-xl my-3 font-medium">Cual es su destino?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (value) => { setPlace(value); }
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">Cuantos días estas pensando viajar?</h2>
          <Input type="number" placeholder={"Introduce los días de estadía. Por ejemplo: 3"} min="1" step="1" oninput="validity.valid||(value='');" />
        </div>
      </div>


    </div>
  )
}

export default CreateTrip