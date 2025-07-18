import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import store from "../store";

const Wrapper = ({children}) => {
  return <Provider store={store}>{children}</Provider>
}

export default Wrapper