import { useEffect, useState } from "react";
import { child, ref, set, onValue } from "firebase/database";
import { db } from "./configs";
import { FlatList, StyleSheet, View, Text, TouchableHighlight, Button } from "react-native";

const DetailScreen = ({ navigation, route }) => {
    const [matchs, setMatchs] = useState()

    useEffect(() => {
        navigation.setOptions({
            title: "" + route.params.name,
        });
    }, [navigation]);

    useEffect(() => {
        getAllUserRanksFromDB()
    }, []);

    function getAllUserRanksFromDB() {
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

            let id = route.params.id
            if (typeof groups[id] !== 'undefined') { 
                console.log(groups[id])
                setMatchs(groups[id])
            }
        })
    }

    function GamerItem(data) {
        return (
            <View style={styles.container}>
                <View style={styles.dateTime}>
                    <Text>Match {data.match}: {data.date}</Text>
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <View style={[styles.nameContainer, { alignItems: 'flex-end'}]}>
                        <Text style={[styles.textName]}>{data.gamer1Name}</Text>
                    </View>
                    <View style={styles.pointContainer}>
                        <Text style={styles.textPoint}>{data.gamer1Score}</Text>
                        <Text style={styles.textPoint}> - </Text>
                        <Text style={styles.textPoint}>{data.gamer2Score}</Text>
                    </View>
                    <View style={[styles.nameContainer, { alignItems: 'flex-start' }]}>
                        <Text style={[styles.textName]}>{data.gamer2Name}</Text>
                    </View>
                </View>

            </View>
        );
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
            <FlatList
            style={{ width: '100%' }}
            data={matchs}
            renderItem={({item}) => GamerItem(item.data)}/>
        </View>
    );
}

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#c1c3c3'
    },
    dateTime: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pointContainer: {
        width: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: 10,
        marginEnd: 10
    },
    textPoint: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red'
    },
    nameContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    textName: {
        fontWeight: 'bold',
    }
})