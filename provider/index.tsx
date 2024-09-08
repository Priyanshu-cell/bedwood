import { Suspense } from "react";
import QueryProvider from "./QuerryProvider";
import RecoilContextProvider from "./RecoilProvider";




export const Providers = ({children}: {children:  React.ReactNode})=> {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <QueryProvider>
      <RecoilContextProvider>
        {children}
      </RecoilContextProvider>
    </QueryProvider>
    </Suspense>
  );
}