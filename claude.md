# CLAUDE

instrucciones específicas para claude code trabajando en este repositorio. las instrucciones
completas del proyecto están en `agents.md`:

@agents.md

---

## SKILLS

al comenzar cualquier tarea que implique diseño visual, componentes de interfaz o revisión del tema,
carga las skills del directorio `.docs/skills/` antes de escribir código:

```
.docs/skills/frontend-design/SKILL.md     — diseño de interfaces web
.docs/skills/impeccable/reference/        — comandos de diseño y calidad visual
```

no empieces a implementar sin haberlas leído. si el directorio `.docs/skills/` tiene ficheros
nuevos, léelos también: el catálogo de skills puede crecer.

---

## COMPORTAMIENTO

- sigue siempre las reglas de commits, pull requests y markdown de `agents.md` aunque no se pidan
  explícitamente.
- antes de crear un rol de sintaxis nuevo, comprueba que `build.mjs` valida correctamente las dos
  variantes de `variants.mjs`.
- no edites `themes/*.json` a mano: esos ficheros los genera `npm test`.
- si encuentras una clave de color inventada (no definida en `src/palette.mjs`), corrígela antes de
  continuar.
- ningún hex suelto fuera de `src/palette.mjs`.
