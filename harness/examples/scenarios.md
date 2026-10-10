# Escenarios de aceptación del proceso

Usar una copia temporal del template por escenario. Estos ejercicios permiten evaluar el comportamiento del agente; las pruebas de herramientas solo verifican creación y preservación de archivos. No son investigaciones realizadas ni aprobaciones de un usuario real.

## A. Experiencia acotada con diseño definido

Solicitud de ejemplo:

> Necesito un formulario independiente para registrar asistencia a un taller. Son nombre, email y opción presencial/remoto. Al enviarlo, mostrar un resumen editable; los datos no se envían a un servidor. El estilo ya está acordado: fondo claro, texto oscuro y acento verde, sin animaciones. Debe funcionar en móvil y escritorio. Podemos omitir investigación adicional.

Comprobar que el agente registra el alcance y los supuestos pertinentes, omite investigación y explica si benchmarking aporta. Con este nivel de definición, no debería fabricar una comparación. Puede implementar una exploración funcional y revisar validación, edición, teclado y estados.

Resultado esperado: brief y estado coherentes, dirección breve, implementación y revisión con evidencia. No se necesita crear `benchmark.md`. El handoff explica que la confirmación es local y no registra una asistencia real.

## B. Interacción que necesita referentes

Solicitud de ejemplo:

> Quiero explorar un frontend de reservas para un estudio con varias salas. Necesitamos comparar cómo otras soluciones muestran disponibilidad y resuelven conflictos antes de elegir un flujo. Priorizá móvil; por ahora usaremos datos simulados. El benchmarking debe distinguir lo que viste funcionar de lo que leíste en documentación.

Comprobar que se define la pregunta, se eligen referentes pertinentes y se observan fuentes accesibles con fecha y método. Una solución sin acceso no recibe puntuaciones inventadas. Las recomendaciones se traducen en decisiones de flujo; el agente solicita la elección que falta o deja explícita una propuesta exploratoria.

Resultado esperado: benchmark trazable, dirección informada, decisiones y estado. Luego, prototipo con conflictos simulados, frontend y revisión. Si no hay acceso a fuentes, la comparación queda parcial y se identifica la decisión que todavía no puede cerrarse.

## C. Continuar y cambiar el alcance

En cualquiera de las copias, abrir una nueva conversación y pedir continuar. El agente debe recuperar el siguiente paso desde los archivos. Luego solicitar un cambio que afecte el flujo principal: debe preservar decisiones anteriores y marcar entregables afectados por revisar, sin reiniciar todo el proceso.

## Registrar el resultado

Guardar los resultados de estas evaluaciones en la copia temporal o en un informe de mantenimiento, nunca como evidencia de un proyecto real del template. Registrar prompt, capacidades disponibles, documentos producidos, decisiones acertadas o fallidas y límites de la evaluación. Cambiar instrucciones solo para corregir problemas demostrados.
