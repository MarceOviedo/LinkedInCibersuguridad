import { GoogleGenAI } from "@google/genai";
import { PostMode } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

const SERIES_PROMPT_TEMPLATE = `
Eres un **Experto en Narrativa de Contenido Digital y Ciberseguridad**. Tu tarea es generar una serie de **tres publicaciones de LinkedIn separadas pero interconectadas**.

**Instrucciones de Inicio (OBLIGATORIO):**
Empieza tu respuesta **EXACTAMENTE** con esta frase seguida de dos saltos de línea:
"Aquí tienes la serie de tres publicaciones de LinkedIn, diseñadas según tus especificaciones:"

**Requisitos de Diseño Visual (CRUCIAL):**
1.  **Emojis:** Usa **EXACTAMENTE 5 EMOJIS** por cada post. Distribúyelos estratégicamente para dar aire y atractivo visual.
2.  **Negritas:** Usa formato Markdown (**texto**) para resaltar palabras clave, frases de impacto y conceptos importantes.
3.  **Estructura:** Párrafos muy cortos (1-2 líneas). Listas con viñetas.

**Temática Central de la Serie:** {{TOPIC}}

**Instrucciones de Anidación (Serie de 3):**

| Post | Objetivo y Contenido | Gancho/CTA |
| :--- | :--- | :--- |
| **Post 1 (Introductorio)** | **Definición y Necesidad.** Presenta el concepto de la temática central y por qué es crucial hoy. | El Gancho debe ser una **pregunta amplia**. La CTA debe preguntar si ya la conocen. |
| **Post 2 (Profundización)** | **Pasos Clave y Desafíos.** Desarrolla 3-4 pilares o pasos prácticos para implementar o mitigar el desafío. | El Gancho debe hacer referencia al post anterior (Ej: "Siguiendo nuestra discusión..."). La CTA debe pedir la **experiencia práctica**. |
| **Post 3 (Conclusión/Futuro)** | **Proyecciones y Mitigación.** Concluye con el impacto futuro, mejores prácticas o herramientas esenciales. | El Gancho debe actuar como un **resumen** de los dos posts anteriores. La CTA debe ser una **pregunta de acción** o recomendación final. |

**Formato Específico para Cada Post:**
*   **Gancho:** Máx. 2 líneas, usando un emoji relevante.
*   **Cuerpo:** Usar listas con viñetas o **negritas** para los puntos clave.
*   **Hashtags:** Usar 4-5 *hashtags* consistentes.

---

**Salida Requerida:**

Después de la frase introductoria, genera los posts separados por estos encabezados exactos:
"[POST 1/3]"
"[POST 2/3]"
"[POST 3/3]"
`;

const SINGLE_PROMPT_TEMPLATE = `
Eres un **Experto en Narrativa de Contenido Digital y Ciberseguridad**. Tu tarea es generar **una única publicación de LinkedIn de alto impacto** sobre la temática central.

**Requisitos de Diseño Visual (CRUCIAL):**
1.  **Emojis:** Usa **EXACTAMENTE 5 EMOJIS** distribuidos en el post.
2.  **Negritas:** Usa formato Markdown (**texto**) para resaltar palabras clave y conceptos de alto valor.
3.  **Escaneabilidad:** Párrafos cortos. Estructura limpia.

**Temática Central:** {{TOPIC}}

**Objetivo:**
Educar a la audiencia sobre este tema, profundizando en los puntos clave y ofreciendo una perspectiva experta y accionable.

**Formato Específico:**
*   **Gancho:** Máx. 2 líneas. Debe ser provocativo.
*   **Cuerpo:** Usar listas con viñetas o **negritas** para los puntos clave.
*   **CTA (Llamada a la acción):** Una pregunta para fomentar el debate.
*   **Hashtags:** Usar 4-5 *hashtags* relevantes.

---

**Salida Requerida:**
Genera el contenido completo del post. Encabeza la respuesta con "[POST ÚNICO]".
`;

export const generateContent = async (topic: string, mode: PostMode): Promise<string> => {
  try {
    const ai = getClient();
    
    // Use 2.5 Flash for speed and quality text generation
    const modelId = 'gemini-2.5-flash'; 
    
    let prompt = mode === PostMode.SERIES ? SERIES_PROMPT_TEMPLATE : SINGLE_PROMPT_TEMPLATE;
    prompt = prompt.replace('{{TOPIC}}', topic);

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate content");
  }
};