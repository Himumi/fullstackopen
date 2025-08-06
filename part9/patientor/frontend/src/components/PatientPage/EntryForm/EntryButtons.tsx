import { Button } from "@mui/material";

interface Props {
  onCancel: () => void;
}
const EntryButtons = ({ onCancel }: Props) => {
  const handleCancel = onCancel;

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        variant="contained"
        style={{
          backgroundColor: "red",
        }}
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <Button type="submit" variant="contained">
        Add
      </Button>
    </div>
  );
};

export default EntryButtons;
