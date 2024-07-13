import React, { useState } from 'react';
import { Modal, StyleSheet, Button, View } from 'react-native';
import DatePicker from 'react-native-date-picker';

interface DateInputProps {
    onDateChange: (date: Date) => void;
    mode?: 'date' | 'time' | 'datetime';
}

const DateInput: React.FC<DateInputProps> = ({ onDateChange, mode = 'date' }) => {
    const [date, setDate] = useState(new Date());
    const [isPickerShow, setIsPickerShow] = useState(false);

    const showPicker = () => {
        setIsPickerShow(true);
    };

    const hidePicker = () => {
        setIsPickerShow(false);
    };

    return (
        <View>
            <Button title="Mostrar Selector de Fecha" onPress={showPicker} />
            <Modal
                transparent={true}
                visible={isPickerShow}
                animationType="slide"
                onRequestClose={hidePicker}
            >
                <View style={styles.modalView}>
                    <DatePicker
                        style={styles.datePicker}
                        mode={mode}
                        date={date}
                        onDateChange={(newDate) => {
                            setDate(newDate);
                            onDateChange(newDate);
                        }}
                        locale="es"
                    />
                    <Button title="Confirmar" onPress={hidePicker} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    datePicker: {
        
        // Tus estilos para el DatePicker
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 240,
        marginBottom: 240,
        backgroundColor: 'white',
        height: 100,
        color:"white"
    },
    
});

export default DateInput;
