/**
 * TODO: here we should be check the user lang to apply the translation
 * but since this portal is only in Spanish, we just return the value
 */
export function getCondition(condition: string) {
  switch (condition) {
    case "new":
      return "Nuevo";
    case "used":
      return "Usado";

    default:
      return `A traducir ${condition}`;
  }
}
