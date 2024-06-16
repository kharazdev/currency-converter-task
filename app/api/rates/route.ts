import { Currency } from "../../../interfaces";
import { NextResponse } from "next/server";
import * as xmlParser from "xml-js";

export async function GET() {
  const res = await fetch(
    `http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml`
  );
  const xmlData = await res.text();

  const jsonData = xmlParser.xml2json(xmlData, { compact: true, spaces: 4 });
  const parsedData = JSON.parse(jsonData);

  // Extracting the rates data
  const rates = parsedData["gesmes:Envelope"]["Cube"]["Cube"]["Cube"];

  const ratesData = {
    rates: rates.map((rate: { _attributes: Currency }) => ({
      currency: rate._attributes.currency,
      rate: parseFloat(rate._attributes.rate),
    })),
  };

  return NextResponse.json({
    euroRates: ratesData.rates,
  });
}
