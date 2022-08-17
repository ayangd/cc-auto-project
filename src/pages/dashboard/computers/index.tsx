import { Box, Paper } from '@mui/material';
import { Computer as ComputerIcon } from '@mui/icons-material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { DefaultTemplate } from '@templates/Default';

const Home: NextPage = () => {
  const many = [];
  for (let i = 0; i < 100; i++) {
    many.push(<Box key={i}>{i}</Box>);
  }
  return (
    <DefaultTemplate
      title="Dashboard"
      menuList={[{ icon: ComputerIcon, label: 'Computers' }]}
    >
      <Head>
        <title>CC Auto Project</title>
        <meta name="description" content="The brain of CC project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box padding={4}>
        <Paper sx={{ padding: 4 }}>{many}</Paper>
      </Box>
    </DefaultTemplate>
  );
};

export default Home;
