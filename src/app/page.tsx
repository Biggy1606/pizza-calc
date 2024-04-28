import Calculator from "./calculator";
import { CalcResultsProvider } from "./providers/calc-result-context";

export default function Home() {
  return (
    <>
      <CalcResultsProvider>
        <Calculator />
      </CalcResultsProvider>
    </>
  );
}
