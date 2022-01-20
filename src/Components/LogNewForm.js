import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function LogNewForm() {
  //     captainName (text)
  // title (text)
  // post (text)
  // mistakesWereMadeToday (checkbox)
  // daysSinceLastCrisis (number)
  // submit (submit)

  const navigate = useNavigate();
  const { index } = useParams();

  const [log, setLog] = useState({
    captainName: "",
    title: "",
    post: "",
    mistakesWereMadeToday: false,
    daysSinceLastCrisis: 0,
  });

  // on change, change the state log to value that is being input by user
  const handleTextChange = (e) => {
    setLog({ ...log, [e.target.id]: e.target.value });
  };

  const handleCheckBoxChange = () => {
    setLog({ ...log, mistakesWereMadeToday: !log.mistakesWereMadeToday });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API}/logs`, log)
      .then((res) => {
        console.log(res.data);
        navigate("/logs");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="captainName">Captain's Name</label>
        <input
          id="captainName"
          value={log.captainName}
          onChange={handleTextChange}
          placeholder="Captain's Name"
          type="text"
        />

        <label htmlFor="title">Title:</label>
        <textarea
          id="title"
          value={log.title}
          onChange={handleTextChange}
          placeholder="Title"
          type="text"
        />

        <label htmlFor="post">Post</label>
        <textarea
          id="post"
          value={log.post}
          onChange={handleTextChange}
          placeholder="Post"
          type="text"
        />

        <label htmlFor="mistakesWereMadeToday">Mistakes were made today:</label>
        <input
          id="mistakesWereMadeToday"
          value={log.mistakesWereMadeToday}
          onChange={handleCheckBoxChange}
          checked={log.mistakesWereMadeToday}
        />

        <label htmlFor="daysSinceLastCrisis">Days since last crisis:</label>
        <input
          id="daysSinceLastCrisis"
          value={log.daysSinceLastCrisis}
          onChange={handleTextChange}
          placeholder="Days since last crisis"
          type="number"
        />
        <br />
        <br />
        <input type="submit" />
      </form>

      <Link to={`/logs/${index}`}>
        <button>Go Back</button>
      </Link>
    </div>
  );
}

export default LogNewForm;