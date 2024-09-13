import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store'

import MyComponent from '../Component/MyComponent'

const Apidemo = () => {
  return (
    <View>
       <Provider store={store}>
      <MyComponent />
    </Provider>
    </View>
  )
}

export default Apidemo