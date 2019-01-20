export interface CalculatorHistoryItem {
  result: string,
  expression: string,
};

export interface CalculatorHistory extends Array<CalculatorHistoryItem>{};
