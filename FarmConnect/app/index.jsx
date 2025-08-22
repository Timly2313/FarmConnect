import { StyleSheet, Text, View ,Button} from 'react-native'
import React from 'react'
import {router} from 'expo-router'
import ScreenWrapper from '../components/ScreenWrapper'


export default function index()  {
  return (
    <ScreenWrapper>
      <Text>index</Text>
      <Button title= "welcome" onPress={()=>router.push('welcome')}></Button>
    </ScreenWrapper>
  )
}


const styles = StyleSheet.create({})