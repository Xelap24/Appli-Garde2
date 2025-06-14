import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock } from 'lucide-react-native';

interface UrgencyCardProps {
  title: string;
  subtitle: string;
  color: string;
  icon: React.ComponentType<any>;
  delay: string;
  description: string;
  onPress: () => void;
}

export default function UrgencyCard({ 
  title, 
  subtitle, 
  color, 
  icon: Icon, 
  delay, 
  description, 
  onPress 
}: UrgencyCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: color }]}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
        <Icon size={32} color={color} />
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.title, { color }]}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        
        <View style={styles.delayContainer}>
          <Clock size={16} color="#6b7280" />
          <Text style={styles.delayText}>Délai: {delay}</Text>
        </View>
        
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  delayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    gap: 6,
  },
  delayText: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Inter-Medium',
  },
  description: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
});