import { useEffect, useState } from "react"
import { Input } from "../components/ui/input"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import { SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const onGenerateTrip=()=>{
    if (formData?.numberOfDays>10||!formData?.numberOfDays||!formData?.location||!formData?.budget||!formData?.people) {
      toast("Por favor completa todos los campos.")
      return;  
    }
  }

  return (
    <div className="text-left">
      <h2 className="font-bold text-3xl">👋🏼 Cuentanos sobre tus preferencias de viaje!</h2>
      <p className="mt-3 text-gray-500 text-xl">Simplemente proporcione alguna información básica y nuestro planificador de viaje generará un itinerario personalizado según sus preferencias.</p>
      <div className="flex flex-col gap-12">
        <div className="mt-5">
          <h2 className="text-xl my-3 font-medium">🗺️ Cual es su destino?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (value) => { setPlace(value); handleInputChange('location', value) }
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">📅 Cuantos días estas pensando viajar?</h2>
          <Input type="number" placeholder={"Introduce los días de estadía. Por ejemplo: 3"} min="1" step="1"
            onChange={(event)=>handleInputChange('numberOfDays', event.target.value)} />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">Cual es tu presupuesto?</h2>
          <div className="grid grid-cols-3 gap-5 mt-3 cursor-pointer">
            {SelectBudgetOptions.map((item, index) => (
              <div key={index} 
                className={`p-4 border rounded-lg hover:shadow-2xl 
                  ${formData?.budget==item.title&&'shadow-lg border-black'}
                  `}
                onClick={()=>handleInputChange('budget', item.title)}
              >
                <h2 className="text-3xl">{item.icon}</h2>
                <h2 className="font-semibold text-xl">{item.title}</h2>
                <h2 className="font-light text-lg">{item.description}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">Con quien planeas viajar en tu próxima aventura?</h2>
          <div className="grid grid-cols-3 gap-5 mt-3 cursor-pointer">
            {SelectTravelList.map((item, index) => (
              <div key={index} className={`p-4 border rounded-lg hover:shadow-2xl 
                ${formData?.people==item.people&&'shadow-lg border-black'}
                `}
                onClick={()=>handleInputChange('people', item.people)}>
                <h2 className="text-3xl">{item.icon}</h2>
                <h2 className="font-semibold text-xl">{item.title}</h2>
                <h2 className="font-light text-lg">{item.description}</h2>
              </div>
            ))}
          </div>
        </div>


      </div>
      <div className="my-10 text-center">
        <Button onClick={onGenerateTrip} >Crea el viaje de tus sueños!</Button>
      </div>
    </div>
  )
}

export default CreateTrip