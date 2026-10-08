import { View, Image, TouchableOpacity, Text, FlatList, Alert} from "react-native"
import { useState, useEffect } from "react"

import { styles } from "./styles"
import { FilterStatus} from "@/types/FilterStatus"
import { ItemStorage, itemsStorage  } from "@/storage/itemsStorage"

import{ Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Filter} from "@/components/Filter"
import { Item } from "@/components/Item"



const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

 

export function Home(){
 
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState("") 
  const [items, setItems] = useState<ItemStorage[]>([])

  function handleAdd(){
    if(!description.trim()){
      return Alert.alert("Adicionar", "Informe a descrição paa adicionar")
  }

  const newItem = {
    id: Math.random().toString(36).substring(2),
    description,
    status: FilterStatus.PENDING    
  }

  setItems((prevState) =>[...prevState,newItem])
} 

  function update(value: FilterStatus){
    setFilter(value)
  }

  async function getItems() {
    try{
      const response = await itemsStorage.get()
      setItems(response)
    }catch(error){
      console.log(error)
      Alert.alert("Erro, Não foi possivel filtrar os itens.")
    }
  }
  
  useEffect(() => {
    getItems()    
  }, [])
  
  
  
  return(
    <View style = {styles.container}>
     
     <Image source={require("@/assets/logo.png")} style ={styles.logo} />
     
      <View style={styles.form}>
      <Input 
      placeholder="O que você precisa Comprar"
      onChangeText={setDescription}
      />
      
      <Button title ="Adicionar" onPress={handleAdd}/> 
      </View> 

      <View style ={styles.content}>
        <View style= {styles.header}>
        {FILTER_STATUS.map((status) => (
            <Filter 
            key={status} 
            status={status} 
            isActive={status === filter}
            onPress={() => setFilter(status)} />             
            
          ))}

          <TouchableOpacity style = {styles.clearButton}>
            <Text style ={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
          </View>     

        <FlatList
        data= {items}
        keyExtractor= {(item) => item.id}
        renderItem= {({item}) =>(
        <Item          
          data={item}
          onStatus={() => console.log("mudar status")}
          onRemove={() => console.log("remover")}
          />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => <Text style= {styles.empty}>Nenhum Item</Text>}
      />

      </View>   
    </View>
  )
}


