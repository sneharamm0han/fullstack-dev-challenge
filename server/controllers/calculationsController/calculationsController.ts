import { RequestHandler } from "express";

export const calculate: RequestHandler = (req, res) => {
  
  const {initial, interest, monthly} = req.body;
  console.log(monthly);

  if (interest === 0) {
    return;
  }

  const interestRate = interest / 100;
  const interestMultiplier = 1 + (interestRate / 12);
  const calculationData: number[] = [];

  // carries out calculation for each year
  for (let t: number = 0; t <= 50; t++) {
      // annual interest provided, calculation assumes
      // interest is compounded monthly
      const interestCalc1: number = Math.pow(interestMultiplier, (12 * t))
      const interestCalc2: number = (interestCalc1 - 1) / (interestRate / 12)

      const initialCalc = initial * interestCalc1;
      const compoundCalc: number = monthly * interestCalc2 * interestMultiplier;
      console.log("Year" + t + " Compound: " + compoundCalc);

      const yVal = initialCalc + compoundCalc;

      // rounds investment calculation for better appearance
      calculationData.push(+yVal.toFixed(2));
  }

  return res.status(200).send(calculationData);
};
