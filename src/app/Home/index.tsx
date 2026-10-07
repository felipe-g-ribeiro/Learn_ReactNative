import { View, Image } from "react-native"

import { styles } from "./styles"

import{ Button } from "@/components/Button"
import { Input } from "@/components/Input"

export function Home(){
  return(
    <View style = {styles.container}>
     
     <Image source={require("@/assets/logo.png")} style ={styles.logo} />
     
      <View style={styles.form}>
      <Input placeholder="O que você precisa Comprar"/>
      <Button title ="Entrar"/> 
      </View> 

      <View style ={styles.content}></View>     
        
    
    </View>
  )
}


