import React from "react";
import { useEffect, useState } from "react";

function UserResults() {
  //empty array that will be filled with users 
  const [users, setUsers] = useState([])
  //whenever request is sent to api we need loader
  //while api is loading its true, when we get data NOT loading any more = false
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_GITHUB_URL}/users`,
      {
        headers: {
          Authorization: `token ${import.meta.env.VITE_APP_GITHUB_TOKEN}`
        },
      });

      const data = await response.json()
      setUsers(data)
      setLoading(false)
  };

  if(!loading){
    return <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
    {users.map((user) => (
      <h3>{user.login}</h3>
    ))}
  </div>;

  } else {
    return <h3>Loading...</h3>
  }
 
}

export default UserResults;
