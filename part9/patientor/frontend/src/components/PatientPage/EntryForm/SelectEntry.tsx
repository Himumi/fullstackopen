import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface Props {
  entry: string;
  onChange: (event: SelectChangeEvent) => void;
}
const SelectEntry = ({ entry, onChange }: Props) => {
  const handleChange = onChange;

  return (
    <FormControl fullWidth sx={{ margin: "20px 0" }}>
      <InputLabel id="demo-simple-select-label">Entry</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={entry}
        label="Entry"
        onChange={handleChange}
      >
        <MenuItem value="HealthCheck">Health Check</MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
        <MenuItem value="OccupationalHealthcare">
          Occupational Healthcare
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectEntry;
