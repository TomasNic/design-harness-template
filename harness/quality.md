# Criterios de entrega

Aplicar al alcance del brief. Marcar cada criterio como verificado, pendiente o no aplica, con razón y evidencia. Un build exitoso no prueba usabilidad, accesibilidad ni fidelidad visual.

## Experiencia

- El usuario puede completar los flujos acordados; controles y enlaces tienen un resultado real o una simulación declarada.
- Están definidos los estados relevantes: carga, vacío, error, éxito, validación y permisos, cuando correspondan.
- El contenido es comprensible y representativo. No se presentan cifras o testimonios de ejemplo como evidencia real.
- El comportamiento en móvil y escritorio preserva jerarquía, legibilidad y acciones principales. Revisar también una anchura intermedia y contenido largo.
- La implementación coincide con la dirección vigente o documenta sus diferencias.

## Accesibilidad y movimiento

Objetivo: WCAG 2.2 AA en el alcance implementado. La revisión parcial no autoriza a declarar conformidad completa.

- Estructura semántica, nombres accesibles, etiquetas, errores comprensibles y alternativas textuales.
- Navegación por teclado y foco visible; orden coherente y sin trampas de foco.
- Contraste adecuado, zoom y reflow; la información no depende únicamente del color.
- Estados asíncronos anunciados sin mensajes repetitivos. Revisar con lector de pantalla cuando corresponda y registrar si no se hizo.
- Animaciones con propósito, sin bloquear interacciones; respetar movimiento reducido y revisar rendimiento de secuencias complejas.

## Implementación

- `npm run check` termina correctamente. No introducir pruebas que solo repliquen la implementación; cubrir contratos, flujos críticos y regresiones reales según el proyecto.
- Revisar en navegador los flujos afectados y la consola. Registrar navegador, dimensiones y resultado.
- Datos simulados aislados de componentes y errores manejados. Revisar respuestas tardías y acciones repetidas en interfaces asíncronas.
- Sin secretos, datos privados, archivos temporales o referencias locales personales en la entrega.
- Documentar dependencias agregadas, instrucciones de ejecución y puntos de integración.

## Evidencia y cierre

En `project/review.md`, incluir comandos y resultados, recorridos realmente ejecutados, problemas con severidad, correcciones y pendientes. No convertir una inspección estática en una prueba de navegador.

En `project/handoff.md`, describir el alcance implementado, simulaciones, contratos, configuración, integración y limitaciones. Un problema que impide el flujo principal bloquea la entrega completa. Otros pendientes deben tener impacto y siguiente acción explícitos.

Si faltan navegador, servicios o herramientas, completar los controles disponibles y registrar el resto como pendiente. Las verificaciones estructurales del harness no prueban por sí solas que un agente tomará buenas decisiones de diseño.
