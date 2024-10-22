// import React, { useEffect } from 'react';
// import { View, Text, Button, ActivityIndicator } from 'react-native';
// // import useStore from './src/store';

// const DataComponent = () => {
//   const { data, fetchData, isLoading } = useStore();

//   useEffect(() => {
//     fetchData(); // Fetch data on component mount
//   }, []);

//   return (
//     <View style={{ padding: 20 }}>
//       {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
//         data ? <Text>{JSON.stringify(data)}</Text> : <Text>No data available</Text>
//       )}
//     </View>
//   );
// };

// export default DataComponent;
