import { User, Mail, Phone, Briefcase, MapPin, Calendar, Award, Save, Edit2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from '../../utils/useTranslation';
import { useState } from 'react';

const DoctorProfile = () => {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-br from-accent-50 to-emerald-50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-3xl flex items-center justify-center text-white font-bold text-2xl sm:text-3xl shadow-2xl">
            Dr. {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-1">
              Dr. {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-sm sm:text-base text-secondary-600 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-accent-600" />
              {t('doctor')}
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
              value={user?.firstName || ''}
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
              value={user?.lastName || ''}
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
              value={user?.email || ''}
              disabled={!isEditing}
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
              value={user?.phone || ''}
              disabled={!isEditing}
              placeholder="Ajouter un numéro"
            />
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex gap-3">
            <button className="btn bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-white flex-1 sm:flex-none shadow-lg">
              <Save className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
              Enregistrer
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-outline flex-1 sm:flex-none"
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
            <select className="input" disabled={!isEditing}>
              <option>Sélectionner une spécialité</option>
              <option>Médecine générale</option>
              <option>Cardiologie</option>
              <option>Pédiatrie</option>
              <option>Dermatologie</option>
              <option>Gynécologie</option>
              <option>Chirurgie</option>
              <option>Autre</option>
            </select>
          </div>
          <div>
            <label className="label">
              Numéro d'identification (INPE)
            </label>
            <input
              type="text"
              className="input"
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
              disabled={!isEditing}
              placeholder="Ex: 2015"
            />
          </div>
          <div>
            <label className="label">
              Années d'expérience
            </label>
            <input
              type="number"
              className="input"
              disabled={!isEditing}
              placeholder="Ex: 8"
            />
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex gap-3">
            <button className="btn bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-white flex-1 sm:flex-none shadow-lg">
              <Save className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
              Enregistrer
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
            disabled={!isEditing}
            placeholder="Décrivez votre parcours, vos compétences et votre approche médicale..."
          />
        </div>

        {isEditing && (
          <div className="mt-6 flex gap-3">
            <button className="btn bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-white flex-1 sm:flex-none shadow-lg">
              <Save className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
              Enregistrer
            </button>
          </div>
        )}
      </div>

      {/* Security */}
      <div className="card bg-gradient-to-br from-warning-50 to-orange-50 border-2 border-warning-200">
        <h2 className="text-lg sm:text-xl font-bold text-secondary-900 mb-4">
          Sécurité du compte
        </h2>
        <div className="space-y-3">
          <button className="btn btn-outline w-full sm:w-auto text-sm sm:text-base">
            Changer le mot de passe
          </button>
          <button className="btn btn-outline w-full sm:w-auto text-sm sm:text-base">
            Authentification à deux facteurs
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
