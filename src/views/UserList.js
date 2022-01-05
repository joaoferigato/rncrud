import React, { useContext } from 'react'
import { View, FlatList, Alert } from 'react-native'
import { Avatar, Icon, ListItem } from 'react-native-elements'
import UsersContext from '../context/UsersContext'

export default props => {

    const { state, dispatch } = useContext(UsersContext)

    function confirmUserDeletion(user) {
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                    })
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    function getUserItem({ item: user }) {
        return (
            <ListItem
                key={user.id}
                bottomDivider
            >
                <Avatar source={{ uri: user.avatarUrl }} rounded />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <Icon
                    raised
                    name='pencil'
                    type='font-awesome'
                    color='orange'
                    onPress={() => props.navigation.navigate('UserForm', user)}
                />
                <Icon
                    raised
                    name='trash'
                    type='font-awesome'
                    color='red'
                    onPress={() => confirmUserDeletion(user)}
                />
            </ListItem>
        )
    }

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}