---
name: harness-benchmark
description: "Comparar productos, interfaces o patrones observables para resolver una pregunta de diseño. Usar cuando el usuario solicite benchmarking o una comparación pueda cambiar una decisión relevante del proyecto."
---

# Benchmarking

Leer el brief y las decisiones relacionadas. Consultar la regla condicional en [process.md](../../../harness/process.md). Crear `project/benchmark.md` con `npm run artifact -- benchmark` cuando aplique; usar la [plantilla](../../../harness/templates/benchmark.md).

## Procedimiento

1. Formular una pregunta: qué decisión queremos tomar y qué necesitamos observar para hacerlo. Si no hay una pregunta útil y no fue solicitado, registrar el motivo de omisión en `project/status.md`.
2. Elegir un conjunto acotado de referentes relevantes. Incluir competidores o productos de otro sector que resuelvan el mismo problema; justificar la selección.
3. Definir dimensiones comparables, por ejemplo pasos del flujo, jerarquía, recuperación de errores, comportamiento móvil o coordinación del movimiento. No puntuar dimensiones que no se puedan observar.
4. Inspeccionar lo accesible con herramientas disponibles. Registrar URL o archivo, fecha, dispositivo/contexto y método: navegación real, captura, documentación o video. Conservar capturas únicamente cuando su uso y acceso sean adecuados.
5. Completar la comparación con evidencia por afirmación. Usar `no observado` cuando falte acceso; una captura no demuestra interacción, accesibilidad o rendimiento.
6. Separar observaciones de interpretaciones y proponer qué adoptar, adaptar o evitar, indicando por qué sirve a nuestros usuarios y restricciones. No copiar la identidad o los textos de un referente como resultado propio.
7. Conectar las conclusiones con decisiones del proyecto, o explicar por qué no hay una recomendación concluyente. Actualizar estado y preguntas abiertas.

## Entrega

Pregunta, criterios, referentes y fuentes, comparación, límites y consecuencias para el diseño. Si el acceso es insuficiente, entregar lo observado y señalar la decisión pendiente. No fabricar una comparación para completar la etapa.
