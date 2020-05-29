import React from "react";
import { Link } from "react-router-dom";
//Add a state to a component
//Convert class based to functional based as we no longer use state

//No longer use the state instead we use the prop passed from User.js
/*constructor() {
    super();
    this.state = {
      id: "id",
      login: "mojombo",
      avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
      html_url: "https://github.com/mojombo",
    };
  }*/
//Called destructuring
const UserItem = ({ user: { login, html_url, avatar_url } }) => {
  //const { login, html_url, avatar_url } = props.user;

  return (
    <div className='card text-center'>
      <img
        src={avatar_url}
        alt=''
        className='round-img'
        style={{ width: "60px" }}
      />
      <h3>{login}</h3>

      <div>
        <Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1'>
          {" "}
          More
        </Link>
      </div>
    </div>
  );
};

export default UserItem;
