import React, {useState} from 'react';
import {TextInput, StyleSheet, Button, View} from 'react-native';

type InputPropsType = {
	id: number
	title: string
	changeTitle: (taskId: number, title: string) => void
}

const Input = (props: InputPropsType) => {
	const [newTitle, setNewTitle] = useState<string>(props.title)
	return (
		<View style={{flexDirection: 'row'}}>
			<TextInput
				style={[styles.input]}
				value={newTitle}
				onChangeText={(title)=> {setNewTitle(title)}}
				//placeholder={'enter new task title'}
			/>
			<Button title={'+'} onPress={()=>{props.changeTitle(props.id, newTitle)}}/>
		</View>
	);
};

const styles = StyleSheet.create (
	{
		input: {
			width: '80%',
			height: '80%',
			backgroundColor: '#d7ca99',
			fontSize: 18,
			paddingVertical: 2,
			paddingHorizontal: 6,
			borderRadius: 6,
			//marginBottom: 5,
		},
	}
)



export {Input};