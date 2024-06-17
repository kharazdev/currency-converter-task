"use client";
import { Currency } from "@/interfaces";
import React, { useEffect, useState } from "react";
import './style.css'
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

  const [inputCurrencyFrom, setInputCurrencyFrom] = useState<number>(1);
  const [inputCurrencyTo, setInputCurrencyTo] = useState<number>(
    currencyTo.rate / currencyFrom.rate
  );
  const handleChangeRateInputFrom = (val: number) => {
    setInputCurrencyFrom(val);
    const result = Number(val) * Number(currencyTo.rate / currencyFrom.rate);
    setInputCurrencyTo(result);
  };

  const handleChangeRateInputTo = (val: number) => {
    setInputCurrencyTo(val);
    const result = val / (currencyTo.rate / currencyFrom.rate);
    setInputCurrencyFrom(result);
  };

  useEffect(() => {
    const formatRatesFrom = removeSelectedRate(currencyTo.currency);
    const formatRatesTo = removeSelectedRate(currencyFrom.currency);
    setformatRatesTo(formatRatesTo);
    setformatRatesFrom(formatRatesFrom);
  }, [currencyFrom, currencyTo]);

  return (
    <div className="currency-converter">
      <h1>Currency Converter</h1>
      <p>
        From {currencyFrom.currency} To {currencyTo.currency}
      </p>
      <p>
        1 {currencyFrom.currency} ={" "}
        {(currencyTo.rate / currencyFrom.rate).toFixed(2) === "0.00"
          ? currencyTo.rate / currencyFrom.rate
          : (currencyTo.rate / currencyFrom.rate).toFixed(2)}{" "}
        {currencyTo.currency}
       {"   /   "}
        1 {currencyTo.currency} ={" "}
        {(currencyFrom.rate / currencyTo.rate).toFixed(2) === "0.00"
          ? currencyFrom.rate / currencyTo.rate
          : (currencyFrom.rate / currencyTo.rate).toFixed(2)}{" "}
        {currencyFrom.currency}
      </p>
      <div>
        {currencyFrom.currency}:{" "}
        <input
          type="number"
          name="from"
          defaultValue={inputCurrencyFrom}
          value={inputCurrencyFrom}
          onChange={(e) => {
            handleChangeRateInputFrom(Number(e.target.value));
          }}
        />
        {currencyTo.currency}:{" "}
        <input
          type="number"
          name="to"
          defaultValue={inputCurrencyTo}
          value={inputCurrencyTo}
          onChange={(e) => {
            handleChangeRateInputTo(Number(e.target.value));
          }}
        />
      </div>
      <select
        onChange={async (e) => {
          const value = e.target.value;
          const result = getObjByCurrency(value);
          if (result) {
            await setCurrencyfrom(result);
            const rate = currencyTo.rate / result.rate;
            setInputCurrencyFrom(1);
            setInputCurrencyTo(Number(rate));
          }
        }}
      >
        {formatRatesFrom?.length > 0 &&
          formatRatesFrom.map((x: Currency) => (
            <option key={x.currency}>{x.currency}</option>
          ))}
      </select>

      <select
        onChange={async (e) => {
          const value = e.target.value;
          const result = getObjByCurrency(value);
          if (result) {
            setCurrencyTo(result);
            const rate = result.rate / currencyFrom.rate;
            setInputCurrencyFrom(1);
            setInputCurrencyTo(Number(rate));
          }
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
