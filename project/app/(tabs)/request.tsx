import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { TriangleAlert as AlertTriangle, Activity, TrendingUp, Calendar, Clock, User, FileText, Send } from 'lucide-react-native';

type UrgencyLevel = 'vitale' | 'fonctionnelle' | 'relative' | 'consultation';

interface UrgencyConfig {
  title: string;
  subtitle: string;
  color: string;
  icon: any;
  delay: string;
  description: string;
}

const urgencyLevels: Record<UrgencyLevel, UrgencyConfig> = {
  vitale: {
    title: 'Urgence Vitale',
    subtitle: 'Pronostic vital engagé',
    color: '#dc2626',
    icon: AlertTriangle,
    delay: '< 1 heure',
    description: 'Situation mettant en jeu le pronostic vital du patient nécessitant une intervention immédiate.'
  },
  fonctionnelle: {
    title: 'Urgence Fonctionnelle',
    subtitle: 'Pronostic fonctionnel',
    color: '#ea580c',
    icon: Activity,
    delay: '< 4 heures',
    description: 'Situation pouvant compromettre les fonctions neurologiques du patient.'
  },
  relative: {
    title: 'Urgence Relative',
    subtitle: 'Semi-urgence',
    color: '#f59e0b',
    icon: TrendingUp,
    delay: '< 24 heures',
    description: 'Situation nécessitant une prise en charge dans les meilleurs délais.'
  },
  consultation: {
    title: 'Consultation',
    subtitle: 'Avis programmé',
    color: '#2563eb',
    icon: Calendar,
    delay: '< 7 jours',
    description: 'Demande d\'avis ou de consultation programmée.'
  }
};

export default function RequestScreen() {
  const [selectedUrgency, setSelectedUrgency] = useState<UrgencyLevel | null>(null);
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    patientId: '',
    clinicalContext: '',
    currentTreatment: '',
    questionAsked: '',
    additionalInfo: '',
    requestingDoctor: '',
    service: '',
    contactInfo: ''
  });

  const handleSubmit = () => {
    if (!selectedUrgency) {
      Alert.alert('Erreur', 'Veuillez sélectionner un niveau d\'urgence');
      return;
    }

    if (!formData.patientName || !formData.clinicalContext || !formData.questionAsked) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    Alert.alert(
      'Demande envoyée',
      `Votre demande d'avis en ${urgencyLevels[selectedUrgency].title.toLowerCase()} a été transmise au service de neurochirurgie.`,
      [{ text: 'OK', onPress: () => resetForm() }]
    );
  };

  const resetForm = () => {
    setSelectedUrgency(null);
    setFormData({
      patientName: '',
      patientAge: '',
      patientId: '',
      clinicalContext: '',
      currentTreatment: '',
      questionAsked: '',
      additionalInfo: '',
      requestingDoctor: '',
      service: '',
      contactInfo: ''
    });
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!selectedUrgency) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Nouvelle demande d'avis</Text>
            <Text style={styles.headerSubtitle}>Sélectionnez le niveau d'urgence</Text>
          </View>

          <View style={styles.urgencyCards}>
            {Object.entries(urgencyLevels).map(([key, config]) => (
              <TouchableOpacity
                key={key}
                style={[styles.urgencyCard, { borderColor: config.color }]}
                onPress={() => setSelectedUrgency(key as UrgencyLevel)}
              >
                <View style={[styles.urgencyIcon, { backgroundColor: `${config.color}15` }]}>
                  <config.icon size={32} color={config.color} />
                </View>
                <View style={styles.urgencyContent}>
                  <Text style={[styles.urgencyTitle, { color: config.color }]}>
                    {config.title}
                  </Text>
                  <Text style={styles.urgencySubtitle}>{config.subtitle}</Text>
                  <View style={styles.delayContainer}>
                    <Clock size={16} color="#6b7280" />
                    <Text style={styles.delayText}>Délai: {config.delay}</Text>
                  </View>
                  <Text style={styles.urgencyDescription}>{config.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const currentLevel = urgencyLevels[selectedUrgency];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formHeader}>
          <TouchableOpacity 
            onPress={() => setSelectedUrgency(null)}
            style={styles.backButton}
          >
            <Text style={styles.backText}>← Retour</Text>
          </TouchableOpacity>
          <View style={[styles.selectedUrgency, { backgroundColor: `${currentLevel.color}15` }]}>
            <currentLevel.icon size={24} color={currentLevel.color} />
            <Text style={[styles.selectedTitle, { color: currentLevel.color }]}>
              {currentLevel.title}
            </Text>
          </View>
        </View>

        <View style={styles.form}>
          {/* Informations Patient */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations Patient</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nom du patient *</Text>
              <TextInput
                style={styles.input}
                value={formData.patientName}
                onChangeText={(text) => updateFormData('patientName', text)}
                placeholder="Nom, Prénom ou initiales"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Âge</Text>
                <TextInput
                  style={styles.input}
                  value={formData.patientAge}
                  onChangeText={(text) => updateFormData('patientAge', text)}
                  placeholder="Âge"
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                <Text style={styles.label}>N° Patient</Text>
                <TextInput
                  style={styles.input}
                  value={formData.patientId}
                  onChangeText={(text) => updateFormData('patientId', text)}
                  placeholder="Numéro patient"
                />
              </View>
            </View>
          </View>

          {/* Contexte Clinique */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contexte Clinique</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contexte clinique *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.clinicalContext}
                onChangeText={(text) => updateFormData('clinicalContext', text)}
                placeholder="Décrivez le contexte clinique, les symptômes, l'évolution..."
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Traitement en cours</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.currentTreatment}
                onChangeText={(text) => updateFormData('currentTreatment', text)}
                placeholder="Traitements actuels, interventions déjà réalisées..."
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          {/* Question Posée */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Demande</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Question posée *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.questionAsked}
                onChangeText={(text) => updateFormData('questionAsked', text)}
                placeholder="Quelle est votre question ? Quel avis souhaitez-vous ?"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Informations complémentaires</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.additionalInfo}
                onChangeText={(text) => updateFormData('additionalInfo', text)}
                placeholder="Examens complémentaires, résultats d'imagerie..."
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          {/* Informations Demandeur */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations Demandeur</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Médecin demandeur</Text>
              <TextInput
                style={styles.input}
                value={formData.requestingDoctor}
                onChangeText={(text) => updateFormData('requestingDoctor', text)}
                placeholder="Dr. Nom Prénom"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Service</Text>
              <TextInput
                style={styles.input}
                value={formData.service}
                onChangeText={(text) => updateFormData('service', text)}
                placeholder="Service demandeur"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contact</Text>
              <TextInput
                style={styles.input}
                value={formData.contactInfo}
                onChangeText={(text) => updateFormData('contactInfo', text)}
                placeholder="Téléphone, bip, email..."
              />
            </View>
          </View>

          <TouchableOpacity style={[styles.submitButton, { backgroundColor: currentLevel.color }]} onPress={handleSubmit}>
            <Send size={20} color="white" />
            <Text style={styles.submitText}>Envoyer la demande</Text>
          </TouchableOpacity>
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
  urgencyCards: {
    padding: 20,
    gap: 16,
  },
  urgencyCard: {
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
  urgencyIcon: {
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
  },
  urgencyContent: {
    flex: 1,
  },
  urgencyTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  urgencySubtitle: {
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
  urgencyDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  formHeader: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    marginBottom: 12,
  },
  backText: {
    fontSize: 16,
    color: '#2563eb',
    fontFamily: 'Inter-Medium',
  },
  selectedUrgency: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  selectedTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  form: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
    fontFamily: 'Inter-Medium',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});