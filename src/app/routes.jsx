import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../modules/core/layouts/MainLayout';
import HomePage from './pages/HomePage';
import VisionBoardPage from './pages/VisionBoardPage';
import GratitudeJournalPage from './pages/GratitudeJournalPage';
import AffirmationsPage from './pages/AffirmationsPage';
import VisualizationPage from './pages/VisualizationPage';
import RemindersPage from './pages/RemindersPage';
import GoalsPage from './pages/GoalsPage';
import FeelingsPage from './pages/FeelingsPage';
import QuotesPage from './pages/QuotesPage';
import LearningPage from './pages/LearningPage';
import NotFoundPage from './pages/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/vision-board" element={<VisionBoardPage />} />
        <Route path="/gratitude" element={<GratitudeJournalPage />} />
        <Route path="/affirmations" element={<AffirmationsPage />} />
        <Route path="/visualization" element={<VisualizationPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/feelings" element={<FeelingsPage />} />
        <Route path="/quotes" element={<QuotesPage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}