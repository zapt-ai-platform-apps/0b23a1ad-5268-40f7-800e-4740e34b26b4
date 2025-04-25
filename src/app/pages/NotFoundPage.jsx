import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="max-w-7xl mx-auto text-center py-12">
      <h1 className="text-4xl font-bold text-purple-800 mb-4">Halaman Tidak Ditemukan</h1>
      <p className="text-gray-600 mb-8">
        Maaf, halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
      </p>
      <Link 
        to="/" 
        className="btn btn-primary flex items-center justify-center max-w-xs mx-auto"
      >
        <FiHome className="mr-2" /> Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFoundPage;