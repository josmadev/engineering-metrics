export function formatWorkTime(isoDuration: string): string {
  // 1. Extraer valores con un Regex seguro
  const regex = /P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?/;
  const matches = isoDuration.match(regex);

  if (!matches) return "0s";

  // 2. Parsear a números (Días del ISO suelen ser de 24h)
  const d = parseInt(matches[1] || "0", 10);
  const h = parseInt(matches[2] || "0", 10);
  const m = parseInt(matches[3] || "0", 10);

  // 3. Convertir todo a minutos totales
  const totalMinutes = d * 24 * 60 + h * 60 + m;

  // 4. Aplicar regla: 1 día laboral = 8 horas (480 min)
  const workDays = Math.floor(totalMinutes / 480);
  const remainingMins = totalMinutes % 480;
  const finalHours = Math.floor(remainingMins / 60);
  const finalMinutes = remainingMins % 60;

  // 5. Construir el string manualmente para evitar errores de Intl
  const parts: string[] = [];
  if (workDays > 0) parts.push(`${workDays}d`);
  if (finalHours > 0) parts.push(`${finalHours}h`);
  if (finalMinutes > 0) parts.push(`${finalMinutes}m`);

  return parts.length > 0 ? parts.join(" ") : "0s";
}
