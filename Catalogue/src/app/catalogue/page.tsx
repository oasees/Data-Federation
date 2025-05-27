
'use client'
import { useState, useEffect } from 'react';

import { Typography, Grid, Card, CardActions, CardContent, CircularProgress, CardMedia, Button, IconButton } from "@mui/material";
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import Link from "next/link";

export default function Catalogue() {
    const [loadingPage, setLoadingPage] = useState(true);

    var x = "A data product that not only detects the presence of Parkinson's disease but also assesses its severity. The deep learning model will provide a quantitative measure of disease severity based on specific voice features. This information can assist healthcare professionals in tailoring treatment plans and monitoring disease progression"
    // Estado de carga de la página
    useEffect(() => {

        setLoadingPage(false)
    }, []);

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
                        Catalogue
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4}>

                            <Card sx={{ maxWidth: 345, mt: 5 }}>
                                <CardMedia
                                    sx={{ height: 180 }}
                                    image="/static/images/cards/1.png"
                                    title="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Blade acoustic monitoring swarm system technical Report
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Technical Reports Based on Processed Acoustic Dataset: information included in the reports consists of datetime, wind turbine id, wind turbine height and diameter, and labelled anomalies.
                                    </Typography>
                                </CardContent>
                                <CardActions style={{ justifyContent: 'flex-end' }}>
                                    <Link href="/catalogue/1" color="secondary" >
                                        <Button sx={{ mb: 1, mr: 1 }} variant="outlined" size="small" startIcon={<ReadMoreIcon />}>
                                            see more
                                        </Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>

                            <Card sx={{ maxWidth: 345, mt: 5 }}>
                                <CardMedia
                                    sx={{ height: 180 }}
                                    image="/static/images/cards/2.jpg"
                                    title="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Parkinson disease diagnostic and rehabilitation
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {x.slice(0,245)}...
                                    </Typography>
                                </CardContent>
                                <CardActions style={{ justifyContent: 'flex-end' }}>
                                    <Link href="/catalogue/2" color="secondary" >
                                        <Button sx={{ mb: 1, mr: 1 }} variant="outlined" size="small" startIcon={<ReadMoreIcon />}>
                                            see more
                                        </Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>

                            <Card sx={{ maxWidth: 345, mt: 5 }}>
                                <CardMedia
                                    sx={{ height: 180 }}
                                    image="/static/images/cards/3.png"
                                    title="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Energy Consumption and Production Forecasting
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Technical Reports Based on Energy Consumption and Production Forecasting. The data product is the result of advanced analytics methods applied to diverse data sources, providing a detailed overview of the electricity landscape for charging stations.
                                    </Typography>
                                </CardContent>
                                <CardActions style={{ justifyContent: 'flex-end' }}>
                                    <Link href="/catalogue/3" color="secondary" >
                                        <Button sx={{ mb: 1, mr: 1 }} variant="outlined" size="small" startIcon={<ReadMoreIcon />}>
                                            see more
                                        </Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>

                    </Grid>


                    <Grid container spacing={3} >
                        <Grid item xs={12} sm={6} md={4}>

                            <Card sx={{ maxWidth: 345, mt: 5 }}>
                                <CardMedia
                                    sx={{
                                        height: 180, // Reducir la altura para hacer que la imagen se vea más pequeña
                                        objectFit: 'cover', // Ajusta la imagen para cubrir completamente el contenedor
                                    }} image="/static/images/cards/4.png"
                                    title="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Intelligent Drone Fleet management system for high mast inspection                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Leverage inspection data and anomaly detection to predict maintenance needs for infrastructure.
                                    </Typography>
                                </CardContent>
                                <CardActions style={{ justifyContent: 'flex-end' }}>
                                    <Link href="/catalogue/4" color="secondary" >
                                        <Button sx={{ mb: 1, mr: 1 }} variant="outlined" size="small" startIcon={<ReadMoreIcon />}>
                                            see more
                                        </Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>

                            <Card sx={{ maxWidth: 345, mt: 5 }}>
                                <CardMedia
                                    sx={{ height: 180 }}
                                    image="/static/images/cards/5.png"
                                    title="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Eathquake Impact Alert system                             </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        A data product designed for post-earthquake situational awareness and response. This system utilizes earthquake-related data to generate alarms and notifications, facilitating decision-making and response actions. The alarm is communicated to the client via SMS, BI and e-mail                                    </Typography>
                                </CardContent>
                                <CardActions style={{ justifyContent: 'flex-end' }}>
                                    <Link href="/catalogue/5" color="secondary" >
                                        <Button sx={{ mb: 1, mr: 1 }} variant="outlined" size="small" startIcon={<ReadMoreIcon />}>
                                            see more
                                        </Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>

                            <Card sx={{ maxWidth: 345, mt: 5 }}>
                                <CardMedia
                                    sx={{ height: 180 }}
                                    image="/static/images/cards/6.png"
                                    title="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                      Blade Acoustic Monitoring Swarm System: Real Time Telemetry
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Real time acoustic sensor data of a wind farm processed with Machine Learning algorithms and leveraged by Federated Learning. The available information includes audio data, real and residual spectrogram images, and blade failure classification results per wind turbine.
                                    </Typography>
                                </CardContent>
                                <CardActions style={{ justifyContent: 'flex-end' }}>
                                    <Link href="/catalogue/6" color="secondary" >
                                        <Button sx={{ mb: 1, mr: 1 }} variant="outlined" size="small" startIcon={<ReadMoreIcon />}>
                                            see more
                                        </Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>

                    </Grid>



                </div>
            )}
        </>
    );
}
