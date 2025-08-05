import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

interface GenderIconProps {
  gender: string;
}

const GenderIcon = (props: GenderIconProps) => {
  const { gender } = props;

  switch (gender) {
    case "male":
      return <MaleIcon />;
    case "female":
      return <FemaleIcon />;
    default:
      return null;
  }
};

export default GenderIcon;
