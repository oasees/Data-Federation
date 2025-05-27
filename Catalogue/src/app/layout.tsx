import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import MiniDrawer from '@/components/MiniDrawer';
import { Container } from '@mui/material';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* <ResponsiveAppBar></ResponsiveAppBar> */}
            <MiniDrawer></MiniDrawer>
            <Container  sx={{pt:5}}>
              {props.children}

            </Container>

          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
