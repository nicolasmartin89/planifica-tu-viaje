import { useEffect, useState } from "react"
import { Input } from "../components/ui/input"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { chatSession } from "@/services/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const navigate = useNavigate();

  useEffect(() => {
    console.log(formData);
  }, [formData])


  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const getUserProfile = async (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `${tokenInfo?.token_type}`,
        Accept: 'application/json'
      }
    }).then((resp) => {
      console.log(resp)
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    })
  }

  const saveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    console.log({
      userSelection: formData,
      tripData: TripData,
      userEmail: user?.email,
      id: docId
    });
    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
    navigate('/ver-viaje/'+docId)
  }

  const onGenerateTrip = async () => {

    const user = localStorage.getItem("user")

    if (!user) {
      setOpenDialog(true);
      return;
    }

    // Verifica si todos los campos están completos
    if (!formData?.location?.label ||
      !formData?.numberOfDays ||
      formData?.numberOfDays > 5 ||
      !formData?.budget ||
      !formData?.people) {

      toast("Por favor completa todos los campos");
      console.log("ESTO ESTA ANDANDO ACA ABAJO VA EL FORMDATA");
      console.log(formData);
    } else {
      // Si todas las validaciones pasan, modifica FINAL_PROMPT
      setLoading(true);
      let FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formData.location.label)
        .replace('{numberOfDays}', formData.numberOfDays)
        .replace('{budget}', formData.budget)
        .replace('{people}', formData.people);


      const result = await chatSession.sendMessage(FINAL_PROMPT)
      console.log("---", result?.response?.text())
      setLoading(false);
      saveAiTrip(result?.response?.text())
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
          <Input type="number" placeholder={"Introduce los días de estadía. Mínimo 1 - Máximo 5"} min="1" max="5" step="1"
            onChange={(event) => handleInputChange('numberOfDays', event.target.value)} />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">Cual es tu presupuesto?</h2>
          <div className="grid grid-cols-3 gap-5 mt-3 cursor-pointer">
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                className={`p-4 border rounded-lg hover:shadow-2xl 
                  ${formData?.budget == item.title && 'shadow-lg border-black'}
                  `}
                onClick={() => handleInputChange('budget', item.title)}
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
                ${formData?.people == item.people && 'shadow-lg border-black'}
                `}
                onClick={() => handleInputChange('people', item.people)}>
                <h2 className="text-3xl">{item.icon}</h2>
                <h2 className="font-semibold text-xl">{item.title}</h2>
                <h2 className="font-light text-lg">{item.description}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 text-center">
        <Button
          disabled={loading}
          onClick={onGenerateTrip}>
          {loading ?
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : "Crea el viaje de tus sueños!"
          }
        </Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-5">Inicia sesión con Google.</h2>
              <p>Inicia sesión de modo seguro con la App de Google Auth.</p>
              <Button
                className="w-full mt-4 flex gap-4 items-center text-base"
                onClick={login}>
                <FcGoogle className="h-7 w-7" />
                Inicia sesión con Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateTrip