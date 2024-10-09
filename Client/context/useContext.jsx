import React, { createContext, useState } from "react";

const SideBarContext = createContext();

const MyProvider = ({ children }) => {
  const [clicked, setClicked] = useState(false);
  const [closeSideBar,setSideBar] = useState(false);
  const [logOut, setLogOut] = useState(false);
  



  return (
    <SideBarContext.Provider value={{ clicked, setClicked, closeSideBar, setSideBar, logOut, setLogOut}}>
      {children}
    </SideBarContext.Provider>
  );
};

export { SideBarContext, MyProvider };
