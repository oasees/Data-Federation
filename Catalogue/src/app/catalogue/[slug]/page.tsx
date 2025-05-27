
'use client'

import React, { useState, useEffect } from 'react';
import { Alert, Snackbar, Typography, Grid, Paper, IconButton, CircularProgress, LinearProgress, Box, Card, List, ListItem, ListItemText, CardContent, CardMedia, Button, Stack } from "@mui/material";
import HandshakeIcon from '@mui/icons-material/Handshake';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import Modal from '@mui/material/Modal';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import { useParams } from 'next/navigation'

import copy from 'copy-to-clipboard';

const titles: { [key: string]: string } = {
  "1": 'Blade acoustic monitoring swarm system technical Report',
  "2": 'Parkinson disease diagnostic and rehabilitation',
  "3": 'Energy Consumption and Production Forecasting',
  "4": 'Intelligent Drone Fleet management system for high mast inspection',
  "5": 'Eathquake Impact Alert system',
  "6": 'Blade Acoustic Monitoring Swarm System: Real Time Telemetry',
};

const descriptions: { [key: string]: string } = {
  "1": 'Technical Reports Based on Processed Acoustic Dataset: information included in the reports consists of datetime, wind turbine id, wind turbine height and diameter, and labelled anomalies.',
  "2": "A data product that not only detects the presence of Parkinson's disease but also assesses its severity. The deep learning model will provide a quantitative measure of disease severity based on specific voice features. This information can assis...",
  "3": 'Technical Reports Based on Energy Consumption and Production Forecasting. The data product is the result of advanced analytics methods applied to diverse data sources, providing a detailed overview of the electricity landscape for charging stations.',
  "4": 'Leverage inspection data and anomaly detection to predict maintenance needs for infrastructure.',
  "5": 'A data product designed for post-earthquake situational awareness and response. This system utilizes earthquake-related data to generate alarms and notifications, facilitating decision-making and response actions. The alarm is communicated to the client via SMS, BI and e-mail ',
  "6": 'Real time acoustic sensor data of a wind farm processed with Machine Learning algorithms and leveraged by Federated Learning. The available information includes audio data, real and residual spectrogram images, and blade failure classification results per wind turbine.'
};


const assets: { [key: string]: string } = {
  "1": 'blade_acoustic_monitoring_swarm_system_technicalReport',
  "2": 'parkinson_disease_diagnostic_and_rehabilitation',
  "3": 'energy_consumption_and_production_forecasting',
  "4": 'intelligent_drone_fleet_management_system_for_high_mast_inspection',
  "5": 'eathquake_impact_alert_system',
  "6": 'mqtt_blade_acoustic_monitoring_swarm_system_technicalReport'
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  minWidth: 600, // Ancho mínimo
  minHeight: 350, // nd
};

const style2 = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  minWidth: 600, // Ancho mínimo
  minHeight: 400, // nd
};



function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString(); // Puedes ajustar el formato según tus necesidades
}

//export default function CatalogueDetails({ params }: { params: { slug: string } }) {
export default function CatalogueDetails() {

  const params =useParams()
  const title = titles[params.slug] || 'No title found';
  const description = descriptions[params.slug] || 'No description found';
  const asset = assets[params.slug] || 'No asset found';
  const [openModalTransfer, setOpenModalTransfer] = useState(false);
  const [openAgreementCreated, setOpenAgreementCreated] = React.useState(false);
  const [openModalAgreement, setOpenModalAgreement] = React.useState(false);
  const [policyIdState, setPolicyIdState] = useState('');
  const [contractIdNegotiationState, setContractIdNegotiationState] = useState('');

  const [stepState, setStepState] = useState(0);
  const [stepTransferState, setStepTransferState] = useState(0);

  const handleCloseModalTransfer = () => setOpenModalTransfer(false);

  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingTranfer, setLoadingTranfer] = useState(false);
  const [loadingNewAgreement, setLoadingNewAgreement] = useState(false);
  const [loadingNewAgreementTable, setLoadingNewAgreementTable] = useState(false);

  const [authToken, setAuthToken] = useState('');
  const [stateCompleted, setStateCompleted] = useState(false);

  const [agreementIdState, setagreementIdState] = useState('');
  const [transferIdSTate, setTransfertIdState] = useState('');

  const transferClick = async (agreementId: string) => {
    try {
      setLoadingTranfer(true);
      setOpenModalTransfer(true);
      setagreementIdState(agreementId)
      console.log('myAgreeemtid:' + agreementId)

      const responseTransfer = await fetch('/api/edc/transfer-processes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Indicar que el cuerpo es JSON
        },
        body: JSON.stringify({ "agreementId": agreementId }) // Utilizar el valor de la variable policyId
      });
      var dataTransfer = await responseTransfer.json()
      const dataTransferId = dataTransfer['@id'];
      setTransfertIdState(dataTransferId)
      setStepTransferState(1)
      console.log('dataTransferId:' + dataTransferId)

      await new Promise(resolve => setTimeout(resolve, 3000));
      setStepTransferState(2)


      const responseAuthToken = await fetch(`/api/edc/edrs?transfer-id=${dataTransferId}`, {
        method: 'GET', cache: 'no-store', next: { revalidate: 0 },
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache' // Evita que se almacene en caché en el cliente, servidor y red
        }
      });
      var dataAuthToken = await responseAuthToken.json()
      console.log(dataAuthToken)
      const token = dataAuthToken['authorization'];
      console.log('token:' + token)

      setAuthToken(token)

    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setLoadingTranfer(false);
  }


  const [agreementsState, setAgreementsState] = useState([]);

  const fetchAgreements = async () => {
    try {

      const responseAgreements = await fetch('/api/edc/contract-agreements', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json' // Indicar que el cuerpo es JSON
        },
        body: JSON.stringify({ "slug": params.slug }) // Utilizar el valor de la variable policyId
        // body: JSON.stringify({ "slug": useParams() }) // Utilizar el valor de la variable policyId

      });


      if (responseAgreements.ok) {
        const agreements = await responseAgreements.json();
        agreements.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => b['contractSigningDate'] - a['contractSigningDate']);

        setAgreementsState(agreements)
        console.log("3")

        console.log('agreements: ' + agreements)

      } else {
        console.error('Error al obtener los datos:', responseAgreements.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
    finally {

    }
  };

  useEffect(() => {

    setLoadingPage(true)

    fetchAgreements().finally(() => {
      // Operación que se ejecutará independientemente de si la promesa se resuelve o se rechaza
      setLoadingPage(false)
    });


  }, []);

  const createdClick = async () => {
    setPolicyIdState('')
    setContractIdNegotiationState('')
    setagreementIdState('')
    setStepState(0)
    setOpenModalAgreement(false)

    setOpenAgreementCreated(true)
    setLoadingNewAgreementTable(true)
    await fetchAgreements();
    setLoadingNewAgreementTable(false)
    setLoadingNewAgreement(false)

  }

  const completedClick = async () => {
    setTransfertIdState('')
    setAuthToken('')
    setStepTransferState(0)
    setOpenModalTransfer(false)
  }


  const agreementClick = async () => {
    try {



      setOpenModalAgreement(true)

      setLoadingNewAgreement(true)
      await new Promise(resolve => setTimeout(resolve, 1500));
      const res = await fetch('/api/edc/dataset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "slug": params.slug }) // Utilizar el valor de la variable policyId
      });
      const result = await res.json(); // Parsear la respuesta como JSON
      console.log(result)

      const policyId = result['odrl:hasPolicy']['@id'];
      console.log(policyId);
      setPolicyIdState(policyId)
      setStepState(1)
      await new Promise(resolve => setTimeout(resolve, 1500));

      const responseNegotiation = await fetch('/api/edc/contract-negotiations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Indicar que el cuerpo es JSON
        },
        body: JSON.stringify({ "policyId": policyId }) // Utilizar el valor de la variable policyId
      });


      var dataNegotiation = await responseNegotiation.json()
      const contractNegotiationId = dataNegotiation['@id'];
      setContractIdNegotiationState(contractNegotiationId)
      setStepState(2)

      console.log(contractNegotiationId)

      // hay que esperar un segundo a que se ponga el estado TERMINADO
      await new Promise(resolve => setTimeout(resolve, 5000));
      const responseAgreement = await fetch(`/api/edc/contract-negotiations?contract-negotiation-id=${contractNegotiationId}`, {
        method: 'GET',
      });
      var dataAgreement = await responseAgreement.json()
      console.log(dataAgreement)
      const contractAgreementId = dataAgreement['contractAgreementId'];
      setagreementIdState(contractAgreementId)
      setStepState(3)

      console.log(contractAgreementId)



    } catch (error) {
      console.error('Error fetching data:', error);
    }






  };
  const copyPublicEndpoint = () => {
    navigator.clipboard.writeText('http://oasees.tri.lan:9291/public');
  };


  const copyToken = () => {
    copy(authToken);
    //navigator.clipboard.writeText(authToken);
  };
  
  const generateMask = () => {
    return '*'.repeat(25);
  };

  const handleCloseAgreement = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAgreementCreated(false)
  };

  const handleCloseModalAgreement = (event: React.SyntheticEvent | Event, reason?: string) => {
    setPolicyIdState('')
    setContractIdNegotiationState('')
    setagreementIdState('')
    setStepState(0)

    if (reason === 'clickaway') {
      return;
    }

    setOpenModalAgreement(false)
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
          <Typography variant="h5" gutterBottom style={{ fontWeight: 500, letterSpacing: 1, color: '#0f5ba4', borderBottom: '3px solid #0f5ba4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {title}
          </Typography>

          <Paper>

            <Grid container spacing={2} sx={{ mt: 3, pr: 3, pl: 3, pb: 3 }} >

              <Grid item xs={2}>
                <img
                  src={`/static/images/cards/${params.slug}.png`}
                  alt="Descripción de la imagen"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '20px'
                  }}
                />
              </Grid>

              <Grid item xs={7} >
                <Typography gutterBottom sx={{ color: '#67a2db' }}>
                  Description:
                </Typography>
                <Typography sx={{ pt: 1 }}>
                  {description}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  <span style={{ color: '#67a2db' }}>Url:</span>&nbsp;
                  <span style={{ paddingTop: '1px' }}>http://oasees.tri.lan:9194/protocol</span>
                </Typography>

                <Typography sx={{ mt: 2 }}>
                  <span style={{ color: '#67a2db' }}>Asset id:</span>&nbsp;
                  <span style={{ paddingTop: '1px' }}>{asset}</span>
                </Typography>
              </Grid>

              <Grid item xs={3}>
                {/* Primer Paper */}
                <Typography gutterBottom sx={{ color: '#67a2db' }}>
                  Owner:
                </Typography>
                <Typography gutterBottom>
                  OASEES
                </Typography>
              </Grid>

            </Grid>
          </Paper>




          <Paper>

            <Stack sx={{ m: 3, p: 2 }} direction="row" justifyContent="space-between" alignItems="center">

              <Typography variant="h6" gutterBottom style={{ fontWeight: 500, letterSpacing: 1, color: '#0f5ba4' }}>Contract agreements</Typography>
              {agreementsState.length > 0 && (<Button variant="outlined" size="small" startIcon={<HandshakeIcon />} onClick={agreementClick}>new agreement</Button>)}

            </Stack>
            {agreementsState.length > 0 ? (
              <div>
                {loadingNewAgreementTable ?

                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />

                  </div>
                  :

                  <TableContainer component={Paper}>
                    {/* {loadingNewAgreement ? <LinearProgress /> : null} */}

                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" sx={{ color: '#67a2db' }}>Identifier</TableCell>
                          <TableCell align="center" sx={{ color: '#67a2db' }}>Signing date</TableCell>
                          <TableCell align="center" sx={{ color: '#67a2db' }}>Transfer</TableCell>

                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {agreementsState.map((agreement) => (
                          <TableRow
                            key={agreement['@id']}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell align="center" component="th" scope="row">
                              {agreement['@id']}
                            </TableCell>
                            <TableCell align="center">{formatTimestamp(agreement['contractSigningDate'])}</TableCell>
                            <TableCell align="center">
                              {/* <Button variant="contained" color="primary" size="small" startIcon={<SendIcon />}  >transfer</Button> */}
                              <IconButton onClick={() => transferClick(agreement['@id'])} aria-label="send" color="primary">
                                <CompareArrowsIcon />
                              </IconButton>
                            </TableCell>

                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                }
              </div>
            ) : (
              <div>
                <div>
                  <Grid container alignItems="center">
                    <Grid item xs={12}>
                      <Typography gutterBottom align="center">
                        No items found.
                      </Typography>
                    </Grid>
                  </Grid >

                  <Grid container alignItems="center" justifyContent="center">
                    <Grid item>
                      <Button sx={{ m: 2, mb: 5 }} variant="contained" size="small" startIcon={<HandshakeIcon />} onClick={agreementClick} >
                        contract agreement
                      </Button>
                    </Grid>
                  </Grid>
                </div >
              </div>
            )}


            <Modal open={openModalAgreement} onClose={handleCloseModalAgreement} >
              <Box sx={style}>
                <Stepper activeStep={stepState} orientation="vertical">
                  <Step key="0">
                    <StepLabel>
                      Fetching dataset identifier from edc connector...
                      <div>
                        {policyIdState && (
                          <Typography variant="caption">
                            Dataset id: {policyIdState.slice(0, 30)}...
                          </Typography>
                        )}
                      </div>
                    </StepLabel>
                    <StepContent>
                      <LinearProgress />
                    </StepContent>
                  </Step>
                  <Step key="1">
                    <StepLabel>
                      Requesting contract negotiation for the dataset...

                      <div>
                        {contractIdNegotiationState && (
                          <Typography variant="caption">Contract negotiation id:{contractIdNegotiationState}</Typography>
                        )}
                      </div>
                    </StepLabel>
                    <StepContent>
                      <LinearProgress />
                    </StepContent>
                  </Step>
                  <Step key="2">
                    <StepLabel>
                      Getting the contract agreement identifier...
                      <div>
                        {agreementIdState && (
                          <Typography variant="caption">Contract agreement id:{agreementIdState}</Typography>
                        )}
                      </div>
                    </StepLabel>
                    <StepContent>
                      <LinearProgress />
                    </StepContent>
                  </Step>
                </Stepper>
                <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ mt: 3, pr: 2 }}>
                  {agreementIdState && (
                    <Button variant="outlined" color="success" onClick={createdClick} startIcon={<CheckIcon />}>
                      created!
                    </Button>)}

                </Stack>
              </Box>
            </Modal>

            <Modal open={openModalTransfer} onClose={handleCloseModalTransfer} >

              <Box sx={style2}>
                <Stepper activeStep={stepTransferState} orientation="vertical">
                  <Step key="0">
                    <StepLabel>
                      Requesting the transfer of data...
                      <div>
                        {transferIdSTate && (
                          <Typography variant="caption">
                            Transfer id: {transferIdSTate}
                          </Typography>
                        )}
                      </div>
                    </StepLabel>
                    <StepContent>
                      <LinearProgress />
                    </StepContent>
                  </Step>
                  <Step key="1">
                    <StepLabel>
                      Waiting for the transfer state to be completed...
                      <div>
                        {stepTransferState == 2 && (
                          <Typography variant="caption">State: Completed</Typography>
                        )}
                      </div>
                    </StepLabel>
                    <StepContent>
                      <LinearProgress />
                    </StepContent>
                  </Step>
                  <Step key="2">
                    <StepLabel>
                      Getting the public endpoint and the token to access the data...


                    </StepLabel>
                    <StepContent>

                      <div>
                        {authToken ?
                          <div>

                            <Stack direction="row" justifyContent="space-between" alignItems="left" sx={{ pl: 2 }}>
                              <Typography sx={{ mt: 2 }} color="#7f8387">
                                public endpoint:
                              </Typography>
                              <Stack direction="row" alignItems="center">
                                <Box sx={{ width: 8 }} /> {/* Añadir un espacio de 8 unidades */}

                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                  http://oasees.tri.lan:9291/public
                                </Typography>
                                <IconButton onClick={copyPublicEndpoint} color="primary">
                                  <ContentCopyIcon />
                                </IconButton>
                              </Stack>
                            </Stack>

                            <Stack direction="row" justifyContent="space-between" alignItems="left" sx={{ pl: 2 }}>
                              <Typography id="modal-modal-description" sx={{ mt: 2 }} color="#7f8387">
                                Authorization:
                              </Typography>
                              <Stack direction="row" alignItems="center">

                                <Typography>{generateMask()}</Typography>

                                <IconButton onClick={copyToken} color="primary">
                                  <ContentCopyIcon />
                                </IconButton>
                              </Stack>
                            </Stack>
                          </div> :
                          <LinearProgress />
                        }
                      </div>


                    </StepContent>
                  </Step>
                </Stepper>
                <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ mt: 3, pr: 2 }}>
                  {authToken && (
                    <Button variant="outlined" color="success" onClick={completedClick} startIcon={<CheckIcon />}>
                      Completed!
                    </Button>)}

                </Stack>
              </Box>

            </Modal>


          </Paper >
        </div >
      )
      }
    </>
  );
}
