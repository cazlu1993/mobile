import React, {useState} from "react";
import {StyleSheet, Text, View, TextInput, Button} from "react-native";
import { useMutation, useQuery} from "@apollo/client";

import {GET_TASKS} from "./queries";
import {ADD_TASK, DELETE_TASK, UPDATE_TASK} from "./mutations";

interface ToDo {
    id: number,
    text: string;
    completed: boolean;
}

export default function Tasks() {
    const [removeTask] = useMutation(DELETE_TASK);
    const [updateTask] = useMutation(UPDATE_TASK);
    const [value, setValue] = useState<string>("");
    const [error, showError] = useState<Boolean>(false);
    const [addTask] = useMutation(ADD_TASK);
    const { data, loading, refetch: getTasks } = useQuery(GET_TASKS);

    const handleSave =  async () => {
        try {
            if (value.trim()) {
                await addTask({
                    variables: { text: value },
                });
                setValue("");
                getTasks();
            }
            console.log(`the value should be not empty`)
        } catch (error){
            console.log(error);
        }
    }

    const handleRemove = async (id) => {
        try {
            await removeTask({
                variables: { id },
            });
            getTasks();
        }catch (error){
            console.log(error);
        }
    }

    const handleComplete = async (id, completed) => {
        try {
            await updateTask({
                variables: { id, completed: !completed },
            });
            getTasks();
        }catch (error){
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            {loading && <Text>Loading...</Text>}
            <Text style={styles.title}>Todo List</Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder="Enter your todo task..."
                    value={value}
                    onChangeText={e => {
                        setValue(e);
                        showError(false);
                    }}
                    style={styles.inputBox}
                />
                <Button title="Add Task" onPress={handleSave} />
            </View>
            {error && (
                <Text style={styles.error}>Error: Input field is empty...</Text>
            )}
            <Text style={styles.subtitle}>Your Tasks :</Text>
            {data?.tasks?.length === 0 && <Text>No to do task available</Text>}
            {data?.tasks.map((toDo: ToDo) => (
                <View style={styles.listItem} key={`${toDo.id}_${toDo.text}`}>
                    <Text
                        style={[
                            styles.task,
                            { textDecorationLine: toDo.completed ? "line-through" : "none" }
                        ]}
                    >
                        {toDo.text}
                    </Text>
                    <Button
                        title={toDo.completed ? "Completed" : "Pending" }
                        onPress={() => handleComplete(toDo.id, toDo.completed)}
                    />
                    <Button
                        title="X"
                        onPress={() => handleRemove(toDo.id) }
                        color="crimson"
                    />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 35,
        alignItems: "center"
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 20,
        color: "purple"
    },
    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 10
    },
    addButton: {
        alignItems: "flex-end"
    },
    task: {
        width: 200
    },
    inputWrapper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20
    },
    inputBox: {
        width: 200,
        borderColor: "purple",
        borderRadius: 8,
        borderWidth: 2,
        paddingLeft: 8
    },
    title: {
        fontSize: 40,
        marginBottom: 40,
        fontWeight: "bold",
        textDecorationLine: "underline"
    },
    error: {
        color: "red"
    }
});
