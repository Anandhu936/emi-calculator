import React from "react";
import { useState } from "react";

const HeroSection = () => {
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [tenure, setTenure] = useState("");
  const [isYearly, setIsYearly] = useState(true);
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const calculateEmi = () => {
    const loanAmount = parseFloat(amount);
    const interestRate = parseFloat(interest);
    const loanTenure = parseFloat(tenure);

    if (!loanAmount || !interestRate || !loanTenure) {
      alert("Please fill all fields with valid values.");
      return;
    }

    const monthlyRate = interestRate / 100 / (isYearly ? 12 : 1);
    const tenureInMonths = isYearly ? loanTenure * 12 : loanTenure;

    const emiValue =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths)) /
      (Math.pow(1 + monthlyRate, tenureInMonths) - 1);
    const totalPaymentValue = emiValue * tenureInMonths;
    const totalInterestValue = totalPaymentValue - loanAmount;

    setEmi(emiValue.toFixed(2));
    setTotalInterest(totalInterestValue.toFixed(2));
    setTotalPayment(totalPaymentValue.toFixed(2));
  };
  return (
    <div
      className="hero-container flex flex-col justify-center items-center text-lg font-inter  p-6 "
      
    >
      <h1 className="text-2xl lg:text-5xl  text-black/80 font-bold mb-3 lg:mb-6 underline underline-offset-4 lg:underline-offset-8 mt-3 lg:mt-8">EMI Calculator</h1>
      <div className="w-full lg:w-[1000px]  bg-[#B0E0E6] border border-white/50 shadow-lg rounded-2xl p-6 backdrop-blur-md mb-[24px] lg:mb-[40px] mt-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className="space-y-4">
            <label className="block text-sm lg:text-xl">
              Loan Amount ($)
              <input
                type="number"
                placeholder="Enter Loan amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="10000"
                max="10000000"
                required
                className="w-full p-2 border rounded-md bg-white/20 text-center text-sm lg:text-lg  mt-2"
              />
            </label>
            <label className="block text-sm lg:text-xl">
              Interest Rate (%)
              <input
                type="number"
                placeholder="Enter interest"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                min="1"
                max="99"
                step="0.01"
                required
                className="w-full p-2 border rounded-md bg-white/20 text-center text-sm lg:text-lg  mt-2"
              />
            </label>
            <label className="block text-sm lg:text-xl">
              Loan tenure
              <input
                type="number"
                placeholder="Enter Loan Duration"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                min="1"
                max="10000000"
                required
                className="w-full p-2 border rounded-md bg-white/20 text-center text-sm lg:text-lg  mt-2"
              />
            </label>
            <div className="flex gap-4">
              <label
                className={`flex-1 p-2 border rounded-md text-center text-sm lg:text-xl cursor-pointer ${
                  isYearly ? "bg-gray-800 text-white" : "bg-[#B0E0E6]"
                }`}
              >
                <input
                  type="radio"
                  name="tenure"
                  checked={isYearly}
                  onChange={() => setIsYearly(true)}
                  className="hidden"
                />
                Yearly
              </label>
              <label
                className={`flex-1 p-2 border rounded-md text-sm lg:text-xl text-center cursor-pointer ${
                  !isYearly ? "bg-gray-800 text-white" : "bg-[#B0E0E6]"
                }`}
              >
                <input
                  type="radio"
                  name="tenure"
                  checked={!isYearly}
                  onChange={() => setIsYearly(false)}
                  className="hidden"
                />
                Monthly
              </label>
            </div>

            <button
              className="w-full py-3 rounded-md shadow-md bg-white/30 border border-black/30 text-lg lg:text-xl cursor-pointer hover:bg-white/40"
              onClick={calculateEmi}
            >
              Calculate
            </button>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 p-6 border rounded-xl bg-white/20 text-center shadow-lg">
            <p className="lg:text-2xl text-lg font-bold text-black">
              Emi : <span className="text-green-500  font-bold lg:text-2xl text-lg">{emi || "-"}</span>
            </p>
            <p className="lg:text-2xl text-lg font-bold text-black">
              Total Interest :{" "}
              <span className="text-green-500 font-bold lg:text-2xl text-lg ">{totalInterest || "-"}</span>
            </p>
            <p className="lg:text-2xl text-lg font-bold text-black">
              Total Payment :{" "}
              <span className="text-green-500 font-bold lg:text-2xl text-lg">{totalPayment || "-"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
