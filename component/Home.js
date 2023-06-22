import { FlatList, StyleSheet, View, Text, TouchableHighlight, Button, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { User, UserRank } from "./UserModel";
import { child, ref, set, onValue } from "firebase/database";
import { db } from "./configs";
import React from "react";

const OPTIONS = ['Hoàng Tùng', 'Nguyễn Bảo Ngọc', 'Phạm Ngọc Minh', 'Trần Văn Quyết', 'Nguyễn Thị Mỹ Duyên',
    'Nguyễn Doãn Đạt', 'Lê Thanh Trang', 'Vũ Hải Yến', 'Nguyễn Thái Quỳnh Như', 'Nguyễn Thu Hiền', 'Đào Trung Đức',
    'Phạm Đức Nam', 'Đinh Trung Kiên', 'Vũ Đàm Khánh', 'Hoàng Thị Minh Anh', 'Vũ Ngọc Minh'];

const HomeScreen = ({ navigation }) => {
    const [userRanks, setUserRanks] = useState(null)

    function getAllUserRanksFromDB() {
        setUserRanks([])
        const dbRef = ref(db, "matchs")
        let matchs = [];
        onValue(dbRef, (snapshot) => {
            snapshot.forEach(childSnapshot => {
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                matchs.push({ data })
            });

            var groups = matchs.reduce(function (r, a) {
                r[a.data.gamer1Id] = r[a.data.gamer1Id] || [];
                r[a.data.gamer1Id].push(a);
                return r;
            }, Object.create(null));

            const userRanks = [];

            for (let i = 0; i < 16; i++) {
                if (typeof groups[i] !== 'undefined') {
                    console.log(i + " " + groups[i].length)
                    let mp = groups[i].length
                    var win = 0
                    var draw = 0
                    var lose = 0
                    var point = 0
                    var dif = 0
                    for (let j = 0; j < groups[i].length; j++) {
                        let user = groups[i][j]
                        let isResult = user.data.isResult
                        if (isResult == 1) {
                            win += 1
                            point += 3
                        } else if (isResult == 0) {
                            draw += 1
                            point += 1
                        } else {
                            lose += 1
                        }

                        dif += user.data.gamer1Score - user.data.gamer2Score;
                    }

                    let userRank = new UserRank(i, OPTIONS[i], mp, win, draw, lose, point, dif)
                    userRanks.push(userRank);

                } else {
                    let userRank = new UserRank(i, OPTIONS[i], 0, 0, 0, 0, 0, 0)
                    userRanks.push(userRank);
                }

            }

            const sorted = userRanks.sort((user1, user2) => {
                return user2.point - user1.point || user2.dif - user1.dif
            })

            console.log(sorted)
            setUserRanks(sorted)

        });
    }

    // useEffect(() => {
    //     navigation.setOptions({
    //         headerRight: () => (
    //             <TouchableOpacity
    //                 onPress={() => { navigation.navigate('Update') }}>
    //                 <Image
    //                     style={{ width: 30, height: 30 }}
    //                     source={require('../assets/plus.png')} />
    //             </TouchableOpacity>
    //         )
    //     })
    // }, [navigation]);

    useEffect(() => {
        getAllUserRanksFromDB()
    }, []);

    return (
        <View style={styles.container}>
            <View style={[styles.rowContainer, { backgroundColor: '#ea5a06' }]}>
                <View style={[styles.rowItemContainer, { width: 30 }]}><Text style={[styles.rowItem, { fontWeight: 'bold' }]}></Text></View>
                <View style={[styles.rowItemContainer, { flex: 1 }]}><Text style={[styles.rowItemName, { fontWeight: 'bold' }]}>Name</Text></View>
                <View style={[styles.rowItemContainer, { width: 30 }]}><Text style={[styles.rowItem, { fontWeight: 'bold' }]}>MP</Text></View>
                <View style={[styles.rowItemContainer, { width: 30 }]}><Text style={[styles.rowItem, { fontWeight: 'bold' }]}>W</Text></View>
                <View style={[styles.rowItemContainer, { width: 30 }]}><Text style={[styles.rowItem, { fontWeight: 'bold' }]}>D</Text></View>
                <View style={[styles.rowItemContainer, { width: 30 }]}><Text style={[styles.rowItem, { fontWeight: 'bold' }]}>L</Text></View>
                <View style={[styles.rowItemContainer, { width: 30 }]}><Text style={[styles.rowItem, { fontWeight: 'bold' }]}>Pts</Text></View>
                <View style={[styles.rowItemContainer, { width: 30 }]}><Text style={[styles.rowItem, { fontWeight: 'bold' }]}>Dif</Text></View>
            </View>
            <FlatList
                style={{ width: '100%' }}
                data={userRanks}
                renderItem={({ item, index }) => GamerItem(item, index)}
            />
        </View>
    );

    function GamerItem(data, index) {
        return (
            <TouchableHighlight
                onPress={() => { navigation.navigate('Detail', data) }}
            >
                <View style={[styles.rowContainer, index % 2 && { backgroundColor: '#fcb68d' }]}>
                    <View style={[styles.rowItemContainer, { width: 30 }]}><Text style={styles.rowItem}>{index + 1}</Text></View>
                    <View style={[styles.rowItemContainer, { flex: 1 }]}><Text style={styles.rowItemName}>{data.name}</Text></View>
                    <View style={[styles.rowItemContainer, { width: 30 }]}><Text style={styles.rowItem}>{data.mp}</Text></View>
                    <View style={[styles.rowItemContainer, { width: 30 }]}><Text style={styles.rowItem}>{data.win}</Text></View>
                    <View style={[styles.rowItemContainer, { width: 30 }]}><Text style={styles.rowItem}>{data.draw}</Text></View>
                    <View style={[styles.rowItemContainer, { width: 30 }]}><Text style={styles.rowItem}>{data.lose}</Text></View>
                    <View style={[styles.rowItemContainer, { width: 30 }]}><Text style={styles.rowItem}>{data.point}</Text></View>
                    <View style={[styles.rowItemContainer, { width: 30 }]}><Text style={styles.rowItem}>{data.dif}</Text></View>
                </View>
            </TouchableHighlight>
        );
    };

}

export default HomeScreen;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderEndWidth: 1,
        borderColor: 'black',
    },
    rowContainer: {
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: 'black',
        backgroundColor: '#fee0cf'
    },
    rowItem: {
        width: 30,
        textAlign: 'center',
        borderLeftWidth: 1,
        borderColor: 'black',
    },
    rowItemName: {
        width: "100%",
        paddingStart: 10
    },
    rowItemContainer: {
        height: "100%",
        borderLeftWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',

    }
});