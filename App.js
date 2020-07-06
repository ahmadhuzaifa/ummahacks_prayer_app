import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import * as Location from 'expo-location';
import DatesCard from "./components/date.js"

function getDates(number_dates){
  var startingDay = new Date();
  var thisDay = new Date();
  var arr = []
  for(var i=0; i<number_dates; i++) {
    thisDay.setDate(startingDay.getDate() + i);
    arr.push(new Date(thisDay));
  }
  return arr
}


export default function App() {
  const [selectedDate, setDate] = React.useState(new Date());
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [prayerTimes, setPrayerTimes] = React.useState(null)



  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  });

  function selectDate(date){
    setDate(date)
    getTimmings(date)
  }

  async function getTimmings(date){
    const apiURL = `http://api.aladhan.com/v1/calendar?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&method=2&month=${date.getMonth()}&year=${date.getYear()}`
    try{
      const results = await fetch(apiURL);
      const json = await results.json()
      setPrayerTimes(json.data[date.getDate()-1])
    }
    catch (err){
    }
  }
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        <ScrollView>
          <SafeAreaView> 
            <View style={styles.topbar}>
              <Text style={styles.topbarText}>
                {`Prayer times in \n`}
                <Text style={styles.secondaryTopbarText}>Rosevile, CA</Text>
              </Text>
            </View>
          </SafeAreaView>
        <View style={styles.datesContainer}>
          <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          >
            {getDates(7).map((date, index) => (
            <TouchableOpacity key={index} onPress={()=>{
                selectDate(date)
              }}>
              <DatesCard 
              date= {date.getDate()}
              month={date.toLocaleString('default', { month: 'long' })}
              />
            </TouchableOpacity>
            ))}
          </ScrollView>

        </View>
       
        <View style={styles.detailsContainer}>

          {prayerTimes != null &&
          <View>
            <Text style={styles.detailsContainerTitleText}>{selectedDate.toLocaleString('en-GB', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>

            <Text style={styles.detailsContainerText}>{prayerTimes.date.hijri.date }</Text>
            
            <View style={styles.prayerTimesContainer}>
              <View>
                <Text style={styles.prayerTimesText}>{`Fajr`}</Text>
                <Text style={styles.prayerTimesText}>{`Dhuhr`}</Text>
                <Text style={styles.prayerTimesText}>{`Asr`}</Text>
                <Text style={styles.prayerTimesText}>{`Maghrib`}</Text>
                <Text style={styles.prayerTimesText}>{`Isha`}</Text>
              </View>
              <View>
                <Text style={styles.prayerTimesText2}>{prayerTimes.timings.Fajr}</Text>
                <Text style={styles.prayerTimesText2}>{prayerTimes.timings.Dhuhr}</Text>
                <Text style={styles.prayerTimesText2}>{prayerTimes.timings.Asr}</Text>
                <Text style={styles.prayerTimesText2}>{prayerTimes.timings.Maghrib}</Text>
                <Text style={styles.prayerTimesText2}>{prayerTimes.timings.Isha}</Text>
              </View>
              </View>
            </View>
          }
          {prayerTimes == null &&
            <Text style={styles.detailsContainerTitleText}>Please select a date to continue</Text>

          }
        </View>
        </ScrollView>

    </View>
  );
}

// styles is the StyleSheet which contains all the designing details
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  topbar: {
    height:120,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    zIndex:1,
  },
  topbarText: {
    color: "black",
    fontFamily: "Avenir Next",
    fontWeight: "700",
    fontSize: 32,
    marginHorizontal: 32,
    width:"100%",
  },
  secondaryTopbarText:{
    color:"#001195"
  },


  datesContainer:{
    height:180,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    zIndex:1,
    paddingLeft: 15,
    marginBottom: 10

  },

  detailsContainer:{
    width: "100%",
    height: 700,
    backgroundColor: "#0D1EA3",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30, 
    padding: 30
  }, 
  detailsContainerTitleText: {
    color: "white",
    fontFamily: "Avenir Next",
    fontWeight: "700",
    fontSize: 30
  },
  detailsContainerText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Avenir Next"
  },

  prayerTimesContainer:{
    height:200,
    backgroundColor: "#000889",
    padding: 25,
    borderRadius: 32,
    marginTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  prayerTimesText :{
    color:"white",
    fontFamily: "Avenir Next", 
    fontWeight: "600",
    fontSize: 20
  },
  prayerTimesText2:{
    color:"white",
    fontFamily: "Avenir Next", 
    fontWeight: "300",
    fontSize: 20
  }
});
