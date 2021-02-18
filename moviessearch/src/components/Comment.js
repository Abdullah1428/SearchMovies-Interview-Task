import React from "react";

import Moment from "react-moment";

function Comment({ data }) {
  return (
    <div>
      <div className="commenter">
        <h5>{`@${data.name}`}</h5>
        <span>
          <Moment format={"MM/DD/YYYY"} date={`${data.date}`} />
        </span>
      </div>
      <div className="commentDescription">
        <p>{data.text}</p>
      </div>
    </div>
  );
}

export default Comment;
