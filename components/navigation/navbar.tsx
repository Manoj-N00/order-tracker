import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Logo from "./logo";
import MenuToggle from "./menu-toggle";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <nav className="py-4 border-b">
      <div className="md:w-[95%] w-[92%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="text-2xl py-1">Order tracker</div>
          <MenuToggle />
        </div>
        <div className="flex gap-8 items-center">
            
          
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
