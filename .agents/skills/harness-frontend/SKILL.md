---
name: harness-frontend
description: "Implementar o modificar la experiencia de producto en React, TypeScript y Vite siguiendo la dirección vigente, con estados funcionales y servicios simulados desacoplados."
---

# Implementación frontend

Leer brief, estado y dirección vigente. Para una corrección acotada, leer solo el contexto que pueda afectar el cambio. Consultar [stack.md](../../../harness/stack.md) y los criterios relevantes de [quality.md](../../../harness/quality.md).

## Procedimiento

1. Identificar el alcance acordado, el flujo afectado y las decisiones abiertas. Respetar el prototipo elegido; registrar divergencias necesarias. Si falta una decisión esencial, identificar el trabajo como exploración o resolver esa decisión antes de consolidarlo.
2. Implementar componentes y tokens acordes al proyecto. Reemplazar la demostración inicial cuando ya no sea útil; no arrastrar su contenido al producto.
3. Mantener fixtures separados de las vistas, con contratos y funciones de servicio. Implementar errores, carga, vacío y éxito donde corresponda, incluyendo respuesta a acciones repetidas y solicitudes obsoletas.
4. Implementar navegación, formularios, comportamiento responsive y accesibilidad como parte de la experiencia. Las simulaciones deben tener resultados consistentes y estar documentadas.
5. Agregar librerías cuando resuelvan un requisito concreto siguiendo la política del stack. Para motion complejo, definir comportamiento, alternativa con movimiento reducido y criterio de revisión antes de seleccionar la librería.
6. Ejecutar los controles pertinentes. Revisar en navegador los recorridos cambiados cuando esté disponible. Registrar lo que falta comprobar.
7. Actualizar estado y decisiones. Preparar contratos y límites para la revisión y el handoff.

## Entrega

Código ejecutable alineado con el alcance, estados funcionales y contratos de integración identificados. Un botón sin acción o un enlace que no lleva a ningún lugar no cuenta como interacción implementada.

La entrega permanece independiente del backend salvo ampliación explícita de alcance. No presentar persistencia local, datos de ejemplo o autenticación simulada como servicios reales.
