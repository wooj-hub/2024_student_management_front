const express = require("express");
const app = express();
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.listen(3001);

const DATABASE = {
  CONFIG: {
    host: "localhost",
    user: "root",
    password: "1234",
    database: "project_attendance",
  },
  QUERY: {
    LECTURE_ROOM: {},
    COURSE: {
      FINDALL: "select * from course",
      FINDIDNAME: "select course_id, course_name from course",
    },
    COURSE_SCHEDULE: {},
    CURRICULUM: {},
    TUTOR: {},
    EDUCATION: {},
    STUDENT: {
      FINDALL: "select * from student",
      ADDSTU:
        "insert into student (student_name,student_email,student_phone,course_id) values (?,?,?,?)",
    },
    ENROLLMENT: {},
  },
};

const executeQuery = async (query, params = []) => {
  try {
    const connection = await mysql.createConnection(DATABASE.CONFIG);
    const [results] = await connection.query(query, params);
    await connection.end();
    return results;
  } catch (err) {
    console.log(err);
  }
};

const getStudents = async () => executeQuery(DATABASE.QUERY.STUDENT.FINDALL);
const getCourse = async () => executeQuery(DATABASE.QUERY.COURSE.FINDALL);

app.get("/student/test", async (req, res) => {
  res.json(await getStudents());
});

app.get("/course", async (req, res) => {
  res.json(await getCourse());
  // console.log(res.json(await getCourse()));
});

// course 데이터 가져오기

const getCourseIdName = async () =>
  executeQuery(DATABASE.QUERY.COURSE.FINDIDNAME);

app.get("/course/course_list", async (req, res) => {
  res.send(await getCourseIdName());
});

// 데이터 전송
const addStuents = async (
  student_name,
  student_email,
  student_phone,
  course_id
) =>
  executeQuery(DATABASE.QUERY.STUDENT.ADDSTU, [
    student_name,
    student_email,
    student_phone,
    course_id,
  ]);

app.post("/student/register", async (req, res) => {
  const students = req.body;

  console.log("Received students:", students); // 데이터 출력하여 확인

  const results = [];
  for (const student of students) {
    const { student_name, student_email, student_phone, course_id } = student;
    const result = await addStuents(
      student_name,
      student_email,
      student_phone,
      course_id
    );
    results.push(result);
  }
  res.json({ results });
});
