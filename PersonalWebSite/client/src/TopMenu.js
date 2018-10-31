import React from "react";
import { Link } from "react-router-dom";


const TopMenu = () => {
  return (
    <div className='TopMenu'>
      <div className="Left">
        <Link to={"/"}>נתן קרסני</Link>
      </div>
      <div className="Right">
        <Link to={"/Courses"}>קורסים</Link>
        <Link to={"/Recommendations"}>המלצות</Link>
        <Link to={"/News"}>חדשות</Link>
        <Link to={"/Contact"}>צור קשר</Link>
      </div>
      <div style={{ clear: "both" }} />
    </div>
  );
};

export default TopMenu;
