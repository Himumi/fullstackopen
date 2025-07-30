import diagnoseEntries from '../../data/diagnoseEntries';
import { DiagnoseEntry } from '../types';

export const getDiagnoses = (): DiagnoseEntry[] => {
  return diagnoseEntries;
};
