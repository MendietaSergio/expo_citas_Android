import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight,Platform, TouchableNativeFeedback, Keyboard} from 'react-native';//
import Cite from './components/Cites/Cites';
import Form from './components/Form/Form';
//View: es como un div
const App = ()=> {
  const [showForm, setShowForm] = useState(false)
  //estaos de citas
  const [citas, setCitas] = useState([
    { id: "1",paciente: "React", propietario: "Juan",sintomas: "No come"},
    { id: "2",paciente: "Native", propietario: "Perez",sintomas: "No duerme"},
    { id: "3",paciente: "Redux", propietario: "Carlos",sintomas: "No come"},
    { id: "4",paciente: "Hook", propietario: "Nahuel",sintomas: "No sale"},
  ])
  //ELIMINAR PACIENTES DEL ESTADO
  const deletePatient = (id) =>{
    setCitas ( ( citasActuales ) =>{
      return citasActuales.filter(cita => cita.id != id)
      // SI EL ID DEL PACIENTE ES DIFERENTE, SE GUARDA
    })
  }
  const viewForm = () =>{
    setShowForm(!showForm)
  }
  const closeKeyboard = () =>{
    Keyboard.dismiss()
  }
  return (
    // TouchableNativeFeedback => para que haga click en la pantalla y haga un efecto de sombra(click)
    <TouchableNativeFeedback onPress={() => closeKeyboard()} >
      <View style={styles.contenedor}>
        <Text style={styles.titulo} >Administrador de Citas</Text>
        <View>
          <TouchableHighlight onPress={() => viewForm()} style={styles.btnSubmit}>
              <Text style={styles.textSubmit}> {showForm ? 'Cancelar crear cita':'Crear nueva cita'} </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.content}> 
        {showForm ? 
          (
            <>
              <Text style={styles.titulo} >Crear nueva cita</Text>
              <Form citas={citas} setCitas={setCitas} setShowForm={setShowForm}/>
            </>
          ):(
            <>
              <Text style={styles.titulo} >{citas.length>0 ? 'Administra tus citas' : 'No hay citas, agrega una'}</Text>
              {/* lista de pacientes */}
              {/* MUESTRA LO QUE LA PANTALLA PUEDA MOSTRAR DE LA MISTA */}
              <FlatList styles={styles.list}
                data={citas}
                //desectruturo el array y obtengo item (item es propio de renderItem)
                renderItem={({item}) =><Cite item={item} deletePatient={deletePatient}/>}
                keyExtractor={ cita => cita.id }
                //* al igual que en map, tengo que pasarle los id que va a mapear
                />
              </>    
          )}
          </View>
      </View>
    </TouchableNativeFeedback>
    )

}

//PLATFORM => uso de condicion para ios y andriod
//ESTILOS
const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#AA076B",
    flex:1//llena el color de fondo a lo largo
  },
  titulo:{
    color: '#FFF', 
    textAlign:'center',
    marginTop:Platform.OS === 'ios' ? 40: 30,
    marginBottom: 20,
    fontSize: 24,
  
  },
  content:{
    flex: 1,
    marginHorizontal: "2.5%",
  },
  list:{
    flex: 1
  },
  btnSubmit :{
  padding: 10,
  backgroundColor:"#7d024e",
  marginVertical: 10
  },
  textSubmit: {
  color: "#FFF",
  textAlign: "center",
  fontWeight: "bold"
}
})

export default App;