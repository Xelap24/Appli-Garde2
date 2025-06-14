import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Search, Filter, Calendar, Clock, TriangleAlert as AlertTriangle, Activity, TrendingUp, CircleCheck as CheckCircle, Circle as XCircle, Eye } from 'lucide-react-native';

type RequestStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
type UrgencyType = 'vitale' | 'fonctionnelle' | 'relative' | 'consultation';

interface HistoryRequest {
  id: string;
  patient: string;
  urgency: UrgencyType;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  requestingDoctor: string;
  service: string;
  summary: string;
  response?: string;
}

const mockHistory: HistoryRequest[] = [
  {
    id: '1',
    patient: 'Patient M.D.',
    urgency: 'vitale',
    status: 'completed',
    createdAt: '2024-01-15 14:30',
    updatedAt: '2024-01-15 15:15',
    requestingDoctor: 'Dr. Leroy',
    service: 'Urgences',
    summary: 'AVC ischémique, indication thrombolyse',
    response: 'Thrombolyse réalisée avec succès. Surveillance neurologique.'
  },
  {
    id: '2',
    patient: 'Patient J.L.',
    urgency: 'fonctionnelle',
    status: 'in_progress',
    createdAt: '2024-01-15 13:15',
    updatedAt: '2024-01-15 13:45',
    requestingDoctor: 'Dr. Martin',
    service: 'Neurologie',
    summary: 'Compression médullaire, indication chirurgicale',
  },
  {
    id: '3',
    patient: 'Patient A.B.',
    urgency: 'relative',
    status: 'completed',
    createdAt: '2024-01-15 11:45',
    updatedAt: '2024-01-15 14:20',
    requestingDoctor: 'Dr. Dubois',
    service: 'Médecine Interne',
    summary: 'Céphalées chroniques, bilan à compléter',
    response: 'IRM programmée. Consultation en externe dans 15 jours.'
  },
  {
    id: '4',
    patient: 'Patient C.R.',
    urgency: 'consultation',
    status: 'pending',
    createdAt: '2024-01-15 10:30',
    updatedAt: '2024-01-15 10:30',
    requestingDoctor: 'Dr. Bertrand',
    service: 'Rhumatologie',
    summary: 'Douleurs cervicales post-traumatiques',
  },
  {
    id: '5',
    patient: 'Patient E.F.',
    urgency: 'vitale',
    status: 'cancelled',
    createdAt: '2024-01-14 22:15',
    updatedAt: '2024-01-14 22:45',
    requestingDoctor: 'Dr. Rousseau',
    service: 'Urgences',
    summary: 'Traumatisme crânien grave',
    response: 'Patient transféré vers centre spécialisé.'
  },
];

const urgencyConfig = {
  vitale: { color: '#dc2626', icon: AlertTriangle, label: 'Urgence Vitale' },
  fonctionnelle: { color: '#ea580c', icon: Activity, label: 'Urgence Fonctionnelle' },
  relative: { color: '#f59e0b', icon: TrendingUp, label: 'Urgence Relative' },
  consultation: { color: '#2563eb', icon: Calendar, label: 'Consultation' },
};

const statusConfig = {
  pending: { color: '#6b7280', icon: Clock, label: 'En attente' },
  in_progress: { color: '#2563eb', icon: Activity, label: 'En cours' },
  completed: { color: '#059669', icon: CheckCircle, label: 'Complété' },
  cancelled: { color: '#dc2626', icon: XCircle, label: 'Annulé' },
};

export default function HistoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus | 'all'>('all');
  const [selectedUrgency, setSelectedUrgency] = useState<UrgencyType | 'all'>('all');

  const filteredHistory = mockHistory.filter(request => {
    const matchesSearch = request.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.requestingDoctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    const matchesUrgency = selectedUrgency === 'all' || request.urgency === selectedUrgency;
    
    return matchesSearch && matchesStatus && matchesUrgency;
  });

  const getStatusCounts = () => {
    const counts = {
      all: mockHistory.length,
      pending: 0,
      in_progress: 0,
      completed: 0,
      cancelled: 0,
    };
    
    mockHistory.forEach(request => {
      counts[request.status]++;
    });
    
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Historique des demandes</Text>
        <Text style={styles.headerSubtitle}>
          {filteredHistory.length} demandes
        </Text>
      </View>

      {/* Search and Filters */}
      <View style={styles.filtersSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher patient, médecin..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Status Filter Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterPills}>
          <TouchableOpacity
            style={[
              styles.filterPill,
              selectedStatus === 'all' && styles.filterPillActive
            ]}
            onPress={() => setSelectedStatus('all')}
          >
            <Text style={[
              styles.filterPillText,
              selectedStatus === 'all' && styles.filterPillTextActive
            ]}>
              Tous ({statusCounts.all})
            </Text>
          </TouchableOpacity>

          {Object.entries(statusConfig).map(([status, config]) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterPill,
                selectedStatus === status && styles.filterPillActive,
                selectedStatus === status && { backgroundColor: `${config.color}15`, borderColor: config.color }
              ]}
              onPress={() => setSelectedStatus(status as RequestStatus)}
            >
              <config.icon size={16} color={selectedStatus === status ? config.color : '#6b7280'} />
              <Text style={[
                styles.filterPillText,
                selectedStatus === status && { color: config.color }
              ]}>
                {config.label} ({statusCounts[status as RequestStatus]})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* History List */}
      <ScrollView style={styles.historyList} showsVerticalScrollIndicator={false}>
        {filteredHistory.map((request) => {
          const urgencyInfo = urgencyConfig[request.urgency];
          const statusInfo = statusConfig[request.status];
          
          return (
            <TouchableOpacity key={request.id} style={styles.historyCard}>
              <View style={[styles.urgencyIndicator, { backgroundColor: urgencyInfo.color }]} />
              
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardHeaderLeft}>
                    <Text style={styles.patientName}>{request.patient}</Text>
                    <View style={styles.urgencyBadge}>
                      <urgencyInfo.icon size={14} color={urgencyInfo.color} />
                      <Text style={[styles.urgencyText, { color: urgencyInfo.color }]}>
                        {urgencyInfo.label}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.cardHeaderRight}>
                    <View style={[styles.statusBadge, { backgroundColor: `${statusInfo.color}15` }]}>
                      <statusInfo.icon size={14} color={statusInfo.color} />
                      <Text style={[styles.statusText, { color: statusInfo.color }]}>
                        {statusInfo.label}
                      </Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.requestSummary}>{request.summary}</Text>

                <View style={styles.cardFooter}>
                  <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>{request.requestingDoctor}</Text>
                    <Text style={styles.serviceName}>{request.service}</Text>
                  </View>
                  
                  <View style={styles.timeInfo}>
                    <Text style={styles.timeText}>{request.createdAt}</Text>
                    {request.updatedAt !== request.createdAt && (
                      <Text style={styles.updateText}>Mis à jour: {request.updatedAt}</Text>
                    )}
                  </View>
                </View>

                {request.response && (
                  <View style={styles.responseSection}>
                    <Text style={styles.responseLabel}>Réponse:</Text>
                    <Text style={styles.responseText}>{request.response}</Text>
                  </View>
                )}

                <TouchableOpacity style={styles.viewButton}>
                  <Eye size={16} color="#2563eb" />
                  <Text style={styles.viewButtonText}>Voir détails</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}

        {filteredHistory.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Aucune demande trouvée</Text>
            <Text style={styles.emptySubtext}>
              Essayez de modifier vos critères de recherche
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  filtersSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  filterPills: {
    flexDirection: 'row',
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 6,
  },
  filterPillActive: {
    backgroundColor: '#2563eb15',
    borderColor: '#2563eb',
  },
  filterPillText: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Inter-Medium',
  },
  filterPillTextActive: {
    color: '#2563eb',
  },
  historyList: {
    flex: 1,
    padding: 20,
  },
  historyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
  },
  urgencyIndicator: {
    width: 4,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flex: 1,
  },
  cardHeaderRight: {
    marginLeft: 12,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  urgencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  urgencyText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  requestSummary: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
    fontFamily: 'Inter-Regular',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    fontFamily: 'Inter-Medium',
  },
  serviceName: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
  },
  timeInfo: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
  },
  updateText: {
    fontSize: 10,
    color: '#9ca3af',
    fontFamily: 'Inter-Regular',
  },
  responseSection: {
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#2563eb',
  },
  responseLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1d4ed8',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  responseText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 18,
    fontFamily: 'Inter-Regular',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  viewButtonText: {
    fontSize: 14,
    color: '#2563eb',
    fontFamily: 'Inter-Medium',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 18,
    color: '#6b7280',
    fontFamily: 'Inter-Medium',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
    fontFamily: 'Inter-Regular',
  },
});