import React from "react";
import { useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, Animated } from "react-native";
import slides from "../../../slides";
import Onboardingitem from "./Onboardingitem"
import Paginator from "./Paginator";
import NextButton from "./NextButton";


export default Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const scrollTo =async()=>{
    if(currentIndex<slides.length -1){
        slidesRef.current.scrollToIndex({index:currentIndex +1})
    }else{
        try {
          await AsyncStorage.setItem("@viewOnbording","true")
        }
        catch(err){
          console.log("error @setItem",err)
        }
    }
}
  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <Onboardingitem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      
      <Paginator data={slides} scrollX={scrollX} />
      <NextButton percentage={(currentIndex +1) * (100 /slides.length)} scrollTo={scrollTo}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
