import { Alert, Typography } from "@mui/material";

interface Props {
  message: string | null;
}

const Notif = (props: Props) => {
  const styles = {
    display: props.message ? "" : "none",
    margin: "10px 0",
  };
  return (
    <Alert severity="error" style={styles}>
      <Typography>{props.message}</Typography>
    </Alert>
  );
};

export default Notif;
