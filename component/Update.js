import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, SafeAreaView, Modal, TextInput, Button } from "react-native";
import { ModalPicker } from "./ModalPicker";
import { User, UserRank } from "./UserModel";
import { child, ref, set, onValue } from "firebase/database";
import { db } from "./configs";


const UpdateScreen = ({ navigation, route }) => {
    const OPTIONS = ['Hoàng Tùng', 'Nguyễn Bảo Ngọc', 'Phạm Ngọc Minh', 'Trần Văn Quyết', 'Nguyễn Thị Mỹ Duyên',
        'Nguyễn Doãn Đạt', 'Lê Thanh Trang', 'Vũ Hải Yến', 'Nguyễn Thái Quỳnh Như', 'Nguyễn Thu Hiền', 'Đào Trung Đức',
        'Phạm Đức Nam', 'Đinh Trung Kiên', 'Vũ Đàm Khánh', 'Hoàng Thị Minh Anh', 'Vũ Ngọc Minh'];
    const [gamer1, setChoseGamer] = useState(new User(-1, 'Select Gamer'));
    const [gamer2, setChoseGamer2] = useState(new User(-1, 'Select Gamer'));
    const [gamer1Score, setGamer1Score] = useState(0)
    const [gamer2Score, setGamer2Score] = useState(0)
    const [match, setMatch] = useState(0)
    const [date, setDate] = useState()
    const [count, setCount] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const changeModalVisibility = (bool) => {
        setModalVisible(bool)
    }
    const setGamer = (option) => {
        if (count == 0) {
            setChoseGamer(option)
        } else {
            setChoseGamer2(option)
        }

    }

    function create() {
        const newKey1 = Date.now() + "-" + gamer1.id + "-" + gamer2.id;
        const newKey2 = Date.now() + "-" + gamer2.id + "-" + gamer1.id;
        set(ref(db, 'matchs/' + newKey1), {
            match: match,
            date: date,
            gamer1Id: gamer1.id,
            gamer1Name: gamer1.name,
            gamer1Score: gamer1Score,
            gamer2Id: gamer2.id,
            gamer2Name: gamer2.name,
            gamer2Score: gamer2Score,
            isResult: (gamer1Score - gamer2Score > 0) ? 1 : (gamer1Score - gamer2Score == 0) ? 0 : -1
        });
        set(ref(db, 'matchs/' + newKey2), {
            match: match,
            date: date,
            gamer1Id: gamer2.id,
            gamer1Name: gamer2.name,
            gamer1Score: gamer2Score,
            gamer2Id: gamer1.id,
            gamer2Name: gamer1.name,
            gamer2Score: gamer1Score,
            isResult: (gamer2Score - gamer1Score > 0) ? 1 : (gamer2Score - gamer1Score == 0) ? 0 : -1
        }).then(() => alert('Complete')).catch((error) => (alert(error)));
    }



    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.choseContainer, {paddingStart: 20}]}>
                <Text style={styles.text}>Match</Text>
                <TextInput style={[styles.textInput, {flex: 1}]}
                    placeholder="1"
                    value={match}
                    onChangeText={(match) => { setMatch(match) }}>

                </TextInput>
            </View>

            <View style={[styles.choseContainer, {paddingStart: 20}]}>
                <Text style={styles.text}>Date</Text>
                <TextInput style={[styles.textInput, {flex: 1}]}
                    placeholder="01/01/2023"
                    value={date}
                    onChangeText={(date) => { setDate(date) }}>

                </TextInput>
            </View>

            <View style={styles.choseContainer}>
                <TouchableOpacity
                    onPress={() => { changeModalVisibility(true); setCount(0) }}
                    style={styles.touchableOpacity}>
                    <Text style={styles.text}>{gamer1.name}</Text>
                </TouchableOpacity>
                <TextInput style={styles.textInput}
                    placeholder="Score"
                    value={gamer1Score}
                    onChangeText={(gamer1Score) => { setGamer1Score(gamer1Score) }}>

                </TextInput>
            </View>

            <View style={styles.choseContainer}>
                <TouchableOpacity
                    onPress={() => { changeModalVisibility(true), setCount(1) }}
                    style={styles.touchableOpacity}>
                    <Text style={styles.text}>{gamer2.name}</Text>
                </TouchableOpacity>
                <TextInput style={styles.textInput}
                    placeholder="Score"
                    value={gamer2Score}
                    onChangeText={(gamer2Score) => { setGamer2Score(gamer2Score) }}>

                </TextInput>
            </View>

            <Button
                onPress={create}
                style={styles.choseContainer}
                title="Submit" />

            <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible}
            >
                <ModalPicker
                    changeModalVisibility={changeModalVisibility}
                    setData={setGamer} />
            </Modal>
        </SafeAreaView>
    );
}

export default UpdateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    choseContainer: {
        height: 60,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        margin: 10
    },
    textInput: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    text: {
        marginVertical: 0
    },
    touchableOpacity: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'flex-start'
    }
})