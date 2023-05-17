import React from "react";
import { useRouterContext, useLink, useRouterType } from "@refinedev/core";
import { Link as MuiLink } from "@mui/material";
import type { RefineLayoutThemedTitleProps } from "@refinedev/mui";

import { logo, yariga } from "assets";

export const ThemedTitleV2: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  wrapperStyles,
}) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  return (
    <MuiLink
      to="/"
      component={ActiveLink}
      underline="none"
      sx={{
        backgroundColor: "#fcfcfc",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        ...wrapperStyles,
      }}
    >
      {collapsed ? (
        <img src={logo} alt="Yariga" width="28px" />
      ) : (
        <img src={yariga} alt="Refine" width="140px" />
      )}
    </MuiLink>
  );
};
