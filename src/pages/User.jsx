import { useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import GithubContext from "../context/github/GitHubContext"



function User() {
  const {getUser, user} = useContext(GithubContext)
  const params = useParams()

  //we add second argument as [], to run getUser function just once
  useEffect(() => {
  getUser(params.login)
  }, [])


  return (
    <div>{user.login}</div>
  )
}

export default User