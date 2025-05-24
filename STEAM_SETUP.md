# Configuración de Steam API

Esta sección muestra cómo integrar la API de Steam en tu portafolio para mostrar información de tu perfil y actividad gaming.

## 📋 Requisitos Previos

1. **Steam API Key**: Necesitas obtener una clave API de Steam
2. **Steam ID**: Tu identificador único de Steam
3. **Perfil Público**: Tu perfil de Steam debe estar configurado como público

## 🔑 Obtener Steam API Key

1. Ve a [Steam Web API Key](https://steamcommunity.com/dev/apikey)
2. Inicia sesión con tu cuenta de Steam
3. Ingresa el dominio de tu sitio web (ej: `miguelvivar.github.io`)
4. Copia la API Key generada

## 🆔 Obtener tu Steam ID

### Método 1: Steam ID Finder
1. Ve a [SteamID Finder](https://steamidfinder.com/)
2. Ingresa tu URL de perfil de Steam o nombre de usuario
3. Copia el "steamID64" (es un número largo como `76561198000000000`)

### Método 2: Manualmente desde tu perfil
1. Ve a tu perfil de Steam
2. Si tu URL es personalizada: `steamcommunity.com/id/tunombre`
3. Si tu URL es numérica: `steamcommunity.com/profiles/76561198000000000`
4. En el segundo caso, el número después de `/profiles/` es tu Steam ID

## ⚙️ Configuración

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Steam API Configuration
STEAM_API_KEY=tu_steam_api_key_aqui
STEAM_ID=tu_steam_id_aqui
```

### 2. Configurar Privacidad del Perfil

Tu perfil de Steam debe estar configurado como público para que la API funcione:

1. Ve a tu perfil de Steam
2. Clic en "Editar Perfil"
3. Ve a "Configuración de Privacidad"
4. Configura:
   - **Mi perfil**: Público
   - **Lista de juegos**: Público
   - **Inventario**: Público (opcional)

## 🎮 Funcionalidades Implementadas

La sección de Steam muestra:

- **Información del perfil**: Avatar, nombre, estado online/offline
- **Estadísticas generales**: Total de juegos, tiempo jugado, años en Steam
- **Juegos favoritos**: Los 6 juegos con más horas jugadas
- **Actividad reciente**: Últimos 5 juegos jugados

## 📁 Archivos Creados

```
src/
├── lib/
│   └── steamApi.ts          # Funciones para la API de Steam
├── ui/sobremi/
│   └── SteamSection.tsx     # Componente de la sección Steam
└── app/api/steam/
    └── route.ts             # Endpoint API para Steam
```

## 🔧 Estructura de la API

### Endpoints Disponibles

- `/api/steam?endpoint=profile` - Información del perfil
- `/api/steam?endpoint=games` - Lista completa de juegos
- `/api/steam?endpoint=recent` - Juegos jugados recientemente

### Cache

- **Perfil y juegos**: 1 hora de cache
- **Juegos recientes**: 30 minutos de cache

## 🚨 Problemas Comunes

### Error: "Steam API key no configurada"
- Verifica que `STEAM_API_KEY` esté en tu archivo `.env.local`
- Reinicia el servidor de desarrollo después de agregar variables de entorno

### Error: "No se pudieron cargar los datos"
- Verifica que tu Steam ID sea correcto
- Asegúrate de que tu perfil esté público
- Verifica que la API key sea válida

### Los juegos no se muestran
- Confirma que tu lista de juegos esté configurada como pública
- Algunos juegos gratuitos pueden no aparecer si no se han jugado

## 🎨 Personalización

Puedes personalizar la sección editando `SteamSection.tsx`:

- Cambiar el número de juegos mostrados
- Modificar los colores y estilos
- Agregar más estadísticas
- Cambiar el layout de las tarjetas

## 📱 Responsive Design

La sección está completamente optimizada para:
- 📱 Móviles
- 📱 Tablets
- 💻 Desktop

## 🔒 Seguridad

- La API key se mantiene en el servidor (no se expone al cliente)
- Las peticiones se hacen a través de tu API interna
- Se implementa cache para reducir llamadas a la API de Steam

## 🌐 Deploy

Cuando hagas deploy, asegúrate de:

1. Configurar las variables de entorno en tu plataforma de hosting
2. Verificar que el dominio esté autorizado en tu Steam API key
3. Probar que la funcionalidad funcione en producción

---

¡Y eso es todo! Ahora tendrás una sección de Steam completamente funcional en tu portafolio. 🎮
