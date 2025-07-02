import { ReactNode } from "react";
import { Vortex } from "@/components/aceternity-ui/vortex";
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen rounded-md  h-screen overflow-hidden">
      {/* <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={100}
        baseHue={120}
        className="flex items-center flex-col justify-center w-full h-full"> */}
        <div className="flex flex-col justify-start items-center rounded-md  pt-5 w-full h-full">
          {children}
        </div>
      {/* </Vortex> */}
    </div>
  );
};

export default layout;
