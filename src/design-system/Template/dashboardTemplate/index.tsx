'use client';

import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { RootState } from '@/lib/redux/store';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useUserList } from '@/hooks/API';
import { UserInfo } from '@/design-system/Organisms';
import PostDetails from '@/design-system/Organisms/PostDetails';
import Grid from '@mui/material/Grid';
import ConnectionDetails from '@/design-system/Organisms/ConnectionDetails';

interface User {
  id: string;
  username: string;
  email: string;
  fullname: string;
  status: string;
  profile_image: string;
  [key: string]: any;
}

const UserDashboard: React.FC = () => {
  const { users } = useUserList();
  const router = useRouter();
  const user = useSelector(
    (state: RootState) => state.auth.user as User | null,
  );

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            You need to log in to view your dashboard
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push('/login')}
            sx={{ width: '200px' }}
          >
            Go to Login
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ display: 'flex', gap: 2, marginTop: '2rem' }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12} md={3}>
            <UserInfo user={user} />
          </Grid>
          <Grid
            item
            sm={12}
            md={6}
            sx={{
              maxHeight: 'calc(100vh - 150px)',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <PostDetails user={user} />
          </Grid>
          <Grid item sm={12} md={3}>
            <ConnectionDetails connections={users} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UserDashboard;
