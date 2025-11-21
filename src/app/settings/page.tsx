'use client';

import { useState, useEffect } from 'react';
import { UserPreferences } from '@/lib/store';
import Link from 'next/link';

export default function SettingsPage() {
    const [preferences, setPreferences] = useState<UserPreferences | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/settings')
            .then((res) => res.json())
            .then((data) => {
                setPreferences(data);
                setLoading(false);
            });
    }, []);

    const togglePreference = async (key: keyof UserPreferences) => {
        if (!preferences) return;

        const newPreferences = { ...preferences, [key]: !preferences[key] };
        setPreferences(newPreferences);

        await fetch('/api/settings', {
            method: 'POST',
            body: JSON.stringify({ [key]: !preferences[key] }),
        });
    };

    if (loading || !preferences) return <div className="p-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Notification Settings</h1>
                        <Link href="/" className="text-blue-600 hover:underline">
                            Back to Dashboard
                        </Link>
                    </div>

                    <p className="text-gray-600 mb-8">
                        Manage which notifications you want to receive.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <h3 className="font-medium text-gray-900">Messages</h3>
                                <p className="text-sm text-gray-500">Receive alerts for new messages.</p>
                            </div>
                            <button
                                onClick={() => togglePreference('message')}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.message ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.message ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <h3 className="font-medium text-gray-900">Stock Alerts</h3>
                                <p className="text-sm text-gray-500">Get notified about market changes.</p>
                            </div>
                            <button
                                onClick={() => togglePreference('stock')}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.stock ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.stock ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <h3 className="font-medium text-gray-900">Security Alerts</h3>
                                <p className="text-sm text-gray-500">Get notified about access requests.</p>
                            </div>
                            <button
                                onClick={() => togglePreference('security')}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.security ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.security ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
