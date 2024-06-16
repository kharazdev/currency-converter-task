"use client";
import { Currency } from "@/interfaces";
import React, { useEffect, useState } from "react";

const Converter = ({ euroRates }: { euroRates: Currency[] }) => {
  const getObjByCurrency = (currency: string) => {
    const result = euroRates.find((obj) => obj.currency === currency);
    return result;
  };

  const removeSelectedRate = (currency: string) => {
    const result = euroRates.filter((obj) => obj.currency !== currency);
    return result;
  };

  const initCurrencyTo: Currency = {
    currency: "Euro",
    rate: 1,
  };
  const [currencyFrom, setCurrencyfrom] = useState<Currency>(euroRates[0]);
  const [currencyTo, setCurrencyTo] = useState<Currency>(initCurrencyTo);

  const [formatRatesFrom, setformatRatesFrom] = useState<Currency[]>(euroRates);
  const [formatRatesTo, setformatRatesTo] = useState<Currency[]>(euroRates);
  
  useEffect(() => {
    const formatRatesFrom = removeSelectedRate(currencyTo.currency);
    const formatRatesTo = removeSelectedRate(currencyFrom.currency);
    setformatRatesTo(formatRatesTo);
    setformatRatesFrom(formatRatesFrom);
  }, [currencyFrom, currencyTo]);

  return (
    <div>
      <h1>Currency Converter</h1>
      <p>
        From {currencyFrom.currency} To {currencyTo.currency}
      </p>
      <p>
        1 {currencyFrom.currency} ={" "}
        {(currencyTo.rate / currencyFrom.rate).toFixed(2)}
        {currencyTo.currency}
      </p>
      <select
        onChange={(e) => {
          const value = e.target.value;
          const result = getObjByCurrency(value);
          if (result) setCurrencyfrom(result);
        }}
      >
        {formatRatesFrom?.length > 0 &&
          formatRatesFrom.map((x: Currency) => (
            <option key={x.currency}>{x.currency}</option>
          ))}
      </select>

      <select
        onChange={(e) => {
          const value = e.target.value;
          const result = getObjByCurrency(value);
          if (result) setCurrencyTo(result);
        }}
      >
        <option>Euro</option>
        {formatRatesTo?.length > 0 &&
          formatRatesTo.map((x: Currency) => (
            <option key={x.currency}>{x.currency}</option>
          ))}
      </select>
    </div>
  );
};

export default Converter;
