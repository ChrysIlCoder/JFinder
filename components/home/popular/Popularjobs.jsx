import { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import useFetch from '../../../hook/useFetch'

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'

import PopularJobCard from '../../common/cards/popular/PopularJobCard'

export default function Popularjobs(){
  const router = useRouter()
  const { data, isLoading, error } = useFetch('search', { query: "React developer", num_pages: 1})

  const [selectedJob, setSelectedJob] = useState()

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`)
    setSelectedJob(item.job_id)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lavori popolari</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Mostra altro</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary}/>
        ) : error ? (
          <Text>Non sono riuscito a caricare i lavori</Text>
        ) : (
          <FlatList 
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard 
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={item => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  )
}