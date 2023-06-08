import React from 'react';
import Navbar from '../ui/Navbar';
import { Container } from '@mui/material';

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};
export default function TreadPage({ darkMode, toggleDarkMode }: Props): JSX.Element {
  return (
    <div>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Container maxWidth="lg">TreadPage</Container>
    </div>
  );
}
