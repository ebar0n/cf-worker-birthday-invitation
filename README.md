# Invitación de Cumpleaños

Esta es una aplicación web para gestionar invitaciones de cumpleaños, construida con Next.js y desplegada en Cloudflare Workers.

## Características

- Fondo de video/imagen personalizable
- Sistema de invitaciones basado en tokens
- Formulario de confirmación de asistencia
- Registro de número de adultos y placa de vehículo
- Interfaz responsive y moderna

## Configuración

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   nvm use
   yarn install
   make env
   ```
3. Agrega tus archivos de medios:
   - Coloca tu video de fondo en `public/background.mp4`
   - Coloca tu imagen de fondo en `public/background.jpg`

4. Configura las variables de entorno:
   ```bash
   cp .dev.vars.example .dev.vars
   ```
   Edita `.dev.vars` con tus configuraciones.

## Desarrollo

Para ejecutar la aplicación en modo desarrollo:

```bash
yarn dev

yarn preview
```

## Despliegue

La aplicación está configurada para desplegar en Cloudflare Workers. Para desplegar:

```bash
yarn deploy
```

## Uso

1. Genera tokens únicos para cada invitado
2. Comparte la URL de la invitación con el token: `https://tu-dominio.com?token=TOKEN_UNICO`
3. Los invitados pueden confirmar su asistencia y proporcionar información adicional

## Personalización

- Edita `src/app/page.tsx` para modificar el contenido de la invitación
- Modifica los estilos en `src/app/globals.css`
- Actualiza los componentes en `src/app/components/`

## Base de Datos

Actualmente la aplicación usa una base de datos en memoria para demostración. Para producción, deberías:

1. Configurar una base de datos real (por ejemplo, Cloudflare D1)
2. Actualizar los endpoints en `src/app/api/` para usar la base de datos
3. Implementar un sistema de autenticación seguro para los tokens

## Base de datos en Cloudflare D1

La aplicación utiliza Cloudflare D1 como base de datos SQL serverless. Para configurar y gestionar la base de datos:

1. Crea una base de datos D1 en tu cuenta de Cloudflare:
   ```bash
   npx wrangler d1 create birthday-invitations
   ```

2. Actualiza tu archivo `wrangler.toml` con la información de la base de datos.

3. Inicializa el esquema de la base de datos:
   ```bash
   npx wrangler d1 execute birthday-invitations --file=./schema.sql
   ```

4. Para consultar datos localmente durante el desarrollo:
   ```bash
   npx wrangler d1 execute birthday-invitations --local --command="SELECT * FROM invitation"
   ```

La aplicación interactúa con D1 a través de los endpoints API en `src/app/api/guests/`.

## Licencia

MIT
