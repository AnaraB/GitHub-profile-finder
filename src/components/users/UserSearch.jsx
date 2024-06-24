import { useState, useContext } from "react";
import GithubContext from "../../context/github/GitHubContext";
import AlertContext from "../../context/alert/AlertContext";

function UserSearch() {

  //pull out what we need from GithubContext and AlertContext
  const {users, searchUsers, clearUsers} = useContext(GithubContext)
  const {setAlert } = useContext(AlertContext)

  const [text, setText] = useState("");
  const handleChange = (e) => setText(e.target.value)
  const handleSubmit = (e) => {
    e.preventDefault()

    //validation
    if(text === ''){
      setAlert("Please enter something", 'error')
    } else {
      //call searchUsers func with passed text  value 
      searchUsers(text)
   
      //clear input field
      setText('')
    }
  }

 
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="search"
                value={text}
                onChange={handleChange}

              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* show  clear button only if any users profile are shown, use logical AND operator*/}
      {users.length > 0 && (
         <div>
         <button  type="submit" className="btn btn-ghost btn-lg"  onClick={clearUsers}>Clear</button>
       </div>
      )}
    </div>
  );
}

export default UserSearch;
