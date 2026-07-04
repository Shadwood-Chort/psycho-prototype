import { useApp } from "../context/AppContext";
import { translate } from "./translations";

export function useT() {
  const { language } = useApp();
  return (ru: string) => translate(language, ru);
}
