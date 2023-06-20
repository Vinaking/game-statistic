import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { User } from "./UserModel";

const OPTIONS = ['Hoàng Tùng', 'Nguyễn Bảo Ngọc', 'Phạm Ngọc Minh', 'Trần Văn Quyết', 'Nguyễn Thị Mỹ Duyên',
'Nguyễn Doãn Đạt', 'Lê Thanh Trang', 'Vũ Hải Yến', 'Nguyễn Thái Quỳnh Như', 'Nguyễn Thu Hiền', 'Đào Trung Đức',
'Phạm Đức Nam', 'Đinh Trung Kiên', 'Vũ Đàm Khánh', 'Hoàng Thị Minh Anh', 'Vũ Ngọc Minh'];
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ModalPicker = (props) => {
    const onPressItem = (item) => {
        props.changeModalVisibility(false)
        props.setData(item)
    }

    const options = OPTIONS.map((item, index) => {
        return (
            <TouchableOpacity
                style={styles.option}
                key={index}
                onPress={() => onPressItem(new User(index, item))}>

                <Text
                    style={styles.text}>{item}</Text>

            </TouchableOpacity>
        )
    })

    return (
        <TouchableOpacity
            onPress={() => props.changeModalVisibility(false)}
            style={styles.container}>

            <View style={[styles.modal, { width: WIDTH - 40, height: HEIGHT - 200 }]}>
                <ScrollView>{options}</ScrollView>
            </View>

        </TouchableOpacity>
    );

}

export { ModalPicker }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 10
    },
    text: {
        margin: 20,
        fontWeight: 'bold'
    },
    option: {
        alignItems: 'flex-start'
    }
})