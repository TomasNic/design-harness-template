# Design Harness

Un template para transitar un proceso de diseño y entregar un frontend independiente. Cada copia contiene el método, seis skills, el contexto de un proyecto y una aplicación React + TypeScript + Vite.

## Empezar un proyecto

Requiere **Node.js 24** y npm. Si usás nvm, ejecutar `nvm install` y `nvm use` en esta carpeta. La instalación rechaza versiones incompatibles; si aparece `EBADENGINE`, activar Node 24 antes de continuar.

1. Crear un repositorio desde el template de GitHub y clonarlo, o copiar esta carpeta incluyendo los directorios ocultos.
2. Instalar y personalizar la copia:

```sh
npm ci
npm run project:init -- --name "Mi proyecto"
npm run dev
```

3. Abrir la carpeta con Codex y empezar una conversación:

> Quiero iniciar este proyecto con el harness. La idea es… Lo van a usar… Necesito que puedan… Usá el contexto que ya tengamos y ayudame a definir el brief.

Las skills del repositorio viven en `.agents/skills/`. Abrir una nueva sesión después de copiar el template permite descubrirlas. También se pueden invocar por nombre, por ejemplo `$harness-kickoff`. Si otro agente no las descubre automáticamente, indicarle que lea [AGENTS.md](AGENTS.md) y el `SKILL.md` relevante. El proceso no necesita una API propia ni plugins obligatorios.

`project:init` cambia el nombre y slug de la metadata, el package, su lockfile y el título HTML. Conserva brief, código e historial. Rechaza una copia ya inicializada y cambios manuales incompatibles. Podés elegir un slug con `--slug mi-proyecto`. En el repositorio maestro, dejarlo sin inicializar para que cada copia empiece limpia.

La vista inicial demuestra estados de carga, datos, vacío y error. Es una pantalla de bienvenida reemplazable, no el producto final de cada proyecto.

## Recorrido

Brief → investigación y benchmarking cuando aporten → dirección → prototipo → frontend → revisión y entrega.

- [Proceso y decisiones de etapa](harness/process.md)
- [Stack base y política de extensiones](harness/stack.md)
- [Criterios de calidad y entrega](harness/quality.md)

El agente conserva el estado en [project/status.md](project/status.md), el alcance en [project/brief.md](project/brief.md) y las decisiones en [project/decisions.md](project/decisions.md). Para retomar:

> Leé el brief, el estado y las decisiones. Continuá desde el próximo paso registrado y señalá si algún supuesto necesita revisión.

## Skills incluidas

| Skill | Uso y resultado |
| --- | --- |
| [harness-kickoff](.agents/skills/harness-kickoff/SKILL.md) | Definir brief y siguiente paso; decidir si hace falta evidencia adicional. |
| [harness-research](.agents/skills/harness-research/SKILL.md) | Investigar una pregunta de usuarios, contexto o viabilidad. |
| [harness-benchmark](.agents/skills/harness-benchmark/SKILL.md) | Comparar referentes observables para tomar una decisión de diseño. |
| [harness-design](.agents/skills/harness-design/SKILL.md) | Definir flujos, contenido, dirección visual y prototipo. |
| [harness-frontend](.agents/skills/harness-frontend/SKILL.md) | Implementar una experiencia funcional y desacoplada del backend. |
| [harness-review](.agents/skills/harness-review/SKILL.md) | Revisar con evidencia y preparar la integración. |

Investigación y benchmarking son condicionales. El motivo de activación u omisión queda en el estado. Las conclusiones de benchmarking se vinculan con fuentes, método de observación y decisiones; las capturas no prueban el funcionamiento de una interacción.

## Documentos bajo demanda

```sh
npm run artifact -- benchmark
npm run artifact -- direction
npm run artifact -- feedback
```

Tipos disponibles: `research`, `benchmark`, `direction`, `feedback`, `review`, `handoff`. El comando copia la plantilla a `project/` y falla si el archivo ya existe. Crear un archivo no completa una etapa: hay que producir su contenido y actualizar el estado.

## Estructura

```text
.agents/skills/      Procedimientos reutilizables
AGENTS.md            Entrada y reglas del agente
harness/             Proceso, stack, calidad y plantillas
project/             Contexto, estado y decisiones de esta copia
references/          Materiales y fuentes del proyecto
src/components/      Componentes de interfaz
src/data/            Datos simulados
src/services/        Adaptadores y contratos de acceso a datos
src/types/           Tipos de dominio
src/tokens.css       Tokens visuales iniciales
scripts/             Inicialización, documentos y controles
.github/workflows/   CI para el repositorio y sus copias
```

Los archivos del proceso permanecen fuera del bundle de la app; solo se importa la metadata pública de `project/project.json`. Mantener ese archivo sin información privada.

## Comandos

| Comando | Resultado |
| --- | --- |
| `npm run dev` | Servidor local; la URL aparece en la terminal. |
| `npm run build` | Revisión de tipos y build en `dist/`. |
| `npm run preview` | Servir el build local; requiere build previo. |
| `npm run typecheck` | Revisar tipos. |
| `npm run lint` | Revisar reglas de código. |
| `npm run harness:check` | Verificar skills, plantillas, metadata y enlaces locales. |
| `npm run test:tooling` | Probar inicialización y documentos en carpetas temporales. |
| `npm run check` | Ejecutar lint, integridad, pruebas de herramientas y build. |

CI ejecuta `npm ci` y `npm run check` en Node 24. Las revisiones visuales, de accesibilidad y de flujos requieren controles adicionales: no quedan demostradas por el CI. Los [escenarios de aceptación](harness/examples/scenarios.md) sirven para evaluar el proceso con solicitudes reales.

El [informe de validación de la base](harness/validation.md) registra los controles ejecutados para la versión 0.1.0 y sus límites.

## Extender e integrar

Agregar tecnologías cuando un requisito lo justifique y registrar la decisión. Por ejemplo, movimiento coordinado puede requerir una librería adicional. La base no fija una identidad visual ni una biblioteca de componentes para todos los proyectos.

El contrato de ejemplo está en [src/services/examples.ts](src/services/examples.ts). Recibe un escenario y `AbortSignal`, devuelve una lista o un error y no persiste datos. Reemplazar este adaptador, los fixtures y la pantalla demo al implementar el producto. Documentar los contratos definitivos en el handoff.

Investigación web, navegador automatizado, herramientas visuales y repositorios conectados son capacidades opcionales del entorno del agente. Si falta alguna, el proceso registra esa limitación y utiliza una alternativa viable. Nunca se atribuye a una herramienta una verificación que no realizó.

## Publicar y mantener el template

Subir el repositorio a GitHub y activar **Settings → Template repository**. Desde entonces, **Use this template** crea repositorios independientes. La [guía oficial de GitHub](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository) describe la configuración. Elegir visibilidad y licencia de distribución según el uso que quieras darle; esta base no asigna una licencia al código propio.

Versionar el lockfile, skills y documentos reutilizables. Mantener el maestro sin datos de un cliente ni artefactos de una ejecución particular. Las copias no reciben automáticamente futuras mejoras: promover aprendizajes mediante cambios explícitos del template y registrar versiones en el [changelog](harness/CHANGELOG.md).

La organización de skills locales y reglas de repositorio sigue el patrón descrito en la [documentación de OpenAI](https://developers.openai.com/blog/skills-agents-sdk).
