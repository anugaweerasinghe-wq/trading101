import { Helmet } from "react-helmet-async";

export default function AdminEditor() {
  return (
    <>
      <Helmet>
        <title>Publishing status | TradeHQ</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main className="container mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-2xl font-semibold">Browser publishing is disabled</h1>
        <p className="mt-4 text-muted-foreground">
          This page cannot create or edit CMS articles. The current database permits
          public reading only. Publishing requires an authorized server workflow;
          entering a key in the browser does not grant database write access.
        </p>
      </main>
    </>
  );
}
