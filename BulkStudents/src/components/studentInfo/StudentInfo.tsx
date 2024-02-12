import { Box, Button, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { ChangeEvent, useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import { Student, collection } from "../../types/type";
import "../../App.css";
import { toast } from "react-toastify";

export default function StudentInfo({ studentsData }: collection) {
  const [defStudent, setDefStudent] = useState<Student>({
    id: Date.now() + 1,
    studentName: "",
    studentAge: null,
    studentEmail: "",
  });
  const [students, setStudents] = useState<Student[]>([]);
  const [combineData, setCombineData] = useState<Student[]>([]);
  const [error, setError] = useState({
    student_name: "",
    student_age: "",
    student_email: "",
    isNameEmpty: false,
    isAgeEmpty: false,
    isEmailEmpty: false,
  });
  const isValidEmail = (email: string) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  };
  useEffect(() => {
    if (studentsData?.length > 0)
      setStudents((prevData) => [...prevData, ...studentsData]);
  }, [studentsData]);

  const handleAppendColumn = () => {
    setStudents([
      ...students,
      { id: Date.now(), studentName: "", studentAge: null, studentEmail: "" },
    ]);
  };

  const handleDeleteColumn = (studentIndex: number) => {
    const studentList = [...students];
    const removeData = studentList?.filter(
      (_, index) => studentIndex !== index
    );
    setStudents(removeData);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "studentName") {
      if (value === "") {
        setError((prevError) => ({
          ...prevError,
          student_name: "student name required",
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          student_name: "",
          isNameEmpty: false,
        }));
        setDefStudent((prev) => ({ ...prev, [name]: value }));
      }
    }
    if (name === "studentAge") {
      if (value === "") {
        setError((prevError) => ({
          ...prevError,
          student_age: "Student age required",
        }));
      } else {
        const parseValue = parseInt(value, 10);
        setError((prevError) => ({
          ...prevError,
          student_age: "",
          isAgeEmpty: false,
        }));
        setDefStudent((prev) => ({ ...prev, [name]: parseValue }));
      }
    }
    if (name === "studentEmail") {
      console.log(value, defStudent.studentEmail, "2345234523453");
      if (value === "") {
        setError((prevError) => ({
          ...prevError,
          student_email: "Student email required",
        }));
      } else if (value !== "") {
        setError((prevError) => ({
          ...prevError,
          student_email:
            value && !isValidEmail(e.target.value) ? "Email is invalid" : "",
          isEmailEmpty: false,
        }));
        for (const data of students) {
          if (value === data?.studentEmail) {
            setError((prevError) => ({
              ...prevError,
              student_email: "Email is already exist",
            }));
          }
        }
      } else if (value === defStudent.studentEmail) {
        setError((prevError) => ({
          ...prevError,
          student_email: "Email is Already exist",
          isEmailEmpty: false,
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          student_email: "",
          isEmailEmpty: false,
        }));
        setDefStudent((prev) => ({ ...prev, [name]: value }));
      }
    }

    setDefStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const studentList: Student[] = [...students];

    if (name === "studentName" && value === "") {
      studentList[index]["studentName_error"] = "Student name required";
    } else if (name === "studentName" && value !== "") {
      studentList[index]["studentName_error"] = "";
      studentList[index]["isNameEmpty"] = false;
    }

    if (name === "studentAge" && value === "") {
      studentList[index]["studentAge_error"] = "Student age required";
    } else if (name === "studentAge" && value !== "") {
      studentList[index]["studentAge_error"] = "";
      studentList[index]["isAgeEmpty"] = false;
    }

    if (name === "studentEmail") {
      if (value === "") {
        studentList[index]["studentEmail_error"] = "Student email required";
      } else if (value !== "") {
        studentList[index]["studentEmail_error"] =
          value && !isValidEmail(value) ? "Email is invalid" : "";
        if (value === defStudent.studentEmail) {
          studentList[index]["studentEmail_error"] = "Email is already exist";
        } else {
          for (const data of students) {
            if (value === data.studentEmail) {
              studentList[index]["studentEmail_error"] =
                "Email is already exist";
            }
          }
        }
      } else {
        studentList[index]["studentEmail_error"] = "";
        studentList[index]["isEmailEmpty"] = false;
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (studentList[index] as any)[name] =
      name === "studentAge" && (value !== "" || null)
        ? parseInt(value, 10)
        : value;

    setStudents(studentList);
  };
  const filterInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "e" || e.key === "E" || e.key === "-" || e.key === ".") {
      e.preventDefault();
    }
  };

  const studentList = students?.map((student) => {
    const data: Student = {
      id: student?.id,
      studentName: student?.studentName,
      studentAge: student?.studentAge,
      studentEmail: student?.studentEmail,
    };
    return data;
  });
  useEffect(() => {
    setCombineData([defStudent, ...studentList]);
  }, [defStudent, studentList]);

  const validateInputList = () => {
    const studentList: Student[] = [...students];
    for (const index in students) {
      if (studentList[index]["studentName"].trim() === "") {
        studentList[index]["studentName_error"] = "Student name required";
        studentList[index]["isNameEmpty"] = true;
      }
      if (studentList[index]["studentAge"] === null) {
        studentList[index]["studentAge_error"] = "Student age required";
        studentList[index]["isAgeEmpty"] = true;
      }
      if (studentList[index]["studentEmail"].trim() === "") {
        studentList[index]["studentEmail_error"] = "Student email required";
        studentList[index]["isEmailEmpty"] = true;
      }
    }
    for (const item of students) {
      if (
        item.studentName.trim() === "" ||
        item.studentAge === null ||
        item.studentEmail.trim() === ""
      ) {
        return true;
      } else if (item.studentEmail_error) {
        return [true, item.studentEmail_error];
      }
    }
    return false;
  };

  const submitData = () => {
    const result = validateInputList();
    if (!defStudent.studentName) {
      setError((prevError) => ({
        ...prevError,
        isNameEmpty: true,
        student_name: "Student name required",
      }));
    }
    if (!defStudent.studentAge) {
      setError((prevError) => ({
        ...prevError,
        isAgeEmpty: true,
        student_age: "Student age required",
      }));
    }
    if (!defStudent.studentEmail) {
      setError((prevError) => ({
        ...prevError,
        isEmailEmpty: true,
        student_email: "Student email required",
      }));
    }
    if (
      !defStudent.studentName ||
      !defStudent.studentAge ||
      !defStudent.studentEmail
    ) {
      return;
    }
    if (error.student_email) {
      setError((prevError) => ({
        ...prevError,
        isEmailEmpty: true,
      }));
      toast.error("Please enter valid email");
      return;
    }

    if (result === true) {
      return;
    } else if (Array.isArray(result)) {
      const [hasError, emailError] = result;
      if (hasError) {
        toast.error(emailError);
      }

      return;
    }
    console.log(combineData, "4325432523");
    setDefStudent({
      id: Date.now(),
      studentName: "",
      studentAge: null,
      studentEmail: "",
    });
    setStudents([]);
    setCombineData([]);
  };

  return (
    <Grid2 marginTop={5}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ height: "55px" }}>
          <TextField
            required
            label="Student name"
            name="studentName"
            value={defStudent?.studentName}
            onChange={handleChange}
            sx={{
              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                borderColor: error.isNameEmpty ? "red" : "",
              },
              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                color: error.isNameEmpty ? "red" : "",
              },
            }}
          />
          {error && (
            <Typography className="error">{error.student_name}</Typography>
          )}
        </Box>
        <Box sx={{ height: "55px" }}>
          <TextField
            required
            type="number"
            label="Student age"
            name="studentAge"
            value={defStudent?.studentAge || ""}
            onChange={handleChange}
            inputProps={{ min: 1, max: 100000000000000 }}
            onKeyDown={filterInput}
            onPaste={(e) => {
              e.preventDefault();
            }}
            sx={{
              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                borderColor: error.isAgeEmpty ? "red" : "",
              },
              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                color: error.isAgeEmpty ? "red" : "",
              },
            }}
          />
          {error && (
            <Typography className="error">{error.student_age}</Typography>
          )}
        </Box>
        <Box sx={{ height: "55px" }}>
          <TextField
            required
            type="email"
            label="Student email"
            name="studentEmail"
            value={defStudent?.studentEmail}
            onChange={handleChange}
            sx={{
              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                borderColor: error.isEmailEmpty ? "red" : "",
              },
              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                color: error.isEmailEmpty ? "red" : "",
              },
            }}
          />
          {error && (
            <Typography className="error">{error.student_email}</Typography>
          )}
        </Box>

        <Fab
          color="primary"
          aria-label="add"
          size="small"
          onClick={handleAppendColumn}
        >
          <AddIcon />
        </Fab>
      </Box>
      {students?.length > 0
        ? students?.map((student, index) => (
            <Box
              key={student?.id}
              sx={{
                mt: 4,
                display: "flex",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ height: "55px" }}>
                <TextField
                  required
                  label="Student name"
                  name="studentName"
                  value={student?.studentName}
                  onChange={(e) => {
                    handleInputChange(e, index);
                  }}
                  sx={{
                    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      borderColor: student?.isNameEmpty ? "red" : "",
                    },
                    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                      color: student?.isNameEmpty ? "red" : "",
                    },
                  }}
                />
                {student.studentName_error && (
                  <Typography className="error">
                    {student.studentName_error}
                  </Typography>
                )}
              </Box>
              <Box sx={{ height: "55px" }}>
                <TextField
                  required
                  type="number"
                  label="Student age"
                  name="studentAge"
                  value={student?.studentAge}
                  onChange={(e) => {
                    handleInputChange(e, index);
                  }}
                  inputProps={{ min: 1, max: 10000000000000000 }}
                  onKeyDown={filterInput}
                  onPaste={(e) => {
                    e.preventDefault();
                  }}
                  sx={{
                    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      borderColor: student?.isAgeEmpty ? "red" : "",
                    },
                    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                      color: student?.isAgeEmpty ? "red" : "",
                    },
                  }}
                />
                {student.studentAge_error && (
                  <Typography className="error">
                    {student.studentAge_error}
                  </Typography>
                )}
              </Box>
              <Box sx={{ height: "55px" }}>
                <TextField
                  required
                  type="email"
                  label="Student email"
                  name="studentEmail"
                  value={student?.studentEmail}
                  onChange={(e) => {
                    handleInputChange(e, index);
                  }}
                  sx={{
                    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      borderColor: student?.isEmailEmpty ? "red" : "",
                    },
                    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                      color: student?.isEmailEmpty ? "red" : "",
                    },
                  }}
                />
                {student.studentEmail_error && (
                  <Typography className="error">
                    {student.studentEmail_error}
                  </Typography>
                )}
              </Box>

              <Fab
                color="primary"
                aria-label="add"
                size="small"
                onClick={() => handleDeleteColumn(index)}
              >
                <RemoveIcon />
              </Fab>
            </Box>
          ))
        : ""}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={5}
        marginBottom={5}
      >
        <Button variant="contained" onClick={submitData}>
          Submit Details
        </Button>
      </Box>
    </Grid2>
  );
}
