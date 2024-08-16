import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AuthContext } from "@/contexts/authcontext";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-6 md:px-8 lg:px-10">
      <nav className="hidden flex-col gap-9 text-sm font-medium md:flex md:flex-row md:items-center md:gap-6 lg:gap-8 xl:gap-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 text-lg font-semibold md:text-base ${
              isActive ? "text-foreground" : "text-muted-foreground"
            }`
          }
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only md:not-sr-only">LostIDs</span>
        </NavLink>
        <NavLink
          to="/search-id"
          className={({ isActive }) =>
            `transition-colors hover:text-foreground whitespace-nowrap ${
              isActive ? "text-foreground" : "text-muted-foreground"
            }`
          }
        >
          Search ID
        </NavLink>
        <NavLink
          to="/post-id"
          className={({ isActive }) =>
            `transition-colors hover:text-foreground whitespace-nowrap ${
              isActive ? "text-foreground" : "text-muted-foreground"
            }`
          }
        >
          Post Found ID
        </NavLink>
        <NavLink
          to="/claim-id"
          className={({ isActive }) =>
            `transition-colors hover:text-foreground whitespace-nowrap ${
              isActive ? "text-foreground" : "text-muted-foreground"
            }`
          }
        >
          Claim ID
        </NavLink>
        <NavLink
          to="/how-it-works"
          className={({ isActive }) =>
            `transition-colors hover:text-foreground whitespace-nowrap ${
              isActive ? "text-foreground" : "text-muted-foreground"
            }`
          }
        >
          How It Works
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `transition-colors hover:text-foreground whitespace-nowrap ${
              isActive ? "text-foreground" : "text-muted-foreground"
            }`
          }
        >
          Settings
        </NavLink>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 border-0 bg-black text-white md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 text-lg font-semibold ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`
              }
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">LostIDs</span>
            </NavLink>
            <NavLink
              to="/search-id"
              className={({ isActive }) =>
                `hover:text-foreground ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`
              }
            >
              Search ID
            </NavLink>
            <NavLink
              to="/post-id"
              className={({ isActive }) =>
                `hover:text-foreground ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`
              }
            >
              Post Found ID
            </NavLink>
            <NavLink
              to="/claim-id"
              className={({ isActive }) =>
                `hover:text-foreground ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`
              }
            >
              Claim ID
            </NavLink>
            <NavLink
              to="/how-it-works"
              className={({ isActive }) =>
                `hover:text-foreground ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`
              }
            >
              How It Works
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `hover:text-foreground ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`
              }
            >
              Settings
            </NavLink>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for your ID..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isAuthenticated ? (
              <>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span onClick={logout} className="cursor-pointer">
                    Logout
                  </span>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuLabel>Register/Login</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link to="/signup">Sign Up</Link></DropdownMenuItem>
                <DropdownMenuItem><Link to="/signin">Sign In</Link></DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
