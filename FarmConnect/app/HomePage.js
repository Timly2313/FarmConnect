import React, { useState } from 'react';
import {router} from 'expo-router'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Image,
  Dimensions,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

// Hamburger Menu Component
const HamburgerMenu = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: 'account', label: "Profile", description: "Manage your account" },
    { icon: 'map-marker', label: "Farm Locations", description: "Manage your farms" },
    { icon: 'bell', label: "Notifications", description: "Alerts and updates" },
    { icon: 'credit-card', label: "Billing", description: "Subscription and payments" },
    { icon: 'star', label: "Premium Features", description: "Upgrade your plan" },
    { icon: 'shield-account', label: "Privacy & Security", description: "Account security" },
    { icon: 'cog', label: "Settings", description: "App preferences" },
    { icon: 'help-circle', label: "Help & Support", description: "Get help" },
  ];

  return (
    <>
      <TouchableOpacity 
        style={styles.menuButton}
        onPress={() => setIsOpen(true)}
      >
        <Icon name="menu" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.menuOverlay}>
          <View style={styles.menuContainer}>
            <View style={styles.menuHeader}>
              <View style={styles.profileContainer}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80' }}
                  style={styles.profileImage}
                />
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>Hazel Johnson</Text>
                  <Text style={styles.profileStatus}>Premium Farmer</Text>
                  <Text style={styles.profileLocation}>Stellenbosch, Western Cape</Text>
                </View>
              </View>
              <Text style={styles.menuDescription}>
                Access your account settings and farm management tools
              </Text>
            </View>
            
            <ScrollView style={styles.menuItems}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => setIsOpen(false)}
                >
                  <Icon name={item.icon} size={20} color="#16a34a" style={styles.menuIcon} />
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuItemLabel}>{item.label}</Text>
                    <Text style={styles.menuItemDescription}>{item.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              
              <View style={styles.separator} />
              
              <TouchableOpacity
                style={[styles.menuItem, styles.logoutItem]}
                onPress={() => {
                  setIsOpen(false);
                  onLogout();
                }}
              >
                <Icon name="logout" size={20} color="#dc2626" style={styles.menuIcon} />
                <View style={styles.menuTextContainer}>
                  <Text style={[styles.menuItemLabel, styles.logoutText]}>Logout</Text>
                  <Text style={styles.menuItemDescription}>Sign out of your account</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

// Dashboard Component
const Dashboard = ({ onLogout }) => {
  const stats = {
    totalCrops: 12,
    healthyCrops: 10,
    needsAttention: 2,
    activitiesThisWeek: 8,
    weatherTemp: 16,
    humidity: 72,
    rainfall: 2.4,
    windSpeed: 4.2,
    uvIndex: 6
  };

  const todaysActivities = [
    { 
      id: 1, 
      activity: "Watering of fields CD5", 
      time: "7:30 AM", 
      status: "In Progress",
      type: "watering"
    },
    { 
      id: 2, 
      activity: "Planting of fields CD5", 
      time: "8:00 AM", 
      status: "Not Started",
      type: "planting"
    },
    { 
      id: 3, 
      activity: "Watering of fields R876", 
      time: "9:30 AM", 
      status: "Not Started",
      type: "watering"
    },
  ];

  const getActivityColor = (type) => {
    switch (type) {
      case 'watering': return '#3b82f6';
      case 'planting': return '#22c55e';
      case 'harvesting': return '#f97316';
      default: return '#6b7280';
    }
  };

  const getStatusStyle = (status) => {
    return status === "In Progress" 
      ? [styles.statusBadge, styles.statusInProgress]
      : [styles.statusBadge, styles.statusNotStarted];
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="#16a34a" barStyle="light-content" />
      
      {/* Hero Section with Header */}
      <View style={styles.heroSection}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80' }}
          style={styles.heroBackground}
          blurRadius={5}
        />
        <View style={styles.heroOverlay} />
        
        <View style={styles.heroContent}>
          {/* Header with Menu and Profile */}
          <View style={styles.header}>
            <HamburgerMenu onLogout={onLogout} />
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80' }}
              style={styles.profileAvatar}
            />
          </View>

          {/* Location and Greeting */}
          <View style={styles.greetingContainer}>
            <View style={styles.locationIndicator}>
              <View style={styles.locationDot} />
              <Text style={styles.locationText}>Stellenbosch, Western Cape</Text>
            </View>
            <Text style={styles.greetingTitle}>Hi, Hazel</Text>
            <Text style={styles.greetingSubtitle}>Let's check your farm today</Text>
          </View>
          
          {/* Weather Card */}
          <TouchableOpacity onPress={()=>router.push('WeatherPage')} style={styles.weatherCard}>
            <View style={styles.weatherContent}>
              <View style={styles.weatherLeft}>
                <Icon name="weather-sunny" size={32} color="#fbbf24" />
                <View>
                  <Text style={styles.temperature}>{stats.weatherTemp}°C</Text>
                  <Text style={styles.weatherCondition}>Partly Cloudy</Text>
                </View>
              </View>
              <View style={styles.weatherRight}>
                <Text style={styles.weatherDetail}>Humidity: {stats.humidity}%</Text>
                <Text style={styles.weatherDetail}>Wind: {stats.windSpeed} km/h</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Weather Details Grid */}
      <View style={styles.weatherGrid}>
        <View style={[styles.weatherGridItem, styles.windItem]}>
          <Icon name="weather-windy" size={24} color="#2563eb" />
          <Text style={styles.weatherGridValue}>{stats.windSpeed}</Text>
          <Text style={styles.weatherGridLabel}>km/h</Text>
        </View>
        
        <View style={[styles.weatherGridItem, styles.humidityItem]}>
          <Icon name="water" size={24} color="#7c3aed" />
          <Text style={styles.weatherGridValue}>{stats.humidity}</Text>
          <Text style={styles.weatherGridLabel}>% Humidity</Text>
        </View>

        <View style={[styles.weatherGridItem, styles.uvItem]}>
          <Icon name="weather-sunny" size={24} color="#ea580c" />
          <Text style={styles.weatherGridValue}>{stats.uvIndex}</Text>
          <Text style={styles.weatherGridLabel}>UV Index</Text>
        </View>
      </View>

      {/* Today's Activities */}
      <TouchableOpacity onPress={()=>router.push('ActivityTracker')} style={styles.activitiesCard}>
        <View style={styles.cardHeader}>
          <Icon name="calendar" size={20} color="#16a34a" />
          <Text style={styles.cardTitle}>Today's Activities</Text>
        </View>
        <View style={styles.activitiesList}>
          {todaysActivities.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={[styles.activityIndicator, { backgroundColor: getActivityColor(activity.type) }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityName}>{activity.activity}</Text>
                <View style={styles.activityTime}>
                  <Icon name="clock-outline" size={14} color="#6b7280" />
                  <Text style={styles.timeText}>{activity.time}</Text>
                </View>
              </View>
              <View style={getStatusStyle(activity.status)}>
                <Text style={styles.statusText}>{activity.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </TouchableOpacity>

      {/* Farm Overview Card */}
      <View style={styles.farmCard}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1691384630414-09dad88b297b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGZhcm0lMjBmaWVsZCUyMHJvd3N8ZW58MXx8fHwxNzU1MDUzNjU4fDA&ixlib=rb-4.1.0&q=80&w=1080' }}
          style={styles.farmImage}
        />
        <View style={styles.farmImageOverlay} />
        <View style={styles.farmCardContent}>
          <View style={styles.farmInfo}>
            <Text style={styles.farmName}>Rice Field Premium Plot R876</Text>
            <Text style={styles.farmDetails}>7874.5 FT² • 19°29'31.7"E</Text>
          </View>
          <TouchableOpacity style={styles.mapButton}>
            <Text style={styles.mapButtonText}>View Map</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.farmStats}>
          <View style={styles.farmStat}>
            <Icon name="sprout" size={16} color="#16a34a" />
            <Text style={styles.farmStatText}>3.7km Activity</Text>
          </View>
          <View style={styles.farmValue}>
            <Text style={styles.farmValueText}>R 15,420</Text>
            <Text style={styles.farmValueLabel}>Estimated Value</Text>
          </View>
        </View>
      </View>

      {/* Crop Health Summary */}
      <View style={styles.healthCard}>
        <View style={styles.cardHeader}>
          <Icon name="sprout" size={20} color="#16a34a" />
          <Text style={styles.cardTitle}>Crop Health Overview</Text>
        </View>
        <View style={styles.healthContent}>
          <View style={styles.healthStat}>
            <Text style={styles.healthLabel}>Total Crops</Text>
            <View style={styles.healthBadge}>
              <Text style={styles.healthBadgeText}>{stats.totalCrops}</Text>
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>Healthy Crops</Text>
              <Text style={styles.progressValue}>
                {stats.healthyCrops}/{stats.totalCrops}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(stats.healthyCrops / stats.totalCrops) * 100}%` }
                ]} 
              />
            </View>
          </View>
          
          {stats.needsAttention > 0 && (
            <View style={styles.attentionAlert}>
              <Icon name="alert" size={16} color="#ea580c" />
              <Text style={styles.attentionText}>
                {stats.needsAttention} crops need attention
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* This Week's Progress */}
      <View style={styles.progressCard}>
        <View style={styles.cardHeader}>
          <Icon name="trending-up" size={20} color="#7c3aed" />
          <Text style={styles.cardTitle}>This Week's Progress</Text>
        </View>
        <View style={styles.progressContent}>
          <View style={styles.progressGrid}>
            <View style={styles.progressItem}>
              <Text style={styles.progressNumber}>{stats.activitiesThisWeek}</Text>
              <Text style={styles.progressLabel}>Activities</Text>
            </View>
            <View style={styles.progressItem}>
              <Text style={styles.progressNumber}>R 2,340</Text>
              <Text style={styles.progressLabel}>Earnings</Text>
            </View>
          </View>
          <View style={styles.progressMessage}>
            <Text style={styles.progressMessageText}>
              🌱 Great work this week! Your crops are thriving
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  menuButton: {
    padding: 8,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  // Hero Section
  heroSection: {
    height: 280,
    position: 'relative',
  },
  heroBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  heroContent: {
    padding: 20,
    paddingTop: 50,
    flex: 1,
  },
  greetingContainer: {
    marginBottom: 20,
  },
  locationIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginRight: 8,
  },
  locationText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  greetingTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  greetingSubtitle: {
    color: '#bbf7d0',
    fontSize: 14,
  },
  weatherCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
    backdropFilter: 'blur(10px)',
  },
  weatherContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  temperature: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  weatherCondition: {
    color: '#bbf7d0',
    fontSize: 14,
  },
  weatherRight: {
    alignItems: 'flex-end',
  },
  weatherDetail: {
    color: '#bbf7d0',
    fontSize: 12,
  },
  // Weather Grid
  weatherGrid: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  weatherGridItem: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  windItem: {
    backgroundColor: '#dbeafe',
    borderColor: '#93c5fd',
  },
  humidityItem: {
    backgroundColor: '#f3e8ff',
    borderColor: '#d8b4fe',
  },
  uvItem: {
    backgroundColor: '#ffedd5',
    borderColor: '#fdba74',
  },
  weatherGridValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  weatherGridLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  // Card Styles
  activitiesCard: {
    backgroundColor: '#f0fdf4',
    margin: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    padding: 16,
  },
  farmCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  healthCard: {
    backgroundColor: '#f0fdf4',
    margin: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    padding: 16,
  },
  progressCard: {
    backgroundColor: '#faf5ff',
    margin: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e9d5ff',
    padding: 16,
    marginBottom: 32,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#166534',
  },
  // Activities
  activitiesList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  activityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  activityContent: {
    flex: 1,
  },
  activityName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  activityTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#6b7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusInProgress: {
    backgroundColor: '#22c55e',
  },
  statusNotStarted: {
    backgroundColor: '#e5e7eb',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  // Farm Card
  farmImage: {
    width: '100%',
    height: 160,
  },
  farmImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  farmCardContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  farmInfo: {
    flex: 1,
  },
  farmName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  farmDetails: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  mapButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  mapButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  farmStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  farmStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  farmStatText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#16a34a',
  },
  farmValue: {
    alignItems: 'flex-end',
  },
  farmValueText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  farmValueLabel: {
    fontSize: 10,
    color: '#6b7280',
  },
  // Health Card
  healthContent: {
    gap: 16,
  },
  healthStat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  healthLabel: {
    fontSize: 14,
    color: '#166534',
  },
  healthBadge: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#86efac',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  healthBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#166534',
  },
  progressContainer: {
    gap: 8,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 12,
    color: '#166534',
  },
  progressValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#166534',
  },
  progressBar: {
    height: 12,
    backgroundColor: '#dcfce7',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#16a34a',
    borderRadius: 6,
  },
  attentionAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ffedd5',
    borderWidth: 1,
    borderColor: '#fdba74',
    padding: 12,
    borderRadius: 8,
  },
  attentionText: {
    fontSize: 12,
    color: '#ea580c',
  },
  // Progress Card
  progressContent: {
    gap: 16,
  },
  progressGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressItem: {
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 4,
  },
  progressMessage: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 8,
  },
  progressMessageText: {
    fontSize: 12,
    color: '#7c3aed',
    textAlign: 'center',
  },
  // Menu Styles
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    width: width * 0.8,
    height: '100%',
    backgroundColor: 'white',
  },
  menuHeader: {
    backgroundColor: '#16a34a',
    padding: 24,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'white',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileStatus: {
    color: '#bbf7d0',
    fontSize: 14,
    marginBottom: 2,
  },
  profileLocation: {
    color: '#86efac',
    fontSize: 12,
  },
  menuDescription: {
    color: '#bbf7d0',
    fontSize: 14,
  },
  menuItems: {
    flex: 1,
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuItemLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  menuItemDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  logoutItem: {
    marginTop: 8,
  },
  logoutText: {
    color: '#dc2626',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 16,
  },
});

export default Dashboard;
