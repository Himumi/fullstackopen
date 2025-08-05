import type { Diagnosis, DiagnosisMap } from "../../types";

export const convertToDiagnosis = (diagnosis: Diagnosis[]): DiagnosisMap => {
  return diagnosis.reduce((accumulator: DiagnosisMap, current) => {
    accumulator[current.code] = current;
    return accumulator;
  }, {});
};
