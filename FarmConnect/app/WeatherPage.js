import React from 'react';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function App() {
  const currentWeather = {
    temperature: 24,
    condition: 'sunny',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    uvIndex: 6,
    precipitation: 0,
    feelsLike: 26,
    sunrise: "06:15",
    sunset: "18:45",
    pressure: 1013
  };

  const forecast = [
    { date: '2024-04-11', high: 26, low: 18, condition: 'sunny', precipitation: 0, humidity: 60 },
    { date: '2024-04-12', high: 23, low: 16, condition: 'cloudy', precipitation: 10, humidity: 70 },
    { date: '2024-04-13', high: 21, low: 14, condition: 'rainy', precipitation: 80, humidity: 85 },
    { date: '2024-04-14', high: 19, low: 12, condition: 'rainy', precipitation: 60, humidity: 80 },
    { date: '2024-04-15', high: 22, low: 15, condition: 'cloudy', precipitation: 20, humidity: 65 },
    { date: '2024-04-16', high: 25, low: 17, condition: 'sunny', precipitation: 5, humidity: 55 },
    { date: '2024-04-17', high: 27, low: 19, condition: 'sunny', precipitation: 0, humidity: 50 }
  ];

  const alerts = [
    { id: 1, type: 'rain', message: 'Heavy rain expected tomorrow - consider covering sensitive crops', severity: 'warning' }
  ];

  const getWeatherIcon = (condition, size = 24) => {
    switch (condition) {
      case 'sunny': return <Icon name="weather-sunny" size={size} color="#f59e0b" />;
      case 'cloudy': return <Icon name="weather-cloudy" size={size} color="#6b7280" />;
      case 'rainy': return <Icon name="weather-pouring" size={size} color="#3b82f6" />;
      case 'stormy': return <Icon name="weather-lightning-rainy" size={size} color="#8b5cf6" />;
      default: return <Icon name="weather-sunny" size={size} color="#f59e0b" />;
    }
  };

  const getConditionText = (condition) => {
    switch (condition) {
      case 'sunny': return 'Sunny';
      case 'cloudy': return 'Cloudy';
      case 'rainy': return 'Rainy';
      case 'stormy': return 'Stormy';
      default: return 'Sunny';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weather Forecast</Text>
        <Text style={styles.headerSubtitle}>Stay updated with weather conditions</Text>
      </View>

      {/* Weather Alerts */}
      {alerts.length > 0 && (
        <View style={styles.alertCard}>
          <View style={styles.alertHeader}>
            <Icon name="alert" size={20} color="#ea580c" />
            <Text style={styles.alertTitle}>Weather Alert</Text>
          </View>
          <View style={styles.alertContent}>
            {alerts.map((alert) => (
              <View key={alert.id} style={styles.alertItem}>
                <Icon name="umbrella" size={20} color="#ea580c" style={styles.alertIcon} />
                <Text style={styles.alertMessage}>{alert.message}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Current Weather - Hero Style */}
      <View style={styles.currentWeatherCard}>
        <View style={[styles.weatherHeader, { backgroundColor: '#f59e0b' }]}>
          <View style={styles.weatherHeaderContent}>
            <View style={styles.weatherTitleSection}>
              {getWeatherIcon(currentWeather.condition, 48)}
              <View>
                <Text style={styles.weatherTitle}>Current Weather</Text>
                <Text style={styles.weatherCondition}>{getConditionText(currentWeather.condition)}</Text>
              </View>
            </View>
            <View style={styles.temperatureSection}>
              <Text style={styles.temperature}>{currentWeather.temperature}°C</Text>
              <Text style={styles.feelsLike}>Feels like {currentWeather.feelsLike}°C</Text>
            </View>
          </View>

          {/* Weather Details Grid */}
          <View style={styles.weatherGrid}>
            <View style={styles.weatherDetailItem}>
              <Icon name="water" size={16} color="white" />
              <Text style={styles.detailLabel}>Humidity</Text>
              <Text style={styles.detailValue}>{currentWeather.humidity}%</Text>
            </View>
            <View style={styles.weatherDetailItem}>
              <Icon name="weather-windy" size={16} color="white" />
              <Text style={styles.detailLabel}>Wind</Text>
              <Text style={styles.detailValue}>{currentWeather.windSpeed} km/h</Text>
            </View>
          </View>
        </View>

        {/* Additional Details */}
        <View style={styles.additionalDetails}>
          <View style={styles.detailCard}>
            <Icon name="eye" size={20} color="#2563eb" />
            <Text style={styles.detailCardValue}>{currentWeather.visibility} km</Text>
            <Text style={styles.detailCardLabel}>Visibility</Text>
          </View>
          <View style={styles.detailCard}>
            <Icon name="weather-sunny" size={20} color="#ea580c" />
            <Text style={styles.detailCardValue}>UV {currentWeather.uvIndex}</Text>
            <Text style={styles.detailCardLabel}>UV Index</Text>
          </View>
          <View style={styles.detailCard}>
            <Icon name="gauge" size={20} color="#7c3aed" />
            <Text style={styles.detailCardValue}>{currentWeather.pressure}</Text>
            <Text style={styles.detailCardLabel}>Pressure</Text>
          </View>
        </View>
      </View>

      {/* Sun Times */}
      <View style={styles.sunTimesContainer}>
        <View style={[styles.sunTimeCard, { backgroundColor: '#ffedd5', borderColor: '#fdba74' }]}>
          <Icon name="weather-sunset-up" size={32} color="#ea580c" />
          <Text style={styles.sunTimeValue}>{currentWeather.sunrise}</Text>
          <Text style={styles.sunTimeLabel}>Sunrise</Text>
        </View>
        <View style={[styles.sunTimeCard, { backgroundColor: '#f3e8ff', borderColor: '#d8b4fe' }]}>
          <Icon name="weather-sunset-down" size={32} color="#7c3aed" />
          <Text style={styles.sunTimeValue}>{currentWeather.sunset}</Text>
          <Text style={styles.sunTimeLabel}>Sunset</Text>
        </View>
      </View>

      {/* 7-Day Forecast */}
      <View style={[styles.forecastCard, { backgroundColor: '#dbeafe', borderColor: '#93c5fd' }]}>
        <Text style={styles.forecastTitle}>7-Day Forecast</Text>
        <View style={styles.forecastList}>
          {forecast.map((day, index) => (
            <View key={day.date} style={styles.forecastItem}>
              <View style={styles.forecastLeft}>
                {getWeatherIcon(day.condition, 24)}
                <View style={styles.forecastInfo}>
                  <Text style={styles.forecastDay}>
                    {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                  </Text>
                  <View style={styles.forecastMeta}>
                    <Icon name="water" size={12} color="#3b82f6" />
                    <Text style={styles.forecastMetaText}>{day.precipitation}%</Text>
                    <Text style={styles.forecastMetaSeparator}>•</Text>
                    <Text style={styles.forecastMetaText}>{day.humidity}% humidity</Text>
                  </View>
                </View>
              </View>
              <View style={styles.forecastTemps}>
                <Text style={styles.forecastHigh}>{day.high}°</Text>
                <Text style={styles.forecastLow}>{day.low}°</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Farming Tips */}
      <View style={[styles.tipsCard, { backgroundColor: '#dcfce7', borderColor: '#86efac' }]}>
        <Text style={styles.tipsTitle}>🌱 Weather-Based Tips</Text>
        <View style={styles.tipsList}>
          <View style={styles.tipItem}>
            <Icon name="water" size={20} color="#2563eb" style={styles.tipIcon} />
            <View>
              <Text style={[styles.tipTitle, { color: '#2563eb' }]}>Rain Expected</Text>
              <Text style={[styles.tipDescription, { color: '#2563eb' }]}>Skip watering tomorrow as heavy rain is forecast</Text>
            </View>
          </View>
          <View style={styles.tipItem}>
            <Icon name="weather-sunny" size={20} color="#16a34a" style={styles.tipIcon} />
            <View>
              <Text style={[styles.tipTitle, { color: '#16a34a' }]}>Good Growing Weather</Text>
              <Text style={[styles.tipDescription, { color: '#16a34a' }]}>Perfect conditions for planting new seedlings this weekend</Text>
            </View>
          </View>
          <View style={styles.tipItem}>
            <Icon name="weather-windy" size={20} color="#ea580c" style={styles.tipIcon} />
            <View>
              <Text style={[styles.tipTitle, { color: '#ea580c' }]}>Low Wind Speed</Text>
              <Text style={[styles.tipDescription, { color: '#ea580c' }]}>Great conditions for spraying and crop protection</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#16a34a',
  },
  // Alert Card
  alertCard: {
    backgroundColor: '#ffedd5',
    borderWidth: 1,
    borderColor: '#fdba74',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#fdba74',
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ea580c',
  },
  alertContent: {
    padding: 16,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 12,
    borderRadius: 8,
  },
  alertIcon: {
    marginTop: 2,
  },
  alertMessage: {
    flex: 1,
    fontSize: 14,
    color: '#ea580c',
  },
  // Current Weather Card
  currentWeatherCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weatherHeader: {
    padding: 20,
  },
  weatherHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  weatherTitleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  weatherTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  weatherCondition: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  temperatureSection: {
    alignItems: 'flex-end',
  },
  temperature: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  feelsLike: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  weatherGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  weatherDetailItem: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  detailLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 2,
  },
  detailValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  additionalDetails: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  detailCard: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  detailCardValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 2,
  },
  detailCardLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  // Sun Times
  sunTimesContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  sunTimeCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  sunTimeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  sunTimeLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  // Forecast Card
  forecastCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 16,
  },
  forecastList: {
    gap: 12,
  },
  forecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 8,
  },
  forecastLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  forecastInfo: {
    gap: 4,
  },
  forecastDay: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  forecastMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  forecastMetaText: {
    fontSize: 12,
    color: '#6b7280',
  },
  forecastMetaSeparator: {
    color: '#6b7280',
    fontSize: 12,
  },
  forecastTemps: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  forecastHigh: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  forecastLow: {
    fontSize: 14,
    color: '#6b7280',
  },
  // Tips Card
  tipsCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#166534',
    marginBottom: 16,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 8,
  },
  tipIcon: {
    marginTop: 2,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  tipDescription: {
    fontSize: 12,
  },
});
