import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button, Platform, TouchableHighlight, Alert, ScrollView } from "react-native"; //
import DateTimePicker from '@react-native-community/datetimepicker';
import shortid from 'shortid'
// import DateTimePickerModal from "@react-native-community/datetimepicker";

const Form = ({
  citas,
  setCitas,
  setShowForm
}) => {
  const [ patient, setPatient ] = useState('')
  const [ owner, setOwner ] = useState('')
  const [ symptom, setSymptom ] = useState('')
  const [ phone, setPhone ] = useState('')
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false);
    const [showDateTime, setShowDataTime] = useState(false)
    const [textDate, setTextDate] = useState('');
    const [textTime, setTextTime] = useState('');
  

    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode)
      console.log("click");
    };
    
  
    const onChange = (event, selectedDate) =>{
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios')
      setDate(currentDate);

      let temDate = new Date(currentDate);
      let fDate = temDate.getDate() + '/' + (temDate.getMonth() +1)+ '/' + temDate.getFullYear();
      let fTime = "Hora: " + temDate.getHours() + " | Minutos: "+temDate.getMinutes();
      setTextDate(fDate)
      setTextTime(fTime)
      console.log("fecha: ", fDate, "horas: ", fTime );
      console.log("fecha: ", textDate, "horas: ", textTime );
      setShowDataTime(true)
    }
  const CreateNewCite = ( ) =>{
    console.log("desde nueva cita");
    if(patient.trim() ==='' ||
       owner.trim() === '' ||
       symptom.trim() === '' ||
       phone.trim() === '' ||
       textDate.trim() === '' ||
       textTime.trim() === '' ){
        return ViewAlert()
    }
    const cita= {patient, owner, phone, symptom, textDate, textTime}
    cita.id = shortid.generate()
    // console.log(cita);
    //Agrego nueva cita
    const newCita = [...citas, cita];
    setCitas(newCita)
    //oculto formulario
    setShowForm(false)
    //resetear formulario de cita
    
  }
  const ViewAlert = () =>{
    Alert.alert(
      'Error',//titulo
      'Todos los campos son obligatorios',//cuerpo del alerta
      [{
        text:'OK'//Arreglo de botones
      }]
    )
    
  }
  return (
    <>
    {/* SCROLLVIEW RENDERIZA TODO PARA SCROLLEAR */}
      <ScrollView style={styles.form}>
        <View>
          <Text style={styles.label}>Paciente: </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setPatient(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Dueño: </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setOwner(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Teléfono: </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setPhone(text)}
            keyboardType="numeric" //para que aparezca el teclado numerico
          />
        </View>
        <View style={styles.viewBtn}>
          <Button title="Show Date Picker" onPress={() =>showMode('date')} />
        </View>
        <View style={styles.viewBtn}>
          <Button title="Show Time Picker" onPress={() => showMode('time')} />
        </View>
        {show && <DateTimePicker 
          testID='dateTimePicker'
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />}
      
        {showDateTime ? (
          <View>
            <Text>{textDate}</Text>
            <Text>{textTime}</Text>
          </View>
        ): null}
      
        <View>
          <Text style={styles.label}>Síntomas: </Text>
          <TextInput
            style={styles.input}
            multiline //similar a textarea
            onChangeText={(text) => setSymptom(text)}
          />
        </View>
        <View>
            <TouchableHighlight onPress={() => CreateNewCite()} style={styles.btnSubmit}>
                <Text style={styles.textSubmit}> Crear nueva cita </Text>
            </TouchableHighlight>
          </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: "#e1e1e1",
    borderWidth: 1,
    borderStyle: "solid",
  },
  viewBtn: {
    margin: 10
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
});

export default Form;
