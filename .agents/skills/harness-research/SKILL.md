---
name: harness-research
description: "Investigar preguntas sobre usuarios, contexto o viabilidad que necesitan evidencia para una decisión de diseño. Usar cuando el brief identifique incertidumbres relevantes o el usuario pida investigación."
---

# Investigación

Leer el brief, la pregunta pendiente en `project/status.md` y los materiales relacionados. Crear `project/research.md` con `npm run artifact -- research` si aún no existe; la plantilla está en [research.md](../../../harness/templates/research.md).

## Procedimiento

1. Definir la pregunta y la decisión que podría cambiar. Ajustar la profundidad al riesgo y la evidencia existente.
2. Elegir fuentes adecuadas: materiales del usuario, entrevistas reales disponibles, datos autorizados o fuentes públicas. Priorizar documentación primaria para restricciones técnicas. Usar herramientas conectadas solo cuando estén disponibles y el acceso corresponda.
3. Registrar fuente, enlace o archivo, fecha de consulta, observación y limitaciones. Distinguir datos del usuario, declaraciones de terceros e interpretación propia.
4. Sintetizar hallazgos que cambien el diseño. Vincular cada conclusión con evidencia y registrar lo que permanece incierto.
5. Explicar implicaciones para el brief o la dirección. Actualizar decisiones y estado si el alcance cambia.

## Límites de evidencia

No inventar entrevistas, personas validadas, citas, métricas o resultados de uso. Las hipótesis de usuario sirven para explorar si están rotuladas como hipótesis. Si solo se pudo leer documentación, no afirmar que se probó el producto.

Si la información necesaria no está disponible, entregar una síntesis parcial y el impacto de esa carencia. Cuando la evidencia actual alcance para decidir, cerrar la investigación sin acumular fuentes por cantidad.

## Entrega

Pregunta, fuentes, hallazgos, incertidumbres y recomendaciones trazables. Una investigación puede concluir que todavía no hay evidencia suficiente; ese resultado debe quedar visible en el estado.
