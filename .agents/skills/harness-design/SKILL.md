---
name: harness-design
description: "Definir flujos, contenido, dirección visual y prototipos para el brief vigente. Usar al explorar o revisar una experiencia antes de consolidar su implementación frontend."
---

# Dirección y prototipo

Leer brief, estado y decisiones. Leer investigación y benchmark solo si existen y afectan la decisión. Crear `project/direction.md` mediante `npm run artifact -- direction`; consultar la [plantilla](../../../harness/templates/direction.md).

## Procedimiento

1. Modelar el flujo principal, arquitectura de información, contenido y estados relevantes. Cubrir móvil y escritorio desde la estructura.
2. Identificar qué decisiones necesitan exploración. Cuando haya alternativas sustanciales, contrastarlas con los criterios del brief; no generar variantes cosméticas para cumplir una cuota. Respetar una dirección existente ya aprobada.
3. Definir una dirección concreta: jerarquía, tipografía, color, espaciado, componentes, imágenes y movimiento cuando aporte. Explicar cómo responde al contexto. Los estilos del starter son reemplazables.
4. Producir un prototipo que permita evaluar el flujo y la dirección. Usar código o una herramienta visual disponible. Registrar dónde verlo, el recorrido, las interacciones simuladas y las preguntas que permite responder.
5. Revisar con el usuario las elecciones que cambien sustancialmente la experiencia. Identificar propuestas pendientes y conservar acuerdos anteriores.
6. Traducir feedback en cambios específicos. Registrar feedback relevante, actualizar decisiones y señalar qué parte del prototipo o frontend requiere ajuste.

## Entrega

Dirección y flujo comprensibles, contenido representativo, estados definidos y prototipo revisable. Cuando se avance con una hipótesis, marcarla explícitamente. La ausencia de una herramienta visual no bloquea una exploración que pueda hacerse en código.

La salida debe permitir implementar sin adivinar comportamientos esenciales. Referenciar componentes o tokens existentes cuando haya un sistema de diseño; definir los necesarios cuando no exista.
