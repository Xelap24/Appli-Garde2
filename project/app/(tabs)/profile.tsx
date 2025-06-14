import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { User, Settings, Bell, Lock, CircleHelp as HelpCircle, LogOut, ChevronRight, Mail, Phone, MapPin, Stethoscope, Shield, Moon, Volume2 } from 'lucide-react-native';

interface UserProfile {
  name: string;
  title: string;
  service: string;
  email: string;
  phone: string;
  hospital: string;
  role: 'neurochirurgien' | 'interne' | 'medecin' | 'other';
}

const mockUser: UserProfile = {
  name: 'Dr. Martin Dubois',
  title: 'Neurochirurgien',
  service: 'Service de Neurochirurgie',
  email: 'martin.dubois@chu-besancon.fr',
  phone: '+33 3 81 66 81 66',
  hospital: 'CHU de Besançon',
  role: 'neurochirurgien'
};

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnexion', style: 'destructive', onPress: () => console.log('Logout') }
      ]
    );
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'neurochirurgien': return '#2563eb';
      case 'interne': return '#059669';
      case 'medecin': return '#ea580c';
      default: return '#6b7280';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'neurochirurgien': return 'Neurochirurgien';
      case 'interne': return 'Interne';
      case 'medecin': return 'Médecin';
      default: return 'Professionnel de santé';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={40} color="white" />
            </View>
            <View style={[styles.roleBadge, { backgroundColor: getRoleBadgeColor(mockUser.role) }]}>
              <Stethoscope size={16} color="white" />
            </View>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{mockUser.name}</Text>
            <Text style={styles.userTitle}>{mockUser.title}</Text>
            <View style={[styles.roleTag, { backgroundColor: `${getRoleBadgeColor(mockUser.role)}15` }]}>
              <Text style={[styles.roleText, { color: getRoleBadgeColor(mockUser.role) }]}>
                {getRoleLabel(mockUser.role)}
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations de contact</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Mail size={20} color="#6b7280" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{mockUser.email}</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoItem}>
              <Phone size={20} color="#6b7280" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Téléphone</Text>
                <Text style={styles.infoValue}>{mockUser.phone}</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoItem}>
              <MapPin size={20} color="#6b7280" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Établissement</Text>
                <Text style={styles.infoValue}>{mockUser.hospital}</Text>
                <Text style={styles.infoSubValue}>{mockUser.service}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Notifications Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Bell size={20} color="#6b7280" />
                <View style={styles.settingContent}>
                  <Text style={styles.settingLabel}>Notifications générales</Text>
                  <Text style={styles.settingDescription}>Recevoir les notifications</Text>
                </View>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#d1d5db', true: '#2563eb40' }}
                thumbColor={notificationsEnabled ? '#2563eb' : '#9ca3af'}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Mail size={20} color="#6b7280" />
                <View style={styles.settingContent}>
                  <Text style={styles.settingLabel}>Notifications email</Text>
                  <Text style={styles.settingDescription}>Recevoir les emails</Text>
                </View>
              </View>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: '#d1d5db', true: '#2563eb40' }}
                thumbColor={emailNotifications ? '#2563eb' : '#9ca3af'}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Volume2 size={20} color="#6b7280" />
                <View style={styles.settingContent}>
                  <Text style={styles.settingLabel}>Sons</Text>
                  <Text style={styles.settingDescription}>Sons de notification</Text>
                </View>
              </View>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: '#d1d5db', true: '#2563eb40' }}
                thumbColor={soundEnabled ? '#2563eb' : '#9ca3af'}
              />
            </View>
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres</Text>
          
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Settings size={20} color="#6b7280" />
                <Text style={styles.menuLabel}>Paramètres généraux</Text>
              </View>
              <ChevronRight size={20} color="#9ca3af" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Lock size={20} color="#6b7280" />
                <Text style={styles.menuLabel}>Sécurité</Text>
              </View>
              <ChevronRight size={20} color="#9ca3af" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Shield size={20} color="#6b7280" />
                <Text style={styles.menuLabel}>Confidentialité</Text>
              </View>
              <ChevronRight size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <HelpCircle size={20} color="#6b7280" />
                <Text style={styles.menuLabel}>Aide et FAQ</Text>
              </View>
              <ChevronRight size={20} color="#9ca3af" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Mail size={20} color="#6b7280" />
                <Text style={styles.menuLabel}>Contacter le support</Text>
              </View>
              <ChevronRight size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#dc2626" />
            <Text style={styles.logoutText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.footer}>
          <Text style={styles.versionText}>CHU Besançon Neurochirurgie v1.0.0</Text>
          <Text style={styles.copyrightText}>© 2024 CHU de Besançon</Text>
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
  profileHeader: {
    backgroundColor: '#ffffff',
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  userTitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 2,
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  roleTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
    fontFamily: 'Inter-SemiBold',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    fontFamily: 'Inter-Medium',
  },
  infoValue: {
    fontSize: 16,
    color: '#111827',
    marginTop: 2,
    fontFamily: 'Inter-Regular',
  },
  infoSubValue: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
    fontFamily: 'Inter-Regular',
  },
  settingsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingContent: {
    marginLeft: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    fontFamily: 'Inter-Medium',
  },
  settingDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
    fontFamily: 'Inter-Regular',
  },
  menuCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
    fontFamily: 'Inter-Regular',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#dc2626',
    marginLeft: 8,
    fontFamily: 'Inter-Medium',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingBottom: 40,
  },
  versionText: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
  },
  copyrightText: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
});