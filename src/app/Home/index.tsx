import { View, Image, TouchableOpacity, Text, FlatList, Alert } from "react-native"
import { useState, useEffect } from "react"

import { styles } from "./styles"
import { FilterStatus } from "@/types/FilterStatus"
import { ItemStorage, itemsStorage } from "@/storage/itemsStorage"

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Filter } from "@/components/Filter"
import { Item } from "@/components/Item"



const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]



export function Home() {

  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState("")
  const [items, setItems] = useState<ItemStorage[]>([])

  async function handleAdd() {
    if (!description.trim()) {
      return Alert.alert("Adicionar", "Informe a descrição paa adicionar")
    }


    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    }
    await itemsStorage.add(newItem)
    await itemsByStatus()

    Alert.alert("Adicionado", `Adicionado ${description}`)
    setDescription("")
    setFilter(FilterStatus.PENDING)


    //setItems((prevState) =>[...prevState,newItem])
  }

  function update(value: FilterStatus) {
    setFilter(value)
  }

  async function itemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter)
      setItems(response)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro, Não foi possivel filtrar os itens.")
    }
  }

  async function handleRemove(id: string) {
    try {
      await itemsStorage.remove(id)
      await itemsByStatus()

    } catch (error) {
      console.log(error)
      Alert.alert("Remover, Não foi possivel remover.")

    }

  }

  useEffect(() => {
    itemsByStatus()
  }, [filter])



  return (
    <View style={styles.container}>

      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa Comprar"
          onChangeText={setDescription}
          value={description}
        />

        <Button title="Adicionar" onPress={handleAdd} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => setFilter(status)} />

          ))}

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onStatus={() => console.log("mudar status")}
              onRemove={() => handleRemove(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => <Text style={styles.empty}>Nenhum Item</Text>}
        />

      </View>
    </View>
  )
}


