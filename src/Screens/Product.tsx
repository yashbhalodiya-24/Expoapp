import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        const initialQuantities = {};
        data.forEach(product => {
          initialQuantities[product.id] = 0;
        });
        setQuantities(initialQuantities);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    };

    if (isFocused) {
      loadCart();
    }
  }, [isFocused]);

  const handleIncrease = id => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1
    }));
  };

  const handleDecrease = id => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: prevQuantities[id] > 0 ? prevQuantities[id] - 1 : 0
    }));
  };

  const handleAddToCart = async (item) => {
    if (quantities[item.id] > 0) {
      const updatedCart = cart.some(cartItem => cartItem.id === item.id)
        ? cart.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + quantities[item.id] }
              : cartItem
          )
        : [...cart, { ...item, quantity: quantities[item.id] }];

      setCart(updatedCart);
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [item.id]: 0
      }));

      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const handleGoToCart = async () => {
    // Reset all quantities to 0 when going to the cart
    const resetQuantities = {};
    products.forEach(product => {
      resetQuantities[product.id] = 0;
    });
    setQuantities(resetQuantities);
  
    // Navigate to the Cart screen
    navigation.navigate('Cart', { cart });
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image style={styles.productImage} source={{ uri: item.image }} />
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.productPrice}>₹{item.price}</Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleDecrease(item.id)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantities[item.id]}</Text>
        <TouchableOpacity onPress={() => handleIncrease(item.id)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#f53b57" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.container}
      />
      <View style={styles.cartButtonContainer}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={handleGoToCart}
        >
          <Text style={styles.cartButtonText}>Go to Cart ({cart.length})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  productContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productImage: {
    width: '100%',
    height: 130,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 16,
    color: '#000',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#333',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#f53b57',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButtonContainer: {
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  cartButton: {
    backgroundColor: '#f53b57',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Product;
