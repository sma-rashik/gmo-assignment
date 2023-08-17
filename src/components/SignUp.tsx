import { Container, CssBaseline, Box, Avatar, Typography, Grid, TextField, Button, Alert } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


interface SignUpProps {
    loginAlert: string
}
const SignUp = (props: SignUpProps) => {
    const [alert, setAlert] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const fields = ['First Name', 'Last Name', 'Phone Number', 'Email Address'];

        const emptyField = fields.find(field => data.get(field) === "" || data.get(field) === null) || "";
        setAlert(emptyField);
        if (emptyField.length !== 0) {
            return;
        }
        let user = {
            name: `${data.get('First Name')} ${data.get('Last Name')}`,
            email: data.get('Email Address'),
            phoneNumber: data.get('Phone Number'),
        }
        localStorage.setItem("user", JSON.stringify(user));
        navigate('/home')
    };
    return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="First Name"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="Last Name"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="Phone Number"
                                    label="Phone number"
                                    type="number"
                                    id="phone"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="Email Address"
                                    autoComplete="email"
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>

                    </Box>
                </Box>
                {alert !== "" && <Alert onClose={() => setAlert("")} severity="error">{alert} Field is empty.</Alert>}
                {props.loginAlert !== "" && <Alert severity="error">{props.loginAlert}</Alert>}
            </Container>
    )
}

export default SignUp
