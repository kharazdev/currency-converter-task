"use client";
import { Currency } from "@/interfaces";

const Converter = ({ euroRates }: { euroRates: Currency[] }) => {
  return (
    <div>
      <h1>Currency Converter</h1>
      <select>
        <option>{euroRates[0].currency}</option>
        {euroRates?.length > 0 &&
          euroRates.map((x: Currency) => (
            <option key={x.currency}>{x.currency}</option>
          ))}
      </select>

      <select>
        <option>Euro</option>
        {euroRates?.length > 0 &&
          euroRates.map((x: Currency) => (
            <option key={x.currency}>{x.currency}</option>
          ))}
      </select>
    </div>
  );
};

export default Converter;
