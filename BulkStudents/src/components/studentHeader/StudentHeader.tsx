import { Box, Button, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ChangeEvent, useState } from "react";
import StudentInfo from "../studentInfo/StudentInfo";
import { Student } from "../../types/type";
import "../../App.css";
export default function StudentHeader() {
  const [value, setValue] = useState<number | null>(null);
  const [students, setStudents] = useState<Student[] | undefined>();
  const [error , setError] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(+e.target.value);
    setError(false);
  };
  const filterInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "e" || e.key === "E" || e.key === "-" || e.key === ".") {
      e.preventDefault();
    }
  };

  const handleAddStudents = () => {
    if (value) {
      const initialStudents = Array.from({ length: value-1 }, (_, index) => ({
        id: Date.now() + index,
        studentName: "",
        studentAge: null,
        studentEmail: "",
      }));

      setStudents(initialStudents);
      
      setValue(null);
    }
    if(value === null){
      setError(true)
    }
    
  };

  return (
    <>
      <Grid2
        xs={12}
        display="flex"
        justifyContent="flex-end"
        gap="10px"
        sx={{ p: 3 }}
      >
        <Box
          display="flex"
          gap="4px"
          justifyContent="center"
          alignItems="center"
        >
          <Typography sx={{ fontSize: "18px" }}>
            How many students you want to add:{" "}
          </Typography>
          <Box sx={{height: "40px"}}>
            <TextField
              id="search_student"
              type="number"
              label="enter range ..."
              name="search_student"
              autoComplete="deposit_amount"
              sx={{ mr: 2 }}
              inputProps={{ sx: { pr: 3 }, min: 1, max: 10000000000000 }}
              size="small"
              value={value || ""}
              onChange={handleChange}
              onKeyDown={filterInput}
              onPaste={(e) => {
                e.preventDefault();
              }}
            />
            {error && (
              <Typography className="error">please enter value</Typography>
            )}
          </Box>
        </Box>
        <Button variant="contained" onClick={handleAddStudents}>
          ADD
        </Button>
      </Grid2>
      <StudentInfo studentsData={students as Student[]} />
    </>
  );
}
