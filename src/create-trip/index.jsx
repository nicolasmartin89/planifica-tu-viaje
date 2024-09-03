import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/services/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog";
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
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const getUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `${tokenInfo?.token_type}`,
          Accept: 'application/json'
        }
      });
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener el perfil de usuario.");
    }
  };

  const saveAiTrip = async (TripData) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const docId = Date.now().toString();
      await setDoc(doc(db, "AiTrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId
      });
      navigate('/ver-viaje/' + docId);
    } catch (error) {
      console.error("Error guardando el viaje:", error);
      toast.error("No se pudo guardar el viaje.");
    } finally {
      setLoading(false);
    }
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.location?.label || !formData?.numberOfDays || formData?.numberOfDays > 5 || !formData?.budget || !formData?.people) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    try {
      setLoading(true);
      let FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formData.location.label)
        .replace('{numberOfDays}', formData.numberOfDays)
        .replace('{budget}', formData.budget)
        .replace('{people}', formData.people);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("---", result?.response?.text());
      saveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("Error generando el viaje:", error);
      toast.error("No se pudo generar el viaje.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-10 bg-gray-100 text-left">
      <h2 className="font-bold text-3xl text-gray-800">👋🏼 Cuentanos sobre tus preferencias de viaje!</h2>
      <p className="mt-3 text-gray-600 text-lg">Simplemente proporcione alguna información básica y nuestro planificador de viaje generará un itinerario personalizado según sus preferencias.</p>
      <div className="flex flex-col gap-8 mt-8">
        <div>
          <h2 className="text-lg my-2 font-medium text-gray-700">🗺️ ¿Cuál es su destino?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (value) => { setPlace(value); handleInputChange('location', value); },
              styles: {
                control: (provided) => ({ ...provided, borderColor: '#ffa500' }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? '#ffa500' : '#fff',
                  color: state.isSelected ? '#fff' : '#000',
                }),
              }
            }}
          />
        </div>
        <div>
          <h2 className="text-lg my-2 font-medium text-gray-700">📅 ¿Cuántos días estás pensando viajar?</h2>
          <Input
            type="number"
            placeholder="Introduce los días de estadía. Mínimo 1 - Máximo 5"
            min="1"
            max="5"
            step="1"
            onChange={(event) => handleInputChange('numberOfDays', event.target.value)}
            className="border-gray-300 focus:border-orange-500"
          />
        </div>
        <div>
          <h2 className="text-lg my-2 font-medium text-gray-700">¿Cuál es tu presupuesto?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-3 cursor-pointer">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg 
                  ${formData?.budget === item.title ? 'bg-orange-100 border-orange-500' : 'bg-white border-gray-300'}
                `}
                onClick={() => handleInputChange('budget', item.title)}
              >
                <h2 className="text-3xl text-orange-500">{item.icon}</h2>
                <h2 className="font-semibold text-xl text-gray-800">{item.title}</h2>
                <h2 className="font-light text-lg text-gray-600">{item.description}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg my-2 font-medium text-gray-700">¿Con quién planeas viajar en tu próxima aventura?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-3 cursor-pointer">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg 
                  ${formData?.people === item.people ? 'bg-orange-100 border-orange-500' : 'bg-white border-gray-300'}
                `}
                onClick={() => handleInputChange('people', item.people)}
              >
                <h2 className="text-3xl text-orange-500">{item.icon}</h2>
                <h2 className="font-semibold text-xl text-gray-800">{item.title}</h2>
                <h2 className="font-light text-lg text-gray-600">{item.description}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 text-center">
        <Button
          disabled={loading}
          onClick={onGenerateTrip}
          className="bg-orange-500 text-white hover:bg-orange-600 focus:ring-4 focus:ring-orange-200"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "¡Crea el viaje de tus sueños!"
          )}
        </Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.png" className="h-12 mx-auto" />
              <h2 className="text-xl font-semibold text-center text-gray-800">Iniciar sesión</h2>
              <p className="mt-2 text-center text-gray-600">
                Por favor, inicie sesión con Google para continuar y generar tu viaje soñado.
              </p>
              <Button
                className="mt-4 flex items-center justify-center bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
                onClick={() => login()}
              >
                <FcGoogle className="mr-2" /> Iniciar sesión con Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
