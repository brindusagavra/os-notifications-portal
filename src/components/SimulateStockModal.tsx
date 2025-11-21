'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface SimulateStockModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSend: (type: string, variation: string, quantity: number) => void;
}

export default function SimulateStockModal({
    isOpen,
    onClose,
    onSend,
}: SimulateStockModalProps) {
    const [type, setType] = useState('');
    const [variation, setVariation] = useState('');
    const [quantity, setQuantity] = useState(3);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (type.trim() && variation.trim()) {
            onSend(type, variation, quantity);
            // Reset form
            setType('');
            setVariation('');
            setQuantity(3);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Low Stock Alert</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="type"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Piercing Type
                        </label>
                        <input
                            type="text"
                            id="type"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Belly Bar, Nose Ring"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="variation"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Variation
                        </label>
                        <input
                            type="text"
                            id="variation"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Gold, Silver, 10mm"
                            value={variation}
                            onChange={(e) => setVariation(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="quantity"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Quantity Left
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                        >
                            Send Alert
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
