
import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import TodoList from '../Component/Todolist'

const Reduxdemo = () => {
  return (
    <View>
      <Provider store={store}>
    <TodoList />
  </Provider>
    </View>
  )
}

export default Reduxdemo