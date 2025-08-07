import diagnoseEntries from '../../data/diagnoses';
import { DiagnoseEntry } from '../types';

export const getDiagnoses = (): DiagnoseEntry[] => {
  return diagnoseEntries;
};
