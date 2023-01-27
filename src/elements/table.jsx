import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

function TableElement({ tableHead, tableData, widthArr }) {
    // const widthArr =  [50,100]
    return (
        <Table borderStyle={{ borderWidth: 1, borderColor: '#a0a0a0' }}>
            <Row data={tableHead}></Row>
            {
                tableData.map((rowData, index) => (
                    <Row
                        key={index}
                        data={rowData}
                        style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                        textStyle={styles.text}
                    />
                ))
            }
        </Table>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    header: {
        height: 50,
        backgroundColor: '#537791'
    },
    text: { 
        textAlign: 'center', 
        fontWeight: '100' 
    },
    dataWrapper: { 
        marginTop: -1 
    },
    row: { 
        height: 40, 
        backgroundColor: '#E7E6E1' 
    }
});

export default TableElement;