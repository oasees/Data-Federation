
'use client'
import { useState, useEffect } from 'react';

import { Typography, Card, CardActions, CardContent, CircularProgress, CardMedia, Button, TextField, Grid, Paper, Input } from "@mui/material";
import Link from "next/link";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SaveIcon from '@mui/icons-material/Save';

export default function DataProduct() {
    const [loadingPage, setLoadingPage] = useState(true);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [imagen, setImagen] = useState<File | null>(null); // Estado para la imagen adjunta
    const [nombreImagen, setNombreImagen] = useState<string>('Select image...'); // Estado para el nombre de la imagen

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Nombre:', nombre);
        console.log('Email:', email);
        // Aquí puedes enviar los datos a tu servidor o hacer lo que desees con ellos
    };
    // Estado de carga de la página
    useEffect(() => {
        setLoadingPage(false)
    }, []);
    const handleImagenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setImagen(file);
            setNombreImagen(file.name); // Guarda el nombre del archivo seleccionado
        }
    };

    return (
        <>
            {loadingPage ? ( // Si la página se está cargando, muestra un indicador de carga
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <CircularProgress />
                    <Typography variant="body1">Loading...</Typography>
                </div>
            ) : (
                <div>
                    <Typography variant="h4" gutterBottom style={{ fontWeight: 500, letterSpacing: 1, color: '#0f5ba4', borderBottom: '3px solid #0f5ba4' }}>
                        New data product...
                    </Typography>
                    <Paper>

                        <Grid container spacing={2} sx={{ mt: 3, pr: 3, pl: 3, pb: 3 }} >
                            <Grid item xs={12} style={{ color: '#67a2db', }}>
                                <Typography > Product</Typography>
                            </Grid>

                            <Grid item >
                                <TextField id="outlined-basic" label="Name" variant="outlined" size="small" />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField id="outlined-basic" label="Description" variant="outlined" size="small" multiline rows={3} fullWidth />
                            </Grid>

                            <Grid item xs={12} style={{ color: '#67a2db'}} sx={{ mt:3}}>
                                <Typography > Asset</Typography>
                            </Grid>


                            <Grid item xs={4}>
                                <TextField id="outlined-basic" label="Name" variant="outlined" size="small" />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField id="outlined-basic" label="Endpoint" variant="outlined" size="small" fullWidth />
                            </Grid>

                            {/* <Grid item xs={12}>
                                <Input
                                    fullWidth
                                    type="file"
                                    inputProps={{ accept: 'image/*' }} // Solo permite imágenes
                                    onChange={handleImagenChange}
                                />
                            </Grid> */}

                            <Grid container spacing={2} alignItems="center" sx={{ mt: 3, pr: 3, pl: 3, pb: 3 }} >



                                <Grid item xs={10}>

                                    <TextField
                                        disabled
                                        id="outlined-disabled"
                                        label="image"
                                        fullWidth
                                        value={nombreImagen} // Usa "value" en lugar de "defaultValue"

                                    > </TextField>

                                </Grid>

                                <Grid item xs={2}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="file-input"
                                        style={{ display: 'none' }}
                                        onChange={handleImagenChange}
                                    />
                                    <label htmlFor="file-input">
                                        <Button component="span" variant="outlined" startIcon={<AttachFileIcon />}>
                                            Image
                                        </Button>
                                    </label>
                                    {/* Muestra el nombre del archivo seleccionado */}

                                </Grid>
                                <Grid container justifyContent="flex-end" sx={{mt:10}} >
                                    <Grid item >
                                        <Button variant="contained"  startIcon={<SaveIcon />}>Save product</Button>
                                    </Grid>
                                </Grid>


                            </Grid>
                        </Grid>

                    </Paper>

                </div >
            )
            }
        </>
    );
}
