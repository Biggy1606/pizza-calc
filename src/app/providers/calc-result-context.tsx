"use client";
import { createContext, useReducer } from "react";

export type CalcResults = {
  diameter: number;
  price: number;
  slices: number;
  pricePerCmSquare: number;
  pricePerSlice: number;
  like: boolean;
  dislike: boolean;
};

type CalcResultsState = {
  results: CalcResults[];
};

type CalcResultsAction =
  | { type: "ADD_RESULT"; payload: CalcResults }
  | { type: "CLICK_LIKE"; payload: number }
  | { type: "CLICK_DISLIKE"; payload: number }
  | { type: "REMOVE_RESULT"; payload: number };


const initialState: CalcResultsState = {
  results: [],
};

// Reducer function to manage state updates for calculation results
const calcResultsReducer = (
  state: CalcResultsState, // Current state
  action: CalcResultsAction, // Dispatched action
): CalcResultsState => {
  switch (action.type) {
    case "ADD_RESULT":
      // Add a new result to the results array
      return {
        ...state,
        results: [...state.results, action.payload],
      };
    case "CLICK_LIKE": 
    // Toggle the like state for the result at the specified index
      return {
        ...state,
        results: state.results.map((result, index) =>
          index === action.payload ? { ...result, like: !result.like } : result
        ),
      };
    case "CLICK_DISLIKE":
      // Toggle the dislike state for the result at the specified index
      return {
        ...state,
        results: state.results.map((result, index) =>
          index === action.payload ? { ...result, dislike: !result.dislike } : result
        ),
      };
    case "REMOVE_RESULT":
      // Remove a result from the results array at the specified index
      return {
        ...state,
        results: state.results.filter((_, index) => index !== action.payload),
      };
    default:
      // Return the current state if the action type is not recognized
      return state;
  }
};

export const CalcResultsContext = createContext<{
  state: CalcResultsState;
  dispatch: React.Dispatch<CalcResultsAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const CalcResultsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(calcResultsReducer, initialState);

  return (
    <CalcResultsContext.Provider value={{ state, dispatch }}>
      {children}
    </CalcResultsContext.Provider>
  );
};
