import {StatusBar} from 'expo-status-bar';
import {Alert, Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import {Checkbox} from 'expo-checkbox';
import {ReactElement, ReactNode, useState} from 'react';
import {v1} from "uuid";

export default function App() {
    const [enteredTitle, setEnteredTitle] = useState<string>('')
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'first task', isDone: false},
        {id: 2, title: 'second task', isDone: false},
        {id: 3, title: 'third task', isDone: true},
        {id: 4, title: 'fourth task', isDone: false},
    ])
    //console.log(tasks) from notebook

    const changeTaskStatus = (taskId: number, checked: boolean) => {
        setTasks(
            tasks.map((t) => t.id ===taskId? {...t, isDone: checked} :t)
        )
    }
    const addTask = () => {
        const newTask: TaskType = {id: tasks.length + 1, title: enteredTitle, isDone: false}
        setTasks(
            [...tasks, newTask]
        )
        //Alert.alert(JSON.stringify(newTask))
        setEnteredTitle('')

    }
    return (
        <View style={styles.container}>
            <Text>{enteredTitle}</Text>
            {/*стили можно передавать массивом*/}
            <HideKeyboard>
                <View style={[globalStyles.border, {width: '100%', height: '25%', paddingTop: '20%', alignItems: 'center'}]}>
                    <TextInput
                        style={[globalStyles.border, styles.input]}
                        value={enteredTitle}
                        onChangeText={setEnteredTitle}
                        placeholder={'enter new task title'}/>
                </View>
            </HideKeyboard>
            <View style={[globalStyles.border, {padding: 3, margin: 3}]}>
                <Button color={'#c2ac08'} title = {'add task'} onPress={addTask}/>
            </View>
            <View style={{width: '60%'}}>
                {tasks.map((t) => {
                    return <View key={t.id} style={[styles.tasksBox]}>
                        <Checkbox value={t.isDone} onValueChange={(checked) => {
                            changeTaskStatus(t.id, checked)}}/>
                        <Text> {t.title} - id: {t.id}</Text>
                    </View>
                })}
            </View>
            <StatusBar style="auto"/>
        </View>
    );
}

const HideKeyboard = ({children}: {children: ReactNode}) : ReactElement =>
(
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)


//types:
type TaskType = {
    id: number
    title: string
    isDone: boolean
}

//styles:
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#604f47',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '60%',
        backgroundColor: '#ffffff',
        fontSize: 18,
        paddingVertical: 2,
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    tasksBox: {
        flexDirection: 'row',
        backgroundColor: '#c2ac08',
        paddingVertical: 2,
        paddingHorizontal: 3,
        borderRadius: 6,
        margin: 3,
        justifyContent: 'space-between',
    }
});

//если нужно, можно использовать глобальные стили
const globalStyles = StyleSheet.create({
    border: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#f1c73b',
        borderRadius: 10,
    },

});