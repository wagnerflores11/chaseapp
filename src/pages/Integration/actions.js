import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuAdmin from '../../components/menu';
import Footer from '../../components/footer';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {Modal, TextField, Button} from '@material-ui/core';
import axios from 'axios';



const columns= [
    { title: 'CD_SISTEMA', field: 'CD_SISTEMA' },
    { title: 'NR_CNPJ', field: 'NR_CNPJ' },
    { title: 'NM_CAMPO', field: 'NM_CAMPO' },
    { title: 'NR_SEQ', field: 'NR_SEQ', type: 'numeric'},
    { title: 'VL_SATELITE', field: 'VL_SATELITE', type: 'numeric'},
    { title: 'VL_ERP', field: 'VL_ERP', type: 'numeric'}
  ];

const baseUrl="http://localhost:6565/api/controller";

const useStyles = makeStyles((theme) => ({
    root: {display: 'flex',},
    title: {flexGrow: 1,},
    appBarSpacer: theme.mixins.toolbar,
    content: {flexGrow: 1,height: '100vh',overflow: 'auto',},
    container: {paddingTop: theme.spacing(4),paddingBottom: theme.spacing(4),},
    paper: {padding: 35,display: 'flex',overflow: 'auto',flexDirection: 'column',},
    formControl:{width:'100%'},
    fab: { float:'right' }
  }));

  const useStyles1 = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));

  

function Crud() {
    const classes = useStyles();
    const styles= useStyles1();
    const [data, setData]= useState([]);
    const [modalInsertar, setModalInsertar]= useState(false);
    const [modalEditar, setModalEditar]= useState(false);
    const [modalEliminar, setModalEliminar]= useState(false);
    const [CD_SISTEMASeleccionado, setCD_SISTEMASeleccionado]=useState({
      CD_SISTEMA: "",
      NM_CAMPO: "",
      id: "",
      NR_CNPJ: "",
      NR_SEQ: "",
      VL_SATELITE: "",
      VL_ERP: ""
    })
  
    const handleChange=e=>{
      const {name, value}=e.target;
      setCD_SISTEMASeleccionado(prevState=>({
        ...prevState,
        [name]: value
      }));
    }
  
    const peticionGet=async()=>{
      await axios.get(baseUrl)
      .then(response=>{
       setData(response.data);
      }).catch(error=>{
        console.log(error);
      })
    }
  
    const peticionPost=async()=>{
      await axios.post(baseUrl, CD_SISTEMASeleccionado)
      .then(response=>{
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
      }).catch(error=>{
        console.log(error);
      })
    }
  
    const peticionPut=async()=>{
      await axios.put(baseUrl+"/"+CD_SISTEMASeleccionado.NR_SEQ, CD_SISTEMASeleccionado)
      .then(response=>{
        var dataNueva= data;
        dataNueva.map(CD_SISTEMA=>{
          if(CD_SISTEMA.NR_SEQ===CD_SISTEMASeleccionado.NR_SEQ){
            CD_SISTEMA.CD_SISTEMA=CD_SISTEMASeleccionado.CD_SISTEMA;
            CD_SISTEMA.NM_CAMPO=CD_SISTEMASeleccionado.NM_CAMPO;
            CD_SISTEMA.NR_SEQ=CD_SISTEMASeleccionado.NR_SEQ;
            CD_SISTEMA.NR_CNPJ=CD_SISTEMASeleccionado.NR_CNPJ;
            CD_SISTEMA.VL_SATELITE=CD_SISTEMASeleccionado.VL_SATELITE;
            CD_SISTEMA.VL_ERP=CD_SISTEMASeleccionado.VL_ERP;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
      }).catch(error=>{
        console.log(error);
      })
    }
  
    const peticionDelete=async()=>{
      await axios.delete(baseUrl+"/"+CD_SISTEMASeleccionado.id)
      .then(response=>{
        setData(data.filter(CD_SISTEMA=>CD_SISTEMA.id!==CD_SISTEMASeleccionado.id));
        abrirCerrarModalEliminar();
      }).catch(error=>{
        console.log(error);
      })
    }
  
    const seleccionarCD_SISTEMA=(CD_SISTEMA, caso)=>{
      setCD_SISTEMASeleccionado(CD_SISTEMA);
      (caso==="Editar")?abrirCerrarModalEditar()
      :
      abrirCerrarModalEliminar()
    }
  
    const abrirCerrarModalInsertar=()=>{
      setModalInsertar(!modalInsertar);
    }
  
    
    const abrirCerrarModalEditar=()=>{
      setModalEditar(!modalEditar);
    }
  
    const abrirCerrarModalEliminar=()=>{
      setModalEliminar(!modalEliminar);
    }
  
    useEffect(()=>{
      peticionGet();
    }, [])
  
    const bodyInsertar=(
      <div className={styles.modal}>
        <h3>Novo CD_SISTEMA</h3>
        <TextField className={styles.inputMaterial} label="CD_SISTEMA" name="CD_SISTEMA" onChange={handleChange}/>
        <br />
        <TextField className={styles.inputMaterial} label="NR_CNPJ" name="NR_CNPJ" onChange={handleChange}/>          
  <br />
  <TextField className={styles.inputMaterial} label="NR_SEQ" name="NR_SEQ" onChange={handleChange}/>
        <br />
  <TextField className={styles.inputMaterial} label="NM_CAMPO" name="NM_CAMPO" onChange={handleChange}/>
        <br />
        <br />
  <TextField className={styles.inputMaterial} label="VL_SATELITE" name="VL_SATELITE" onChange={handleChange}/>
        <br />
        <br />
  <TextField className={styles.inputMaterial} label="VL_ERP" name="VL_ERP" onChange={handleChange}/>
        <br /><br />
        <div align="right">
          <Button color='secondary' onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
          <Button color="primary" onClick={()=>peticionPost()}>Inserir</Button>          
        </div>
      </div>
    )
  
    const bodyEditar=(
      <div className={styles.modal}>
        <h3>Editar CD_SISTEMA</h3>
        <TextField className={styles.inputMaterial} label="CD_SISTEMA" name="CD_SISTEMA" onChange={handleChange} value={CD_SISTEMASeleccionado&&CD_SISTEMASeleccionado.CD_SISTEMA}/>
        <br />
        <TextField className={styles.inputMaterial} label="NR_CNPJ" name="NR_CNPJ" onChange={handleChange} value={CD_SISTEMASeleccionado&&CD_SISTEMASeleccionado.NR_CNPJ}/>          
  <br />
  <TextField className={styles.inputMaterial} label="NR_SEQ" name="NR_SEQ" onChange={handleChange} value={CD_SISTEMASeleccionado&&CD_SISTEMASeleccionado.NR_SEQ}/>
        <br />
  <TextField className={styles.inputMaterial} label="NM_CAMPO" name="NM_CAMPO" onChange={handleChange} value={CD_SISTEMASeleccionado&&CD_SISTEMASeleccionado.NM_CAMPO}/>
        <br />
        <br />
  <TextField className={styles.inputMaterial} label="VL_SATELITE" name="VL_SATELITE" onChange={handleChange} value={CD_SISTEMASeleccionado&&CD_SISTEMASeleccionado.NR_SEQ}/>
        <br />
        <br />
  <TextField className={styles.inputMaterial} label="VL_ERP" name="VL_ERP" onChange={handleChange} value={CD_SISTEMASeleccionado&&CD_SISTEMASeleccionado.NR_SEQ}/>
        <br /><br />
        <div align="right">
          <Button color="secondary" onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
          <Button color="primary" onClick={()=>peticionPut()}>Confirmar</Button>          
        </div>
      </div>
    )
  
    const bodyEliminar=(
      <div className={styles.modal}>
        <p>Tem certeza que deseja excluir o registro <b>{CD_SISTEMASeleccionado && CD_SISTEMASeleccionado.CD_SISTEMA}</b>? </p>
        <div align="right">
        <Button color="secondary" onClick={()=>abrirCerrarModalEliminar()}>Não</Button>
          <Button color="primary" onClick={()=>peticionDelete()}>Sim</Button>        
        </div>
  
      </div>
    )

 

  return (
    <div className={classes.root}>
      
      <MenuAdmin title={'Integração'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={5}>
                  <Grid item xs={9} sm={12}>   
      <Button color='secondary' onClick={()=>abrirCerrarModalInsertar()}>Novo</Button>
      <br />
     <MaterialTable
          columns={columns}
          data={data}
          title="Atualização"  
          actions={[
            {
              icon: 'edit',
              tooltip: 'Editar CD_SISTEMA',
              onClick: (event, rowData) => seleccionarCD_SISTEMA(rowData, "Editar")
            },
            {
              icon: 'delete',              
              tooltip: 'Eliminar CD_SISTEMA',
              onClick: (event, rowData) => seleccionarCD_SISTEMA(rowData, "Eliminar")
            }
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
          localization={{
            header:{
              actions: "Opções"
            }
          }}
        />


        <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}>
          {bodyInsertar}
        </Modal>

        
        <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}>
          {bodyEditar}
        </Modal>

        <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
        </Modal>
      </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}

export default Crud;
