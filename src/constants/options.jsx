export const SelectTravelList = [
    {
        id: 1,
        title: "Solo yo",
        description: "Un único viajero",
        icon: "🛫",
        people: "1"
    },
    {
        id: 2,
        title: "Pareja",
        description: "Viaje en pareja",
        icon: "💑",
        people: "2"
    },
    {
        id: 3,
        title: "Familia",
        description: "Viaje en familia (2 a 5 personas)",
        icon: "👨‍👩‍👧‍👦",
        people: "2-5"
    },
    {
        id: 4,
        title: "Grupo de amigos",
        description: "Viaje en grupo de amigos (5 a 10 personas)",
        icon: "👥",
        people: "5-10"
    },
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: "Economico",
        description: "Gastar poco dinero",
        icon: "💲"
    },
    {
        id: 2,
        title: "Moderado",
        description: "Gasto moderado",
        icon: "💵"
    },
    {
        id: 3,
        title: "Costoso",
        description: "Viaje de lujo",
        icon: "💰"
    },
];

export let AI_PROMPT='Generar un plan de viaje para la ubicación: {location}, por {numberOfDays} días para {people} personas con un presupuesto {budget}, deme una lista de opciones de hoteles con el nombre del hotel, la dirección del hotel, la URL image hotel, las coordenadas geográficas, la calificación, la descripción y sugerir un itinerario diario con el nombre del lugar, los detalles del lugar, las coordenadas geográficas, el tiempo estimado para disfrutar el lugar, en formato Json'

//new prompt for use later
export const NEW_AI_PROMPT='Genera un plan de viaje para la ubicación: {location} Buenos Aires, por {numberOfDays} dias, para {people} personas, con un presupuesto de tipo {budget}. Considera las siguientes preferencias del viajero: fecha estimada da viaje: {monthOfTrip} tipo de viaje: {typeOfTrip}.Necesito los siguientes detalles: Alojamiento: Lista de hoteles sugeridos. Detalles de cada hotel: Nombre, Dirección, URL de la imagen, Coordenadas geográficas, Calificación en plataformas como Google y TripAdvisor, Descripción breve de las comodidades, Precio por noche aproximado durante(indicar si incluye impuestos), Disponibilidad  durante las fechas especificadas, Distancia desde el hotel a las principales atracciones de la ciudad.vItinerario: Sugerencias de actividades y lugares a visitar. Detalles de cada lugar: Nombre del lugar, Descripción detallada, URL de la imagen, Coordenadas geográficas, Precio de los boletos de entrada (si aplica), Horarios de apertura y cierre, Tiempo estimado de visita, Mejor momento del día para visitar, Distancia y tiempo estimado de traslado desde el alojamiento. Crear un plan diario para {numberOfDays}  días, organizando las actividades por día y por la hora óptima para cada actividad.Restaurantes y comidas: Sugerencias de restaurantes y lugares para comer. Detalles de cada restaurante: Nombre, Tipo de cocina, Dirección, URL de la imagen, Coordenadas geográficas, Calificación, Precio promedio por persona, Horarios de apertura y cierre.Transporte: Recomendaciones de transporte local. Detalles: Opciones de transporte (taxi, transporte público, alquiler de autos), Costo estimado por día o por viaje, Distancia y tiempo de viaje estimado entre cada punto del itinerario.Clima: Previsión meteorológica durante el mes de {monthOfTrio}.Otros detalles importantes: Información sobre la seguridad de la zona, Requisitos de visa y documentación, Consejos de viaje específicos para el {location}.Proporciona todos estos datos en formato JSON.'