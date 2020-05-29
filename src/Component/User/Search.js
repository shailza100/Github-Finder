import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import GithubContext from "../../context/github/githubContext";

const Search = ({ setAlert }) => {
  const githubContext = useContext(GithubContext);
  const [text, setText] = useState(""); //with intial value blank

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("On you forgot to enter anything!!", "light");
    } else {
      githubContext.searchUsers(text);
      setText("");
    }
  };

  const onChange = (e) => {
    //this.setState({ [e.target.name]: e.target.value });
    setText(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users here...'
          value={text}
          onChange={onChange}
        />

        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers}>
          Clear
        </button>
      }
    </div>
  );
};

Search.propTypes = {
  setAlert: PropTypes.func.isRequired,
};
export default Search;
