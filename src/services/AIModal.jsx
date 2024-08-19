import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Generar un plan de viaje para la ubicación: Buenos aires, por 2 días para 2 personas con un presupuesto economico, deme una lista de opciones de hoteles con el nombre del hotel, la dirección del hotel, la URL de la imagen del hotel, las coordenadas geográficas, la calificación, la descripción y sugerir un itinerario con el nombre del lugar, los detalles del lugar, la URL de la imagen del lugar, las coordenadas geográficas, el precio de los boletos, el tiempo para viajar a cada una de las ubicaciones durante esos días con un plan diario con el mejor momento para visitar en formato Json"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\"hotels\": [{\"name\": \"Hotel Bauen\", \"address\": \"Av. Callao 360, 1022 Buenos Aires\", \"image\": \"https://www.booking.com/hotel/ar/bauen.es.html\", \"coordinates\": \"-34.5955, -58.3848\", \"rating\": 8.2, \"description\": \"Hotel histórico con habitaciones sencillas pero cómodas, ubicado en el centro de Buenos Aires, cerca de atracciones como el Obelisco y el Teatro Colón.\"}, {\"name\": \"Hotel Emperador\", \"address\": \"Av. Corrientes 1368, 1043 Buenos Aires\", \"image\": \"https://www.booking.com/hotel/ar/emperador.es.html\", \"coordinates\": \"-34.5978, -58.3857\", \"rating\": 8.0, \"description\": \"Hotel clásico con habitaciones limpias y funcionales, ideal para quienes buscan una ubicación céntrica a un precio accesible.\"}, {\"name\": \"Hotel Rochester\", \"address\": \"Av. Córdoba 1835, 1055 Buenos Aires\", \"image\": \"https://www.booking.com/hotel/ar/rochester.es.html\", \"coordinates\": \"-34.5859, -58.3804\", \"rating\": 8.3, \"description\": \"Hotel moderno con habitaciones cómodas y un excelente desayuno incluido, ubicado cerca de la Avenida Corrientes, con fácil acceso al transporte público.\"}], \"itinerary\": [{\"day\": 1, \"schedule\": [{\"time\": \"10:00 AM\", \"location\": \"Plaza de Mayo\", \"details\": \"Centro histórico de Buenos Aires, con la Casa Rosada y la Catedral Metropolitana.\", \"image\": \"https://www.google.com/search?q=plaza+de+mayo+buenos+aires&tbm=isch&ved=2ahUKEwjn3p6D6ML9AhWkHDQIHU1RCn4Q2-cCegQIABAA&oq=plaza+de+mayo+buenos+aires&gs_lcp=CgNpbWcQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6BwgjELADECc6BAgAEB46BAgAEB46BAgAEB46BAgAEB46BAgAEB46BAgAEB46BAgAEB46BAgAEB46BAgAEB46BAgAEB46BAgAEB46BQgBEAE6BAgAEApKBAhBGABQ-A4YvQ5g7wloAHAAeACAAYgBiAHdApIBATGYAQCgAQGqAQtnd3Mtd2l6dAMoCAAQhwE6BQguEIAEOgcILhCABBCxAxCDAToLCCMQrwEYAToOCC4Q6oECCMQJzoFCAAQgAQ6CwguEIAEELADOgQILhCABBCxAxCDAToLCCMQrwEYAToOCC4Q6oECCMQJzoFCAAQgAQ6CwguEIAEELADOgQILhCABBCxAxCDAToLCCMQrwEYAToOCC4Q6oECCMQJzoFCAAQgAQ6CwguEIAEELADOgQILhCABBCxAxCDAToLCCMQrwEYAToOCC4Q6oECCMQJzoFCAAQgAQ6CwguEIAEELADOgQILhCABBCxAxCDAToLCCMQrwEYAToOCC4Q6oECCMQJzoFCCEQoAE6CwguEIAEELADOgQILhCABBCxAxCDAToLCCMQrwEYAToOCC4Q6oECCMQJzoFCAAQgAQ6CwguEIAEELADOg\n\n\n```"},
      ],
    },
  ],
});

