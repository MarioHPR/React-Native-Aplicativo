import React from 'react';
import { StyleSheet } from "react-native";
import DatePicker from 'react-native-datepicker';
import { HelperText } from 'react-native-paper';

interface Request {
  variavel: any;
  setVariavel: Function;
  label: string;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: 'white',
    fontSize: 30,
    height:59,
    borderWidth: 1,
    borderColor: "#20232a",
    borderRadius: 6,
  },
});

export default({variavel, setVariavel, label}: Request) => {

    return (
      <>
        <DatePicker
          style={styles.container}
          date={variavel}
          mode="date"
          placeholder={label}
          format="DD-MM-YYYY"
          minDate="1920-05-01"
          maxDate="2025-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          onDateChange={(date) => setVariavel(date)}
        />
        <HelperText type="error" visible={false}>
           
        </HelperText>
      </>
    );
}