import React, { createContext } from "react";

// export const loggedIn = {
//   status: false
// };

// export const LoginContext = React.createContext(
//   loggedIn.status // default value
// );

const LoginContext = createContext([false, () => {}]);

export default LoginContext;
