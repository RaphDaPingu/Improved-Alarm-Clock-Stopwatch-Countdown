import {useState, useEffect} from "react";
import {Text, View, SafeAreaView, StyleSheet, LogBox, FlatList} from "react-native";
import {Stack, useRouter} from "expo-router";

import {COLORS, icons, SIZES} from "../constants";
import {Header, Alarm, AddAlarmButton} from "../components";

import axios from "axios";
import InfiniteScroll from 'react-native-infinite-looping-scroll';
// import {setJSExceptionHandler} from 'react-native-exception-handler';

// const errorHandler = (e, isFatal) => {
//     console.log("Error");
// }

// setJSExceptionHandler(errorHandler, false)

const Home = () => {
    console._errorOriginal = console.error.bind(console);
    console.error = () => {};

    LogBox.ignoreAllLogs();

    const router = useRouter();

    // header
    
    const [pressedIcons, setPressedIcons] = useState({
        alarmClockPressed: true,
        stopWatchPressed: false,
        countDownPressed: false,
    });

    const handleIconPress = (icons) => {
        setPressedIcons(icons);
    };

    // alarm clock

    const [alarms, setAlarms] = useState([]);
    const [fetchAlarmsError, setFetchAlarmsError] = useState(false);

    const fetchAlarms = async () => {
        try {
          const response = await axios.get('http://10.100.102.16:3000/alarmClocks');
          const data = response.data; // Use response.data instead of JSON.stringify(response)
          setAlarms(data);
        }
        
        catch (error) {
          console.log('Error fetching alarms:', error);
          setFetchAlarmsError(true);
        }
    };

    const deleteAlarm = async ({ id }) => {
        try {
            await axios.delete(`http://10.100.102.16:3000/alarmClocks/${id}`);
            setAlarms(fetchAlarms());
        }
          
        catch (error) {
            console.log('Error deleting alarm:', error);
        }
    }

    const updateAlarm = async({ id }) => {
        // TODO: Open modal very similar to AddAlarmForm.jsx after pressing an alarm, allowing the user to change the time of the current alarm

        // try {
        //     await axios.put(`http://10.100.102.16:3000/alarmClocks/${id}`,
        //     {}
        //     );
        //     setAlarms(fetchAlarms());
        // }
          
        // catch (error) {
        //     console.log('Error updating alarm:', error);
        // }
    }

    const renderAlarm = ({ item }) => {
        const alarm = <View><Alarm key={item.id} id={item.id} time={item.time} deleteAlarm={deleteAlarm} /></View>;

        return alarm;
    }
    
    useEffect(() => {
        fetchAlarms();
    }, []); // Use an empty dependency array to fetch alarms only once when the component mounts

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: true,
                    // headerLeft: () => (
                    //     <View>
                    //         <Text>
                    //             Lol
                    //         </Text>
                    //     </View>
                    // ),
                    header: () => (
                        <Header onIconPress={handleIconPress}>
                        </Header>
                    ),
                    // headerRight: () => (
                    //     <View>
                    //         <Text>
                    //             Lol
                    //         </Text>
                    //     </View>
                    //     // <ScreenHeaderBtn iconUrl={images.profile} dimension="100%"></ScreenHeaderBtn>
                    // ),
                    headerTitle: ""
                }}>
            </Stack.Screen>

            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    paddingBottom: 100
                }}
            >

                
                {pressedIcons.alarmClockPressed
                &&
                <>
                    {!fetchAlarmsError &&
                        <>
                        {
                            alarms.length > 6
                            ?
                            <InfiniteScroll
                                data={alarms}
                                renderItem={renderAlarm}
                            />
                            :
                            <FlatList
                                data={alarms}
                                renderItem={renderAlarm}
                            />
                        }
                        </>
                    }

                    <AddAlarmButton setAlarms={setAlarms} fetchAlarms={fetchAlarms}></AddAlarmButton>
                </>
                }

                {pressedIcons.stopWatchPressed
                &&
                <Text>
                    stopWatch
                </Text>}

                {pressedIcons.countDownPressed
                &&
                <Text>
                    countDown
                </Text>}
            </View>
        </SafeAreaView>
    )
}

export default Home;