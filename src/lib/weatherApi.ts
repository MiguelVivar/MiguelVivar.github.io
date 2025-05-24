// weatherApi.ts - API para obtener datos climáticos en tiempo real
// Utiliza OpenWeatherMap API (https://openweathermap.org/api)

export interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  name: string;
  sys: {
    country: string;
  };
}

// Función para obtener el emoji adecuado según el clima
export function getWeatherEmoji(weatherCode: string): string {
  const weatherMap: Record<string, string> = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Smoke': '🌫️',
    'Haze': '🌫️',
    'Dust': '🌫️',
    'Fog': '🌫️',
    'Sand': '🌫️',
    'Ash': '🌫️',
    'Squall': '🌬️',
    'Tornado': '🌪️'
  };
  
  return weatherMap[weatherCode] || '🌡️';
}

// Función para convertir temperatura de Kelvin a Celsius
export function kelvinToCelsius(kelvin: number): number {
  return Math.round(kelvin - 273.15);
}

// Función para obtener datos del clima para Ica, Perú
export async function getWeatherForIca(): Promise<WeatherData | { error: string }> {
  // Ciudad fija: Ica, Perú
  const city = 'Ica,pe';
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY; 
  
  if (!apiKey) {
    return { 
      error: 'API key no configurada. Verifica tu archivo .env'
    };
  }
  
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=es`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      if (response.status === 401) {
        return { 
          error: 'API key inválida. Necesitas obtener una nueva clave en https://openweathermap.org/api'
        };
      }
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data: WeatherData = await response.json();
    return data;
  } catch (error) {
    console.error('Error obteniendo datos del clima:', error);
    return { 
      error: 'No se pudo conectar con la API. Verifica tu conexión a internet.'
    };
  }
}
