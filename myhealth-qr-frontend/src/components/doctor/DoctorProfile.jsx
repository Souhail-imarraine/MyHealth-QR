import { User, Mail, Phone, Briefcase, MapPin, Calendar, Award, Save, Edit2, Lock, Shield } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from '../../utils/useTranslation';
import { useState, useEffect } from 'react';
import { doctorService } from '../../services/doctorService';
import toast from 'react-hot-toast';

const DoctorProfile = () => {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [doctorData, setDoctorData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialty: '',
    licenseNumber: '',
    hospital: '',
    graduationYear: '',
    experience: '',
    bio: ''
  });

  // Charger les données du docteur
  useEffect(() => {
    const loadDoctorProfile = async () => {
      try {
        const response = await doctorService.getProfile();
        if (response.success) {
          const profile = response.data;
          setDoctorData({
            firstName: profile.user?.firstName || user?.firstName || '',
            lastName: profile.user?.lastName || user?.lastName || '',
            email: profile.user?.email || user?.email || '',
            phone: profile.user?.phone || '',
            specialty: profile.specialty || '',
            licenseNumber: profile.licenseNumber || '',
            hospital: profile.hospital || '',
            graduationYear: profile.graduationYear || '',
            experience: profile.experience || '',
            bio: profile.bio || ''
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
        
        // Si le profil n'existe pas (404), utiliser les données de l'utilisateur
        if (error.response?.status === 404) {
          setDoctorData({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            phone: user?.phone || '',
            specialty: '',
            licenseNumber: '',
            hospital: '',
            graduationYear: '',
            experience: '',
            bio: ''
          });
          toast.info('Profil médecin non trouvé. Veuillez compléter vos informations.');
        } else {
          toast.error('Erreur lors du chargement du profil');
        }
      }
    };

    if (user) {
      loadDoctorProfile();
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setDoctorData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await doctorService.updateProfile({
        firstName: doctorData.firstName,
        lastName: doctorData.lastName,
        phone: doctorData.phone,
        specialty: doctorData.specialty,
        licenseNumber: doctorData.licenseNumber,
        hospital: doctorData.hospital,
        graduationYear: doctorData.graduationYear,
        experience: doctorData.experience,
        bio: doctorData.bio
      });

      if (response.success) {
        toast.success('Profil mis à jour avec succès');
        setIsEditing(false);
      } else {
        toast.error(response.message || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la mise à jour du profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-br from-accent-50 to-emerald-50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden">
            <img 
              src="/doctor.png" 
              alt="Doctor Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-1">
              Dr. {doctorData.firstName || user?.firstName} {doctorData.lastName || user?.lastName}
            </h1>
            <p className="text-sm sm:text-base text-secondary-600 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-accent-600" />
              {doctorData.specialty || 'Médecin'}
            </p>
            <p className="text-xs sm:text-sm text-secondary-500 mt-1">
              {doctorData.hospital || 'Cabinet médical'}
            </p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`btn ${isEditing ? 'btn-secondary' : 'btn-outline'} text-sm`}
          >
            <Edit2 className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
            {isEditing ? 'Annuler' : 'Modifier'}
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="card">
        <h2 className="text-lg sm:text-xl font-bold text-secondary-900 mb-4 flex items-center">
          <User className="w-5 h-5 ltr:mr-2 rtl:ml-2 text-accent-600" />
          Informations personnelles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="label">
              <User className="w-4 h-4 inline ltr:mr-2 rtl:ml-2" />
              Prénom
            </label>
            <input
              type="text"
              className="input"
              value={doctorData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="label">
              <User className="w-4 h-4 inline ltr:mr-2 rtl:ml-2" />
              Nom
            </label>
            <input
              type="text"
              className="input"
              value={doctorData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="label">
              <Mail className="w-4 h-4 inline ltr:mr-2 rtl:ml-2" />
              Email
            </label>
            <input
              type="email"
              className="input"
              value={doctorData.email}
              disabled={true}
              title="L'email ne peut pas être modifié"
            />
          </div>
          <div>
            <label className="label">
              <Phone className="w-4 h-4 inline ltr:mr-2 rtl:ml-2" />
              Téléphone
            </label>
            <input
              type="tel"
              className="input"
              value={doctorData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={!isEditing}
              placeholder="Ajouter un numéro"
            />
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex gap-3">
            <button 
              onClick={handleSave}
              disabled={loading}
              className="btn bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-white flex-1 sm:flex-none shadow-lg disabled:opacity-50"
            >
              <Save className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-outline flex-1 sm:flex-none"
              disabled={loading}
            >
              Annuler
            </button>
          </div>
        )}
      </div>

      {/* Professional Information */}
      <div className="card">
        <h2 className="text-lg sm:text-xl font-bold text-secondary-900 mb-4 flex items-center">
          <Briefcase className="w-5 h-5 ltr:mr-2 rtl:ml-2 text-accent-600" />
          Informations professionnelles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="label">
              <Award className="w-4 h-4 inline ltr:mr-2 rtl:ml-2" />
              Spécialité
            </label>
            <select 
              className="input" 
              value={doctorData.specialty}
              onChange={(e) => handleInputChange('specialty', e.target.value)}
              disabled={!isEditing}
            >
              <option value="">Sélectionner une spécialité</option>
              <option value="Médecine générale">Médecine générale</option>
              <option value="Cardiologie">Cardiologie</option>
              <option value="Pédiatrie">Pédiatrie</option>
              <option value="Dermatologie">Dermatologie</option>
              <option value="Gynécologie">Gynécologie</option>
              <option value="Chirurgie générale">Chirurgie générale</option>
              <option value="Neurologie">Neurologie</option>
              <option value="Psychiatrie">Psychiatrie</option>
              <option value="Ophtalmologie">Ophtalmologie</option>
              <option value="ORL">ORL</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <div>
            <label className="label">
              Numéro d'identification (INPE)
            </label>
            <input
              type="text"
              className="input"
              value={doctorData.licenseNumber}
              onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
              disabled={!isEditing}
              placeholder="Ex: 12345678"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label">
              <MapPin className="w-4 h-4 inline ltr:mr-2 rtl:ml-2" />
              Cabinet médical / Hôpital
            </label>
            <input
              type="text"
              className="input"
              value={doctorData.hospital}
              onChange={(e) => handleInputChange('hospital', e.target.value)}
              disabled={!isEditing}
              placeholder="Nom et adresse de votre lieu d'exercice"
            />
          </div>
          <div>
            <label className="label">
              <Calendar className="w-4 h-4 inline ltr:mr-2 rtl:ml-2" />
              Année d'obtention du diplôme
            </label>
            <input
              type="number"
              className="input"
              value={doctorData.graduationYear}
              onChange={(e) => handleInputChange('graduationYear', e.target.value)}
              disabled={!isEditing}
              placeholder="Ex: 2015"
              min="1970"
              max={new Date().getFullYear()}
            />
          </div>
          <div>
            <label className="label">
              Années d'expérience
            </label>
            <input
              type="number"
              className="input"
              value={doctorData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              disabled={!isEditing}
              placeholder="Ex: 8"
              min="0"
              max="50"
            />
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex gap-3">
            <button 
              onClick={handleSave}
              disabled={loading}
              className="btn bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-white flex-1 sm:flex-none shadow-lg disabled:opacity-50"
            >
              <Save className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        )}
      </div>

      {/* About */}
      <div className="card">
        <h2 className="text-lg sm:text-xl font-bold text-secondary-900 mb-4">
          À propos
        </h2>
        <div>
          <label className="label">Présentation professionnelle</label>
          <textarea
            className="input min-h-[100px]"
            value={doctorData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            disabled={!isEditing}
            placeholder="Décrivez votre parcours, vos compétences et votre approche médicale..."
          />
        </div>

        {isEditing && (
          <div className="mt-6 flex gap-3">
            <button 
              onClick={handleSave}
              disabled={loading}
              className="btn bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-white flex-1 sm:flex-none shadow-lg disabled:opacity-50"
            >
              <Save className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        )}
      </div>

      {/* Security */}
      <div className="card bg-gradient-to-br from-warning-50 to-orange-50 border-2 border-warning-200">
        <h2 className="text-lg sm:text-xl font-bold text-secondary-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 ltr:mr-2 rtl:ml-2 text-warning-600" />
          Sécurité du compte
        </h2>
        <div className="space-y-3">
          <button className="btn btn-outline w-full sm:w-auto text-sm sm:text-base flex items-center justify-center">
            <Lock className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
            Changer le mot de passe
          </button>
          <button className="btn btn-outline w-full sm:w-auto text-sm sm:text-base flex items-center justify-center">
            <Shield className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
            Authentification à deux facteurs
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-accent-600">0</div>
          <div className="text-sm text-secondary-600">Patients</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-emerald-600">0</div>
          <div className="text-sm text-secondary-600">Demandes en attente</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-accent-600">0</div>
          <div className="text-sm text-secondary-600">Consultations</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-emerald-600">100%</div>
          <div className="text-sm text-secondary-600">Profil complété</div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
