---
name: harness-review
description: "Revisar una entrega frontend contra el brief y la dirección vigente, corregir problemas dentro del alcance y documentar la integración. Usar al cerrar una iteración o cuando se solicite revisión de la experiencia."
---

# Revisión y handoff

Leer brief, dirección y decisiones vigentes. Usar [quality.md](../../../harness/quality.md) para seleccionar verificaciones relevantes. Crear los documentos con `npm run artifact -- review` y, para una entrega, `npm run artifact -- handoff`; ver [review](../../../harness/templates/review.md) y [handoff](../../../harness/templates/handoff.md).

## Procedimiento

1. Mapear criterios de éxito a evidencia observable. Ejecutar `npm run check` para una entrega completa; en revisiones acotadas, seleccionar controles que cubran el cambio.
2. Recorrer los flujos acordados en navegador, a anchuras de móvil, intermedia y escritorio. Revisar teclado, foco, estados asíncronos, errores, contenido largo y movimiento reducido cuando aplique. Consultar consola y comparar con la dirección vigente.
3. Clasificar hallazgos por impacto: bloquea el flujo principal, afecta uso o accesibilidad, o es un ajuste menor. Incluir pasos para reproducir, evidencia y resultado esperado.
4. Corregir dentro del alcance autorizado; volver a comprobar lo afectado. Si el usuario solicitó solo un informe, conservar ese alcance.
5. Registrar qué se comprobó, cómo, con qué resultado y qué quedó pendiente. Un análisis estático, un chequeo automático o una captura aislada no equivalen a una auditoría completa de accesibilidad.
6. Preparar handoff con ejecución, alcance, simulaciones, contratos, dependencias, configuración, decisiones y limitaciones. Referenciar código real y comandos existentes.
7. Actualizar estado: entrega completa, parcial o pendiente de revisión. No cerrar como completa si un bloqueo del flujo principal o un criterio esencial sigue pendiente.

## Entrega

Informe con evidencia y pendientes, más guía de integración cuando corresponda. Publicar, desplegar o enviar el resultado a terceros requiere que esa acción esté dentro de la solicitud del usuario; generar el handoff no la implica.
