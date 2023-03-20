import SidebarRow from "./SidebarRow";

function Sidebar({ setCurrentChat,setRes, conversations, joke, logins, data }) {
  return (
    <div className="sm:px-4 sm:w-96">
      <div
        className={
          "sm:border-r-2 ml-2 sm:px-1 sm:py-2 bg-gray-200 rounded-xl shadow-md sm:flex flex-col"
        }
      >
        {joke?.map((c) => (
          <div key={c._id} onClick={() => setCurrentChat(c)}>
            <SidebarRow
              setRes={setRes}
              joke={joke}
              setCurrentChat={setCurrentChat}
              conversation={c}
              conversations={conversations}
              data={data}
              currentUser={logins}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
