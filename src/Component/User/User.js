import React, { useEffect, Fragment, useContext } from "react";
import Spinner from "../Layout/Spinner";
import PropTypes from "prop-types";
import Repos from "../Repos/Repos.js";
import { Link } from "react-router-dom";
import GithubContext from "../../context/github/githubContext";

const User = ({ getUserRepos, repos, match }) => {
  const githubContext = useContext(GithubContext);
  const { user, getUser, loading } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);
  /*componentDidMount() {
    this.props.getUser(match.params.login);
    this.props.getUserRepos(match.params.login);
  }*/
  const {
    login,
    avatar_url,
    html_url,
    name,
    company,
    blog,
    location,
    hireable,
    bio,
    public_repos,
    public_gists,
    followers,
    following,
  } = user;

  //const { loading } = this.props.loading;
  if (loading) return <Spinner />;
  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back To Search
      </Link>
      Hireable:{""}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            className='round-img'
            alt=''
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>Location : {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-dark my-1'>
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>UserName : </strong>
                  {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company : </strong>
                  {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website : </strong>
                  {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers : {followers}</div>
        <div className='badge badge-success'>Following : {following}</div>
        <div className='badge badge-light'>Public Repos : {public_repos}</div>
        <div className='badge badge-dark'>Public gists : {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

User.propTypes = {
  getUserRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
};
export default User;