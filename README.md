![header](doc/LogoHeader.png)

# DETECTOR DE EJES CALIENTES PARA MATERIAL RODANTE - MIoT - FIUBA

---

Autor: FS - 2021

## TABLA DE CONTENIDO

---

1. [Introduccion General](#Introduccion)
2. [Arquitectura del HBD](#Arquitectura)
3. [Organización del proyecto](#Organizacion)
4. [Licencia](#Licencia)
5. [Agradecimientos](#Agradecimientos)

### Organización del proyecto

El proyecto se encuentra conformado por la siguiente estructura de directorios y archivos (los más relevantes a la aplicación):

```bash
   ├── nodo-central                        # Directorio raíz de la aplicación del servidor web
   │   ├── back-end                        # Directorio para el backend de la aplicación del servidor web
   │   │   ├── PostgreSql                  # Directorio para los archivos de la base de datos
   │   │   │   ├── db                      # Directorio para configuración y datos de la base de datos
   │   │   │        ├── data               # Estructura y datos de la BD.
   │   │   │        └── dumps              # Directorio de estructuras de la BD
   │   │   │
   │   │   ├── mqtt-broker                 # Directorio para el servicio MQTT
   │   │   │   ├── broker                  # Directorio para los archivos del broker MQTT
   │   │   │   └── index.js                # Código base del servidor de Express
   │   │   └──docker-compose.yml           # Archivo YAML de Docker
   │   │
   │   └── front-end                       # Directorio para el frontend de la aplicación del servidor web
   ├── esp32                               # Directorio raíz del módulo de medición de temperaturas
   ├── esp32-cam                           # Directorio raíz de módulo con cámara fotográfica
   ├── README.md                           # Archivo actual
   └── doc                                 # Documentación general del proyecto

```

## LICENCIA

Este proyecto se encuentra publicado bajo la licencia MIT. En [este enlace](https://opensource.org/licenses/MIT) podrá encontrar más información sobre la misma.
![footer](doc/LogoFooter.png)
