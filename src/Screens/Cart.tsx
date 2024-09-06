import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import CheckBox from 'expo-checkbox';

const Cart = ({ route, navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPaymentEnabled, setIsPaymentEnabled] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          setCartItems(parsedCart);
          calculateTotal(parsedCart);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load cart items.');
      }
    };

    if (isFocused) {
      loadCart();
    }
  }, [isFocused]);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleDelete = async (id) => {
    try {
      const updatedCart = cartItems.filter(item => item.id !== id);
      setCartItems(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      calculateTotal(updatedCart);
    } catch (error) {
      Alert.alert('Error', 'Failed to delete item. Please try again.');
    }
  };

  const handlePayment = async () => {
    try {
      // Simulate payment processing
      Alert.alert('Success', `Payment of ₹${totalPrice} was successful!`);

      // Clear the cart after payment
      setCartItems([]);
      setTotalPrice(0);
      setIsPaymentEnabled(false);

      // Remove the cart data from AsyncStorage
      await AsyncStorage.removeItem('cart');

      // Navigate back to the previous screen (or refresh the page)
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Payment failed. Please try again.');
    }
  };

  const renderItem = ({ item }) => (
    <ScrollView  contentContainerStyle={styles.container}>
    <View style={styles.cartItemContainer}>
      <Text style={styles.cartItemName}>{item.title}</Text>
      <Text style={styles.cartItemQuantity}>Quantity: {item.quantity}</Text>
      <Text style={styles.cartItemPrice}>Price: ₹{item.price}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );

  return (
    
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={
          <>
            <Text style={styles.totalPriceText}>Total: ₹{totalPrice}</Text>

            <View style={styles.checkboxContainer}>
              <CheckBox
                value={isPaymentEnabled}
                onValueChange={setIsPaymentEnabled}
              />
              <Text style={styles.checkboxLabel}>I agree to pay</Text>
            </View>

            {isPaymentEnabled && (
              <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
                <Text style={styles.paymentButtonText}>Pay ₹{totalPrice}</Text>
              </TouchableOpacity>
            )}
          </>
        }
      />
 
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexGrow: 1,
  },
  cartItemContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItemQuantity: {
    fontSize: 16,
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#f53b57',
  },
  deleteButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f53b57',
    // borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  paymentButton: {
    backgroundColor: '#f53b57',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Cart;
