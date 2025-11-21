'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, Settings, MessageSquare, TrendingUp, ShieldAlert } from 'lucide-react';
import ComposeMessageModal from '@/components/ComposeMessageModal';
import SimulateStockModal from '@/components/SimulateStockModal';
import SimulateSecurityModal from '@/components/SimulateSecurityModal';
import { UserPreferences } from '@/lib/store';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => setPreferences(data));
  }, []);

  const simulateNotification = async (
    type: 'message' | 'stock' | 'security',
    customMessage?: string,
    customTitle?: string
  ) => {
    const titles = {
      message: 'New Message',
      stock: 'Stock Alert',
      security: 'Security Alert',
    };
    const messages = {
      message: 'You have a new message from Alice.',
      stock: 'AAPL is down 2% today.',
      security: 'New login detected.',
    };

    await fetch('/api/notifications', {
      method: 'POST',
      body: JSON.stringify({
        action: 'create',
        title: customTitle || titles[type],
        message: customMessage || messages[type],
        type,
      }),
    });
  };

  const handleMessageClick = () => {
    if (preferences?.message) setIsModalOpen(true);
  };

  const handleSendMessage = (message: string) => {
    simulateNotification('message', message);
  };

  const handleStockClick = () => {
    if (preferences?.stock) setIsStockModalOpen(true);
  };

  const handleSendStockAlert = (type: string, variation: string, quantity: number) => {
    const title = 'Low Stock Alert';
    const message = `Only ${quantity} left of ${type} (${variation}).`;
    simulateNotification('stock', message, title);
  };

  const handleSecurityClick = () => {
    if (preferences?.security) setIsSecurityModalOpen(true);
  };

  const handleSendSecurityAlert = (username: string) => {
    const message = `User ${username} requested access.`;
    simulateNotification('security', message);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ComposeMessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSend={handleSendMessage}
      />
      <SimulateStockModal
        isOpen={isStockModalOpen}
        onClose={() => setIsStockModalOpen(false)}
        onSend={handleSendStockAlert}
      />
      <SimulateSecurityModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
        onSend={handleSendSecurityAlert}
      />
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Portal
          </h1>
          <p className="text-lg text-gray-600">
            This is a demo of the Notification System.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Simulation Controls */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-blue-600" />
              Simulate Events
            </h2>
            <p className="text-gray-600 mb-6">
              Click these buttons to trigger new notifications.
            </p>
            <div className="space-y-4">
              <button
                onClick={handleMessageClick}
                disabled={!preferences?.message}
                className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${preferences?.message
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-indigo-300 cursor-not-allowed'
                  }`}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Simulate New Message
              </button>
              <button
                onClick={handleStockClick}
                disabled={!preferences?.stock}
                className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${preferences?.stock
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-green-300 cursor-not-allowed'
                  }`}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Simulate Stock Alert
              </button>
              <button
                onClick={handleSecurityClick}
                disabled={!preferences?.security}
                className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${preferences?.security
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-red-300 cursor-not-allowed'
                  }`}
              >
                <ShieldAlert className="w-4 h-4 mr-2" />
                Simulate Access Request
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-gray-600" />
              Management
            </h2>
            <p className="text-gray-600 mb-6">
              Configure your notification preferences.
            </p>
            <Link
              href="/settings"
              className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Go to Settings
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
