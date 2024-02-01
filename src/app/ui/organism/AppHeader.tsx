"use client";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import { request } from "../../../../helpers/request";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "@/app/redux/usersSlice";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface AppHeaderProps {}

const AppHeader: FunctionComponent<AppHeaderProps> = () => {
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.users);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const getCurrentUser = async () => {
    try {
      const response = await request({
        endpoint: "/user/currentuser",
        method: "GET",
        data: {},
      });

      dispatch(setCurrentUser(response.data));
    } catch (error: any) {}
  };

  useEffect(() => {
    if (pathname !== "/login" && pathname !== "/register" && !!currentUser) {
      getCurrentUser();
    }
  }, [pathname]);

  const onLogout = async () => {
    try {
      await request({
        endpoint: "/user/logout",
        method: "POST",
        data: {},
      });
      dispatch(setCurrentUser(null));
      router.push("/login");
    } catch (error: any) {}
  };

  return (
    <AppBar
      position="absolute"
      color="default"
      sx={{
        top: 8,
        left: "5%",
        width: "90%",
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Simple blog
        </Typography>
        {!currentUser ? (
          <Button color="inherit">
            <Link
              className="no-underline bg-inherit text-inherit"
              href="/login"
            >
              Login
            </Link>
          </Button>
        ) : (
          <Button onClick={onLogout} color="inherit">
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
