import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Modal,
  FlatList
} from 'react-native';
import { Card, Badge, Button } from 'react-native-paper'; // You'll need to install react-native-paper
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // You'll need to install react-native-vector-icons

// Note: You'll need to install these packages:
// npm install react-native-paper react-native-vector-icons
// Also set up vector icons: https://github.com/oblador/react-native-vector-icons#installation

const ActivityTracker = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'watering',
      crop: 'Tomatoes',
      description: 'Deep watering session',
      date: '2024-04-10',
      duration: 30,
      notes: 'Plants looking healthy after watering'
    },
    {
      id: 2,
      type: 'pest_control',
      crop: 'Corn',
      description: 'Applied organic pest spray',
      date: '2024-04-09',
      duration: 45,
      notes: 'Found aphids on several plants'
    },
    {
      id: 3,
      type: 'harvesting',
      crop: 'Lettuce',
      description: 'First harvest of the season',
      date: '2024-04-08',
      duration: 60,
      notes: 'Harvested 2kg of fresh lettuce'
    },
    {
      id: 4,
      type: 'fertilizing',
      crop: 'Peppers',
      description: 'Applied compost fertilizer',
      date: '2024-04-07',
      duration: 20,
      notes: 'Added organic compost around base'
    },
    {
      id: 5,
      type: 'pruning',
      crop: 'Tomatoes',
      description: 'Removed lower branches',
      date: '2024-04-06',
      duration: 40,
      notes: 'Pruned to improve air circulation'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');

  const getActivityIcon = (type) => {
    switch (type) {
      case 'watering': return <Icon name="water" size={20} color="#3b82f6" />;
      case 'planting': return <Icon name="sprout" size={20} color="#22c55e" />;
      case 'harvesting': return <Icon name="content-cut" size={20} color="#f97316" />;
      case 'pruning': return <Icon name="content-cut" size={20} color="#a855f7" />;
      case 'pest_control': return <Icon name="bug" size={20} color="#ef4444" />;
      case 'fertilizing': return <Icon name="sprout" size={20} color="#ca8a04" />;
      case 'weeding': return <Icon name="grass" size={20} color="#a18072" />;
      default: return <Icon name="calendar" size={20} color="#000" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'watering': return { backgroundColor: '#dbeafe', color: '#1e40af' };
      case 'planting': return { backgroundColor: '#dcfce7', color: '#166534' };
      case 'harvesting': return { backgroundColor: '#ffedd5', color: '#9a3412' };
      case 'pruning': return { backgroundColor: '#f3e8ff', color: '#7e22ce' };
      case 'pest_control': return { backgroundColor: '#fee2e2', color: '#b91c1c' };
      case 'fertilizing': return { backgroundColor: '#fef9c3', color: '#713f12' };
      case 'weeding': return { backgroundColor: '#eee0da', color: '#7f5340' };
      default: return { backgroundColor: '#f3f4f6', color: '#374151' };
    }
  };

  const activityTypes = [
    { value: 'watering', label: 'Watering' },
    { value: 'planting', label: 'Planting' },
    { value: 'harvesting', label: 'Harvesting' },
    { value: 'pruning', label: 'Pruning' },
    { value: 'pest_control', label: 'Pest Control' },
    { value: 'fertilizing', label: 'Fertilizing' },
    { value: 'weeding', label: 'Weeding' }
  ];

  const crops = ['Tomatoes', 'Corn', 'Lettuce', 'Peppers', 'Carrots', 'Beans'];

  const addActivity = () => {
    const newActivity = {
      id: activities.length + 1,
      type: selectedType,
      crop: selectedCrop,
      description,
      date: new Date().toISOString().split('T')[0],
      duration: parseInt(duration),
      notes
    };
    
    setActivities([...activities, newActivity]);
    setIsDialogOpen(false);
    // Reset form
    setSelectedType('');
    setSelectedCrop('');
    setDescription('');
    setDuration('');
    setNotes('');
  };

  const renderActivityItem = ({ item }) => {
    const colorStyle = getActivityColor(item.type);
    
    return (
      <Card style={styles.activityCard}>
        <Card.Content>
          <View style={styles.activityHeader}>
            <View style={styles.activityIcon}>
              {getActivityIcon(item.type)}
            </View>
            <View style={styles.activityTitleContainer}>
              <Text style={styles.activityDescription}>{item.description}</Text>
              <View style={styles.badgeContainer}>
                <View style={[styles.badge, { backgroundColor: colorStyle.backgroundColor }]}>
                  <Text style={[styles.badgeText, { color: colorStyle.color }]}>
                    {item.type.replace('_', ' ')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          
          <Text style={styles.cropText}>
            {item.crop} • {new Date(item.date).toLocaleDateString()}
          </Text>
          
          <View style={styles.activityDetails}>
            <View style={styles.detailItem}>
              <Icon name="clock-outline" size={16} color="#6b7280" />
              <Text style={styles.detailText}>{item.duration} min</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="calendar" size={16} color="#6b7280" />
              <Text style={styles.detailText}>{new Date(item.date).toLocaleDateString()}</Text>
            </View>
          </View>
          
          {item.notes && (
            <Text style={styles.notesText}>{item.notes}</Text>
          )}
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Farm Activities</Text>
        <Button 
          mode="contained" 
          onPress={() => setIsDialogOpen(true)}
          style={styles.addButton}
          icon="plus"
        >
          Log Activity
        </Button>
      </View>

      {/* Weekly Summary */}
      <Card style={styles.summaryCard}>
        <Card.Title title="This Week's Summary" />
        <Card.Content>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{activities.length}</Text>
              <Text style={styles.summaryLabel}>Activities</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>
                {activities.reduce((sum, activity) => sum + activity.duration, 0)}
              </Text>
              <Text style={styles.summaryLabel}>Minutes</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Recent Activities */}
      <Card style={styles.activitiesCard}>
        <Card.Title title="Recent Activities" />
        <Card.Content>
          <FlatList
            data={activities}
            renderItem={renderActivityItem}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </Card.Content>
      </Card>

      {/* Add Activity Modal */}
      <Modal
        visible={isDialogOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsDialogOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Log New Activity</Text>
            <Text style={styles.modalDescription}>
              Record a new farming activity to track your progress and maintain detailed farm records.
            </Text>
            
            <ScrollView style={styles.formContainer}>
              <Text style={styles.label}>Activity Type</Text>
              <View style={styles.pickerContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {activityTypes.map((type) => (
                    <TouchableOpacity
                      key={type.value}
                      style={[
                        styles.typeButton,
                        selectedType === type.value && styles.typeButtonSelected
                      ]}
                      onPress={() => setSelectedType(type.value)}
                    >
                      <Text style={[
                        styles.typeButtonText,
                        selectedType === type.value && styles.typeButtonTextSelected
                      ]}>
                        {type.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              
              <Text style={styles.label}>Crop</Text>
              <View style={styles.pickerContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {crops.map((crop) => (
                    <TouchableOpacity
                      key={crop}
                      style={[
                        styles.typeButton,
                        selectedCrop === crop && styles.typeButtonSelected
                      ]}
                      onPress={() => setSelectedCrop(crop)}
                    >
                      <Text style={[
                        styles.typeButtonText,
                        selectedCrop === crop && styles.typeButtonTextSelected
                      ]}>
                        {crop}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                placeholder="Brief description of activity"
                value={description}
                onChangeText={setDescription}
              />
              
              <Text style={styles.label}>Duration (minutes)</Text>
              <TextInput
                style={styles.input}
                placeholder="30"
                keyboardType="numeric"
                value={duration}
                onChangeText={setDuration}
              />
              
              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Additional notes..."
                multiline={true}
                numberOfLines={4}
                value={notes}
                onChangeText={setNotes}
              />
            </ScrollView>
            
            <View style={styles.modalActions}>
              <Button 
                mode="outlined" 
                onPress={() => setIsDialogOpen(false)}
                style={styles.cancelButton}
              >
                Cancel
              </Button>
              <Button 
                mode="contained" 
                onPress={addActivity}
                style={styles.saveButton}
                disabled={!selectedType || !selectedCrop || !description}
              >
                Save Activity
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    borderRadius: 8,
  },
  summaryCard: {
    marginBottom: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  activitiesCard: {
    flex: 1,
  },
  activityCard: {
    marginVertical: 4,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  activityIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  activityTitleContainer: {
    flex: 1,
  },
  activityDescription: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  cropText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  activityDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  notesText: {
    fontSize: 14,
  },
  separator: {
    height: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  formContainer: {
    maxHeight: '70%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 12,
  },
  pickerContainer: {
    marginBottom: 8,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  typeButtonSelected: {
    backgroundColor: '#3b82f6',
  },
  typeButtonText: {
    color: '#374151',
  },
  typeButtonTextSelected: {
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 8,
  },
  cancelButton: {
    borderRadius: 8,
  },
  saveButton: {
    borderRadius: 8,
  },
});

export default ActivityTracker;
