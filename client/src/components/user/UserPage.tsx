import React, { useState } from 'react';
import Navbar from '../ui/Navbar';
import {
  Container,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Stack,
  Avatar,
  Grid,
} from '@mui/material';
import { UserType } from '../../types/UserTypes';
import EditUserForm from './EditUserForm';

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  user: UserType;
};

export default function UserPage({ darkMode, toggleDarkMode, user }: Props): JSX.Element {
  const [isEdit, setIsEdit] = useState(true);
  return (
    <div>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {isEdit ? (
              <Card sx={{ minWidth: 275, maxWidth: 775 }}>
                <Stack sx={{ mt: 2, ml: 2 }}>
                  <Avatar alt="Remy Sharp" src={`${user.avatar}`} sx={{ width: 56, height: 56 }} />
                </Stack>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase' }}
                    color="text.primary"
                    gutterBottom
                  >
                    {`${user.firstname} ${user.lastname}`}
                  </Typography>
                  <Typography variant="h5" component="div"></Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {user.location}
                  </Typography>
                  <Typography variant="body2">{user.about}</Typography>
                  <CardActions>
                    <Button size="small" onClick={() => setIsEdit(false)}>
                      Edit profile
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            ) : (
              <EditUserForm setIsEdit={setIsEdit} user={user} />
            )}
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ minWidth: 375, maxWidth: 375, height: '85vh' }}>
              <CardContent>
                <Typography sx={{ fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase' }}>
                  Friends
                </Typography>
              </CardContent>
            </Card>
          </Grid>
      </Container>
    </div>
  );
}
