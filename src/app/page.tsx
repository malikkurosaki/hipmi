import LayoutLandingPage from "./dev/landing-page/layout";
import PageLandingPage from "./dev/landing-page/page";
import PageDev from "./dev/page";

export default async function Page() {

  return (
    // <Page1 data={store.get("session")?.value} />
    // <div>
    //   <center>
    //     <h1>HIPMI PROJECT</h1>
    //     <p>Bip Production@Team_wibu</p>
    //     <a href="/dev">Project</a>
    //   </center>
    // </div>
    <LayoutLandingPage>
      <PageLandingPage/>
    </LayoutLandingPage>
  );
}
