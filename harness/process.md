# Proceso de diseño

## Empezar y retomar

1. Leer brief, estado y decisiones relevantes. Aprovechar la información que ya dio el usuario.
2. Identificar la próxima decisión o entregable necesario. Preguntar solo por información que cambie el resultado; registrar supuestos reversibles.
3. Elegir la skill adecuada y trabajar sobre los documentos existentes. No crear todos los artefactos por anticipado.
4. Al cerrar una iteración, registrar resultado, evidencia, decisiones pendientes y siguiente acción en `project/status.md`.

Una petición acotada puede entrar directamente en diseño, implementación o revisión. Mantener la trazabilidad sin imponer un recorrido completo a cada cambio.

## Etapas y salidas

| Etapa | Entrada | Salida | Condición para avanzar |
| --- | --- | --- | --- |
| Brief | Idea y materiales disponibles | `project/brief.md` | Problema, usuario, flujo principal, alcance y éxito definidos; supuestos visibles |
| Investigación, condicional | Incertidumbres sobre contexto o usuarios | `project/research.md` | Evidencia suficiente para la decisión, o incertidumbre explícita con su impacto |
| Benchmarking, condicional | Pregunta que una comparación puede resolver | `project/benchmark.md` | Referentes observados, comparación y consecuencias para el diseño |
| Dirección | Brief y evidencia disponible | `project/direction.md` | Flujo, contenido, lenguaje visual y criterio elegido revisados con el usuario |
| Prototipo | Dirección propuesta o elegida | Prototipo navegable y notas en `direction.md` | El flujo principal se puede recorrer; se reconocen supuestos y límites |
| Frontend | Dirección vigente y feedback | Código en `src/` | Alcance acordado implementado, con estados y comportamiento responsive |
| Revisión y entrega | Frontend y criterios del brief | `project/review.md`, `project/handoff.md` | Criterios contrastados con evidencia; pendientes y limitaciones explícitos |

El prototipo puede estar en código o en una herramienta visual disponible. Puede evolucionar al frontend final sin duplicarlo. Si una herramienta no está disponible, usar una alternativa que permita evaluar la misma decisión y registrar la limitación.

## Decidir investigación y benchmarking

Investigación pregunta por usuarios, contexto y necesidades. Benchmarking compara soluciones observables. Pueden alimentar la misma decisión y reutilizar fuentes, pero no se sustituyen: el comportamiento de un competidor no demuestra una necesidad de nuestros usuarios.

Para cada una registrar en `status.md`: `pendiente de decidir`, `aplica` u `omitida`, con pregunta o motivo.

Activar benchmarking cuando una comparación pueda cambiar una decisión relevante: un flujo poco conocido, convenciones del sector, una interacción compleja, referentes contradictorios o una oportunidad de diferenciación. Omitirlo si la solución ya está suficientemente definida y la comparación no aporta a la decisión actual. Si el usuario lo solicita, realizarlo dentro del alcance que indicó.

Acotar primero la pregunta, luego elegir referentes. Si faltan acceso o fuentes, registrar lo que no se pudo observar y pedir el material necesario solo si bloquea la decisión. No inventar entrevistas, métricas ni recorridos.

## Revisión humana y autonomía

Revisar con el usuario el alcance, las alternativas que cambien la experiencia principal y la dirección visual. Una instrucción previa o una referencia explícitamente aprobada puede resolver esa revisión. Guardar fecha y evidencia de la decisión; no atribuir aprobación a un supuesto.

Implementar detalles rutinarios y correcciones dentro del alcance autorizado. Si falta una elección importante, avanzar en trabajo independiente o en una exploración identificada como tal y dejar pendiente la decisión que afecta la implementación final.

## Cambios y estado

Estados de etapa: `pendiente`, `en curso`, `por revisar`, `completa`, `omitida`, `bloqueada`. Usar `omitida` con motivo. Una etapa bloqueada registra el dato o acceso faltante y el trabajo que puede continuar.

Si cambia el brief o una decisión, marcar los entregables afectados como `por revisar`, por ejemplo dirección, prototipo y frontend. No borrar decisiones anteriores: reemplazarlas mediante una entrada nueva que explique qué cambió. Volver a verificar el flujo afectado.

Cerrar una entrega solo con evidencia. Si hay limitaciones, el estado es entrega parcial o pendiente de revisión, y el handoff las detalla. El historial permite reanudar sin depender de la conversación anterior.
