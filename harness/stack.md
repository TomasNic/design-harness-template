# Stack y extensiones

## Base

- React y TypeScript para componentes y contratos.
- Vite para desarrollo y build de un frontend independiente.
- Node.js 24 y npm; `package-lock.json` versiona la instalación reproducible.
- CSS con variables para tokens y estilos por componente cuando sean útiles. Los estilos iniciales son una demostración reemplazable, no una identidad de marca.
- Datos de ejemplo detrás de funciones de servicio. La interfaz consume contratos, no importa fixtures directamente.
- ESLint, TypeScript y pruebas de las herramientas del harness como controles iniciales.

Las versiones compatibles se fijan en `package.json` y el lockfile. Actualizarlas como un cambio explícito, revisando compatibilidad y ejecutando `npm run check`. No actualizar dependencias por rutina al iniciar cada proyecto.

## Incorporar una tecnología

Una extensión debe resolver un requisito concreto. Registrar en `project/decisions.md`:

1. Requisito y límite de la solución actual.
2. Tecnología elegida, alternativa considerada y razón.
3. Impacto en mantenimiento, peso, accesibilidad, compatibilidad y licencia cuando corresponda.
4. Área que la utiliza y forma de verificar el resultado.

Consultar documentación oficial vigente para APIs y compatibilidad. Instalar, actualizar lockfile y comprobar el comportamiento que motivó el cambio. Las elecciones son locales al proyecto; no alteran automáticamente el stack del template.

Ejemplos: animaciones coordinadas o gestos pueden justificar una librería de motion; varias rutas con navegación real pueden justificar un router; un editor o gráficos complejos pueden requerir herramientas especializadas. Elegir por requisitos, sin un catálogo obligatorio.

Si el proyecto necesita renderizado de servidor, servicios propios o una arquitectura diferente, registrar la ampliación del alcance y revisar la base con el usuario antes de introducir esa dependencia estructural.

## Integración futura

Reemplazar los servicios simulados por adaptadores reales manteniendo los contratos cuando sea posible. Documentar entradas, salidas, errores, persistencia y acciones simuladas en el handoff. Las variables `VITE_*` se exponen al navegador: nunca contienen secretos. Si aparecen configuraciones, proveer un `.env.example` sin credenciales.

El starter no persiste cambios ni implementa autenticación. Cualquier experiencia que los requiera debe distinguir claramente simulación y comportamiento integrado.
