import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { useSelector } from 'react-redux';
import { useHttp } from '../../hooks/useHttp.hook';

import { StateType } from '../../types';

type ModalFormType = {
    showForm: boolean, 
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>, 
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
};

export const ModalForm: React.FC<ModalFormType> = ({ showForm, setShowForm, setModalVisible }) => {
    const { request } = useHttp();
    
    const { user } = useSelector((state: StateType) => ({
        user: state.user
    }));

    const [ value, onChangeText ] = useState<string>('');
    const [ password, onChangePassword ] = useState<string>('');
    const [ textInvalid, setTextInvalid ] = useState<string | null>(null);

    const refLogin = useRef<any>();

    let component: JSX.Element | null = (
        <View style={styles.invalidBlock}>
            <Text style={styles.textInvalid}>{ textInvalid }</Text>
        </View>
    );

    textInvalid ? component : component = null;

    useEffect(() => {
        refLogin.current.focus();
    }, []);

    // Функция клика на кнопку "Отправить"
    const pressHandler =  async () => {
        if (value === '' && password === '') {
            setTextInvalid(`Введите логин и пароль`);
            return null;
        } else if (value === '') {
            setTextInvalid(`Введите логин`);
            return null;
        } else if (password === '') {
            setTextInvalid(`Введите пароль`);
            return null;
        } else {
            setShowForm(!showForm);
            setModalVisible(false);

            if (user) {
                await request('http://192.168.4.1:80/getmac', 'POST', {name: value, password: password, login: user});
            }
        }
    };

    return (
        <View style={[styles.centeredView, styles.modalView]}>
            <Text style={styles.modalText}>Введите логин и пароль домашней сети:</Text>

            { component }

            <View style={styles.wrapperTextInput}>
                <TextInput 
                    style={styles.textInput}
                    value={value} 
                    onChangeText={text => onChangeText(text)} 
                    placeholder="Введите логин сети"
                    ref={refLogin} 
                />
                <TextInput
                    style={styles.textInput}
                    value={password} 
                    onChangeText={text => onChangePassword(text)} 
                    placeholder="Введите пароль сети"
                />
            </View>

            <View style={styles.flexButtons}>
                <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={pressHandler}
                >
                    <Text style={styles.textStyle}>Отправить</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                        setShowForm(!showForm);
                        setModalVisible(false);
                    }}
                >
                    <Text style={styles.textStyle}>Отмена</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    invalidBlock: {
        // borderColor: `red`,
        // borderWidth: 1,
        alignItems: `center`
    },
    textInvalid: {
        color: `red`,
        fontSize: 16
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        alignItems: `center`,
        width: `40%`
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        fontFamily: 'merri-weather-bold'
    },
    flexButtons: {
        flexDirection: `row`,
        width: `100%`,
        justifyContent: `space-around`
    },
    wrapperTextInput: {
        width: 200
    },
    textInput: {
        height: 40,
        borderColor: 'gray', 
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10
    },
    textStyle: {
        fontFamily: 'merri-weather-bold',
        fontSize: 18,
    }
});