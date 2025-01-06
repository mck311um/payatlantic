import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: LayoutProps) {
  return (
    <div className="w-full h-screen flex flex-row overflow-y-auto">
      <section className="flex flex-col p-6  ml-0 md:ml-20 lg:ml-20 w-full gap-5">
        <div className="w-full h-full rounded flex flex-col gap-10">
          {children}
        </div>
      </section>
    </div>
  );
}

export default PageLayout;
