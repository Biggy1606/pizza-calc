"use client";
import { useContext } from "react";
import { buttonStyle } from "./consts";
import {
  CalcResults,
  CalcResultsContext,
} from "./providers/calc-result-context";

const Calculator = () => {
  const { dispatch, state } = useContext(CalcResultsContext);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const diameter = Number(formData.get("diameter"));
    const price = Number(formData.get("price"));
    const slices = Number(formData.get("slices")) || 8;

    // Calculate the price per square centimeter
    const area = Math.PI * Math.pow(diameter / 2, 2);
    const pricePerCmSquare = price / area;
    const pricePerSlice = (area / slices) * pricePerCmSquare;

    // Create a new CalcResults object
    const newResult: CalcResults = {
      diameter,
      price,
      slices,
      pricePerCmSquare,
      pricePerSlice,
    };

    // Dispatch an action to add the new result to the context
    dispatch({ type: "ADD_RESULT", payload: newResult });
  };
  const handleRemove = (index: number) => {
    dispatch({ type: "REMOVE_RESULT", payload: index });
  };
  return (
    <>
      <form
        className='flex flex-col items-center space-y-2'
        onSubmit={handleSubmit}
      >
        <input
          placeholder='Pizza diameter (cm)'
          type='number'
          min={0}
          title='Pizza diameter in centimeters'
          name='diameter'
          className='w-full rounded-md border-2 border-slate-500 px-2 py-1'
        />
        <input
          placeholder='Price (your currency)'
          type='number'
          min={0}
          title='Price for entire pizza'
          name='price'
          className='w-full rounded-md border-2 border-slate-500 px-2 py-1'
        />
        <input
          placeholder='Amount of slices (default: 8)'
          type='number'
          min={0}
          title='Amount of slices in pizza'
          name='slices'
          className='w-full rounded-md border-2 border-slate-500 px-2 py-1'
        />
        <p>
          Results will be generic, any prices are based on value you provide in{" "}
          <code>price</code> input.
        </p>
        <button type='submit' className={buttonStyle}>
          Go!
        </button>
      </form>
      {/* Display results as list of cards */}
      <h2>Calculation Results</h2>
      <div className='flex w-full flex-col items-center justify-center align-top lg:flex-row lg:flex-wrap'>
        {state.results.map((result, index) => (
          <div
            key={index}
            className='m-2 flex w-full flex-col items-start space-y-1 border p-4 lg:w-[360px] '
          >
            <p>Diameter: {result.diameter} cm</p>
            <p>Price: {result.price}</p>
            <p>Slices: {result.slices}</p>
            <p>Price per cm²: {result.pricePerCmSquare.toFixed(2)}</p>
            <p>Price per slice: {result.pricePerSlice.toFixed(2)}</p>
            <div className='flex w-full flex-row items-center justify-between'>
              <button
                onClick={() => alert("Ogarnij dupsko")}
                className='rounded-md bg-blue-500 px-2 py-1 text-white'
              >
                Save
              </button>
              <button
                onClick={() => handleRemove(index)}
                className='rounded-md bg-red-500 px-2 py-1 text-white'
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Calculator;
