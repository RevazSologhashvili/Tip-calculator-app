import { useEffect, useState } from "preact/hooks";

export function App(){
  const [billAmount, setBillAmount] = useState<string>("0.00");
  const [amountOfPeople, setAmountOfPeople] = useState<string>("0");
  const [percentage, setPercentage] = useState<string>("0");
  const [tipPer, setTipPer] = useState<string>("0.00");
  const [totalPer, setTotalPer] = useState<string>("0.00");
  const [activeTip, setActiveTip] = useState<number | null>(null);
  const [billError, setBillError] = useState<boolean>(false);
  const [peopleError, setPeopleError] = useState<boolean>(false);
  const [customTipError, setCustomTipError] = useState<boolean>(false);

  const resetValues = () => {
    setBillAmount("0.00");
    setAmountOfPeople("0");
    setPercentage("0");
    setTotalPer("0.00");
    setTipPer("0.00");
    setActiveTip(null);
    setBillError(false);
    setPeopleError(false);
    setCustomTipError(false);
  };

  useEffect(() => {
    const calculateValues = () => {
      const total = +billAmount + (+billAmount * +percentage) / 100;
      if (total && +amountOfPeople > 0) {
        const totalAmountPer = total / +amountOfPeople;
        const tipPerPerson = totalAmountPer - (+billAmount / +amountOfPeople);
        setTotalPer(totalAmountPer.toFixed(2));
        setTipPer(tipPerPerson.toFixed(2));
      }
    };

    calculateValues();
  }, [billAmount, amountOfPeople, percentage]);

  const handleTipClick = (value: number) => {
    setPercentage(value.toString());
    setActiveTip(value);
  };

  const handleCustomTipChange = (e:any) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) { //regex to Check if value is a number or floating point
      setPercentage(value);
      setActiveTip(null);
      setCustomTipError(false);
    } else {
      setCustomTipError(true);
    }
  };

  const handleBillChange = (e:any) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setBillAmount(value);
      setBillError(false);
    } else {
      setBillError(true);
    }
  };

  const handlePeopleChange = (e:any) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAmountOfPeople(value);
      setPeopleError(false);
    } else {
      setPeopleError(true);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <h1 className="my-8 text-textHeader text-4xl flex flex-col justify-center items-center gap-2 font space-mono-bold text-stroke">
        <span>SPLI</span>
        <span>TTER</span>
      </h1>
      <div className="flex-grow rounded-t-[25px] bg-white flex flex-col p-6 gap-8 xl:max-w-[920px] md:rounded-[25px] md:max-h-[900px] xl:max-h-[550px] xl:mx-auto xl:grid xl:grid-cols-2 md:mx-8 md:my-auto">
        {/* Bill */}
        <div className="flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-3">
            <label htmlFor="Bill" className="text-lightGray space-mono-bold text-xl">
              Bill
            </label>
            <div className="relative">
              <span className="absolute text-3xl left-4 top-1/2 transform -translate-y-1/2 text-lightGrayIcons">$</span>
              <input
                type="text"
                id="Bill"
                placeholder="Amount of bill"
                className={`bg-inputBg w-full h-12 px-4 rounded-xl text-2xl font-bold text-right ${billError && 'text-textRed border-2 border-textRed'}`}
                value={billAmount}
                onChange={handleBillChange}
              />
            </div>
            {billError && <p className="text-textRed">Please enter a valid bill amount</p>}
          </div>
          {/* Select Tip */}
          <div className="flex flex-col gap-3">
            <label htmlFor="tip" className="text-lightGray space-mono-bold text-xl">
              Select Tip %
            </label>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {[5, 10, 15, 25, 50].map((value) => (
                <button
                  key={value}
                  className={`bg-darkGreen text-white font-bold rounded-xl text-xl py-2 ${activeTip === value ? "bg-lightGreen text-darkGreen" : ""}`}
                  onClick={() => handleTipClick(value)}
                >
                  {value}%
                </button>
              ))}
              <input
                type="text"
                id="tip"
                className={`bg-inputBg w-full h-12 px-4 rounded-xl text-2xl font-bold text-right ${customTipError && 'text-textRed border-2 border-textRed'}`}
                placeholder="Custom"
                value={activeTip !== null ? "" : percentage}
                onChange={handleCustomTipChange}
              />
            </div>
            {customTipError && <p className="text-textRed">Please enter a valid tip percentage</p>}
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="people" className="text-lightGray space-mono-bold text-xl">
              Number of People
            </label>
            <div className="relative">
              <span className="absolute text-3xl left-4 top-1/2 transform -translate-y-1/2 text-lightGrayIcons">$</span>
              <input
                type="text"
                id="people"
                placeholder="Amount of People"
                className={`bg-inputBg w-full h-12 px-4 rounded-xl text-2xl font-bold text-right ${peopleError && 'text-textRed border-2 border-textRed'}`}
                value={amountOfPeople}
                onChange={handlePeopleChange}
              />
            </div>
            {peopleError && <p className="text-textRed">Please enter a valid number of people</p>}
          </div>
        </div>

        <div className="flex-grow bg-darkGreen rounded-2xl p-6 flex flex-col gap-6">
          <div className="py-2 h-full w-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <p className="text-white font-bold">
                Tip Amount <br /> <span className="text-lightGray text-sm font-bold">/ person</span>
              </p>
              <span className="text-lightGreen text-3xl font-bold">${tipPer}</span>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-white font-bold">
                Total <br /> <span className="text-lightGray text-sm font-bold">/ person</span>
              </p>
              <span className="text-lightGreen text-3xl font-bold">${totalPer}</span>
            </div>
          </div>
          <button className="bg-lightGreen text-darkGreen font-bold text-xl w-full py-2 rounded-xl place-self-end" onClick={resetValues}>
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}