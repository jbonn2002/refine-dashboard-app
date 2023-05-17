import React from "react";
import { useSiderVisible } from "@refinedev/mui";
import { Menu } from "@mui/icons-material";
import { IconButton, ExtendButtonBase, IconButtonTypeMap } from "@mui/material";

const HamburgerIcon: ExtendButtonBase<IconButtonTypeMap<{}, "button">> = (
  props: React.PropsWithChildren
) => (
  <IconButton aria-label="open drawer" edge="start" {...props}>
    <Menu />
  </IconButton>
);

export const HamburgerMenu: React.FC = () => {
  const {
    siderVisible,
    setSiderVisible,
    drawerSiderVisible,
    setDrawerSiderVisible,
  } = useSiderVisible();

  return (
    <>
      <HamburgerIcon
        onClick={() => setDrawerSiderVisible?.(!drawerSiderVisible)}
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          ...(drawerSiderVisible && { display: "none" }),
          color: "#1e36e8",
        }}
      />
      <HamburgerIcon
        onClick={() => setSiderVisible?.(!siderVisible)}
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          ...(siderVisible && { display: "none" }),
          color: "#1e36e8",
        }}
      />
    </>
  );
};
