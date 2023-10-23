import React from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'

import styles from './footer.style'
import { icons } from '../../../constants'

export default function Footer({ url }){
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.applyBtn} onPress={() => Linking.openURL(url)}>
        <Text style={styles.applyBtnText}>Applicati</Text>
      </TouchableOpacity>
    </View>
  )
}