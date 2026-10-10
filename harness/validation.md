# Validación del template 0.1.0

Fecha: 2026-10-10. Este informe corresponde al mantenimiento del template; no completa las etapas de un proyecto de producto.

## Entorno y controles

- Node.js 24.19.0, npm 10.9.0 y macOS.
- `npm run check`: lint, integridad de documentos y metadata, ocho pruebas de herramientas, TypeScript y build de producción correctos.
- Las seis skills pasaron el validador de Skill Creator y fueron descubiertas por el entorno de Codex.
- Copia temporal sin `node_modules`, build ni metadata de Git: `npm ci`, inicialización por CLI, creación de benchmark y dirección, y `npm run check` correctos. El nombre apareció en el HTML compilado y el brief original se conservó.

## Herramientas del harness

Las ocho pruebas cubren personalización y sincronización de nombres, preservación del brief y resoluciones del lockfile, rechazo de una segunda inicialización, identidad inválida, personalización manual incompatible, documentos existentes, rutas no permitidas, directorios de proyecto enlazados simbólicamente e integridad de referencias.

También comprueban que se pueden crear los documentos de diseño y entrega sin un benchmark, y agregar un benchmark posteriormente sin reiniciar el contexto. Estas pruebas verifican mecanismos; no simulan las decisiones de un agente autónomo.

## Navegador

Revisión en Chrome 155.0.8059.39, automatizada mediante Playwright, con inspección visual de capturas de escritorio y móvil.

- Anchuras: 320, 390, 768 y 1440 píxeles; sin desbordamiento horizontal.
- Estados: carga, contenido, vacío y error; recuperación, recarga y cancelación de una solicitud reemplazada.
- Teclado: enlace de salto, navegación hacia la sección inicial y cambio de escenario.
- Preferencia de movimiento reducido: indicador sin animación.
- Sin errores de ejecución ni errores de recursos en la consola al finalizar las correcciones.
- Axe, reglas etiquetadas WCAG 2 A/AA, 2.1 AA y 2.2 AA: cero violaciones detectadas en las cuatro anchuras con datos y en las vistas vacía y de error de escritorio.

Se corrigió el contraste del texto de versión y se agregó el favicon faltante. El resultado automatizado no equivale a una auditoría completa de accesibilidad; no se realizó una revisión con lector de pantalla ni una matriz de navegadores adicional.

## Alcance pendiente fuera de estos controles

- Ejecutar los escenarios con un agente en proyectos reales para evaluar calidad de investigación, criterio de benchmarking y continuidad entre conversaciones. Los ejercicios están en [scenarios.md](examples/scenarios.md).
- Publicar el repositorio en GitHub y activar la opción de template. El workflow está preparado, pero no se ha ejecutado en GitHub Actions.
- Elegir una licencia de distribución si se va a compartir el código propio bajo una licencia explícita.

La metadata y el estado de `project/` permanecen sin inicializar, listos para una nueva copia. Los scripts y capturas locales de esta revisión no forman parte del template versionable.
