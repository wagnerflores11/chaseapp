import React from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        {new Date().getFullYear()}
        {'.'}
        <Link color="inherit" target="blank" href="https://altenburg.movidesk.com/Account/Login?ReturnUrl=%2f">
        <strong>Desenvolvido pela TI Altenburg.</strong> 
        </Link>{' '}
      </Typography>
    );
  }