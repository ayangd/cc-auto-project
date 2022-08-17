import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  QuestionMark as QuestionMarkIcon,
  SvgIconComponent,
} from '@mui/icons-material';
import { ReactNode, useCallback, useState } from 'react';

export interface MenuItem {
  icon?: SvgIconComponent;
  label: string;
  onClick?: () => void;
}

export interface DefaultTemplateProps {
  children?: ReactNode[] | ReactNode;
  title: string;
  menuList?: MenuItem[];
}

interface DefaultTemplateDrawerChildrenProps {
  menuList: MenuItem[];
  toggleDrawerOpen: () => void;
}

function DefaultTemplateDrawerChildren(
  props: DefaultTemplateDrawerChildrenProps
) {
  const { menuList, toggleDrawerOpen } = props;
  return (
    <>
      <Toolbar />
      <Box sx={{ width: 240, py: 1 }}>
        <List>
          {menuList.map((menuItem, index) => {
            const Icon = menuItem.icon ?? QuestionMarkIcon;
            return (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() => {
                    toggleDrawerOpen();
                    menuItem.onClick?.();
                  }}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={menuItem.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </>
  );
}

export function DefaultTemplate(props: DefaultTemplateProps) {
  const { children, title, menuList } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setDrawerOpen(!drawerOpen);
  }, [drawerOpen]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
            onClick={toggleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawerOpen}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        sx={{
          display: {
            xs: 'block',
            sm: 'none',
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
            },
          },
        }}
      >
        <DefaultTemplateDrawerChildren
          menuList={menuList ?? []}
          toggleDrawerOpen={toggleDrawerOpen}
        />
      </Drawer>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawerOpen}
        variant="permanent"
        sx={{
          display: {
            xs: 'none',
            sm: 'block',
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
            },
          },
        }}
      >
        <DefaultTemplateDrawerChildren
          menuList={menuList ?? []}
          toggleDrawerOpen={toggleDrawerOpen}
        />
      </Drawer>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box sx={{ display: { xs: 'none', sm: 'block' }, width: 240 }} />
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'scroll',
            width: { xs: '100vw', sm: 'calc(100vw - 240px)' },
            height: 'calc(100vh - 64px)',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
