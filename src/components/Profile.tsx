import React, { useState, useEffect } from 'react';
import { auth, storage, db } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Camera } from 'lucide-react';

function Profile() {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    studentId: '',
    course: '',
    interests: [] as string[],
    photoURL: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    if (!auth.currentUser) return;
    
    try {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setProfile(docSnap.data() as any);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    if (!auth.currentUser) throw new Error('No user logged in');
    
    const storageRef = ref(storage, `profile-photos/${auth.currentUser.uid}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    setIsLoading(true);
    setError('');

    try {
      let photoURL = profile.photoURL;
      
      if (imageFile) {
        photoURL = await uploadImage(imageFile);
      }

      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        ...profile,
        photoURL,
        updatedAt: new Date()
      });

      setProfile(prev => ({ ...prev, photoURL }));
      setImageFile(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <img
              src={imagePreview || profile.photoURL || auth.currentUser?.photoURL}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            <label
              htmlFor="photo-upload"
              className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50"
            >
              <Camera className="w-5 h-5 text-gray-600" />
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Rest of your form fields */}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
            ) : (
              'Save Profile'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile; 