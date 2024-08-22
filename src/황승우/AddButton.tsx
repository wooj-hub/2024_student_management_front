import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type Addbutton = {
  handleClick?: () => void;
};

const AddButton = ({ handleClick }: Addbutton) => {
  return (
    <>
      <Fab size="small" color="primary" aria-label="add" onClick={handleClick}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default AddButton;
