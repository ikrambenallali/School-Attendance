import { useParams } from "react-router-dom";
import AttendanceComponent from "./Attendance";

const AttendancePage = () => {
  const { sessionId } = useParams();

  console.log("sessionId depuis URL :", sessionId);

  if (!sessionId) {
    return <p>Session introuvable</p>;
  }

  return <AttendanceComponent sessionId={Number(sessionId)} />;
};

export default AttendancePage;
