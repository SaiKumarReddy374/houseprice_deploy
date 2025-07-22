import React, { useState } from 'react';
import axios from 'axios';
import { 
  Home, 
  Calculator, 
  Bed, 
  Bath, 
  Car, 
  Thermometer, 
  Wind, 
  MapPin,
  Building,
  Loader2,
  IndianRupee
} from 'lucide-react';

const PredictForm = () => {
  const [formData, setFormData] = useState({
    area: 5000,
    bedrooms: 3,
    bathrooms: 2,
    stories: 2,
    mainroad: 1,
    guestroom: 0,
    basement: 0,
    hotwaterheating: 0,
    airconditioning: 1,
    parking: 1,
    prefarea: 1,
    furnishingstatus: 0,
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('http://localhost:5000/predict', formData);
      setPrediction(res.data.prediction);
    } catch (error) {
      setError('Failed to get prediction. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
              <Home className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            House Price Predictor
          </h1>
          <p className="text-lg text-gray-600">
            Get an accurate estimate of your property's value using AI
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            {/* Property Details Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Building className="w-5 h-5 mr-2 text-blue-600" />
                Property Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area (sq ft)
                  </label>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    min="500"
                    required
                  />
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    Bedrooms
                  </label>
                  <select
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    Bathrooms
                  </label>
                  <select
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                {/* Stories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stories
                  </label>
                  <select
                    name="stories"
                    value={formData.stories}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    {[1, 2, 3, 4].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                {/* Parking */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Car className="w-4 h-4 mr-1" />
                    Parking Spaces
                  </label>
                  <select
                    name="parking"
                    value={formData.parking}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    {[0, 1, 2, 3, 4].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                {/* Furnishing Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Furnishing Status
                  </label>
                  <select
                    name="furnishingstatus"
                    value={formData.furnishingstatus}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value={0}>Unfurnished</option>
                    <option value={1}>Semi-Furnished</option>
                    <option value={2}>Furnished</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Property Features
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { name: 'mainroad', label: 'Main Road Access', icon: MapPin },
                  { name: 'guestroom', label: 'Guest Room', icon: Bed },
                  { name: 'basement', label: 'Basement', icon: Building },
                  { name: 'hotwaterheating', label: 'Hot Water Heating', icon: Thermometer },
                  { name: 'airconditioning', label: 'Air Conditioning', icon: Wind },
                  { name: 'prefarea', label: 'Preferred Area', icon: MapPin },
                ].map(({ name, label, icon: Icon }) => (
                  <div key={name} className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <Icon className="w-5 h-5 text-blue-600 mr-3" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-700 block mb-2">
                        {label}
                      </span>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name={name}
                          checked={formData[name] === 1}
                          onChange={(e) => handleChange({
                            target: {
                              name,
                              value: e.target.checked ? '1' : '0'
                            }
                          })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {formData[name] ? 'Yes' : 'No'}
                        </span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="w-5 h-5 mr-2" />
                    Predict Price
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Prediction Result */}
          {prediction && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 border-t border-gray-100">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4">
                  <IndianRupee className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Predicted House Price
                </h3>
                <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {formatPrice(prediction)}
                </p>
                <p className="text-gray-600 mt-2">
                  This is an AI-generated estimate based on the provided property details
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Powered by advanced machine learning algorithms
          </p>
        </div>
      </div>
    </div>
  );
};

export default PredictForm;