export interface GetPrediction {
  [x: string]: any;
  id: string;
  currentDocument: boolean;
  mae: number;
  mape: number;
  mse: number;
  predictedColumn: [];
  predictedDate: [];
  rmse: number;
  lastModified: Date;
  periodicity: any;
  numericalValue: any;
}
