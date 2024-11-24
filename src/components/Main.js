import { Suspense, use } from "react";
import Loader from "./Loader";
import Page from "./Page";
import ThemeContext from "../theme";
//import OldPage from "./OldPage";
const Main = () => {
  //return <OldPage />;
  const theme = use(ThemeContext);
  return (
    <Suspense
      fallback={
        <div className={"row"}>
          <Loader color={theme.color} />
          loading...
        </div>
      }
    >
      <Page />
    </Suspense>
  );
};
export default Main;
