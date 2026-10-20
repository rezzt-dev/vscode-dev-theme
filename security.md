# SECURITY

política de seguridad del repositorio `dark-dev-theme`.

---

## SUPERFICIE DE ATAQUE

esta extensión distribuye únicamente ficheros json de temas de color y scripts de desarrollo en
node.js. el paquete `.vsix` publicado **no contiene código ejecutable**: vs code solo lee los
ficheros `themes/*.json` para aplicar los colores. por tanto, la superficie de ataque es muy
reducida:

| componente | distribuido | ejecutable en producción |
|---|---|---|
| `themes/*.json` | sí | no — solo lo lee vs code |
| `src/*.mjs`, `scripts/*.mjs` | no | solo en entorno de desarrollo |
| dependencias de desarrollo (`shiki`) | no | solo para la vista previa local |

los scripts de `src/` y `scripts/` se ejecutan únicamente durante el desarrollo para generar los
temas y validar el contraste. nunca se empaquetan ni llegan al usuario final.

---

## VERSIONES SOPORTADAS

| versión | soporte de seguridad |
|---|---|
| `1.0.x` (última) | ✓ activo |
| anteriores | — sin soporte |

siempre se recomienda usar la versión más reciente disponible en el marketplace.

---

## REPORTAR UNA VULNERABILIDAD

aunque la superficie es pequeña, pueden surgir problemas de seguridad en:

- dependencias de desarrollo (supply chain de `npm`).
- el proceso de generación y publicación del `.vsix`.
- el comportamiento de vs code al cargar los ficheros del tema.

**para reportar una vulnerabilidad:**

1. **no abras un issue público** si el problema podría ser explotado antes de publicar un parche.
2. envía un correo a <juangarciacazallas.dev@gmail.com> con el asunto
   `[security] dark-dev-theme — <resumen breve>`.
3. incluye en el cuerpo: descripción del problema, pasos para reproducirlo, versión afectada y,
   si tienes, una propuesta de solución o parche.

**tiempo de respuesta:**

- acuse de recibo en un plazo de **72 horas**.
- confirmación o descarte de la vulnerabilidad en un plazo de **7 días**.
- publicación del parche coordinada contigo antes de hacer el problema público.

---

## DEPENDENCIAS DE DESARROLLO

las únicas dependencias del proyecto son de desarrollo (`devDependencies`) y no se distribuyen con
la extensión. se recomienda ejecutar `npm audit` periódicamente para detectar vulnerabilidades
conocidas en el entorno de generación:

```sh
npm audit
npm audit fix   # aplica correcciones automáticas compatibles
```

---

## ALCANCE

quedan **fuera del alcance** de esta política:

- vulnerabilidades en vs code, vscodium o code - oss como plataforma.
- comportamientos inesperados causados por otras extensiones instaladas.
- ataques que requieran acceso físico o privilegios administrativos previos en la máquina del
  usuario.
