import React from 'react';
import { Text, StyleSheet, View, TouchableHighlight} from 'react-native';//

const Cite = ({item, deletePatient}) =>{

    const dialogDelete = id =>{
        console.log("Eliminado....", id);
        deletePatient(id)
    }
    return(
        <View style={styles.cita}>
            <View >
                <Text style={styles.label}>Pacientes: </Text>
                <Text style={styles.text}>{item.paciente}</Text>
            </View>
            <View >
                <Text style={styles.label}>Propietario: </Text>
                <Text style={styles.text}>{item.propietario}</Text>
            </View>
            <View >
                <Text style={styles.label}>Síntomas: </Text>
                <Text style={styles.text}>{item.sintomas}</Text>
            </View>
            <View>
                <TouchableHighlight onPress={() => dialogDelete(item.id)} style={styles.btnDelete}>
                    <Text style={styles.textDelete}> Eliminar &times;</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cita: {
        backgroundColor: '#FFF',
        borderBottomColor: '#e1e1e1',
        borderStyle: "solid",
        borderBottomWidth: 1,
        paddingVertical: 20,//esto agrega el padding arriba y abajo
        paddingHorizontal: 10//esto le agrega el padding a los lados
    },
    label: {
        fontWeight: "bold",
        fontSize: 18,
        marginTop: 20
    },
    text: {
        fontSize: 18,
    },
    btnDelete :{
         padding: 10,
         backgroundColor:"red",
         marginVertical: 10
    },
    textDelete: {
        color: "#FFF",
        textAlign: "center",
        fontWeight: "bold"
    }
})

export default Cite;