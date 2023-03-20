import Onlinecard from "./Onlinecard";
function Onlinemodal({ setShowModal, online }) {
  return (
    <>
      <div className="justify-center h-screen w-screen items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full px-2 sm:w-2/3 my-auto mx-auto max-w-full">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h1 className="text-base font-mono font-bold">Online users</h1>

              <button
                className="text-red-500 h-11 bg-gray-200 rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
            {/*body*/}

            <div>
              <div>
                {online?.map((o) => (
                  <Onlinecard key={o.userId} user={o.userId} />
                ))}
              </div>

              {/*footer*/}
              <div className="flex w-full items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                <div className="flex items-center space-x-2">
                  <button
                    className="text-red-500 h-11 bg-gray-200 rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default Onlinemodal;
