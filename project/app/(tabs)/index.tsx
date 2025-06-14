import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TriangleAlert as AlertTriangle, Clock, FileText, Users, Activity, TrendingUp, Calendar, Bell } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const isTablet = width > 768;

export default function Dashboard() {
  const stats = [
    { id: '1', title: 'Demandes en cours', value: '12', icon: FileText, color: '#2563eb' },
    { id: '2', title: 'Urgences vitales', value: '3', icon: AlertTriangle, color: '#dc2626' },
    { id: '3', title: 'Temps moyen', value: '2.5h', icon: Clock, color: '#059669' },
    { id: '4', title: 'Consultations', value: '47', icon: Users, color: '#ea580c' },
  ];

  const recentRequests = [
    {
      id: '1',
      patient: 'Patient M.D.',
      type: 'Urgence Vitale',
      time: '14:30',
      status: 'En attente',
      color: '#dc2626'
    },
    {
      id: '2',
      patient: 'Patient J.L.',
      type: 'Urgence Fonctionnelle',
      time: '13:15',
      status: 'En cours',
      color: '#ea580c'
    },
    {
      id: '3',
      patient: 'Patient A.B.',
      type: 'Urgence Relative',
      time: '11:45',
      status: 'Complété',
      color: '#059669'
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Bonjour,</Text>
            <Text style={styles.nameText}>Dr. Martin Dubois</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#6b7280" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.actionGrid}>
            {[
              { title: 'Urgence Vitale', color: '#dc2626', icon: AlertTriangle },
              { title: 'Urgence Fonctionnelle', color: '#ea580c', icon: Activity },
              { title: 'Urgence Relative', color: '#f59e0b', icon: TrendingUp },
              { title: 'Consultation', color: '#2563eb', icon: Calendar },
            ].map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.actionCard, { borderLeftColor: action.color }]}
                onPress={() => router.push('/request')}
              >
                <action.icon size={20} color={action.color} />
                <Text style={styles.actionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistiques</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat) => (
              <View key={stat.id} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                  <stat.icon size={24} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Requests */}
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Demandes récentes</Text>
            <TouchableOpacity onPress={() => router.push('/history')}>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.requestsList}>
            {recentRequests.map((request) => (
              <TouchableOpacity key={request.id} style={styles.requestCard}>
                <View style={[styles.statusIndicator, { backgroundColor: request.color }]} />
                <View style={styles.requestContent}>
                  <View style={styles.requestHeader}>
                    <Text style={styles.patientName}>{request.patient}</Text>
                    <Text style={styles.requestTime}>{request.time}</Text>
                  </View>
                  <Text style={[styles.requestType, { color: request.color }]}>
                    {request.type}
                  </Text>
                  <Text style={styles.requestStatus}>{request.status}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  welcomeText: {
    fontSize: 16,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
  },
  nameText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#dc2626',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  quickActions: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    width: isTablet ? '48%' : '48%',
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginTop: 8,
    fontFamily: 'Inter-Medium',
  },
  statsSection: {
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: isTablet ? '23%' : '48%',
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    borderRadius: 24,
    padding: 12,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
  },
  statTitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  recentSection: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: '#2563eb',
    fontFamily: 'Inter-Medium',
  },
  requestsList: {
    gap: 12,
  },
  requestCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusIndicator: {
    width: 4,
    height: '100%',
    borderRadius: 2,
    marginRight: 16,
  },
  requestContent: {
    flex: 1,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  requestTime: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
  },
  requestType: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
    fontFamily: 'Inter-Medium',
  },
  requestStatus: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
  },
});