import { Currency } from "@/interfaces";
import Converter from "../components/client/converter";

export default async function Page() {
  const res = await fetch("http://localhost:3000/api/rates");
  const rates = await res.json();
  const euroRates: Currency[] = rates?.euroRates;
  return <Converter euroRates={euroRates} />;
}
