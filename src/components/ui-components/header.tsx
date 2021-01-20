import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SimpleLineIcons } from '@expo/vector-icons'; 
//@ts-ignore
import ToggleSwitch from 'toggle-switch-react-native';
import { StateType } from '../../types';
import { ActionCreator } from '../../reducer';

type HeaderType = {
    toggle: boolean | null, 
    setToggle: React.Dispatch<React.SetStateAction<boolean | null>>,
    toggleState: boolean | null,
    setToggleState: React.Dispatch<React.SetStateAction<boolean | null>>, 
};

export const Header: React.FC<HeaderType> = ({
    toggle, 
    setToggle, 
    toggleState,
    setToggleState
}) => {
    let toggleLamp = toggleState ? true : false;

    const lampScreenObject = useSelector((state: StateType) => state.lampScreenObject);
    const dispatch = useDispatch();

    // Функция обработки нажатия кнопки "Назад"
    const goBack = () => {
        setToggleState(null);
        dispatch(ActionCreator.clearLampScreen());
    };
    
    let component = (
        <View style={styles.header}>  
            <View style={styles.textBlock}>
                <View style={styles.subTextBlock}>
                    <Image style={styles.imageBackground} source={require("../../../assets/name-header.png")} />
                </View>
            </View> 


            <View style={styles.subTextHeaderMain}>
                <Text style={styles.textHeader}>НАСТРОЙКА ОСВЕЩЕНИЯ</Text>
            </View>
        </View>
    );

    lampScreenObject ? component = (
        <View style={styles.headerSecondScreen}>
            <View style={styles.textBlockSecond}>
                <View style={styles.subTextBlock}>
                    <Image style={styles.imageBackground} source={require("../../../assets/name-header.png")} />
                </View>
            </View>

            <View style={styles.subTextHeaderMainSecond}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => goBack()}>
                        <SimpleLineIcons name="arrow-left-circle" size={48} color="#fff" />
                    </TouchableOpacity>
                </View> 

                <View style={styles.headerMid}>
                    <Text style={styles.textHeader}>{ lampScreenObject.title }</Text>
                </View>

                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={() => alert(1)}>
                        <ToggleSwitch
                            isOn={ toggle === null ? toggleLamp : toggle }
                            onColor="green"
                            offColor="#39383d"
                            label=""
                            labelStyle={{ color: "black", fontWeight: "900" }}
                            size="large"
                            onToggle={(isOn: boolean) => {
                                setToggle(isOn);
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>        
    ) : component;

    return component;
};

const styles = StyleSheet.create({
    header: {
      height: `30%`,
      backgroundColor: `#6bc4fe`,
      alignItems: `center`
    },
    imageBackground: {
        flex: 1,
        width: `100%`,
        resizeMode: "contain",
        justifyContent: "center"
    },
    headerSecondScreen: {
        height: `40%`,
        backgroundColor: `#6bc4fe`,
        alignItems: `center`
    },
    headerLeft: {
        height: `100%`,
        justifyContent: `center`,
        alignItems: `center`
    },
    headerMid: {
        width: `60%`,
        alignItems: `center`,
        backgroundColor: `#fff`,
        borderRadius: 50
    },
    headerRight: {
        height: `100%`,
        justifyContent: `center`,
        alignItems: `center`
    },
    textBlock: {
        backgroundColor: `#6bc4fe`,
        width: `100%`,
        height: `80%`,
        alignItems: `center`,
        justifyContent: `flex-end`,
    },
    textBlockSecond: {
        backgroundColor: `#6bc4fe`,
        width: `100%`,
        height: `60%`,
        alignItems: `center`,
        justifyContent: `flex-end`,
    },
    subTextBlock: {
        height: `80%`,
        width: `100%`,
        // backgroundColor: `#4da8e7`,
        alignItems: `center`,
        justifyContent: `center`,
    },
    textHeader: {
        fontSize: 18,
        fontFamily: 'merri-weather-bold',
        color: `black`,
        padding: 10
    },
    subTextHeaderMain: {
        width: `100%`,
        height: `20%`,
        alignItems: `center`,
        justifyContent: `center`
    },
    subTextHeaderMainSecond: {
        width: `90%`,
        height: `40%`,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`
    }
});