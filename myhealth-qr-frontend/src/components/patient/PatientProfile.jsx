import { User, Mail, Phone, MapPin, Calendar, Heart, Save, Edit2, Camera } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from '../../utils/useTranslation';
import { useState } from 'react';

const PatientProfile = () => {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-br from-accent-50 to-emerald-50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden shadow-2xl">
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src="/patient.png" 
                  alt="User Profile" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {isEditing && (
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-8 h-8 text-white" />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-1">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-sm sm:text-base text-secondary-600 flex items-center gap-2">
              <Heart className="w-4 h-4 text-accent-600" />
              Patient
            </p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`btn ${isEditing ? 'btn-secondary' : 'btn-outline'} text-sm`}
          >
            <Edit2 className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
            {isEditing ? t('cancel') : t('edit')}
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="card">
        <h2 className="text-lg sm:text-xl font-bold text-secondary-900 mb-4 flex items-center">
          <User className="w-5 h-5 ltr:mr-2 rtl:ml-2 text-accent-600" />
          {t('personalInformation')}
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
          <div className="sm:col-span-2">
            <label className="label">
              <MapPin className="w-4 h-4 inline ltr:mr-2 rtl:ml-2" />
              Adresse
            </label>
            <input
              type="text"
              className="input"
              disabled={!isEditing}
              placeholder="Ajouter votre adresse"
            />
          </div>
          <div>
            <label className="label">
              <Calendar className="w-4 h-4 inline ltr:mr-2 rtl:ml-2" />
              Date de naissance
            </label>
            <input
              type="date"
              className="input"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="label">
              Groupe sanguin
            </label>
            <select className="input" disabled={!isEditing}>
              <option>Sélectionner</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex gap-3">
            <button className="btn bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-white flex-1 sm:flex-none shadow-lg">
              <Save className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
              {t('save')}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-outline flex-1 sm:flex-none"
            >
              {t('cancel')}
            </button>
          </div>
        )}
      </div>

      {/* Medical Information */}
      <div className="card">
        <h2 className="text-lg sm:text-xl font-bold text-secondary-900 mb-4 flex items-center">
          <Heart className="w-5 h-5 ltr:mr-2 rtl:ml-2 text-accent-600" />
          {t('medicalInformation')}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="label">Allergies connues</label>
            <textarea
              className="input min-h-[80px]"
              disabled={!isEditing}
              placeholder="Liste de vos allergies (médicaments, aliments, etc.)"
            />
          </div>
          <div>
            <label className="label">Maladies chroniques</label>
            <textarea
              className="input min-h-[80px]"
              disabled={!isEditing}
              placeholder="Diabète, hypertension, asthme, etc."
            />
          </div>
          <div>
            <label className="label">Traitements en cours</label>
            <textarea
              className="input min-h-[80px]"
              disabled={!isEditing}
              placeholder="Liste de vos médicaments actuels"
            />
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex gap-3">
            <button className="btn bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-white flex-1 sm:flex-none shadow-lg">
              <Save className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
              {t('save')}
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

export default PatientProfile;
