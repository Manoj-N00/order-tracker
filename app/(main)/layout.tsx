import { ReactNode } from "react";
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen rounded-md  h-screen overflow-hidden">
    
        <div className="flex flex-col justify-start items-center rounded-md  pt-5 w-full h-full">
          {children}
        </div>
    </div>
  );
};
export default layout;
