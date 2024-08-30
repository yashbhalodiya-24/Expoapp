// import {Icon} from 'native-base';
import { ScrollView } from 'native-base';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { APP_COLORS } from '../Config/Theme';

const DATA = [
  {
    id: '1',
    bankName: 'Black Rockes',
    cardNo: '9090 9090 9090 9090',
    name: 'Tony Stark',
    cvv: '111',
    expireDate: '01/99',
    image: require('../assets/visa.png'),
    bg_color: '#000',
  },
  {
    id: '2',
    bankName: 'JPMorgan Chase',
    cardNo: '4444 8888 4444 8888',
    name: 'Thor',
    cvv: '888',
    expireDate: '01/88',
    image: require('../assets/visa.png'),
    bg_color: '#D8A444',
  },
  {
    id: '3',
    bankName: 'Bank of America',
    cardNo: '9999 8888 9999 8888',
    name: 'Steve Rogers',
    cvv: '999',
    expireDate: '01/11',
    image: require('../assets/masterCard.png'),
    bg_color: '#c4c4c4',
  },
];

const Carddetails = () => {
  const [details, setDetails] = useState([]);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => setDetails(item)} style={{paddingLeft:10,paddingRight:10}}>
        <View style={[styles.card, {backgroundColor: item.bg_color}]}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>
            {item.bankName}
          </Text>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: '#fff',
              marginVertical: 40,
            }}>
            {item.cardNo}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 22, fontWeight: 'bold', color: '#fff'}}>
              {item.name}
            </Text>
            <Image
              source={item.image}
              style={{height: 60, width: 100, resizeMode: 'contain'}}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.conatiner}>
      {/* <View style={styles.header}>
        <Icon name="arrow-back-outline" />
        <Text style={styles.headerText}>CARD CHECKOUT</Text>
        <Icon name="grid-outline" />
      </View> */}
{/* <ScrollView> */}
      <View style={{marginVertical: 20}}>
        <FlatList
          horizontal
          data={DATA}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={{paddingHorizontal: 30}}>
        <Text style={styles.textLabel}>Card Number</Text>
        <View style={styles.textView}>
          <Text style={styles.text}>{details.cardNo}</Text>
        </View>
        <Text style={styles.textLabel}>Name</Text>
        <View style={styles.textView}>
          <Text style={styles.text}>{details.name}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width:'40%'}}>
            <Text style={styles.textLabel}>Expiry date</Text>
            <View style={[styles.textView]}>
              <Text style={styles.text}>{details.expireDate}</Text>
            </View>
          </View>
          <View style={{width:'45%'}}>
            <Text style={styles.textLabel}>CVV</Text>
            <View style={[styles.textView]}>
              <Text style={styles.text}>{details.cvv}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={[styles.textView, {backgroundColor:'#000', alignItems:'center', marginVertical:30}]}>
        <Text style={[styles.text, {color:'#fff'}]}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default Carddetails;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    width: 335,
    height: 215,
    // left:20,
    // right:30,
    marginHorizontal: 5,
    borderRadius: 15,
    padding: 15,
  },
  textLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  textView: {
    width: '100%',
    height: 50,
    backgroundColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    borderRadius: 10,
    marginVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});