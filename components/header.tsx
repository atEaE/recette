"use client";

import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { label: "ホーム", path: "/", icon: <HomeIcon /> },
    { label: "検索", path: "/search", icon: <SearchIcon /> },
    { label: "食材一覧", path: "/ingredients", icon: <RestaurantMenuIcon /> },
    {
      label: "食材登録",
      path: "/ingredients/new",
      icon: <AddIcon />,
    },
  ];

  return (
    <AppBar position="static" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* アプリ名 */}
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              mr: 4,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            レシピアプリ
          </Typography>

          {/* ナビゲーションボタン */}
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1 }}
          >
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                href={item.path}
                startIcon={item.icon}
                sx={{
                  color: "white",
                  bgcolor:
                    pathname === item.path
                      ? "rgba(255, 255, 255, 0.15)"
                      : "transparent",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* モバイル表示用 */}
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              display: { xs: "flex", md: "none" },
              alignItems: "center",
            }}
          >
            レシピアプリ
          </Typography>

          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 0.5 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                href={item.path}
                size="small"
                sx={{
                  minWidth: "auto",
                  color: "white",
                  bgcolor:
                    pathname === item.path
                      ? "rgba(255, 255, 255, 0.15)"
                      : "transparent",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                {item.icon}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
