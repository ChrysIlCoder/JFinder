import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import useFetch from '../../../hook/useFetch'

import styles from './nearbyjobs.style'
import { COLORS } from '../../../constants'

import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'

export default function Nearbyjobs (){
  const router = useRouter()
  const { data, isLoading, error } = useFetch('search', { query: "React developer", num_pages: 1})

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lavori vicino a te</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Mostra altro</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary}/>
        ) : error ? (
          <Text>Non ho trovato lavori vicino a te</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard 
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  )
}
